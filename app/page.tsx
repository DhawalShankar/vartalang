"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, MessageCircle, Target, Users, Globe, Shield, Sparkles, Briefcase, GraduationCap, TrendingUp, CheckCircle, Zap, User, Building2, IndianRupee, MapPin, Languages, Eye, Clock, Award, BarChart3, UserCheck, FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

export default function VartaLangLanding() {
  const { darkMode } = useDarkMode();
  
  const [activeMatchDemo, setActiveMatchDemo] = useState(0);
  const [activeChatDemo, setActiveChatDemo] = useState(0);
  const [activeJobDemo, setActiveJobDemo] = useState(0);
    
  const languages = [
    'Hindi • हिंदी',
    'Tamil • தமிழ்',
    'Telugu • తెలుగు',
    'Kannada • ಕನ್ನಡ',
    'Malayalam • മലയാളം',
    'Bengali • বাংলা',
    'Gujarati • ગુজરાતી',
    'Punjabi • ਪੰਜਾਬੀ',
    'Marathi • मराठी',
    'English'
  ];

  // Demo matches
  const matchDemos = [
    {
      user: "User 1",
      learns: "Tamil",
      teaches: "Hindi",
      location: "Mumbai",
      compatibility: 95
    },
    {
      user: "User 2",
      learns: "English",
      teaches: "Telugu",
      location: "Hyderabad",
      compatibility: 88
    },
    {
      user: "User 3",
      learns: "Hindi",
      teaches: "Malayalam",
      location: "Kochi",
      compatibility: 92
    }
  ];

  // Demo chat messages
  const chatDemos = [
    {
      partner: "User 1",
      language: "Learning Hindi",
      messages: [
        { from: "them", text: "नमस्ते! कैसे हो?", translation: "(Hello! How are you?)" },
        { from: "you", text: "मैं ठीक हूँ! आप कैसे हैं?", translation: "(I'm fine! How are you?)" },
        { from: "them", text: "Great progress! Your Hindi is improving! 👏" }
      ]
    },
    {
      partner: "User 2",
      language: "Learning Tamil",
      messages: [
        { from: "them", text: "வணக்கம்! எப்படி இருக்கீங்க?", translation: "(Hello! How are you?)" },
        { from: "you", text: "நல்லாயிருக்கேன்!", translation: "(I'm fine!)" },
        { from: "them", text: "Excellent! Your pronunciation is getting better!" }
      ]
    },
    {
      partner: "User 3",
      language: "Learning Bengali",
      messages: [
        { from: "them", text: "আপনি কেমন আছেন?", translation: "(How are you?)" },
        { from: "you", text: "আমি ভালো আছি!", translation: "(I am fine!)" },
        { from: "them", text: "Perfect! Let's practice some new phrases today." }
      ]
    }
  ];

  // Demo jobs
  const jobDemos = [
    {
      title: "Hindi Content Writer",
      company: "TechCorp India",
      location: "Remote",
      language: "Hindi",
      salary: "₹25,000 - ₹40,000/month",
      type: "Full-time",
      views: 245
    },
    {
      title: "Tamil Translator",
      company: "Global Solutions",
      location: "Chennai",
      language: "Tamil",
      salary: "₹30,000 - ₹50,000/month",
      type: "Contract",
      views: 189
    },
    {
      title: "Telugu Customer Support",
      company: "E-Commerce Ltd",
      location: "Hyderabad",
      language: "Telugu",
      salary: "₹20,000 - ₹35,000/month",
      type: "Full-time",
      views: 312
    }
  ];

  // Rotate demos
  useEffect(() => {
    const matchInterval = setInterval(() => {
      setActiveMatchDemo((prev) => (prev + 1) % matchDemos.length);
    }, 3000);

    const chatInterval = setInterval(() => {
      setActiveChatDemo((prev) => (prev + 1) % chatDemos.length);
    }, 4000);

    const jobInterval = setInterval(() => {
      setActiveJobDemo((prev) => (prev + 1) % jobDemos.length);
    }, 3500);

    return () => {
      clearInterval(matchInterval);
      clearInterval(chatInterval);
      clearInterval(jobInterval);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      
      <Navbar />

      {/* Hero Section */}
      <section className="pt-37 pb-8 px-4 relative overflow-hidden">
        {/* Warm Background Glow */}
        <div className={`absolute top-10 left-1/3 w-64 h-64 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/40'
        }`}></div>
        <div className={`absolute bottom-0 right-1/3 w-56 h-56 rounded-full blur-3xl ${
          darkMode ? 'bg-red-900/20' : 'bg-red-200/30'
        }`}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Strong Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border ${
            darkMode 
              ? 'bg-orange-900/20 border-orange-800/40 text-orange-300' 
              : 'bg-orange-50 border-orange-200 text-orange-700'
          }`}>
            <Shield className="w-3 h-3" />
            <span className="text-xs font-bold">A Nation-Building Movement</span>
          </div>

          {/* Power Headline */}
          <h1 className={`text-3xl md:text-5xl font-black mb-4 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Indian Languages
            <br />
            <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              Deserve Better
            </span>
          </h1>

          {/* Government Stats */}
          <div className={`max-w-2xl mx-auto mb-5 p-4 rounded-xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-200 shadow-lg'
          }`}>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-black mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  22
                </div>
                <div className={`text-xs font-semibold ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Official Languages
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-black mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  121
                </div>
                <div className={`text-xs font-semibold ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Languages Spoken
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-black mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  43%
                </div>
                <div className={`text-xs font-semibold ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Don't Speak Hindi
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <p className={`text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-700'
          }`}>
            While English dominates digital India, <span className="font-bold">millions can't access opportunities</span> because they don't speak the "right" language. 
            <span className={`font-bold ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}> VartaLang is changing that.</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
            <Link href="/auth/signup" className="group px-6 py-3 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2">
              Start Connecting Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/matches" className={`px-6 py-3 rounded-full font-semibold text-base border transition-all hover:scale-105 inline-flex items-center gap-2 ${
              darkMode 
                ? 'border-orange-800/50 text-orange-200 hover:bg-orange-900/20' 
                : 'border-orange-200 text-gray-700 hover:bg-orange-50'
            }`}>
              See How It Works
              <Target className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Indicator */}
          <p className={`text-xs ${darkMode ? 'text-orange-300/60' : 'text-gray-500'}`}>
            Free to use • No credit card required • Join thousands of learners
          </p>
        </div>
      </section>

      {/* Languages Ticker - MOVED UP */}
      <section className={`py-4 overflow-hidden border-y ${darkMode ? 'border-orange-900/30' : 'border-orange-100'}`}>
        <div className="flex animate-scroll-desktop whitespace-nowrap">
          {[...languages, ...languages, ...languages, ...languages].map((lang, i) => (
            <div
              key={i}
              className={`inline-flex items-center mx-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all hover:scale-105 ${
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
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-2xl md:text-3xl font-black mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              The Language Barrier Costs India
            </h2>
            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Real numbers. Real impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className={`p-5 rounded-xl border ${
              darkMode 
                ? 'bg-red-900/10 border-red-800/30' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className={`text-3xl font-black mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                74%
              </div>
              <h3 className={`text-base font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Indians Don't Speak English
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                Yet most jobs and opportunities are only in English. 
                <span className="font-semibold"> Millions are left behind.</span>
              </p>
              <div className={`mt-2 text-xs ${darkMode ? 'text-red-300/60' : 'text-red-700/60'}`}>
                Source: Census of India 2011
              </div>
            </div>

            <div className={`p-5 rounded-xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-orange-50 border-orange-200'
            }`}>
              <div className={`text-3xl font-black mb-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                57%
              </div>
              <h3 className={`text-base font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Don't Have Hindi as Mother Tongue
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                India is not monolingual. Regional languages need opportunities. 
                <span className="font-semibold"> Language shouldn't limit potential.</span>
              </p>
              <div className={`mt-2 text-xs ${darkMode ? 'text-orange-300/60' : 'text-orange-700/60'}`}>
                Source: Census of India 2011
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border text-center ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-200'
          }`}>
            <h3 className={`text-xl md:text-2xl font-black mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              VartaLang's Mission
            </h3>
            <p className={`text-base leading-relaxed max-w-2xl mx-auto ${darkMode ? 'text-orange-200/90' : 'text-gray-700'}`}>
              <span className="font-bold">Break the language barrier.</span> Enable Indians to learn languages, find practice partners, and access opportunities—
              <span className={`font-bold ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}> in their own languages.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Feature 1: MATCHES */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border ${
                darkMode 
                  ? 'bg-green-900/20 border-green-800/40 text-green-300' 
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}>
                <CheckCircle className="w-3 h-3" />
                <span className="text-xs font-bold">Live Now</span>
              </div>

              <h2 className={`text-2xl md:text-3xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Find Your Perfect
                <br />
                <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Language Partner
                </span>
              </h2>

              <p className={`text-base mb-5 leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                Our smart algorithm matches you with people who want to learn what you speak, 
                and teach what you want to learn. <span className="font-bold">Mutual benefit. Real conversations.</span>
              </p>

              <div className="space-y-3 mb-5">
                {[
                  'Match based on languages, level & location',
                  'Safe & verified community',
                  'Unlimited practice partners'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`p-0.5 rounded-full mt-0.5 ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                      <CheckCircle className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link 
                href="/matches"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
              >
                Find Matches Now
                <Target className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Demo Window */}
            <div className={`relative p-4 rounded-2xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-200 shadow-xl'
            }`}>
              <div className={`absolute -top-3 left-4 px-3 py-1 rounded-full font-bold text-xs ${
                darkMode 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-orange-600 text-white'
              }`}>
                Live Preview
              </div>

              <div className={`p-4 rounded-xl border mb-3 ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/30' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {matchDemos[activeMatchDemo].user.charAt(matchDemos[activeMatchDemo].user.length - 1)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {matchDemos[activeMatchDemo].user}
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {matchDemos[activeMatchDemo].location}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                  }`}>
                    {matchDemos[activeMatchDemo].compatibility}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-orange-900/30' : 'bg-white'}`}>
                    <div className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                      They Teach
                    </div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                      {matchDemos[activeMatchDemo].teaches}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-orange-900/30' : 'bg-white'}`}>
                    <div className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                      They Learn
                    </div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                      {matchDemos[activeMatchDemo].learns}
                    </div>
                  </div>
                </div>

                <button className={`w-full py-2 rounded-lg font-bold text-sm ${
                  darkMode 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                } transition-all`}>
                  Connect Now
                </button>
              </div>

              <div className="flex gap-1.5 justify-center">
                {matchDemos.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === activeMatchDemo 
                        ? 'w-6 bg-orange-500' 
                        : darkMode ? 'w-1 bg-orange-800/30' : 'w-1 bg-orange-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: CHATS */}
      <section className={`py-12 px-4 ${darkMode ? 'bg-[#221812]' : 'bg-orange-50/50'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Demo Window */}
            <div className={`relative p-4 rounded-2xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-200 shadow-xl'
            }`}>
              <div className={`absolute -top-3 left-4 px-3 py-1 rounded-full font-bold text-xs ${
                darkMode 
                  ? 'bg-green-500 text-white' 
                  : 'bg-green-600 text-white'
              }`}>
                Real Conversations
              </div>

              {/* Chat Header */}
              <div className={`p-3 rounded-t-xl border-b ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/30' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {chatDemos[activeChatDemo].partner.charAt(chatDemos[activeChatDemo].partner.length - 1)}
                  </div>
                  <div className="flex-1">
                    <div className={`font-bold text-sm ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {chatDemos[activeChatDemo].partner}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      ● Online
                    </div>
                  </div>
                  <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {chatDemos[activeChatDemo].language}
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-3 space-y-2 min-h-50">
                {chatDemos[activeChatDemo].messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.from === 'you'
                        ? darkMode 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-orange-600 text-white'
                        : darkMode
                          ? 'bg-orange-900/30 text-orange-100'
                          : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="font-medium mb-0.5">{msg.text}</div>
                      {msg.translation && (
                        <div className={`text-xs opacity-70 italic`}>
                          {msg.translation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className={`p-2 rounded-b-xl border-t ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/30' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type message..."
                    disabled
                    className={`flex-1 px-3 py-1.5 rounded-lg text-sm ${
                      darkMode 
                        ? 'bg-orange-900/30 text-orange-200 placeholder-orange-400/50' 
                        : 'bg-white text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  <button className={`px-4 py-1.5 rounded-lg font-bold text-sm ${
                    darkMode ? 'bg-orange-500 text-white' : 'bg-orange-600 text-white'
                  }`}>
                    Send
                  </button>
                </div>
              </div>

              <div className="flex gap-1.5 justify-center mt-3">
                {chatDemos.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === activeChatDemo 
                        ? 'w-6 bg-orange-500' 
                        : darkMode ? 'w-1 bg-orange-800/30' : 'w-1 bg-orange-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border ${
                darkMode 
                  ? 'bg-green-900/20 border-green-800/40 text-green-300' 
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}>
                <CheckCircle className="w-3 h-3" />
                <span className="text-xs font-bold">Live Now</span>
              </div>

              <h2 className={`text-2xl md:text-3xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Practice Through
                <br />
                <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Real Conversations
                </span>
              </h2>

              <p className={`text-base mb-5 leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                No textbooks. No boring drills. Just real conversations with real people. 
                <span className="font-bold"> Learn by doing. Learn by talking.</span>
              </p>

              <div className="space-y-3 mb-5">
                {[
                  'Chat in your target language',
                  'Get instant feedback from native speakers',
                  'Build confidence through practice',
                  'Safe & moderated platform'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`p-0.5 rounded-full mt-0.5 ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                      <CheckCircle className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link 
                href="/chats"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
              >
                Start Chatting
                <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: JOBS */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border ${
                darkMode 
                  ? 'bg-green-900/20 border-green-800/40 text-green-300' 
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}>
                <CheckCircle className="w-3 h-3" />
                <span className="text-xs font-bold">Live Now</span>
              </div>

              <h2 className={`text-2xl md:text-3xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Turn Language Skills
                <br />
                <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Into Income
                </span>
              </h2>

              <p className={`text-base mb-5 leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                Your mother tongue is valuable. Browse jobs where Tamil, Telugu, Bengali, or any Indian language 
                is the primary requirement. <span className="font-bold">Language = Opportunity.</span>
              </p>

              <div className="space-y-3 mb-5">
                {[
                  'Translation & content writing',
                  'Customer support in regional languages',
                  'Teaching & tutoring positions',
                  'Free job posting for 7 days'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`p-0.5 rounded-full mt-0.5 ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                      <CheckCircle className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Link 
                  href="/jobs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
                >
                  Browse Jobs
                  <Briefcase className="w-4 h-4" />
                </Link>
                <Link 
                  href="/jobs?post=true"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base border hover:scale-105 transition-all ${
                    darkMode 
                      ? 'border-orange-800/50 text-orange-200 hover:bg-orange-900/20' 
                      : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  Post Job
                </Link>
              </div>
            </div>

            {/* Right: Demo Window */}
            <div className={`relative p-4 rounded-2xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-200 shadow-xl'
            }`}>
              <div className={`absolute -top-3 left-4 px-3 py-1 rounded-full font-bold text-xs ${
                darkMode 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-orange-600 text-white'
              }`}>
                Live Jobs
              </div>

              <div className={`p-4 rounded-xl border ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/30' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-start gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                    <Briefcase className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {jobDemos[activeJobDemo].title}
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                      {jobDemos[activeJobDemo].company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                  }`}>
                    <Languages className="w-3 h-3 inline mr-0.5" />
                    {jobDemos[activeJobDemo].language}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-white text-gray-700'
                  }`}>
                    <MapPin className="w-3 h-3 inline mr-0.5" />
                    {jobDemos[activeJobDemo].location}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-white text-gray-700'
                  }`}>
                    {jobDemos[activeJobDemo].type}
                  </span>
                </div>

                <div className={`p-3 rounded-lg mb-3 ${darkMode ? 'bg-orange-900/30' : 'bg-white'}`}>
                  <div className={`text-lg font-black mb-0.5 ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                    {jobDemos[activeJobDemo].salary}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    <Eye className="w-3 h-3 inline mr-0.5" />
                    {jobDemos[activeJobDemo].views} views
                  </div>
                </div>

                <button className={`w-full py-2 rounded-lg font-bold text-sm ${
                  darkMode 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                } transition-all`}>
                  View Details & Apply
                </button>
              </div>

              <div className="flex gap-1.5 justify-center mt-3">
                {jobDemos.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === activeJobDemo 
                        ? 'w-6 bg-orange-500' 
                        : darkMode ? 'w-1 bg-orange-800/30' : 'w-1 bg-orange-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LMS Coming Soon */}
      <section className={`py-12 px-4 ${darkMode ? 'bg-[#221812]' : 'bg-orange-50/50'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border ${
            darkMode 
              ? 'bg-blue-900/20 border-blue-800/40 text-blue-300' 
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            <Sparkles className="w-3 h-3" />
            <span className="text-xs font-bold">Under Development</span>
          </div>

          <h2 className={`text-2xl md:text-3xl font-black mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Complete Learning Platform
            <br />
            <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Coming Soon
            </span>
          </h2>

          <p className={`text-base mb-6 leading-relaxed max-w-xl mx-auto ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
            We're building a comprehensive LMS with structured courses, video lessons, quizzes, and certifications. 
            <span className="font-bold"> Language learning through literature and culture.</span>
          </p>

          <div className={`p-6 rounded-2xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-200 shadow-lg'
          }`}>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { icon: GraduationCap, text: 'Structured Courses' },
                { icon: Award, text: 'Certifications' },
                { icon: Users, text: 'Expert Teachers' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                    darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                  }`}>
                    <item.icon className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className={`text-xs font-bold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              While we build the LMS, you can still <span className="font-bold">find practice partners, chat, and explore job opportunities</span> on VartaLang today.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className={`p-8 rounded-2xl border text-center ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-200 shadow-lg'
          }`}>
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
              darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
            }`}>
              <Shield className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>

            <h3 className={`text-2xl md:text-3xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              This Is Nation Building
            </h3>

            <p className={`text-base leading-relaxed mb-4 ${darkMode ? 'text-orange-200/90' : 'text-gray-700'}`}>
              When a Tamil speaker can learn Hindi to access a job in Delhi, 
              when a Bengali speaker can teach their language to someone in Mumbai, 
              when language is no longer a barrier to opportunity—
              <span className={`font-bold ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}> that's when India truly progresses.</span>
            </p>

            <div className={`p-4 rounded-xl ${
              darkMode ? 'bg-orange-900/30' : 'bg-white'
            }`}>
              <p className={`text-base font-bold italic ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                "भारत की भाषाएँ, भारत की ताकत" 
                <br />
                <span className="text-sm font-medium">
                  India's Languages, India's Strength
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-16 px-4 relative overflow-hidden ${
        darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF4EC]'
      }`}>
        <div className={`absolute inset-0 ${
          darkMode
            ? 'bg-linear-to-br from-orange-900/30 via-red-900/20 to-transparent'
            : 'bg-linear-to-br from-orange-100 via-red-50 to-transparent'
        }`}></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className={`text-3xl md:text-4xl font-black mb-4 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Start Today.
            <br />
            <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              It's Completely Free.
            </span>
          </h2>

          <p className={`text-base mb-6 max-w-xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Join thousands of Indians breaking language barriers. 
            No credit card. No hidden fees. Just real connections and real opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link href="/auth/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black text-lg bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-2xl hover:scale-110 transition-all">
              Join VartaLang Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {[
              { icon: Target, text: 'Find Matches' },
              { icon: MessageCircle, text: 'Start Chatting' },
              { icon: Briefcase, text: 'Explore Jobs' }
            ].map((item, i) => (
              <div key={i} className={`p-3 rounded-lg ${
                darkMode ? 'bg-orange-900/20' : 'bg-white/70'
              }`}>
                <item.icon className={`w-6 h-6 mx-auto mb-1.5 ${
                  darkMode ? 'text-orange-400' : 'text-orange-600'
                }`} />
                <div className={`text-xs font-bold ${
                  darkMode ? 'text-orange-200' : 'text-gray-900'
                }`}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes scroll-desktop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-desktop {
          animation: scroll-desktop 40s linear infinite;
        }
      `}</style>
    </div>
  );
}