"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, Globe, Mail, Users, Target, Shield,
  CheckCircle, XCircle, ArrowRight, Sparkles,
  Languages, FileText, Clock, TrendingUp, Heart,
  Search, Filter, MapPin, Building2, Zap, Star,
  AlertCircle, ExternalLink, Calendar, Award,
  MessageSquare, Ban, Eye, Send
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface JobStats {
  totalJobs: number;
  activeJobs: number;
  languages: number;
  companies: number;
}

export default function VartaLangJobsHome() {
  const { darkMode } = useDarkMode();
  const [stats, setStats] = useState<JobStats>({
    totalJobs: 0,
    activeJobs: 0,
    languages: 0,
    companies: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      
      {/* Space for Navbar */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className={`absolute top-0 right-1/4 w-150 h-150 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/40'
        }`}></div>
        <div className={`absolute bottom-0 left-1/4 w-125 h-125 rounded-full blur-3xl ${
          darkMode ? 'bg-red-900/20' : 'bg-red-200/30'
        }`}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border ${
              darkMode 
                ? 'bg-orange-900/20 border-orange-800/40 text-orange-300' 
                : 'bg-orange-50 border-orange-200 text-orange-700'
            }`}>
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold">Language-Focused Opportunities</span>
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              Real Jobs.<br/>
              Real Languages.<br/>
              <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Zero Noise.
              </span>
            </h1>

            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              darkMode ? 'text-orange-200/80' : 'text-gray-700'
            }`}>
              A curated job board where <strong>language skill</strong> is the <strong>primary requirement</strong>, 
              not an afterthought. No fake applications. No spam. Just direct, transparent opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jobs/board"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-lg
                bg-linear-to-r from-orange-500 to-red-600 text-white
                hover:shadow-2xl hover:scale-105 transition-all"
              >
                Browse Opportunities
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="/jobs/board?post=true"
                className={`inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-lg border-2 transition-all hover:scale-105 ${
                  darkMode
                    ? 'border-orange-600 text-orange-300 hover:bg-orange-900/20'
                    : 'border-orange-600 text-orange-700 hover:bg-orange-50'
                }`}
              >
                <Building2 className="w-6 h-6" />
                Post a Job (Free)
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Active Jobs', value: stats.activeJobs, icon: Briefcase },
              { label: 'Languages', value: stats.languages, icon: Languages },
              { label: 'Companies', value: stats.companies, icon: Building2 },
              { label: 'Total Posted', value: stats.totalJobs, icon: TrendingUp }
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border text-center transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <stat.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {stat.value}+
                </div>
                <div className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Is / Is Not Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Built on Clarity, Not Clutter
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* What This IS */}
            <div className={`p-8 rounded-2xl border ${
              darkMode 
                ? 'bg-green-900/10 border-green-800/30' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/20">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
                  What This Is
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'A curated list of language-based jobs',
                  'A direct bridge between candidates and employers',
                  'A visibility platform for real opportunities',
                  'Free for 7 days, every listing',
                  'Transparent contact information'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 mt-0.5 shrink-0 ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`} />
                    <span className={`${darkMode ? 'text-green-200' : 'text-green-900'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What This IS NOT */}
            <div className={`p-8 rounded-2xl border ${
              darkMode 
                ? 'bg-red-900/10 border-red-800/30' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/20">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-red-300' : 'text-red-900'}`}>
                  What This Is NOT
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Not a job portal like Naukri or LinkedIn',
                  'Not an application processing system',
                  'Not a CV collection platform',
                  'Not a resume database',
                  'We do NOT intermediate hiring'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className={`w-5 h-5 mt-0.5 shrink-0 ${
                      darkMode ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <span className={`${darkMode ? 'text-red-200' : 'text-red-900'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 px-4 ${
        darkMode ? 'bg-orange-900/5' : 'bg-orange-50/50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-4 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            How It Works
          </h2>
          <p className={`text-center text-lg mb-12 ${
            darkMode ? 'text-orange-200/70' : 'text-gray-600'
          }`}>
            Three simple steps. No complexity. No middlemen.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '1',
                title: 'Companies Post',
                description: 'Employers list jobs with verified email addresses. Free for 7 days.',
                icon: Building2,
                color: 'orange'
              },
              {
                number: '2',
                title: 'Candidates Browse',
                description: 'Job seekers find language-focused opportunities with clear requirements.',
                icon: Search,
                color: 'red'
              },
              {
                number: '3',
                title: 'Direct Contact',
                description: 'Candidates email employers directly. No VartaLang involvement.',
                icon: Mail,
                color: 'orange'
              }
            ].map((step, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl border transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}
              >
                <div className={`absolute -top-6 left-8 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl text-white
                  bg-linear-to-r from-orange-500 to-red-600`}>
                  {step.number}
                </div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mt-4 ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <step.icon className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                <p className={`${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language-Only Policy */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-10 rounded-2xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-100 shadow-xl'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-linear-to-r from-orange-500 to-red-600">
                <Languages className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Language-Only Policy
              </h2>
            </div>

            <p className={`text-lg mb-6 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              Only jobs where <strong>language skill is the primary requirement</strong> are allowed.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className={`font-bold mb-3 flex items-center gap-2 ${
                  darkMode ? 'text-green-400' : 'text-green-700'
                }`}>
                  <CheckCircle className="w-5 h-5" />
                  Examples of Accepted Jobs
                </h4>
                <ul className={`space-y-2 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  <li>• Translators / Interpreters</li>
                  <li>• Language Teachers / Trainers</li>
                  <li>• Regional Content Writers</li>
                  <li>• Embassy Assistants</li>
                  <li>• Language Researchers</li>
                  <li>• Localization Specialists</li>
                </ul>
              </div>

              <div>
                <h4 className={`font-bold mb-3 flex items-center gap-2 ${
                  darkMode ? 'text-red-400' : 'text-red-700'
                }`}>
                  <Ban className="w-5 h-5" />
                  What Gets Rejected
                </h4>
                <ul className={`space-y-2 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  <li>• Jobs where language is incidental</li>
                  <li>• "Preferred but not required" roles</li>
                  <li>• Generic admin/sales positions</li>
                  <li>• Tech jobs with "nice to have" language</li>
                  <li>• Customer service (unless language-specific)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Duration */}
      <section className={`py-16 px-4 ${
        darkMode ? 'bg-orange-900/5' : 'bg-orange-50/50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-6 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Simple, Transparent Pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`p-8 rounded-2xl border ${
              darkMode 
                ? 'bg-green-900/10 border-green-800/30' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-500" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${
                darkMode ? 'text-green-300' : 'text-green-900'
              }`}>
                First 7 Days
              </h3>
              <p className={`text-5xl font-bold mb-4 ${
                darkMode ? 'text-green-400' : 'text-green-700'
              }`}>
                FREE
              </p>
              <p className={`${darkMode ? 'text-green-200/70' : 'text-green-800'}`}>
                Every job listing is completely free for the first week
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-100 shadow-lg'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
              }`}>
                <Clock className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                After Expiry
              </h3>
              <p className={`text-lg mb-4 ${
                darkMode ? 'text-orange-200' : 'text-gray-700'
              }`}>
                Optional paid extension
              </p>
              <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                No pay-per-application. No hidden fees. We sell visibility, not access.
              </p>
            </div>
          </div>

          <div className={`p-6 rounded-xl border inline-block ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-orange-50 border-orange-200'
          }`}>
            <p className={`flex items-center gap-2 ${
              darkMode ? 'text-orange-200' : 'text-orange-900'
            }`}>
              <Shield className="w-5 h-5" />
              <strong>No catch. No upsells.</strong> Just honest pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Trust & Safety
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Mail,
                title: 'Verified Emails',
                description: 'All listings must have verifiable official email addresses'
              },
              {
                icon: Shield,
                title: 'Quality Control',
                description: 'Fake or bounced emails are removed immediately'
              },
              {
                icon: Ban,
                title: 'Zero Tolerance',
                description: 'Repeated abuse results in permanent listing bans'
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border text-center ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <item.icon className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={`py-20 px-4 relative overflow-hidden ${
        darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF4EC]'
      }`}>
        <div className={`absolute inset-0 ${
          darkMode
            ? 'bg-linear-to-br from-orange-900/30 via-red-900/20 to-transparent'
            : 'bg-linear-to-br from-orange-100 via-red-50 to-transparent'
        }`}></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border backdrop-blur ${
            darkMode
              ? 'bg-orange-900/30 border-orange-700/40 text-orange-200'
              : 'bg-white/70 border-orange-200 text-orange-700'
          }`}>
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">Our Philosophy</span>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-8 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Most job platforms optimize for <span className="text-red-600">volume</span>.<br/>
            VartaLang optimizes for <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">clarity, honesty, and respect</span>.
          </h2>

          <div className={`text-xl mb-12 space-y-4 ${
            darkMode ? 'text-orange-200/80' : 'text-gray-700'
          }`}>
            <p>
              If a job is real, it deserves a real email.
            </p>
            <p>
              If a candidate is serious, they will write it.
            </p>
            <p className="font-bold">
              No false hope. No wasted effort. Just human connection.
            </p>
          </div>

          <Link
            href="/jobs/board"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-lg
            bg-linear-to-r from-orange-500 to-red-600 text-white
            hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Your Search
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-6 rounded-xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-start gap-3">
              <AlertCircle className={`w-5 h-5 mt-0.5 shrink-0 ${
                darkMode ? 'text-orange-400' : 'text-orange-600'
              }`} />
              <div className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                <strong>Disclaimer:</strong> VartaLang is not responsible for hiring decisions, communication outcomes, 
                or employment terms. All interactions occur directly between candidates and employers. We provide a 
                platform for visibility, not employment services.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-20"></div>
      <Footer />
    </div>
  );
}