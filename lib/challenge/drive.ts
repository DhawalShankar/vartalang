import { google } from 'googleapis';
import { Readable } from 'stream';

/*
 * Everything Drive-related for the Voice Challenge lives in this one file.
 * Deleting the challenge feature later = delete this file, its callers,
 * and the GOOGLE_* env vars below. Nothing else in the app touches Drive.
 *
 * Required env vars (.env.local):
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL   - from the downloaded JSON key ("client_email")
 *   GOOGLE_SERVICE_ACCOUNT_KEY     - from the downloaded JSON key ("private_key")
 *   GOOGLE_DRIVE_FOLDER_ID         - the folder ID you shared with that service account
 *
 * Note: private keys contain literal "\n" line breaks. When you paste the key
 * into .env.local, keep it as a single-line string with \n escapes — the
 * .replace() below converts those back into real newlines at runtime.
 */

function getDriveClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!email || !key) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY env vars');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: key.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  return google.drive({ version: 'v3', auth });
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