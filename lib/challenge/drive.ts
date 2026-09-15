import { google } from 'googleapis';
import { Readable } from 'stream';

/*
 * Everything Drive-related for the Voice Challenge lives in this one file.
 * Deleting the challenge feature later = delete this file, its callers,
 * and the GOOGLE_* env vars below. Nothing else in the app touches Drive.
 *
 * Auth: OAuth (user account), NOT a service account — service accounts have
 * no storage quota on regular Gmail (non-Workspace) My Drive, so uploads to
 * personal Drive folders must go through the actual Gmail account via OAuth.
 *
 * Required env vars (.env.local):
 *   GOOGLE_OAUTH_CLIENT_ID       - from OAuth client (Desktop app type)
 *   GOOGLE_OAUTH_CLIENT_SECRET   - from OAuth client
 *   GOOGLE_REFRESH_TOKEN         - one-time generated via get-refresh-token.js
 *   GOOGLE_DRIVE_FOLDER_ID       - the folder ID in the actual Gmail account
 */

function getDriveClient() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN env vars');
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return google.drive({ version: 'v3', auth: oauth2Client });
}

/**
 * Checks whether this user has already submitted a recording for this
 * language, by looking for a filename that starts with "Language_UserID_".
 * This is our stand-in for a database row — the filename itself is the record.
 */
export async function hasExistingSubmission(language: string, userId: string): Promise<boolean> {
  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const prefix = `${language.replace(/[^a-zA-Z]/g, '')}_${userId}_`;

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
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: folderId ? [folderId] : undefined,
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
 * Paginates through Drive's results so it works past the 1000-file mark.
 * Used by the admin challenge page — this file itself has no notion of
 * "users" or "languages", it just hands back raw Drive file records.
 */
export async function listSubmissions(): Promise<DriveSubmissionFile[]> {
  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

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