import { NextRequest, NextResponse } from 'next/server';
import { hasExistingSubmission, uploadToDrive } from '@/lib/challenge/drive';

/*
 * POST /api/challenge/submit
 * Expects multipart/form-data: audio (file), language, scriptId,
 * durationSec, consent, consentText — this matches what
 * app/challenge/start/page.tsx already sends.
 *
 * Auth lives on a separately hosted backend (the same one /auth/me on the
 * profile page and the start page hit), so this route does NOT verify the
 * JWT itself — it doesn't have the secret. Instead it forwards the token to
 * that backend's /auth/me and trusts its answer. Set BACKEND_API_URL in
 * .env.local to that backend's base URL (e.g. https://api.vartalang.in).
 */

const MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100MB, per the PRD
const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

async function getUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !BACKEND_API_URL) return null;

  try {
    const res = await fetch(`${BACKEND_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;

    const data = await res.json();
    // Adjust this line if your /auth/me response shape differs
    // (e.g. { user: { _id } } vs { id } directly).
    return data?.user?._id || data?.user?.id || data?._id || data?.id || null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }

  const formData = await req.formData();
  const audio = formData.get('audio');
  const language = formData.get('language');
  const scriptId = formData.get('scriptId');
  const consent = formData.get('consent');
  const consentText = formData.get('consentText');

  if (!(audio instanceof File) || typeof language !== 'string' || !language) {
    return NextResponse.json({ error: 'Missing audio or language.' }, { status: 400 });
  }

  if (consent !== 'true' || typeof consentText !== 'string' || !consentText) {
    return NextResponse.json({ error: 'Consent is required before submitting.' }, { status: 400 });
  }

  if (audio.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'Recording is too large.' }, { status: 400 });
  }

  const alreadySubmitted = await hasExistingSubmission(language, userId);
  if (alreadySubmitted) {
    return NextResponse.json(
      { error: `You've already submitted a ${language} recording.` },
      { status: 409 }
    );
  }

  const cleanLang = language.replace(/[^a-zA-Z]/g, '');
  const ext = audio.type.includes('mp4') ? 'm4a' : 'webm';
  const filename = `${cleanLang}_${userId}_${Date.now()}.${ext}`;

  const arrayBuffer = await audio.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const fileId = await uploadToDrive({
      filename,
      mimeType: audio.type || 'application/octet-stream',
      buffer,
    });

    // consentText and scriptId aren't stored anywhere yet since there's no
    // database — they arrive here in case you want to log them or write
    // them to a sidecar file/sheet later. For now the filename (language +
    // userId + timestamp) is the only persisted record.
    void scriptId;
    void consentText;

    return NextResponse.json({ success: true, fileId });
  } catch (err) {
    console.error('Drive upload failed:', err);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}