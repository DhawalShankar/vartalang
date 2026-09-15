// app/admin/challenge/page.tsx
"use client";
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import {
  Shield, Mic, Loader2, ExternalLink, Search, ArrowLeft
} from 'lucide-react';
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Submission {
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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatSize(bytes: number) {
  if (!bytes) return '—';
  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

export default function ChallengeAdminPage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [byLanguage, setByLanguage] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  const checkAdminAndLoad = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const adminRes = await fetch(`${API_URL}/admin/check`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const adminData = await adminRes.json();

      if (!adminData.isAdmin) {
        alert('Access Denied: Admin only');
        router.push('/');
        return;
      }
      setIsAdmin(true);

      const res = await fetch('/api/admin/challenge', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to load submissions');
      } else {
        setSubmissions(data.submissions);
        setByLanguage(data.byLanguage || {});
      }
    } catch (err) {
      console.error('Challenge admin load error:', err);
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const languages = useMemo(
    () => Array.from(new Set(submissions.map((s) => s.language))).sort(),
    [submissions]
  );

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (languageFilter !== 'all' && s.language !== languageFilter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        s.userName.toLowerCase().includes(q) ||
        s.userEmail.toLowerCase().includes(q) ||
        s.language.toLowerCase().includes(q)
      );
    });
  }, [submissions, search, languageFilter]);

  const pageBg = darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]';
  const cardCls = darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-100';
  const headingCls = darkMode ? 'text-orange-50' : 'text-gray-900';
  const bodyCls = darkMode ? 'text-orange-200/70' : 'text-gray-600';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
        <Loader2 className={`w-16 h-16 animate-spin ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin')}
              className={`inline-flex items-center gap-1.5 text-sm font-medium mb-4 ${
                darkMode ? 'text-orange-300 hover:text-orange-200' : 'text-orange-700 hover:text-orange-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to admin
            </button>
            <div className="flex items-center gap-3 mb-2">
              <Mic className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <h1 className={`text-3xl font-bold ${headingCls}`}>Voice Challenge Submissions</h1>
            </div>
            <p className={`text-sm ${bodyCls}`}>
              Every recording currently sitting in the challenge Drive folder
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-red-300 bg-red-50 text-red-700 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className={`p-5 rounded-2xl border ${cardCls}`}>
              <p className={`text-3xl font-bold mb-1 ${headingCls}`}>{submissions.length}</p>
              <p className={`text-sm ${bodyCls}`}>Total submissions</p>
            </div>
            <div className={`p-5 rounded-2xl border ${cardCls}`}>
              <p className={`text-3xl font-bold mb-1 ${headingCls}`}>{languages.length}</p>
              <p className={`text-sm ${bodyCls}`}>Languages covered</p>
            </div>
            {Object.entries(byLanguage)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 2)
              .map(([lang, count]) => (
                <div key={lang} className={`p-5 rounded-2xl border ${cardCls}`}>
                  <p className={`text-3xl font-bold mb-1 ${headingCls}`}>{count}</p>
                  <p className={`text-sm ${bodyCls}`}>{lang}</p>
                </div>
              ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${bodyCls}`} />
              <input
                type="text"
                placeholder="Search by name, email, or language…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                  darkMode
                    ? 'bg-orange-900/10 border-orange-800/30 text-orange-100 placeholder:text-orange-300/40'
                    : 'bg-white border-orange-200 text-gray-900 placeholder:text-gray-400'
                }`}
              />
            </div>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium ${
                darkMode
                  ? 'bg-orange-900/10 border-orange-800/30 text-orange-100'
                  : 'bg-white border-orange-200 text-gray-900'
              }`}
            >
              <option value="all">All languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className={`rounded-2xl border overflow-hidden ${cardCls}`}>
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <p className={`text-sm ${bodyCls}`}>No submissions match your filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>User</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>Language</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>Submitted</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>Size</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>Recording</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-800/20">
                    {filtered.map((s) => (
                      <tr key={s.fileId} className={darkMode ? 'hover:bg-orange-900/10' : 'hover:bg-orange-50/50'}>
                        <td className={`px-6 py-4 ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                          <p className="font-medium">{s.userName}</p>
                          <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>{s.userEmail}</p>
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                          {s.language}
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                          {formatDate(s.submittedAt)}
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                          {formatSize(s.sizeBytes)}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={s.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Open in Drive
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}