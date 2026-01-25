"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, MessageCircle, Target, BookOpen, Users, Globe, Shield, Sparkles, Star, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';
export default function VartaLangLanding() {
   const { darkMode } = useDarkMode(); // Use context
    
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
      
      {/* Use Common Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className=" pt-40 pb-8 px-4 relative overflow-hidden">
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
            Learn languages by connecting with
            <br />
            <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              real people across India
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            A peaceful, respectful space where you learn by teaching. 
            Match with native speakers, exchange languages, and grow together — 
            <span className="font-semibold"> no bots, no games, just human connection.</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup" className="group px-8 py-4 rounded-full font-semibold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2">
              Join Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button className={`px-8 py-4 rounded-full font-medium text-base border transition-all hover:scale-105 ${
              darkMode 
                ? 'border-orange-800/50 text-orange-200 hover:bg-orange-900/20' 
                : 'border-orange-200 text-gray-700 hover:bg-orange-50'
            }`}>
              How it works
            </button>
          </div>

          {/* Trust Indicator */}
          <div className="mt-10 flex justify-center items-center gap-3">
            <div className="flex -space-x-2">
              {[1,2,3].map((i) => (
                <div key={i} className={`w-9 h-9 rounded-full border-2 bg-linear-to-br from-orange-400 to-red-500 ${
                      darkMode ? 'border-[#1a1410]' : 'border-white'
                    }`}></div>
              ))}
            </div>
            <span className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
              Learners are waiting!
            </span>
          </div>
        </div>
      </section>

      {/* Languages Ticker */}
      <section className={`py-6 overflow-hidden border-y ${darkMode ? 'border-orange-900/30' : 'border-orange-100'}`}>
        <div className="flex animate-scroll whitespace-nowrap">
          {[...languages, ...languages, ...languages].map((lang, i) => (
            <div
              key={i}
              className={`inline-flex items-center mx-3 px-4 py-2 rounded-full border text-sm font-medium transition-all hover:scale-105 ${
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

      {/* What You Can Do */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              What you can do on VartaLang
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Simple. Human. Safe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: MessageCircle,
                title: 'Learn Any Indian Language Naturally',
                desc: 'Practice with real people — Hindi, Tamil, English, Telugu, Bengali, or any mother tongue.',
              },
              {
                icon: Heart,
                title: 'Teach Your Own Language',
                desc: 'Make someone confident in your language, and learn theirs in return.',
              },
              {
                icon: Target,
                title: 'Smart Partner Matching',
                desc: 'We match you based on languages, goals, interests, comfort, and learning level. No randomness.',
              },
              {
                icon: BookOpen,
                title: 'Curated Learning Resources',
                desc: 'Best YouTube channels, playlists, and structured guides — beginner to advanced.',
              },
              {
                icon: Shield,
                title: 'Zero-Tolerance Safety',
                desc: 'Our filters block vulgarity and abuse before it reaches you. Respect is our foundation.',
              },
              {
                icon: Users,
                title: 'Respectful Community',
                desc: 'Not a dating app. Just real people learning with humility and cultural awareness.',
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
                <p className={`text-base leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why VartaLang */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Why VartaLang?
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Because India needs a space that is different
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Shield, text: 'Safe' },
              { icon: Star, text: 'Pure' },
              { icon: CheckCircle, text: 'Useful' },
              { icon: Heart, text: 'Culture-friendly' },
              { icon: Users, text: 'Respect-based' },
              { icon: Globe, text: 'Not a dating app' }
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

      {/* Vision Statement */}
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
              <Sparkles className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Our Vision
            </h3>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              To become <span className="font-semibold">India's Language Bridge</span> — 
              a place where learners, travellers, students, creators, and everyday people 
              meet with respect to grow together.
            </p>
            <p className={`text-base mt-4 italic ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              One conversation, one connection, one language at a time. 🙏
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
{/* CTA Section */}
<section
  className={`py-24 px-4 relative overflow-hidden ${
    darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF4EC]'
  }`}
>
  {/* Soft Gradient Overlay */}
  <div
    className={`absolute inset-0 ${
      darkMode
        ? 'bg-linear-to-br from-orange-900/30 via-red-900/20 to-transparent'
        : 'bg-linear-to-br from-orange-100 via-red-50 to-transparent'
    }`}
  ></div>

  <div className="max-w-3xl mx-auto text-center relative z-10">
    {/* Badge */}
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border backdrop-blur ${
        darkMode
          ? 'bg-orange-900/30 border-orange-700/40 text-orange-200'
          : 'bg-white/70 border-orange-200 text-orange-700'
      }`}
    >
      <Heart className="w-4 h-4 fill-current" />
      <span className="text-sm font-semibold">
        Join our peaceful community
      </span>
    </div>

    {/* Heading */}
    <h2
      className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${
        darkMode ? 'text-orange-50' : 'text-gray-900'
      }`}
    >
      Welcome to VartaLang
    </h2>

    {/* Text */}
    <p
      className={`text-lg mb-8 max-w-xl mx-auto ${
        darkMode ? 'text-orange-200/80' : 'text-gray-600'
      }`}
    >
      A humble initiative to bring India closer.
      <br />
      Be among the first to experience respectful language exchange.
    </p>

    {/* CTA Button */}
    <Link
      href="/auth/signup"
      className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base
      bg-linear-to-r from-orange-500 to-red-600 text-white
      hover:shadow-xl hover:scale-105 transition-all"
    >
      Join Now
      <ArrowRight className="w-5 h-5" />
    </Link>
  </div>
</section>

      {/* Use Common Footer */}
      <Footer />

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 35s linear infinite;
        }
      `}</style>
    </div>
  );
}