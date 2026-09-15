import { NextRequest, NextResponse } from 'next/server';
import { listSubmissions } from '@/lib/challenge/drive';

/*
 * GET /api/admin/challenge
 *
 * Returns every Voice Challenge recording currently sitting in the Drive
 * folder, matched up with the submitting user's name and email.
 *
 * Auth follows the same pattern as /api/challenge/submit: this route has no
 * JWT secret, so it forwards the caller's token to the existing backend's
 * /admin/check endpoint and trusts that answer.
 *
 * ASSUMPTION: this also expects a bulk users endpoint on that same backend —
 * BACKEND_API_URL + '/admin/users' — returning something like
 * { users: [{ _id, name, email }, ...] } (or a bare array). If your backend
 * exposes users under a different path or shape, only getUserMap() below
 * needs to change; everything else stays the same.
 */

const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

// Matches filenames written by /api/challenge/submit: Language_userId_timestamp.ext
// userId is a 24-char Mongo ObjectId hex string.
const FILENAME_RE = /^([A-Za-z]+)_([a-fA-F0-9]{24})_(\d+)\.(\w+)$/;

interface ChallengeSubmission {
  fileId: string;
  fileName: string;
  language: string;
  userId: string;
  userName: string;
  userEmail: string;
  submittedAt: string;
  sizeBytes: number;
  driveUrl: string;
}

async function checkAdmin(token: string): Promise<boolean> {
  if (!BACKEND_API_URL) return false;
  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/check`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;
    const data = await res.json();
    return !!data.isAdmin;
  } catch {
    return false;
  }
}

async function getUserMap(token: string): Promise<Map<string, { name: string; email: string }>> {
  const map = new Map<string, { name: string; email: string }>();
  if (!BACKEND_API_URL) return map;

  try {
    // Adjust this path/shape if your backend's user-listing endpoint differs.
    const res = await fetch(`${BACKEND_API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return map;

    const data = await res.json();
    const users = Array.isArray(data) ? data : data.users ?? [];

    for (const u of users) {
      const id = u._id || u.id;
      if (id) {
        map.set(id, { name: u.name || 'Unknown', email: u.email || 'N/A' });
      }
    }
  } catch {
    // Leave the map empty — submissions still show with a fallback label
    // instead of failing the whole request.
  }

  return map;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }

  const isAdmin = await checkAdmin(token);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Admin only.' }, { status: 403 });
  }

  try {
    const [files, userMap] = await Promise.all([listSubmissions(), getUserMap(token)]);

    const submissions: ChallengeSubmission[] = [];

    for (const file of files) {
      const match = file.name.match(FILENAME_RE);
      if (!match) continue; // ignore anything that doesn't fit our naming convention

      const [, language, userId, timestampMs] = match;
      const user = userMap.get(userId);

      submissions.push({
        fileId: file.id,
        fileName: file.name,
        language,
        userId,
        userName: user?.name ?? 'Unknown user',
        userEmail: user?.email ?? 'N/A',
        submittedAt: file.createdTime || new Date(Number(timestampMs)).toISOString(),
        sizeBytes: Number(file.size) || 0,
        driveUrl: `https://drive.google.com/file/d/${file.id}/view`,
      });
    }

    const byLanguage: Record<string, number> = {};
    for (const s of submissions) {
      byLanguage[s.language] = (byLanguage[s.language] || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      total: submissions.length,
      byLanguage,
      submissions,
    });
  } catch (err) {
    console.error('Failed to list challenge submissions:', err);
    return NextResponse.json({ error: 'Failed to load submissions.' }, { status: 500 });
  }
}