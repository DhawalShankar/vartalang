"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Search, MapPin, Languages as LanguagesIcon, Sparkles, ExternalLink } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const PREMIUM_URL = "https://learn.vartalang.in";

interface LanguageSummary {
  name: string;
  slug: string;
  nativeName?: string;
  description?: string;
  script?: string[];
  regions?: string[];
}

export default function LearnPage() {
  const { darkMode } = useDarkMode();
  const [languages, setLanguages] = useState<LanguageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/learn`);
        if (!res.ok) throw new Error('Failed to load languages');
        const data = await res.json();
        setLanguages(data.languages || []);
      } catch (err) {
        console.error('Error fetching languages:', err);
        setError('Could not load the language guides. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  const filtered = languages.filter((lang) =>
    lang.name.toLowerCase().includes(query.toLowerCase()) ||
    lang.nativeName?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/30'
        }`}></div>
        <div className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl ${
          darkMode ? 'bg-red-900/20' : 'bg-red-200/30'
        }`}></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
            darkMode ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' : 'bg-linear-to-br from-orange-100 to-red-100'
          }`}>
            <BookOpen className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Learn a Language
          </h1>
          <p className={`text-lg max-w-2xl mx-auto mb-8 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
            Curated guides — start learning, free resources, and where to practice with real people.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              darkMode ? 'text-orange-400/60' : 'text-orange-600/60'
            }`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a language..."
              className={`w-full pl-12 pr-4 py-3 rounded-full border outline-none transition-colors ${
                darkMode
                  ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-200/40 focus:border-orange-500'
                  : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
              }`}
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && error && (
            <p className={`text-center py-20 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>{error}</p>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className={`text-center py-20 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              No languages match "{query}" yet.
            </p>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((lang) => (
                <Link
                  key={lang.slug}
                  href={`/learn/${lang.slug}`}
                  className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-xl ${
                    darkMode
                      ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30 hover:border-orange-600/50'
                      : 'bg-white border-orange-100 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                    }`}>
                      <LanguagesIcon className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                        {lang.name}
                      </h3>
                      {lang.nativeName && (
                        <p className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-orange-700/70'}`}>
                          {lang.nativeName}
                        </p>
                      )}
                    </div>
                  </div>

                  {lang.description && (
                    <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-orange-200/60' : 'text-gray-600'}`}>
                      {lang.description}
                    </p>
                  )}

                  {lang.regions && lang.regions.length > 0 && (
                    <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-orange-300/60' : 'text-gray-500'}`}>
                      <MapPin className="w-3.5 h-3.5" />
                      {lang.regions.join(', ')}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Premium Learning CTA */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 md:p-10 rounded-2xl border text-center ${
            darkMode
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/10 border-orange-800/30'
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-100'
          }`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-orange-500/20' : 'bg-white'
            }`}>
              <Sparkles className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Didn't find your desired language or premium content?
            </h2>
            <p className={`mb-6 max-w-xl mx-auto ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Explore our Premium Learning Platform for structured courses and additional languages.
            </p>
            <a
              href={PREMIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
            >
              Explore Premium Learning Platform <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}