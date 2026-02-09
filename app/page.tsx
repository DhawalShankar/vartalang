"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, MessageCircle, Target, Users, Globe, Shield, Sparkles, Star, Zap, TrendingUp, CheckCircle, Briefcase } from 'lucide-react';
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
            <span className="text-xs font-semibold">India's Language Bridge</span>
          </div>

          {/* Headline */}
          <h1 className={`text-4xl md:text-5xl font-bold mb-5 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Learn any Indian language by
            <br />
            <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              teaching yours to someone else
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            A platform where language exchange meets real opportunity. 
            Connect with native speakers, help each other learn, find language-specific jobs.
            <span className="font-semibold"> No bots. No gimmicks. Just real people.</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup" className="group px-8 py-4 rounded-full font-semibold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/about" className={`px-8 py-4 rounded-full font-medium text-base border transition-all hover:scale-105 ${
              darkMode 
                ? 'border-orange-800/50 text-orange-200 hover:bg-orange-900/20' 
                : 'border-orange-200 text-gray-700 hover:bg-orange-50'
            }`}>
              Learn More
            </Link>
          </div>

          {/* Early Community Note */}
          <div className="mt-10">
            <p className={`text-sm font-medium ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              <Zap className="w-4 h-4 inline mr-1" />
              Be among the first to join our growing community
            </p>
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

      {/* The Problem */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              The Language Barrier Is Real
            </h2>
            <p className={`text-base max-w-2xl mx-auto ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Millions of Indians miss opportunities because they don't speak the right language
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '💼',
                title: 'Job Opportunities Lost',
                desc: 'Can\'t apply for customer-facing roles in other states'
              },
              {
                emoji: '🛍️',
                title: 'Business Expansion Blocked',
                desc: 'Artisans and vendors stuck in one region'
              },
              {
                emoji: '🎓',
                title: 'Limited Learning Options',
                desc: 'Expensive tutors or ineffective apps are the only choices'
              }
            ].map((item, i) => (
              <div 
                key={i}
                className={`p-6 rounded-2xl border text-center transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What VartaLang Does */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              What VartaLang Can Do
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Built for real language exchange and opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: MessageCircle,
                title: 'Match with Language Exchange Partners',
                desc: 'Our algorithm connects you with native speakers who want to learn YOUR language. You teach them, they teach you.',
                capability: 'Smart matching based on languages, goals, and interests'
              },
              {
                icon: Shield,
                title: 'Safe, Filtered Conversations',
                desc: 'Every message is automatically filtered for profanity and inappropriate content. Block and report features built in.',
                capability: 'Real-time content moderation in 20+ languages'
              },
              {
                icon: Briefcase,
                title: 'Language-Specific Job Board',
                desc: 'Find opportunities where language skills are the primary requirement. Post jobs for free and reach motivated candidates.',
                capability: 'Direct employer-candidate connection'
              },
              {
                icon: Target,
                title: 'Personalized Match Scoring',
                desc: 'See exactly how compatible you are with each potential partner based on multiple factors.',
                capability: 'Transparent compatibility algorithm'
              },
              {
                icon: Users,
                title: 'Real-Time Chat & Status',
                desc: 'Know when your partners are online. See typing indicators. Have natural, flowing conversations.',
                capability: 'Built for genuine human connection'
              },
              {
                icon: Globe,
                title: 'Support for 14+ Indian Languages',
                desc: 'Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and more.',
                capability: 'Truly multilingual platform'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg hover:border-orange-200'
                }`}
              >
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
                <p className={`text-base leading-relaxed mb-3 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
                <p className={`text-xs font-medium ${darkMode ? 'text-orange-400/80' : 'text-orange-600/80'}`}>
                  ✓ {feature.capability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              How It Works
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Simple, transparent process
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                step: '1',
                title: 'Create Your Profile',
                desc: 'Tell us what languages you speak and want to learn. Add your interests and location.'
              },
              {
                step: '2',
                title: 'Get Matched',
                desc: 'Our algorithm finds the best partners for you based on language compatibility and mutual benefit.'
              },
              {
                step: '3',
                title: 'Start Conversations',
                desc: 'Send connection requests. Once accepted, start chatting and helping each other learn.'
              },
              {
                step: '4',
                title: 'Explore Opportunities',
                desc: 'Browse jobs where your language skills matter. Post opportunities if you\'re hiring.'
              }
            ].map((item, i) => (
              <div 
                key={i}
                className={`flex gap-5 p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                  darkMode 
                    ? 'bg-orange-500/20 text-orange-300' 
                    : 'bg-orange-100 text-orange-600'
                }`}>
                  {item.step}
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Why VartaLang Is Different
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Built with India's reality in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: 'Not a Language Learning App',
                desc: 'We don\'t teach grammar rules. We connect you with real people for practical conversation.',
                icon: '🚫📱'
              },
              {
                title: 'Not a Dating Platform',
                desc: 'Strict content filtering, clear intent, respectful community guidelines. Language learning only.',
                icon: '🛡️'
              },
              {
                title: 'Not Just for English Speakers',
                desc: 'Every Indian language is equal here. Learn Tamil, Gujarati, Bengali—whatever you need.',
                icon: '🇮🇳'
              },
              {
                title: 'Not Focused on Vanity Metrics',
                desc: 'We measure real connections made and actual learning progress, not likes or views.',
                icon: '📊'
              }
            ].map((item, i) => (
              <div 
                key={i}
                className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Building Message */}
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
              <TrendingUp className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              We Grow Together
            </h3>
            <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              VartaLang gets better with every person who joins. 
              <span className="font-semibold"> More users = better matches = more opportunities.</span>
            </p>
            <p className={`text-base ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              Your conversations help someone learn. Your job posts help someone earn. 
              Your participation builds something meaningful for millions of Indians.
            </p>
            <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-orange-800/30' : 'border-orange-100'}`}>
              <p className={`text-sm font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                Be part of building India's language bridge 🌉
              </p>
            </div>
          </div>
        </div>
      </section>

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
              Start your language journey today
            </span>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Ready to break the
            <br />
            language barrier?
          </h2>

          <p className={`text-lg mb-8 max-w-xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Join VartaLang and connect with people who can help you learn 
            the language you need for your next opportunity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all">
              Create Your Profile
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/jobs" className={`inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base border transition-all hover:scale-105 ${
              darkMode 
                ? 'border-orange-700/50 text-orange-200 hover:bg-orange-900/20' 
                : 'border-orange-300 text-gray-700 hover:bg-white'
            }`}>
              <Briefcase className="w-5 h-5" />
              Explore Jobs
            </Link>
          </div>

          <p className={`text-sm mt-6 ${darkMode ? 'text-orange-300/60' : 'text-gray-500'}`}>
            Takes 2 minutes to set up. Start connecting immediately.
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