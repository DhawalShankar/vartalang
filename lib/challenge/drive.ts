import { google } from 'googleapis';
import { Readable } from 'stream';

/*
 * Everything Drive-related for the Voice Challenge lives in this one file.
 *
 * Auth: OAuth (user account), NOT a service account — service accounts have
 * no storage quota on regular Gmail (non-Workspace) My Drive.
 *
 * Required env vars:
 *   GOOGLE_OAUTH_CLIENT_ID       - plain client ID (no http://, no trailing /)
 *   GOOGLE_OAUTH_CLIENT_SECRET
 *   GOOGLE_REFRESH_TOKEN         - generated AFTER app is "In production"
 *   GOOGLE_DRIVE_FOLDER_ID
 */

function clean(v: string | undefined): string | undefined {
  // Strips accidental spaces, newlines and wrapping quotes from env values.
  return v?.trim().replace(/^["']|["']$/g, '');
}

function getDriveClient() {
  const clientId = clean(process.env.GOOGLE_OAUTH_CLIENT_ID);
  const clientSecret = clean(process.env.GOOGLE_OAUTH_CLIENT_SECRET);
  const refreshToken = clean(process.env.GOOGLE_REFRESH_TOKEN);

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Missing GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN env vars'
    );
  }

  // ---- TEMP DEBUG: remove after checking Vercel logs ----
  console.log('DRIVE ENV CHECK', {
    idStart: clientId.slice(0, 8),
    idEnd: clientId.slice(-12),
    idLen: clientId.length,
    secretLen: clientSecret.length,
    secretEnd: clientSecret.slice(-4),
    tokenStart: refreshToken.slice(0, 4),
  });
  // --------------------------------------------------------

  if (/^https?:\/\//i.test(clientId) || clientId.endsWith('/')) {
    throw new Error('GOOGLE_OAUTH_CLIENT_ID is malformed (remove http:// and trailing /)');
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return google.drive({ version: 'v3', auth: oauth2Client });
}

function getFolderId(): string {
  const id = clean(process.env.GOOGLE_DRIVE_FOLDER_ID);
  if (!id) throw new Error('Missing GOOGLE_DRIVE_FOLDER_ID env var');
  return id;
}

/**
 * True when Google rejected our OAuth credentials (dead refresh token,
 * wrong client ID/secret).
 */
export function isDriveAuthError(err: unknown): boolean {
  const e = err as { message?: string; response?: { data?: { error?: string } } };
  const msg = `${e?.message ?? ''} ${e?.response?.data?.error ?? ''}`;
  return msg.includes('invalid_grant') || msg.includes('invalid_client');
}

export const DRIVE_AUTH_LOG =
  'DRIVE OAUTH CREDENTIALS INVALID — regenerate GOOGLE_REFRESH_TOKEN (app must be In production) and redeploy';

/**
 * Checks whether this user has already submitted a recording for this
 * language, by looking for a filename that starts with "Language_UserID_".
 */
export async function hasExistingSubmission(language: string, userId: string): Promise<boolean> {
  const drive = getDriveClient();
  const folderId = getFolderId();

  const prefix = `${language.replace(/[^a-zA-Z]/g, '')}_${userId.replace(/[^a-zA-Z0-9]/g, '')}_`;

  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false and name contains '${prefix}'`,
    fields: 'files(id, name)',
    pageSize: 10,
  });

  return (res.data.files?.length ?? 0) > 0;
}

interface UploadParams {
  filename: string;
  mimeType: string;
  buffer: Buffer;
}

/**
 * Uploads one recording into the shared challenge folder.
 * Returns the new file's Drive ID.
 */
export async function uploadToDrive({ filename, mimeType, buffer }: UploadParams): Promise<string> {
  const drive = getDriveClient();
  const folderId = getFolderId();

  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: 'id',
  });

  if (!res.data.id) {
    throw new Error('Drive upload succeeded but returned no file ID');
  }

  return res.data.id;
}

export interface DriveSubmissionFile {
  id: string;
  name: string;
  createdTime: string;
  size: string;
}

/**
 * Lists every recording currently in the challenge folder, newest first.
 * Paginates so it works past the 1000-file mark.
 */
export async function listSubmissions(): Promise<DriveSubmissionFile[]> {
  const drive = getDriveClient();
  const folderId = getFolderId();

  const files: DriveSubmissionFile[] = [];
  let pageToken: string | undefined;

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, createdTime, size)',
      orderBy: 'createdTime desc',
      pageSize: 1000,
      pageToken,
    });

    for (const f of res.data.files ?? []) {
      if (f.id && f.name) {
        files.push({
          id: f.id,
          name: f.name,
          createdTime: f.createdTime ?? '',
          size: f.size ?? '0',
        });
      }
    }

    pageToken = res.data.nextPageToken ?? undefined;
  } while (pageToken);

  return files;
}