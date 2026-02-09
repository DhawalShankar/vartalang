"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, MessageCircle, Target, Users, Globe, Shield, Sparkles, BookOpen, Zap, TrendingUp, CheckCircle, Briefcase, GraduationCap, Mic, Book, Award, UserPlus, Building2 } from 'lucide-react';
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
            <span className="text-xs font-semibold">India's Inclusive Language Learning Ecosystem</span>
          </div>

          {/* Headline */}
          <h1 className={`text-4xl md:text-5xl font-bold mb-5 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Learn languages through
            <br />
            <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              literature, conversation & community
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
           The language bridge India needs. Connecting learners with creators, knowledge with accessibility, tradition with opportunity—for every Indian, including our specially-abled community.
            <span className="font-semibold"> VartaLang: Bridging India, one language at a time.</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup" className="group px-8 py-4 rounded-full font-semibold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2">
              Join as Learner
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/teachers" className={`px-8 py-4 rounded-full font-medium text-base border transition-all hover:scale-105 inline-flex items-center gap-2 ${
              darkMode 
                ? 'border-orange-800/50 text-orange-200 hover:bg-orange-900/20' 
                : 'border-orange-200 text-gray-700 hover:bg-orange-50'
            }`}>
              <GraduationCap className="w-4 h-4" />
              Join as Teacher
            </Link>
          </div>

          {/* Multi-audience Note */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <p className={`text-sm font-medium ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              Open to: Students • Teachers • Language Coaches • Content Creators • Publishers • Government Institutes
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

      {/* For Different Audiences */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Who VartaLang Is For
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Everyone has a place here
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Language Learners',
                desc: 'Find practice partners, access courses, connect with native speakers across India.',
                cta: 'Start Learning',
                link: '/auth/signup'
              },
              {
                icon: GraduationCap,
                title: 'Teachers & Coaches',
                desc: 'Create courses, teach conversational language, earn from your expertise. We help you reach students.',
                cta: 'Become a Teacher',
                link: '/teachers'
              },
              {
                icon: Book,
                title: 'Content Creators & Authors',
                desc: 'Publish your language learning books, create literature-based courses. We provide the platform.',
                cta: 'Publish Content',
                link: '/teachers'
              },
              {
                icon: Briefcase,
                title: 'Workers & Job Seekers',
                desc: 'Find opportunities where language skills unlock income. Post jobs where language is the requirement.',
                cta: 'Browse Jobs',
                link: '/jobs'
              },
              {
                icon: Building2,
                title: 'Government Institutes',
                desc: 'Collaborate with us to bring quality language education to more people. Institutional partnerships welcome.',
                cta: 'Partner With Us',
                link: '/about'
              },
              {
                icon: Heart,
                title: 'Specially-Abled Community',
                desc: 'Braille scripts, inclusive design, accessible learning. We\'re building for everyone, truly.',
                cta: 'Learn More',
                link: '/about'
              }
            ].map((audience, i) => (
              <Link
                href={audience.link}
                key={i}
                className={`group p-6 rounded-2xl border transition-all hover:scale-105 block ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-linear-to-br ${
                  darkMode 
                    ? 'from-orange-500/20 to-red-600/20' 
                    : 'from-orange-50 to-red-50'
                }`}>
                  <audience.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {audience.title}
                </h3>
                <p className={`text-base mb-4 leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {audience.desc}
                </p>
                <span className={`text-sm font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {audience.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's Live Now */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Available Right Now
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Start using these features today
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Target,
                title: 'Smart Language Matching',
                desc: 'Our algorithm finds the best practice partners for you based on language compatibility and mutual benefit.',
                status: 'Live',
                link: '/matches'
              },
              {
                icon: MessageCircle,
                title: 'Real-Time Conversations',
                desc: 'Chat with your language partners. Practice naturally through conversation.',
                status: 'Live',
                link: '/chats'
              },
              {
                icon: Briefcase,
                title: 'Language-Specific Jobs',
                desc: 'Browse and post opportunities where language skills are the primary requirement. Free for 7 days.',
                status: 'Live',
                link: '/jobs'
              },
              {
                icon: Shield,
                title: 'Safe Community Features',
                desc: 'Block and report tools to maintain a respectful learning environment.',
                status: 'Live',
                link: '/auth/signup'
              }
            ].map((feature, i) => (
              <Link
                href={feature.link}
                key={i}
                className={`group relative p-6 rounded-2xl border transition-all hover:scale-[1.02] block ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg'
                }`}
              >
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${
                  darkMode 
                    ? 'bg-green-900/30 text-green-300' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  ● {feature.status}
                </div>
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
                <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon - LMS */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border ${
              darkMode 
                ? 'bg-orange-900/20 border-orange-800/40 text-orange-300' 
                : 'bg-orange-50 border-orange-200 text-orange-700'
            }`}>
              <Sparkles className="w-3 h-3" />
              <span className="text-xs font-semibold">Building Now</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Coming Soon: Complete Learning Platform
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              We're building the infrastructure. You can help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: BookOpen,
                title: 'Structured Courses',
                desc: 'Learn languages through literature and structured curriculum. Beginner to advanced levels.',
                invite: 'Teachers: Create courses and earn'
              },
              {
                icon: Mic,
                title: 'Conversational Practice Modules',
                desc: 'Guided practice sessions with real-life scenarios. Learn how people actually speak.',
                invite: 'Language coaches: Join our platform'
              },
              {
                icon: Book,
                title: 'Publishing Platform',
                desc: 'Get your language learning books published and reach thousands of learners.',
                invite: 'Authors: Submit your manuscripts'
              },
              {
                icon: Award,
                title: 'Certification Programs',
                desc: 'Earn recognized certificates for your language proficiency.',
                invite: 'Institutes: Partner for accreditation'
              }
            ].map((coming, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-linear-to-br ${
                  darkMode 
                    ? 'from-orange-500/20 to-red-600/20' 
                    : 'from-orange-50 to-red-50'
                }`}>
                  <coming.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {coming.title}
                </h3>
                <p className={`text-base mb-3 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {coming.desc}
                </p>
                <div className={`pt-3 border-t ${darkMode ? 'border-orange-800/30' : 'border-orange-100'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    💡 {coming.invite}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              href="/teachers"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border transition-all hover:scale-105 ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/50 text-orange-200 hover:bg-orange-900/30' 
                  : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              Register Your Interest as a Teacher/Creator
            </Link>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Language Through Literature
            </h2>
            <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Our core belief
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-100'
          }`}>
            <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              We believe the best way to learn a language is through its <span className="font-semibold">literature, stories, and culture</span>. 
              Not just grammar rules and vocabulary lists.
            </p>
            <p className={`text-base leading-relaxed mb-6 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              When you read Tamil poetry, Hindi short stories, Bengali novels—you don't just learn words. 
              You understand how people think, feel, and express themselves in that language.
            </p>
            <div className={`p-5 rounded-2xl border ${
              darkMode 
                ? 'bg-orange-900/20 border-orange-800/30' 
                : 'bg-orange-50 border-orange-200'
            }`}>
              <p className={`text-base italic ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                "That's why we're inviting language teachers, literature experts, and content creators 
                to help us build courses that actually work. Courses that teach language the way it should be taught."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inclusivity Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
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
              <Globe className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Truly Inclusive Learning
            </h3>
            <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              We're building support for <span className="font-semibold">Braille scripts</span> and other accessibility features 
              so that specially-abled individuals can learn languages without barriers.
            </p>
            <p className={`text-base ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              If you work with specially-abled communities or understand accessible education, 
              we want to collaborate with you.
            </p>
          </div>
        </div>
      </section>

      {/* Community Growth */}
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
              We Grow With Our Community
            </h3>
            <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              VartaLang gets stronger with every learner who joins, every teacher who contributes, 
              every conversation that happens.
            </p>
            <p className={`text-base ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              The more people use it, the better our matches become. 
              The more teachers create content, the richer our learning library grows.
            </p>
            <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-orange-800/30' : 'border-orange-100'}`}>
              <p className={`text-sm font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                🌉 Help us build India's language bridge—one conversation, one course, one connection at a time
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
              Join the movement
            </span>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Be part of something
            <br />
            meaningful
          </h2>

          <p className={`text-lg mb-8 max-w-xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Whether you're here to learn, teach, create, or collaborate—
            there's a place for you on VartaLang.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all">
              Join as Learner
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/teachers" className={`inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base border transition-all hover:scale-105 ${
              darkMode 
                ? 'border-orange-700/50 text-orange-200 hover:bg-orange-900/20' 
                : 'border-orange-300 text-gray-700 hover:bg-white'
            }`}>
              <GraduationCap className="w-5 h-5" />
              Join as Teacher
            </Link>
          </div>

          <p className={`text-sm mt-6 ${darkMode ? 'text-orange-300/60' : 'text-gray-500'}`}>
            Students • Teachers • Coaches • Authors • Institutes • Everyone Welcome
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