"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Sparkles, Bell, Mail, Languages, Quote,
  Zap, Globe, BookOpen, Users, Star, ChevronRight,
  Clock, Calendar, Heart, Rocket, TrendingUp
} from 'lucide-react';
import { useDarkMode } from '@/lib/DarkModeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Famous quotes about language learning
const languageQuotes = [
  {
    quote: "One language sets you in a corridor for life. Two languages open every door along the way.",
    author: "Frank Smith",
    language: "English"
  },
  {
    quote: "To have another language is to possess a second soul.",
    author: "Charlemagne",
    language: "Latin"
  },
  {
    quote: "Language is the road map of a culture. It tells you where its people come from and where they are going.",
    author: "Rita Mae Brown",
    language: "English"
  },
  {
    quote: "The limits of my language mean the limits of my world.",
    author: "Ludwig Wittgenstein",
    language: "German"
  },
  {
    quote: "Learning is a treasure that will follow its owner everywhere.",
    author: "Chinese Proverb",
    language: "Chinese"
  },
  {
    quote: "A different language is a different vision of life.",
    author: "Federico Fellini",
    language: "Italian"
  },
  {
    quote: "Knowledge of languages is the doorway to wisdom.",
    author: "Roger Bacon",
    language: "Latin"
  },
  {
    quote: "Language is the blood of the soul into which thoughts run and out of which they grow.",
    author: "Oliver Wendell Holmes",
    language: "English"
  },
  {
    quote: "If you talk to a man in a language he understands, that goes to his head. If you talk to him in his own language, that goes to his heart.",
    author: "Nelson Mandela",
    language: "Xhosa"
  },
  {
    quote: "Learn everything you can, anytime you can, from anyone you can; there will always come a time when you will be grateful you did.",
    author: "Sarah Caldwell",
    language: "English"
  }
];

