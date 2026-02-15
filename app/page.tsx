"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Target, Shield, Briefcase, CheckCircle, MapPin, Languages, Eye, Clock, FileText, Compass, BookOpen, Headphones, Lightbulb, TrendingUp, Globe, Award } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

export default function VartaLangLanding() {
  const { darkMode } = useDarkMode();
  
  const [activeMatchDemo, setActiveMatchDemo] = useState(0);
  const [activeChatDemo, setActiveChatDemo] = useState(0);
  const [activeJobDemo, setActiveJobDemo] = useState(0);
  const [activeRoleDemo, setActiveRoleDemo] = useState(0);
  const [activeArticle, setActiveArticle] = useState(0);
    
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
    'English',
    'ISL • Indian Sign Language',
    'Bharati Braille'
  ];

  const matchDemos = [
    {
      user: "Priya S.",
      teaches: "Tamil",
      learns: "Hindi",
      location: "Chennai"
    },
    {
      user: "Rahul K.",
      teaches: "Hindi",
      learns: "Telugu",
      location: "Hyderabad"
    },
    {
      user: "Anjali M.",
      teaches: "Malayalam",
      learns: "English",
      location: "Kochi"
    }
  ];

  const chatDemos = [
    {
      partner: "Priya S.",
      messages: [
        { from: "them", text: "नमस्ते! कैसे हो?" },
        { from: "you", text: "मैं ठीक हूँ! आप कैसे हैं?" },
        { from: "them", text: "बहुत अच्छा! चलो आज कुछ नया सीखते हैं।" }
      ]
    },
    {
      partner: "Rahul K.",
      messages: [
        { from: "them", text: "వణక్కం! ఎలా ఉన్నారు?" },
        { from: "you", text: "నేను బాగున్నాను!" },
        { from: "them", text: "Great! Let's practice some more phrases." }
      ]
    },
    {
      partner: "Anjali M.",
      messages: [
        { from: "them", text: "Hello! How was your day?" },
        { from: "you", text: "It was good! Ready to practice?" },
        { from: "them", text: "Yes! Let's work on vocabulary today." }
      ]
    }
  ];

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

  const targetRoleDemos = [
    {
      title: "Hindi Content Writer",
      icon: FileText,
      languages: ["Hindi", "English"],
      salary: "₹25K - ₹50K/month",
      demand: "High",
      description: "Create engaging content in Hindi for digital platforms",
      communicationSkills: ["Cultural sensitivity", "Tone adaptation", "Regional idioms"]
    },
    {
      title: "Tamil Translator",
      icon: Languages,
      languages: ["Tamil", "English"],
      salary: "₹30K - ₹60K/month",
      demand: "Very High",
      description: "Translate documents, websites, and content between Tamil & English",
      communicationSkills: ["Context preservation", "Formal vs informal", "Technical terminology"]
    },
    {
      title: "ISL Interpreter",
      icon: Headphones,
      languages: ["ISL", "Hindi/English"],
      salary: "₹35K - ₹70K/month",
      demand: "Shortage",
      description: "Bridge communication for deaf and hard-of-hearing communities",
      communicationSkills: ["Visual communication", "Emotional expression", "Real-time interpretation"]
    },
    {
      title: "Telugu Customer Support",
      icon: MessageCircle,
      languages: ["Telugu", "English"],
      salary: "₹20K - ₹40K/month",
      demand: "High",
      description: "Assist customers in their native language for better satisfaction",
      communicationSkills: ["Empathy & patience", "Problem-solving", "Professional etiquette"]
    }
  ];

  const careerArticles = [
    {
      title: "Breaking the English-Only Barrier in Tech Jobs",
      description: "How regional language skills are opening doors in customer support, content creation, and product localization across India's tech sector.",
      readTime: "5 min read",
      category: "Career Insights",
      icon: TrendingUp,
      keyTakeaway: "74% of Indians don't speak English—companies need YOU to reach them"
    },
    {
      title: "Cultural Communication: Why Tamil Matters in Chennai's BPO Sector",
      description: "Understanding cultural context isn't just about words—it's about trust, tone, and building relationships that drive customer satisfaction.",
      readTime: "4 min read",
      category: "Cross-Cultural Skills",
      icon: Globe,
      keyTakeaway: "Native speakers achieve 40% higher customer satisfaction scores"
    },
    {
      title: "ISL Interpreters: India's Most In-Demand Language Professionals",
      description: "With only 250 certified ISL interpreters for 18 million deaf Indians, this career combines high demand with meaningful impact.",
      readTime: "6 min read",
      category: "Career Path",
      icon: Award,
      keyTakeaway: "Salary: ₹35K-₹70K/month | Critical shortage nationwide"
    },
    {
      title: "From Fluent to Professional: Mastering Business Hindi",
      description: "Speaking Hindi isn't enough—learn the formal registers, email etiquette, and presentation skills that employers pay for.",
      readTime: "7 min read",
      category: "Skill Development",
      icon: Lightbulb,
      keyTakeaway: "Bridge the gap from conversational to professional mastery"
    }
  ];

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

    const roleInterval = setInterval(() => {
      setActiveRoleDemo((prev) => (prev + 1) % targetRoleDemos.length);
    }, 3200);

    const articleInterval = setInterval(() => {
      setActiveArticle((prev) => (prev + 1) % careerArticles.length);
    }, 5000);

    return () => {
      clearInterval(matchInterval);
      clearInterval(chatInterval);
      clearInterval(jobInterval);
      clearInterval(roleInterval);
      clearInterval(articleInterval);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      
      <Navbar />

      {/* Hero Section - COMPACT */}
      <section className="pt-30 pb-8 px-4 relative overflow-hidden">
        <div className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${
          darkMode ? 'bg-orange-500' : 'bg-orange-200'
        }`}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* VartaLang Explanation */}
          <div className="text-center mb-6">
            <div className={`text-sm font-semibold ${darkMode ? 'text-orange-300/80' : 'text-orange-600'}`}>
              <span className="font-black">Varta</span> (Communication) + <span className="font-black">Lang</span> (Language)
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            
            {/* LEFT: Headline + CTA */}
            <div>
              <h1 className={`text-4xl lg:text-5xl font-black mb-4 leading-tight ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                Learn Languages.
                <br />
                Build Communication Skills.
                <br />
                <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Get Real Jobs.
                </span>
              </h1>

              <p className={`text-lg mb-6 leading-relaxed ${
                darkMode ? 'text-orange-200/80' : 'text-gray-700'
              }`}>
                The complete pipeline connecting language learners with career opportunities—through practice partners, communication training, and job matching.
              </p>

              <div className="flex flex-wrap gap-3 mb-4">
                <Link href="/auth/signup" className="group px-7 py-3.5 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/targets" className={`px-7 py-3.5 rounded-full font-semibold text-base border transition-all hover:scale-105 inline-flex items-center gap-2 ${
                  darkMode 
                    ? 'border-orange-700 text-orange-200 hover:bg-orange-900/20' 
                    : 'border-orange-300 text-gray-700 hover:bg-orange-50'
                }`}>
                  Browse Career Paths
                </Link>
              </div>

              <p className={`text-sm ${darkMode ? 'text-orange-300/60' : 'text-gray-500'}`}>
                22+ Languages • ISL & Braille supported
              </p>
            </div>

            {/* RIGHT: Stats */}
            <div className={`p-6 rounded-2xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-200 shadow-xl'
            }`}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className={`text-3xl font-black mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    22
                  </div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Languages
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-black mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    74%
                  </div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Non-English
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-black mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    3x
                  </div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Jobs Growth
                  </div>
                </div>
              </div>

              {/* Pipeline */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex flex-col items-center">
                    <Compass className={`w-5 h-5 mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <span className={darkMode ? 'text-orange-200' : 'text-gray-900'}>Discover</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <div className="flex flex-col items-center">
                    <Target className={`w-5 h-5 mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <span className={darkMode ? 'text-orange-200' : 'text-gray-900'}>Match</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <div className="flex flex-col items-center">
                    <MessageCircle className={`w-5 h-5 mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <span className={darkMode ? 'text-orange-200' : 'text-gray-900'}>Practice</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <div className="flex flex-col items-center">
                    <Briefcase className={`w-5 h-5 mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <span className={darkMode ? 'text-orange-200' : 'text-gray-900'}>Work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Ticker - HIDDEN ON MOBILE */}
      <section className={`hidden md:block py-4 overflow-hidden border-y ${darkMode ? 'border-orange-900/30 bg-[#1a1410]' : 'border-orange-100 bg-white'}`}>
        <div className="flex animate-scroll whitespace-nowrap">
          {[...languages, ...languages, ...languages].map((lang, i) => (
            <div
              key={i}
              className={`inline-flex items-center mx-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/30 text-orange-200' 
                  : 'bg-white border-orange-100 text-gray-700 shadow-sm'
              }`}
            >
              {lang}
            </div>
          ))}
        </div>
      </section>

      {/* The Problem - SIMPLIFIED */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-2xl lg:text-3xl font-black mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              The Opportunity Gap
            </h2>
            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Language shouldn't limit career access
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className={`p-6 rounded-xl border ${
              darkMode 
                ? 'bg-red-900/10 border-red-800/30' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className={`text-3xl font-black mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                74%
              </div>
              <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                of Indians don't speak English, yet most jobs require it—leaving millions behind despite having valuable regional language skills.
              </p>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-orange-50 border-orange-200'
            }`}>
              <div className={`text-3xl font-black mb-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                3x Growth
              </div>
              <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                in regional language job postings since 2023. Companies finally need Hindi, Tamil, Telugu speakers—but can't find trained professionals.
              </p>
            </div>
          </div>

          <div className={`p-6 rounded-xl border text-center ${
            darkMode 
              ? 'bg-linear-to-r from-orange-900/20 to-blue-900/20 border-orange-800/30' 
              : 'bg-linear-to-r from-orange-50 to-blue-50 border-orange-200'
          }`}>
            <p className={`text-base font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
              VartaLang bridges this gap—connecting learners with practice partners, communication training, and real job opportunities where their languages are assets, not barriers.
            </p>
          </div>
        </div>
      </section>

      {/* Feature: CAREER PATHS + ARTICLES - FILLED DESIGN */}
      <section className={`py-12 px-4 ${darkMode ? 'bg-[#1f1612]' : 'bg-orange-50/30'}`}>
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-8">
            <h2 className={`text-3xl lg:text-4xl font-black mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Discover Language Career Paths
            </h2>
            <p className={`text-base max-w-2xl mx-auto ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Explore roles where language + communication skills = income opportunity
            </p>
          </div>

          {/* THREE COLUMN FILLED DESIGN - EQUAL HEIGHT */}
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Column 1: Career Role - FILLED */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-200 shadow-lg'
            }`}>
              <div>
                <div className={`text-xs font-bold mb-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  CAREER PATHS
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                    darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                  }`}>
                    {(() => {
                      const Icon = targetRoleDemos[activeRoleDemo].icon;
                      return <Icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {targetRoleDemos[activeRoleDemo].title}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {targetRoleDemos[activeRoleDemo].languages.map((lang, i) => (
                        <span key={i} className={`text-sm px-2.5 py-1 rounded-full ${
                          darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-gray-700'
                        }`}>
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold shrink-0 ${
                    targetRoleDemos[activeRoleDemo].demand === 'Shortage' 
                      ? darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700'
                      : targetRoleDemos[activeRoleDemo].demand === 'Very High'
                      ? darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                      : darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                  }`}>
                    {targetRoleDemos[activeRoleDemo].demand}
                  </div>
                </div>

                <p className={`text-base mb-5 leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {targetRoleDemos[activeRoleDemo].description}
                </p>

                <div className={`p-4 rounded-lg mb-5 ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                  <div className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                    <MessageCircle className="w-4 h-4" />
                    Communication Skills Required
                  </div>
                  <div className="space-y-2">
                    {targetRoleDemos[activeRoleDemo].communicationSkills.map((skill, i) => (
                      <div key={i} className={`text-sm px-3 py-2 rounded-lg ${
                        darkMode ? 'bg-orange-900/40 text-orange-200' : 'bg-white text-gray-700'
                      }`}>
                        • {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className={`text-center py-4 rounded-xl border mb-4 ${
                  darkMode ? 'bg-orange-900/30 border-orange-800/30' : 'bg-white border-orange-200'
                }`}>
                  <div className={`text-sm font-semibold mb-1 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                    Salary Range
                  </div>
                  <div className={`text-2xl font-black ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                    {targetRoleDemos[activeRoleDemo].salary}
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  {targetRoleDemos.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeRoleDemo 
                          ? 'w-8 bg-orange-500' 
                          : darkMode ? 'w-1.5 bg-orange-800/30' : 'w-1.5 bg-orange-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Featured Article - FILLED */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              darkMode 
                ? 'bg-blue-900/10 border-blue-800/30' 
                : 'bg-white border-blue-200 shadow-lg'
            }`}>
              <div>
                <div className={`text-xs font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  FEATURED INSIGHT
                </div>

                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-4 ${
                  darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>
                  {(() => {
                    const Icon = careerArticles[activeArticle].icon;
                    return <Icon className="w-4 h-4" />;
                  })()}
                  {careerArticles[activeArticle].category}
                </div>

                <h3 className={`text-xl font-black mb-4 leading-tight ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {careerArticles[activeArticle].title}
                </h3>

                <p className={`text-base leading-relaxed mb-5 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {careerArticles[activeArticle].description}
                </p>

                <div className={`p-4 rounded-xl border-l-4 mb-5 ${
                  darkMode 
                    ? 'bg-orange-900/20 border-orange-500' 
                    : 'bg-orange-50 border-orange-500'
                }`}>
                  <div className={`text-sm font-semibold mb-2 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                    💡 Key Takeaway
                  </div>
                  <div className={`text-base font-bold leading-snug ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                    {careerArticles[activeArticle].keyTakeaway}
                  </div>
                </div>
              </div>

              <div>
                

                <div className="flex gap-2 justify-center">
                  {careerArticles.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeArticle 
                          ? 'w-8 bg-blue-500' 
                          : darkMode ? 'w-1.5 bg-blue-800/30' : 'w-1.5 bg-blue-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Stats Only - ONE BIG CARD */}
            <div className={`p-6 rounded-xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-200 shadow-lg'
            }`}>
              <div className={`text-xs font-bold mb-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                WHY IT MATTERS
              </div>
              <div className="space-y-6">
                <div>
                  <div className={`text-5xl font-black mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    40%
                  </div>
                  <div className={`text-base leading-snug ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Higher customer satisfaction when support is provided in native language
                  </div>
                </div>
                <div className={`h-px ${darkMode ? 'bg-orange-800/30' : 'bg-orange-200'}`}></div>
                <div>
                  <div className={`text-5xl font-black mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    250
                  </div>
                  <div className={`text-base leading-snug ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Certified ISL interpreters serving 18 million deaf Indians—critical shortage
                  </div>
                </div>
                <div className={`h-px ${darkMode ? 'bg-orange-800/30' : 'bg-orange-200'}`}></div>
                <div>
                  <div className={`text-5xl font-black mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    3x
                  </div>
                  <div className={`text-base leading-snug ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Growth in regional language job postings since 2023—demand is exploding
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/targets"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
            >
              Explore All Career Paths
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature: MATCHES */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            <div className={`p-5 rounded-xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-200 shadow-xl'
            }`}>
              <div className={`text-xs font-bold mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                LIVE MATCHES
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                }`}>
                  {matchDemos[activeMatchDemo].user.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-base mb-0.5 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {matchDemos[activeMatchDemo].user}
                  </h4>
                  <p className={`text-xs flex items-center gap-1 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    <MapPin className="w-3 h-3" />
                    {matchDemos[activeMatchDemo].location}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                  <div className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                    Teaches
                  </div>
                  <div className={`text-sm font-bold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                    {matchDemos[activeMatchDemo].teaches}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                  <div className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                    Learns
                  </div>
                  <div className={`text-sm font-bold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                    {matchDemos[activeMatchDemo].learns}
                  </div>
                </div>
              </div>

              <div className="flex gap-1.5 justify-center mt-3">
                {matchDemos.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === activeMatchDemo 
                        ? 'w-6 bg-orange-500' 
                        : darkMode ? 'w-1 bg-orange-800/30' : 'w-1 bg-orange-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className={`text-2xl lg:text-3xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Find Language Exchange Partners
              </h2>

              <p className={`text-base mb-5 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                Connect with people who teach what you want to learn, and learn what you teach. Mutual exchange, real practice.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  'Match by language & location',
                  'Verified community',
                  'Unlimited partners',
                  'Safe messaging'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 shrink-0 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-sm ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link 
                href="/matches"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
              >
                Find Partners
                <Target className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature: CHATS */}
      <section className={`py-12 px-4 ${darkMode ? 'bg-[#1f1612]' : 'bg-orange-50/30'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            <div>
              <h2 className={`text-2xl lg:text-3xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Practice Through Real Conversations
              </h2>

              <p className={`text-base mb-5 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                No textbooks, no drills. Just real messaging with real people building real communication skills.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  'Real-time messaging',
                  'Your own pace',
                  'Build confidence',
                  'Private & secure'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 shrink-0 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-sm ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link 
                href="/chats"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
              >
                Start Chatting
                <MessageCircle className="w-4 h-4" />
              </Link>
            </div>

            <div className={`p-5 rounded-xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-200 shadow-xl'
            }`}>
              <div className={`text-xs font-bold mb-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                LIVE CHAT
              </div>

              <div className={`p-3 rounded-t-lg border-b ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/30' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {chatDemos[activeChatDemo].partner.charAt(0)}
                  </div>
                  <div className={`font-bold text-sm ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {chatDemos[activeChatDemo].partner}
                  </div>
                </div>
              </div>

              <div className="p-3 space-y-2 min-h-50">
                {chatDemos[activeChatDemo].messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                      msg.from === 'you'
                        ? darkMode 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-orange-600 text-white'
                        : darkMode
                          ? 'bg-orange-900/30 text-orange-100'
                          : 'bg-gray-100 text-gray-900'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className={`p-2 rounded-b-lg border-t ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/30' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type..."
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
                        : darkMode ? 'w-1 bg-orange-800/30' : 'w-1 bg-orange-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature: JOBS */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            <div className={`p-5 rounded-xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-200 shadow-xl'
            }`}>
              <div className={`text-xs font-bold mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                LIVE JOBS
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                  <Briefcase className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-base mb-0.5 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {jobDemos[activeJobDemo].title}
                  </h4>
                  <p className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    {jobDemos[activeJobDemo].company}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                }`}>
                  <Languages className="w-3 h-3 inline mr-0.5" />
                  {jobDemos[activeJobDemo].language}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-white text-gray-700'
                }`}>
                  <MapPin className="w-3 h-3 inline mr-0.5" />
                  {jobDemos[activeJobDemo].location}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-white text-gray-700'
                }`}>
                  {jobDemos[activeJobDemo].type}
                </span>
              </div>

              <div className={`text-center py-2 rounded-lg ${darkMode ? 'bg-orange-900/30' : 'bg-white'}`}>
                <div className={`text-lg font-black ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                  {jobDemos[activeJobDemo].salary}
                </div>
              </div>

              <div className="flex gap-1.5 justify-center mt-3">
                {jobDemos.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === activeJobDemo 
                        ? 'w-6 bg-orange-500' 
                        : darkMode ? 'w-1 bg-orange-800/30' : 'w-1 bg-orange-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className={`text-2xl lg:text-3xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Turn Language Skills Into Income
              </h2>

              <p className={`text-base mb-5 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                Browse jobs where your regional languages are the requirement, not a limitation. Your mother tongue has value here, unlocking new economic opportunities across India's diverse markets.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  'Translation & content',
                  'Customer support',
                  'Teaching roles',
                  'Free 7-day posting'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 shrink-0 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-sm ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link 
                  href="/jobs"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
                >
                  Browse Jobs
                  <Briefcase className="w-4 h-4" />
                </Link>
                <Link 
                  href="/jobs?post=true"
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base border hover:scale-105 transition-all ${
                    darkMode 
                      ? 'border-orange-700 text-orange-200 hover:bg-orange-900/20' 
                      : 'border-orange-300 text-gray-700 hover:bg-orange-50'
                  }`}>
                  Post a Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-[#1f1612]' : 'bg-orange-50/30'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl lg:text-4xl font-black mb-4 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Ready to Get Started?
          </h2>

          <p className={`text-base mb-8 max-w-2xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Join thousands using VartaLang to turn language skills into career opportunities. Free forever.
          </p>

          <Link href="/auth/signup" className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-black text-lg bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-2xl hover:scale-110 transition-all">
            Join Free Now
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mt-10">
            {[
              { icon: Compass, text: 'Discover' },
              { icon: Target, text: 'Match' },
              { icon: MessageCircle, text: 'Practice' },
              { icon: Briefcase, text: 'Work' }
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-lg ${
                darkMode ? 'bg-orange-900/20' : 'bg-white shadow'
              }`}>
                <item.icon className={`w-6 h-6 mx-auto mb-2 ${
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
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}