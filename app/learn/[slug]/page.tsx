"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  MapPin,
  Users,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Briefcase,
  Mic,
  Languages as LanguagesIcon,
  Star
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Resource {
  _id: string;
  title: string;
  url: string;
  description: string;
  type: string;
  level: string;
  isFree: boolean;
  source?: string;
  featured?: boolean;
}

interface LanguageGuide {
  name: string;
  slug: string;
  nativeName?: string;
  description?: string;
  script?: string[];
  regions?: string[];
  speakerBase?: string;
  prerequisites?: string;
  roadmap?: string[];
  resources?: Resource[];
  paidContent?: { enabled: boolean; url: string };
}

const RESOURCE_LABELS: Record<string, string> = {
  youtube: 'YouTube',
  website: 'Website',
  article: 'Article',
  book: 'Book',
  podcast: 'Podcast',
  app: 'App',
  dictionary: 'Dictionary',
  grammar: 'Grammar',
  practice: 'Practice'
};

export default function LanguageGuidePage() {
  const { darkMode } = useDarkMode();
  const params = useParams();
  const slug = params?.slug as string;

  const [guide, setGuide] = useState<LanguageGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchGuide = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/learn/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setGuide(data.language);
      } catch (err) {
        console.error('Error fetching language guide:', err);
        setError('This language guide is not available yet.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [slug]);

  const cardClass = darkMode
    ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30'
    : 'bg-white border-orange-100';

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <Navbar />
        <div className="pt-32 flex items-center justify-center min-h-[60vh]">
          <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <Navbar />
        <div className="pt-32 pb-20 px-4 text-center">
          <h1 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Guide Not Found
          </h1>
          <p className={`mb-8 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
            {error || "We haven't published this language guide yet."}
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Learn
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const resources = guide.resources || [];
  const featured = resources.filter((r) => r.featured);
  const rest = resources.filter((r) => !r.featured);
  const paidUrl = guide.paidContent?.url || "https://learn.vartalang.in";

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />

      {/* Hero / Overview */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/30'
        }`}></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            href="/learn"
            className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full font-medium transition-all ${
              darkMode ? 'text-orange-300 hover:bg-orange-900/20' : 'text-orange-700 hover:bg-orange-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Learn
          </Link>

          <div className="flex items-start gap-5 mb-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
              darkMode ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' : 'bg-linear-to-br from-orange-100 to-red-100'
            }`}>
              <LanguagesIcon className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                {guide.name}
              </h1>
              {guide.nativeName && (
                <p className={`text-xl mt-1 ${darkMode ? 'text-orange-300/80' : 'text-orange-700/80'}`}>
                  {guide.nativeName}
                </p>
              )}
            </div>
          </div>

          {guide.description && (
            <p className={`text-lg leading-relaxed mb-6 max-w-3xl ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              {guide.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-sm">
            {guide.regions && guide.regions.length > 0 && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                darkMode ? 'bg-orange-900/20 text-orange-200' : 'bg-orange-50 text-orange-800'
              }`}>
                <MapPin className="w-3.5 h-3.5" /> {guide.regions.join(', ')}
              </span>
            )}
            {guide.script && guide.script.length > 0 && (
              <span className={`px-3 py-1.5 rounded-full ${
                darkMode ? 'bg-orange-900/20 text-orange-200' : 'bg-orange-50 text-orange-800'
              }`}>
                Script: {guide.script.join(', ')}
              </span>
            )}
            {guide.speakerBase && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                darkMode ? 'bg-orange-900/20 text-orange-200' : 'bg-orange-50 text-orange-800'
              }`}>
                <Users className="w-3.5 h-3.5" /> {guide.speakerBase} speakers
              </span>
            )}
          </div>

          {guide.prerequisites && (
            <p className={`mt-4 text-sm italic ${darkMode ? 'text-orange-200/50' : 'text-gray-500'}`}>
              Prerequisites: {guide.prerequisites}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-24 space-y-10">

        {/* Start Learning */}
        {guide.roadmap && guide.roadmap.length > 0 && (
          <div className={`p-8 rounded-2xl border ${cardClass}`}>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Start Learning
              </h2>
            </div>
            <ol className="space-y-3">
              {guide.roadmap.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className={`pt-0.5 ${darkMode ? 'text-orange-100' : 'text-gray-800'}`}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Free Resources */}
        <div className={`p-8 rounded-2xl border ${cardClass}`}>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Free Resources
            </h2>
          </div>

          {resources.length === 0 && (
            <p className={darkMode ? 'text-orange-200/60' : 'text-gray-500'}>
              Resources for {guide.name} are being curated — check back soon.
            </p>
          )}

          {featured.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${
                darkMode ? 'text-orange-400' : 'text-orange-600'
              }`}>
                Editor's Picks
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {featured.map((r) => (
                  <ResourceCard key={r._id} resource={r} darkMode={darkMode} highlighted />
                ))}
              </div>
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {rest.map((r) => (
                <ResourceCard key={r._id} resource={r} darkMode={darkMode} />
              ))}
            </div>
          )}
        </div>

        {/* Paid Content */}
        <div className={`p-8 rounded-2xl border text-center ${
          darkMode ? 'bg-linear-to-br from-orange-900/20 to-red-900/10 border-orange-800/30' : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-100'
        }`}>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Paid Learning
          </h2>
          <p className={`mb-6 max-w-xl mx-auto ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
            Explore structured courses and premium learning resources on VartaLang.
          </p>
          <a
            href={paidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
          >
            Explore Paid Courses <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Practice on VartaLang + Opportunities */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className={`p-6 rounded-2xl border ${cardClass}`}>
            <div className="flex items-center gap-2 mb-4">
              <Mic className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <h3 className={`text-lg font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Practice on VartaLang
              </h3>
            </div>
            <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Find a {guide.name} speaker to exchange languages with, for free.
            </p>
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
            >
              <Users className="w-4 h-4" /> Find Practice Partners
            </Link>
          </div>

          <div className={`p-6 rounded-2xl border ${cardClass}`}>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <h3 className={`text-lg font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Language Opportunities
              </h3>
            </div>
            <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Jobs where {guide.name} is the skill — translation, teaching, voice work, and more.
            </p>
            <Link
              href={`/jobs/board?language=${encodeURIComponent(guide.name)}`}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold border-2 transition-all hover:scale-105 ${
                darkMode ? 'border-orange-400 text-orange-300 hover:bg-orange-900/20' : 'border-orange-600 text-orange-700 hover:bg-orange-50'
              }`}
            >
              <Briefcase className="w-4 h-4" /> View {guide.name} Jobs
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ResourceCard({ resource, darkMode, highlighted = false }: { resource: Resource; darkMode: boolean; highlighted?: boolean }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-5 rounded-xl border transition-all hover:scale-[1.02] ${
        highlighted
          ? darkMode ? 'bg-orange-500/10 border-orange-500/40' : 'bg-orange-50 border-orange-300'
          : darkMode ? 'bg-orange-900/5 border-orange-800/20 hover:border-orange-700/40' : 'bg-orange-50/30 border-orange-100 hover:border-orange-200'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>{resource.title}</h4>
        {highlighted && <Star className={`w-4 h-4 shrink-0 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" />}
      </div>
      <p className={`text-sm mb-3 ${darkMode ? 'text-orange-200/60' : 'text-gray-600'}`}>{resource.description}</p>
      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className={`px-2 py-0.5 rounded-full ${darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>
          {RESOURCE_LABELS[resource.type] || resource.type}
        </span>
        <span className={`px-2 py-0.5 rounded-full capitalize ${darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>
          {resource.level}
        </span>
        {resource.isFree && (
          <span className={`px-2 py-0.5 rounded-full ${darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'}`}>
            Free
          </span>
        )}
      </div>
    </a>
  );
}