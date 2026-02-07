"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Users, 
  Shield, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  Target,
  Globe,
  MessageCircle,
  Award,
  TrendingUp,
  Zap,
  Check,
  Quote,
  Layers,
  Lock,
  Feather
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

export default function AboutPage() {
  const { darkMode } = useDarkMode();
  const [scrollY, setScrollY] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate active timeline based on scroll position
      const timelineSection = document.getElementById('timeline-section');
      if (timelineSection) {
        const rect = timelineSection.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
        setActiveTimeline(Math.floor(progress * 4));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '12M+', label: 'Active Learners', icon: Users },
    { value: '14', label: 'Languages', icon: Globe },
    { value: '98%', label: 'Safety Score', icon: Shield },
    { value: '2.5K+', label: 'Resources', icon: BookOpen }
  ];

  const timeline = [
    {
      year: '1982',
      title: 'Foundation of Tradition',
      subtitle: 'Cosmo India Prakashan established',
      description: 'Four decades of preserving Indian knowledge, literature, and cultural wisdom through publishing.',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-500'
    },
    {
      year: '2020',
      title: 'Digital Awakening',
      subtitle: 'Research & ideation begins',
      description: 'Recognized the linguistic friction holding back millions across India. Language wasn\'t just education—it was employment, mobility, and connection.',
      icon: Sparkles,
      color: 'from-orange-500 to-red-500'
    },
    {
      year: '2023',
      title: 'VartaLang Born',
      subtitle: 'Platform development',
      description: 'Built on respect, safety, and real human connections. Not entertainment. Not just textbooks. A bridge between cultures.',
      icon: Heart,
      color: 'from-red-500 to-pink-500'
    },
    {
      year: '2024',
      title: 'India\'s Language Bridge',
      subtitle: 'Growing organically',
      description: 'Thousands learning daily through real conversations. Every connection strengthens our linguistic fabric.',
      icon: TrendingUp,
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const principles = [
    {
      icon: Target,
      title: 'Functional, Not Decorative',
      desc: 'Language is a capability that enables employment, mobility, and real-world operation—not just academic study.'
    },
    {
      icon: MessageCircle,
      title: 'Practice Over Theory',
      desc: 'Learning happens through conversation, mistakes, and real usage—not memorization or exams.'
    },
    {
      icon: Shield,
      title: 'Safety is Foundation',
      desc: 'Respect isn\'t a feature—it\'s the bedrock. Zero tolerance for harassment, vulgarity, or exploitation.'
    },
    {
      icon: Users,
      title: 'Human-First Technology',
      desc: 'Algorithms serve people, not vice versa. We match based on compatibility, not engagement metrics.'
    },
    {
      icon: Layers,
      title: 'Sustained Usefulness',
      desc: 'We prioritize lasting value over viral growth. Depth matters more than speed.'
    },
    {
      icon: Globe,
      title: 'Cultural Continuity',
      desc: 'Preserving India\'s linguistic diversity by making languages alive, accessible, and practical.'
    }
  ];

  const differentiators = [
    {
      badge: 'Not a Dating App',
      title: 'Pure Language Exchange',
      points: [
        'No swiping, no flirting features',
        'Profile verification required',
        'Behavior monitoring & moderation',
        'Cultural sensitivity training'
      ]
    },
    {
      badge: 'Not Entertainment',
      title: 'Real Skill Building',
      points: [
        'Goal-oriented matching',
        'Progress tracking',
        'Curated learning resources',
        'Professional use cases'
      ]
    },
    {
      badge: 'Not a Classroom',
      title: 'Living Language',
      points: [
        'Real conversations, not lectures',
        'Native speaker practice',
        'Context-based learning',
        'Mistakes welcomed'
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      
      <Navbar />

      {/* Hero Section with Animated Dots */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background Dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                darkMode ? 'bg-orange-500/20' : 'bg-orange-300/30'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Gradient Orbs */}
        <div 
          className={`absolute top-20 right-1/4 w-96 h-96 rounded-full blur-3xl transition-transform duration-1000 ${
            darkMode ? 'bg-orange-900/20' : 'bg-orange-200/40'
          }`}
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className={`absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl transition-transform duration-1000 ${
            darkMode ? 'bg-red-900/20' : 'bg-red-200/40'
          }`}
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        ></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Animated Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border animate-pulse ${
            darkMode 
              ? 'bg-orange-900/30 border-orange-700/40 text-orange-300' 
              : 'bg-orange-100 border-orange-300 text-orange-700'
          }`}>
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">India's Language Bridge</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            We don't teach languages.
            <br />
            <span className={`bg-linear-to-r ${
              darkMode ? 'from-orange-400 to-red-400' : 'from-orange-600 to-red-600'
            } bg-clip-text text-transparent`}>
              We connect speakers.
            </span>
          </h1>

          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            VartaLang is where language becomes a <span className="font-bold">living capability</span>—
            enabling employment, mobility, and meaningful human connection across India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup" className="group px-8 py-4 rounded-full font-semibold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl transition-all hover:scale-105 inline-flex items-center justify-center gap-2">
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/learn" className={`px-8 py-4 rounded-full font-medium text-base border transition-all hover:scale-105 inline-flex items-center justify-center gap-2 ${
              darkMode 
                ? 'border-orange-700/50 text-orange-200 hover:bg-orange-900/20' 
                : 'border-orange-300 text-gray-700 hover:bg-orange-50'
            }`}>
              Explore Languages
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={`py-12 px-4 border-y ${darkMode ? 'border-orange-900/30 bg-orange-900/5' : 'border-orange-200 bg-orange-50/50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3 transition-transform group-hover:scale-110 ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' 
                    : 'bg-linear-to-br from-orange-100 to-red-100'
                }`}>
                  <stat.icon className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <p className={`text-3xl md:text-4xl font-bold mb-1 ${
                  darkMode ? 'text-orange-100' : 'text-gray-900'
                }`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              The Real Problem
            </h2>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              India's language barrier isn't about vocabulary
            </p>
          </div>

          <div className={`relative p-10 md:p-12 rounded-3xl border overflow-hidden ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/10 border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-200'
          }`}>
            <Quote className={`absolute top-6 left-6 w-12 h-12 opacity-10 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`} />

            <div className="space-y-6 relative z-10">
              <div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  darkMode ? 'text-orange-100' : 'text-gray-900'
                }`}>
                  People understand languages.
                </h3>
                <p className={`text-lg leading-relaxed ${
                  darkMode ? 'text-orange-200/80' : 'text-gray-600'
                }`}>
                  They just lack safe environments to practice. No space where mistakes are acceptable. 
                  No real conversations. No confidence.
                </p>
              </div>

              <div className={`h-px w-full ${darkMode ? 'bg-orange-700/40' : 'bg-orange-200'}`}></div>

              <div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  darkMode ? 'text-orange-100' : 'text-gray-900'
                }`}>
                  Current solutions fail.
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl ${
                    darkMode ? 'bg-orange-900/20' : 'bg-white'
                  }`}>
                    <p className={`font-semibold mb-2 ${
                      darkMode ? 'text-red-300' : 'text-red-600'
                    }`}>
                      ❌ Exam-Centric Learning
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                      Grammar memorization without real usage
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    darkMode ? 'bg-orange-900/20' : 'bg-white'
                  }`}>
                    <p className={`font-semibold mb-2 ${
                      darkMode ? 'text-red-300' : 'text-red-600'
                    }`}>
                      ❌ Gamified Apps
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                      Engagement over actual fluency
                    </p>
                  </div>
                </div>
              </div>

              <div className={`h-px w-full ${darkMode ? 'bg-orange-700/40' : 'bg-orange-200'}`}></div>

              <div>
                <h3 className={`text-2xl font-bold mb-3 bg-linear-to-r ${
                  darkMode ? 'from-orange-400 to-red-400' : 'from-orange-600 to-red-600'
                } bg-clip-text text-transparent`}>
                  VartaLang's Approach
                </h3>
                <p className={`text-lg leading-relaxed ${
                  darkMode ? 'text-orange-200/80' : 'text-gray-600'
                }`}>
                  Real conversations with native speakers. Safe practice environments. 
                  Language as a <span className="font-bold">functional capability</span>—not entertainment, not exams.
                </p>
              </div>
            </div>

            <Quote className={`absolute bottom-6 right-6 w-12 h-12 opacity-10 rotate-180 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`} />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline-section" className={`py-20 px-4 ${
        darkMode ? 'bg-linear-to-b from-transparent via-orange-900/5 to-transparent' : 'bg-linear-to-b from-transparent via-orange-50/50 to-transparent'
      }`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              Our Journey
            </h2>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              From traditional publishing to digital language bridge
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${
              darkMode ? 'bg-orange-800/30' : 'bg-orange-200'
            }`}>
              {/* Progress Line */}
              <div 
                className={`absolute top-0 left-0 w-full bg-linear-to-b ${
                  darkMode ? 'from-orange-500 to-red-600' : 'from-orange-500 to-red-600'
                } transition-all duration-500`}
                style={{ height: `${(activeTimeline / timeline.length) * 100}%` }}
              ></div>
            </div>

            {timeline.map((item, i) => (
              <div 
                key={i} 
                className={`relative mb-16 md:mb-20 ${
                  i % 2 === 0 ? 'md:pr-[50%] md:pl-0' : 'md:pl-[50%] md:pr-0'
                } pl-20 md:pl-${i % 2 === 0 ? '0' : '[50%]'} transition-all duration-500 ${
                  i <= activeTimeline ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'
                }`}
              >
                {/* Year Badge */}
                <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                  i <= activeTimeline
                    ? `bg-linear-to-br ${item.color} text-white border-white ${darkMode ? 'shadow-lg' : 'shadow-xl'} scale-110`
                    : darkMode 
                      ? 'bg-orange-900/20 text-orange-400 border-[#1a1410]' 
                      : 'bg-white text-gray-400 border-[#FFF9F5]'
                }`}>
                  <item.icon className="w-7 h-7" />
                </div>

                {/* Content Card */}
                <div className={`${
                  i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                } p-6 md:p-8 rounded-2xl border transition-all duration-500 hover:scale-105 ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-900/20 to-red-900/10 border-orange-800/30 hover:border-orange-700/50' 
                    : 'bg-white border-orange-200 hover:shadow-xl'
                }`}>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                    i <= activeTimeline
                      ? `bg-linear-to-r ${item.color} text-white`
                      : darkMode 
                        ? 'bg-orange-900/30 text-orange-400' 
                        : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.year}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${
                    darkMode ? 'text-orange-50' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm font-semibold mb-3 ${
                    darkMode ? 'text-orange-300' : 'text-orange-600'
                  }`}>
                    {item.subtitle}
                  </p>
                  <p className={`text-base leading-relaxed ${
                    darkMode ? 'text-orange-200/80' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              What Makes Us Different
            </h2>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              We're intentionally not like other platforms
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {differentiators.map((diff, i) => (
              <div 
                key={i}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-900/20 to-red-900/10 border-orange-800/30 hover:border-orange-700/50' 
                    : 'bg-linear-to-br from-white to-orange-50 border-orange-200 hover:shadow-2xl'
                }`}
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                  darkMode 
                    ? 'bg-red-900/30 text-red-300' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  {diff.badge}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? 'text-orange-50' : 'text-gray-900'
                }`}>
                  {diff.title}
                </h3>
                <ul className="space-y-3">
                  {diff.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 mt-0.5 shrink-0 ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span className={`text-sm ${
                        darkMode ? 'text-orange-200/80' : 'text-gray-600'
                      }`}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className={`py-20 px-4 ${
        darkMode ? 'bg-linear-to-b from-transparent to-orange-900/10' : 'bg-linear-to-b from-transparent to-orange-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              Our Guiding Principles
            </h2>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              The foundation of everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, i) => (
              <div 
                key={i}
                className={`group p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-xl'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' 
                    : 'bg-linear-to-br from-orange-100 to-red-100'
                }`}>
                  <principle.icon className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${
                  darkMode ? 'text-orange-50' : 'text-gray-900'
                }`}>
                  {principle.title}
                </h3>
                <p className={`text-base leading-relaxed ${
                  darkMode ? 'text-orange-200/70' : 'text-gray-600'
                }`}>
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Vision */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-10 md:p-12 rounded-3xl border ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/10 border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-200 shadow-xl'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-500/30 to-red-600/30' 
                  : 'bg-linear-to-br from-orange-200 to-red-200'
              }`}>
                <Feather className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  darkMode ? 'text-orange-50' : 'text-gray-900'
                }`}>
                  From the Founder
                </h3>
                <p className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                  Dhawal Shukla, Co-Founder & CEO
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-orange-100' : 'text-gray-800'
              }`}>
                "I didn't build VartaLang as an engineer. I built it as an Indian who's seen the cost of linguistic friction—
                lost jobs, missed connections, cultural isolation."
              </p>
              
              <p className={`text-base leading-relaxed ${
                darkMode ? 'text-orange-200/80' : 'text-gray-600'
              }`}>
                This platform exists because language is more than words. It's employment. It's mobility. 
                It's the ability to operate in the real world with dignity and confidence.
              </p>

              <p className={`text-base leading-relaxed ${
                darkMode ? 'text-orange-200/80' : 'text-gray-600'
              }`}>
                We're not chasing viral growth. We're building sustained usefulness. 
                Every conversation on VartaLang is a small repair in India's linguistic fabric.
              </p>

              <div className={`pt-6 mt-6 border-t ${darkMode ? 'border-orange-700/40' : 'border-orange-200'}`}>
                <p className={`text-lg font-semibold italic ${
                  darkMode ? 'text-orange-300' : 'text-orange-700'
                }`}>
                  "Language isn't sentiment. It's capability—and capability strengthens through use."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          darkMode
            ? 'bg-linear-to-br from-orange-900/30 via-red-900/20 to-transparent'
            : 'bg-linear-to-br from-orange-100 via-red-50 to-transparent'
        }`}></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
            darkMode 
              ? 'bg-linear-to-br from-orange-500/30 to-red-600/30' 
              : 'bg-linear-to-br from-orange-200 to-red-200'
          }`}>
            <Heart className={`w-10 h-10 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Ready to bridge languages?
          </h2>

          <p className={`text-xl mb-8 max-w-2xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Join thousands learning through real conversations. 
            Safe. Respectful. Effective.
          </p>

          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-semibold text-lg
            bg-linear-to-r from-orange-500 to-red-600 text-white
            hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Your Journey
            <ArrowRight className="w-6 h-6" />
          </Link>

          <p className={`mt-6 text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
            Free to join • No credit card • 98% safety score
          </p>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}