"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, MessageCircle, Target, Users, Globe, Shield, Sparkles, Star, CheckCircle, Briefcase, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

export default function VartaLangLanding() {
  const { darkMode } = useDarkMode();
    
  const languages = [
    'Hindi • हिंदी',
    'Tamil • தமிழ்',
    'Telugu • తెలుగు',
    'Kannada • ಕನ್ನಡ',
    'Malayalam • മലയാളം',
    'Bengali • বাংলা',
    'Gujarati • ગુજરાતી',
    'Punjabi • ਪੰਜਾਬੀ',
    'Marathi • मराठी',
    'English'
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-8 px-4 relative overflow-hidden">
        {/* Warm Background Glow */}
        <div className={`absolute top-20 left-1/3 w-72 h-72 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/40'
        }`}></div>
        <div className={`absolute bottom-0 right-1/3 w-64 h-64 rounded-full blur-3xl ${
          darkMode ? 'bg-red-900/20' : 'bg-red-200/30'
        }`}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border ${
            darkMode 
              ? 'bg-orange-900/20 border-orange-800/40 text-orange-300' 
              : 'bg-orange-50 border-orange-200 text-orange-700'
          }`}>
            <Heart className="w-3 h-3 fill-current" />
            <span className="text-xs font-semibold">India's Language Bridge for Real Opportunity</span>
          </div>

          {/* Headline */}
          <h1 className={`text-4xl md:text-5xl font-bold mb-5 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Learn languages, find jobs,
            <br />
            <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              unlock income across India
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Connect with real people to learn languages for free. Find jobs where your language skills matter. 
            <span className="font-semibold"> No bots, no games—just real opportunities and human connection.</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup" className="group px-8 py-4 rounded-full font-semibold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2">
              Start Learning Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/jobs" className={`px-8 py-4 rounded-full font-medium text-base border transition-all hover:scale-105 inline-flex items-center gap-2 ${
              darkMode 
                ? 'border-orange-800/50 text-orange-200 hover:bg-orange-900/20' 
                : 'border-orange-200 text-gray-700 hover:bg-orange-50'
            }`}>
              <Briefcase className="w-4 h-4" />
              Browse Jobs
            </Link>
          </div>

          {/* Live Stats */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <div key={i} className={`w-9 h-9 rounded-full border-2 bg-linear-to-br from-orange-400 to-red-500 ${
                    darkMode ? 'border-[#1a1410]' : 'border-white'
                  }`}></div>
                ))}
              </div>
              <span className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
                Real learners online now
              </span>
            </div>
            <div className={`h-1 w-1 rounded-full ${darkMode ? 'bg-orange-700' : 'bg-orange-300'}`}></div>
            <div className="flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
                Jobs posted this week
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Ticker */}
      <section className={`py-6 overflow-hidden border-y ${darkMode ? 'border-orange-900/30' : 'border-orange-100'}`}>
        <div className="flex animate-scroll-desktop md:animate-scroll-desktop whitespace-nowrap">
          {[...languages, ...languages, ...languages, ...languages].map((lang, i) => (
            <div
              key={i}
              className={`inline-flex items-center mx-2 md:mx-3 px-3 md:px-4 py-2 rounded-full border text-xs md:text-sm font-medium transition-all hover:scale-105 ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/30 text-orange-200 hover:bg-orange-900/30' 
                  : 'bg-white border-orange-100 text-gray-700 hover:bg-orange-50'
              }`}
            >
              {lang}
            </div>
          ))}
        </div>
      </section>

      {/* The Reality Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              The Reality: Language is India's #1 Economic Barrier
            </h2>
            <p className={`text-base max-w-2xl mx-auto ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              400+ million Indians can't expand their income across state lines because of language
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                emoji: '🛍️',
                problem: 'A Kerala artisan can\'t sell to Delhi',
                reason: 'don\'t speak Hindi'
              },
              {
                emoji: '🏪',
                problem: 'A Bengali vendor can\'t work in Mumbai',
                reason: 'don\'t speak Marathi'
              },
              {
                emoji: '🎨',
                problem: 'A Tamil craftsperson can\'t access Gujarati markets',
                reason: `can't communicate the message clearly`
              }
            ].map((item, i) => (
              <div 
                key={i}
                className={`p-6 rounded-2xl border text-center ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <p className={`font-semibold mb-2 ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                  {item.problem}
                </p>
                <p className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                  because they {item.reason}
                </p>
              </div>
            ))}
          </div>

          <div className={`p-8 rounded-2xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-orange-50 border-orange-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              What doesn't work:
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { tool: 'Duolingo/Babbel', why: 'Teach coffee ordering, not business negotiation' },
                { tool: 'Expensive Tutors', why: '₹1,500-3,000/hour—unaffordable for 95% of India' },
                { tool: 'LinkedIn', why: 'Only helps English-speaking office workers' },
                { tool: 'Random YouTube', why: 'No practice partners or community' }
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-2 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                  <span className="text-red-500 font-bold">✗</span>
                  <div>
                    <span className="font-semibold">{item.tool}:</span> {item.why}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do Today */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              What you can do on VartaLang today
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Real features. Live now. Start today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: MessageCircle,
                title: 'Connect with Real Language Partners',
                desc: 'Match with native speakers who want to learn YOUR language. Teach each other for free—no subscriptions, no bots.',
                cta: 'Start chatting',
                link: '/matches',
                live: true
              },
              {
                icon: Briefcase,
                title: 'Find Jobs Where Language IS the Skill',
                desc: 'Customer service roles, sales positions, tourism guides, teaching opportunities—real jobs where your language abilities are the primary requirement.',
                cta: 'Browse jobs',
                link: '/jobs/board',
                live: true
              },
              {
                icon: Target,
                title: 'Smart Matching Algorithm',
                desc: 'We match you based on what you speak, what you need, location, and learning goals. See your top 10 best matches.',
                cta: 'See matches',
                link: '/matches',
                live: true
              },
              {
                icon: Users,
                title: 'Safe, Respectful Community',
                desc: 'Profanity filtering, instant blocking, zero tolerance for harassment. This is NOT a dating app.',
                cta: 'Join safely',
                link: '/auth/signup',
                live: true
              },
              {
                icon: Shield,
                title: 'Post Jobs for FREE (7 Days)',
                desc: 'Employers: Need Tamil-speaking staff? Gujarati helpers? Post free for a week, reach motivated candidates.',
                cta: 'Post a job',
                link: '/jobs/board',
                live: true
              },
              {
                icon: Sparkles,
                title: 'Premium Courses (Coming Soon)',
                desc: 'IELTS prep, embassy interviews, business language. We\'re building them based on YOUR feedback.',
                cta: 'Join waitlist',
                link: '/learn',
                live: false
              }
            ].map((feature, i) => (
              <Link 
                href={feature.link}
                key={i}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] block ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg hover:border-orange-200'
                }`}
              >
                {feature.live && (
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${
                    darkMode 
                      ? 'bg-green-900/30 text-green-300' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    ● LIVE
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-linear-to-br ${
                  darkMode 
                    ? 'from-orange-500/20 to-red-600/20' 
                    : 'from-orange-50 to-red-50'
                }`}>
                  <feature.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
                <span className={`text-sm font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {feature.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Growth Message */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`p-10 rounded-3xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-100 shadow-lg'
          }`}>
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-5 bg-linear-to-br ${
              darkMode 
                ? 'from-orange-500/20 to-red-600/20' 
                : 'from-orange-50 to-red-50'
            }`}>
              <Users className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              We Grow Because of YOU
            </h3>
            <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              VartaLang is <span className="font-semibold">community-powered</span>. 
              The more you chat, connect, post jobs, and help each other—the stronger we become.
            </p>
            <p className={`text-base ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              Every conversation you start makes someone's income opportunity possible. 
              Every job you post helps a family. Every language you teach unlocks a door.
            </p>
            <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-orange-800/30' : 'border-orange-100'}`}>
              <p className={`text-sm font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                🚀 More users = Better matches = More jobs = Real impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why VartaLang */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Why VartaLang is Different
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              We're not building for vanity metrics. We're building for real lives.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Shield, text: '100% Safe' },
              { icon: Heart, text: 'Community-First' },
              { icon: CheckCircle, text: 'Real Opportunities' },
              { icon: MessageCircle, text: 'Real People' },
              { icon: Users, text: 'Respectful Space' },
              { icon: Globe, text: 'Economic Impact' }
            ].map((value, i) => (
              <div 
                key={i} 
                className={`group flex flex-col items-center gap-3 p-5 rounded-xl border transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:bg-orange-50'
                }`}
              >
                <value.icon className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <span className={`text-base font-semibold text-center ${darkMode ? 'text-orange-100' : 'text-gray-800'}`}>
                  {value.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Real Stories, Real Impact
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "I matched with a Tamil speaker who needed Hindi. We video call twice a week. My conversational Tamil has improved significantly in 2 months.",
                name: "Rajesh K.",
                role: "Language Learner, Delhi"
              },
              {
                quote: "Posted a requirement for Malayalam-speaking customer service staff. Found 3 qualified candidates within a week through VartaLang.",
                name: "Priya M.",
                role: "Business Owner, Bangalore"
              }
            ].map((story, i) => (
              <div 
                key={i}
                className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <p className={`text-base italic mb-4 leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                  "{story.quote}"
                </p>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                    {story.name}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    {story.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className={`py-24 px-4 relative overflow-hidden ${
        darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF4EC]'
      }`}>
        <div className={`absolute inset-0 ${
          darkMode
            ? 'bg-linear-to-br from-orange-900/30 via-red-900/20 to-transparent'
            : 'bg-linear-to-br from-orange-100 via-red-50 to-transparent'
        }`}></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border backdrop-blur ${
            darkMode
              ? 'bg-orange-900/30 border-orange-700/40 text-orange-200'
              : 'bg-white/70 border-orange-200 text-orange-700'
          }`}>
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">
              Join India's fastest-growing language community
            </span>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Your next opportunity is
            <br />
            one conversation away
          </h2>

          <p className={`text-lg mb-8 max-w-xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Start learning. Find jobs. Connect with real people.
            <br />
            <span className="font-semibold">Join our growing community today.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all">
              Join Free Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/jobs/board" className={`inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base border transition-all hover:scale-105 ${
              darkMode 
                ? 'border-orange-700/50 text-orange-200 hover:bg-orange-900/20' 
                : 'border-orange-300 text-gray-700 hover:bg-white'
            }`}>
              <Briefcase className="w-5 h-5" />
              Browse Jobs
            </Link>
          </div>

          <p className={`text-sm mt-6 ${darkMode ? 'text-orange-300/60' : 'text-gray-500'}`}>
            Get started today. Core features available at no cost.
          </p>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes scroll-mobile {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-desktop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-mobile {
          animation: scroll-mobile 20s linear infinite;
        }
        .animate-scroll-desktop {
          animation: scroll-desktop 35s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-scroll-desktop {
            animation: scroll-mobile 20s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}