export default function UpcomingPage() {
  const { darkMode } = useDarkMode();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 18
  });

  // Rotate quotes every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % languageQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
              if (days < 0) days = 0;
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const upcomingFeatures = [
    {
      icon: Globe,
      title: "Live Translation",
      description: "Real-time conversation translation with native speakers",
      color: "blue"
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Connect with learners at your level worldwide",
      color: "green"
    },
    {
      icon: Zap,
      title: "AI Tutor",
      description: "Personalized learning paths powered by AI",
      color: "purple"
    },
    {
      icon: BookOpen,
      title: "Interactive Stories",
      description: "Learn through immersive storytelling experiences",
      color: "pink"
    },
    {
      icon: Star,
      title: "Gamification",
      description: "Earn badges, compete on leaderboards, unlock achievements",
      color: "yellow"
    },
    {
      icon: Calendar,
      title: "Study Scheduler",
      description: "Smart scheduling based on your learning patterns",
      color: "orange"
    }
  ];

  const getFeatureColor = (color: string) => {
    const colors = {
      blue: darkMode ? 'from-blue-500/20 to-blue-600/20 border-blue-500/30' : 'from-blue-50 to-blue-100 border-blue-200',
      green: darkMode ? 'from-green-500/20 to-green-600/20 border-green-500/30' : 'from-green-50 to-green-100 border-green-200',
      purple: darkMode ? 'from-purple-500/20 to-purple-600/20 border-purple-500/30' : 'from-purple-50 to-purple-100 border-purple-200',
      pink: darkMode ? 'from-pink-500/20 to-pink-600/20 border-pink-500/30' : 'from-pink-50 to-pink-100 border-pink-200',
      yellow: darkMode ? 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30' : 'from-yellow-50 to-yellow-100 border-yellow-200',
      orange: darkMode ? 'from-orange-500/20 to-orange-600/20 border-orange-500/30' : 'from-orange-50 to-orange-100 border-orange-200'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: darkMode ? 'text-blue-400' : 'text-blue-600',
      green: darkMode ? 'text-green-400' : 'text-green-600',
      purple: darkMode ? 'text-purple-400' : 'text-purple-600',
      pink: darkMode ? 'text-pink-400' : 'text-pink-600',
      yellow: darkMode ? 'text-yellow-400' : 'text-yellow-600',
      orange: darkMode ? 'text-orange-400' : 'text-orange-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      <div className="h-20"></div>

      {/* Hero Section with Quote */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        {/* Animated Background Gradients */}
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/40'
        }`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          darkMode ? 'bg-red-900/20' : 'bg-red-200/40'
        }`}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back Button */}
          <Link 
            href="/"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border transition-all hover:scale-105 ${
              darkMode 
                ? 'bg-orange-900/20 border-orange-800/40 text-orange-300 hover:bg-orange-900/30' 
                : 'bg-white border-orange-200 text-orange-700 hover:shadow-lg'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border backdrop-blur ${
            darkMode
              ? 'bg-orange-900/30 border-orange-700/40 text-orange-200'
              : 'bg-white/70 border-orange-200 text-orange-700'
          }`}>
            <Rocket className="w-5 h-5 animate-bounce" />
            <span className="text-sm font-bold tracking-wide">COMING SOON</span>
          </div>

          {/* Main Title */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Something <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Amazing
            </span>
            <br />is on the way
          </h1>

          <p className={`text-xl md:text-2xl mb-12 max-w-3xl ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            We're crafting extraordinary features that will revolutionize your language learning experience
          </p>

          {/* Rotating Quote Card */}
          <div className={`max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border relative overflow-hidden transition-all duration-500 ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30 backdrop-blur' 
              : 'bg-linear-to-br from-white to-orange-50/50 border-orange-100 shadow-2xl'
          }`}>
            {/* Quote Icon */}
            <div className={`absolute top-6 left-6 opacity-10 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`}>
              <Quote className="w-20 h-20" />
            </div>

            {/* Quote Content with Animation */}
            <div className="relative z-10 animate-fadeIn" key={currentQuote}>
              <p className={`text-2xl md:text-3xl font-serif italic mb-6 leading-relaxed ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                "{languageQuotes[currentQuote].quote}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-lg font-bold ${
                    darkMode ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    — {languageQuotes[currentQuote].author}
                  </p>
                  <p className={`text-sm ${
                    darkMode ? 'text-orange-400/70' : 'text-gray-500'
                  }`}>
                    {languageQuotes[currentQuote].language}
                  </p>
                </div>

                {/* Quote Progress Indicator */}
                <div className="flex gap-1.5">
                  {languageQuotes.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        index === currentQuote 
                          ? 'w-8 bg-linear-to-r from-orange-500 to-red-600' 
                          : darkMode 
                            ? 'w-1.5 bg-orange-800/50' 
                            : 'w-1.5 bg-orange-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-8`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border ${
              darkMode
                ? 'bg-orange-900/20 border-orange-800/40 text-orange-300'
                : 'bg-orange-50 border-orange-200 text-orange-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">Launch Countdown</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds }
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 md:p-8 rounded-2xl border text-center transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-900/20 to-red-900/10 border-orange-800/30' 
                    : 'bg-linear-to-br from-white to-orange-50 border-orange-100 shadow-lg'
                }`}
              >
                <div className={`text-5xl md:text-6xl font-bold mb-2 bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent tabular-nums`}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className={`text-sm md:text-base font-semibold tracking-wider ${
                  darkMode ? 'text-orange-300/70' : 'text-gray-600'
                }`}>
                  {item.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border ${
              darkMode
                ? 'bg-orange-900/20 border-orange-800/40 text-orange-300'
                : 'bg-orange-50 border-orange-200 text-orange-700'
            }`}>
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">What's Coming</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              Exciting New Features
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-orange-200/70' : 'text-gray-600'
            }`}>
              Prepare for an enhanced learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature, i) => (
              <div
                key={i}
                className={`group p-6 rounded-2xl border transition-all duration-500 hover:scale-105 bg-linear-to-br ${
                  getFeatureColor(feature.color)
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-white/10' : 'bg-white/50'
                }`}>
                  <feature.icon className={`w-7 h-7 ${getIconColor(feature.color)}`} />
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-orange-50' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`text-sm ${
                  darkMode ? 'text-orange-200/70' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>

                <div className={`mt-4 flex items-center gap-2 text-sm font-semibold ${
                  getIconColor(feature.color)
                }`}>
                  Learn more
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify Me Section */}
      <section className={`py-20 px-4 relative overflow-hidden ${
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
            <Bell className="w-4 h-4" />
            <span className="text-sm font-semibold">Stay Updated</span>
          </div>

          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Be the First to Know
          </h2>

          <p className={`text-lg mb-8 ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Get notified when we launch and receive exclusive early access benefits
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className={`flex-1 flex items-center gap-3 px-6 py-4 rounded-full border ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/30 backdrop-blur' 
                  : 'bg-white border-orange-100 shadow-lg'
              }`}>
                <Mail className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-gray-400'}`} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`flex-1 bg-transparent outline-none ${
                    darkMode ? 'text-orange-50 placeholder-orange-300/50' : 'text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 rounded-full font-semibold bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-2xl hover:scale-105 transition-all whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border animate-fadeIn ${
              darkMode 
                ? 'bg-green-900/30 border-green-800/40 text-green-300' 
                : 'bg-green-50 border-green-200 text-green-700'
            }`}>
              <Heart className="w-5 h-5 fill-current animate-pulse" />
              <span className="font-semibold">Thank you! We'll keep you posted.</span>
            </div>
          )}

          <p className={`text-sm mt-4 ${
            darkMode ? 'text-orange-300/60' : 'text-gray-500'
          }`}>
            Join 10,000+ learners waiting for our launch
          </p>
        </div>
      </section>

      {/* Progress Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Development', value: '85%', icon: TrendingUp },
              { label: 'Testing', value: '60%', icon: Zap },
              { label: 'Design', value: '95%', icon: Star },
              { label: 'Content', value: '70%', icon: BookOpen }
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border text-center transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <stat.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div className={`text-3xl font-bold mb-1 bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-medium ${
                  darkMode ? 'text-orange-300/70' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-20"></div>
      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}