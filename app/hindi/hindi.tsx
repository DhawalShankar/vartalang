"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Video, Award, FileText, Book, Languages, 
  ExternalLink, Clock, 
  Cloud, Newspaper, Star, TrendingUp, Users, Play,
  ChevronRight, Search, Heart, Sparkles, ArrowRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';
// Type definitions
interface NewsItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Course {
  title: string;
  provider: string;
  level: string;
  duration: string;
  students: string;
  price?: string;
  rating?: number;
}

interface YouTubeChannel {
  name: string;
  subscribers: string;
  category: string;
}

interface Note {
  title: string;
  downloads: string;
  pages: number;
}

interface Documentation {
  title: string;
  type: string;
  size: string;
}

interface Creator {
  name: string;
  followers: string;
  focus: string;
}

interface LearningResource {
  name: string;
  weather: { temp: number; condition: string; city: string };
  newspapers: NewsItem[];
  freeCourses: Course[];
  youtubeChannels: YouTubeChannel[];
  premiumCourses: (Course & { rating: number; price: string })[];
  shortNotes: Note[];
  documentation: Documentation[];
  creators: {
    instagram: Creator[];
    twitter: Creator[];
    linkedin: Creator[];
  };
}

// Mock data - replace with actual API calls
const learningResources: Record<string, LearningResource> = {
  hindi: {
    name: 'Hindi • हिंदी',
    weather: { temp: 24, condition: 'Sunny', city: 'Greater Noida' },
    newspapers: [
      { name: 'Dainik Jagran', url: '#', icon: Newspaper },
      { name: 'Amar Ujala', url: '#', icon: Newspaper },
      { name: 'Navbharat Times', url: '#', icon: Newspaper }
    ],
    freeCourses: [
      { title: 'Hindi for Beginners', provider: 'Duolingo', level: 'Beginner', duration: '4 weeks', students: '50k+' },
      { title: 'Conversational Hindi', provider: 'YouTube Learning', level: 'Intermediate', duration: '6 weeks', students: '30k+' },
      { title: 'Advanced Hindi Grammar', provider: 'NPTEL', level: 'Advanced', duration: '8 weeks', students: '15k+' }
    ],
    youtubeChannels: [
      { name: 'Learn Hindi with Anil Mahato', subscribers: '500K+', category: 'Grammar & Vocabulary' },
      { name: 'Hindi Pod101', subscribers: '300K+', category: 'Conversational Practice' },
      { name: 'Easy Hindi', subscribers: '250K+', category: 'Daily Practice' }
    ],
    premiumCourses: [
      { title: 'Master Hindi in 90 Days', provider: 'Udemy', level: 'Advanced', duration: '6 weeks', price: '₹499', rating: 4.8, students: '10k+' },
      { title: 'Business Hindi Mastery', provider: 'Coursera', level: 'Advanced', duration: '4 weeks', price: '₹2,999', rating: 4.7, students: '5k+' }
    ],
    shortNotes: [
      { title: 'Hindi Alphabet Chart', downloads: '25k+', pages: 2 },
      { title: 'Common Phrases Guide', downloads: '18k+', pages: 5 },
      { title: 'Grammar Quick Reference', downloads: '22k+', pages: 8 }
    ],
    documentation: [
      { title: 'Complete Hindi Grammar', type: 'PDF', size: '15 MB' },
      { title: 'Hindi-English Dictionary', type: 'Online', size: 'Interactive' }
    ],
    creators: {
      instagram: [
        { name: '@hindiwithpreeti', followers: '45k', focus: 'Daily Words' },
        { name: '@learnhindifast', followers: '32k', focus: 'Grammar Tips' }
      ],
      twitter: [
        { name: '@HindiLearning', followers: '28k', focus: 'Language Tips' },
        { name: '@SpeakHindi', followers: '19k', focus: 'Conversation' }
      ],
      linkedin: [
        { name: 'Hindi Language Academy', followers: '12k', focus: 'Professional Hindi' }
      ]
    }
  }
};

export default function LearnPage() {
  const { darkMode } = useDarkMode(); // Use context
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const resources = learningResources[selectedLanguage] || learningResources.hindi;

  // Format time in selected language (simplified for demo)
  const formatTime = () => {
    return currentTime.toLocaleTimeString('hi-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar/>
      {/* Space for Global Floating Header */}
      <div className="h-20"></div>

      {/* Hero Section with Weather & Time */}
      <section className="pt-12 pb-8 px-4 relative overflow-hidden">
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/40'
        }`}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Language Selector & Weather Card */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            {/* Current Language Display */}
            <div className={`flex-1 p-6 rounded-2xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-100 shadow-lg'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm mb-1 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                    Learning
                  </p>
                  <h2 className={`text-3xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {resources.name}
                  </h2>
                </div>
                <div className={`p-3 rounded-xl ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <Languages className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
              </div>
            </div>

            {/* Weather & Time Widget */}
            <div className={`flex-1 p-6 rounded-2xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-100 shadow-lg'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <span className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {formatTime()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className={`w-4 h-4 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                      {resources.weather.temp}°C • {resources.weather.condition} • {resources.weather.city}
                    </span>
                  </div>
                </div>
                <div className={`text-4xl`}>☀️</div>
              </div>
            </div>
          </div>

          {/* Page Title */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border ${
              darkMode 
                ? 'bg-orange-900/20 border-orange-800/40 text-orange-300' 
                : 'bg-orange-50 border-orange-200 text-orange-700'
            }`}>
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">Your Learning Hub</span>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              Master {resources.name.split('•')[0].trim()}
            </h1>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Curated resources to accelerate your learning journey
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-100'
            }`}>
              <Search className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 bg-transparent outline-none ${
                  darkMode ? 'text-orange-50 placeholder-orange-300/50' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['all', 'free', 'premium', 'videos', 'notes'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? 'bg-linear-to-r from-orange-500 to-red-600 text-white'
                      : darkMode
                        ? 'bg-orange-900/10 border border-orange-800/30 text-orange-200 hover:bg-orange-900/20'
                        : 'bg-white border border-orange-100 text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newspapers Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            <Newspaper className="w-6 h-6" />
            Daily Newspapers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {resources.newspapers.map((newspaper: NewsItem, i: number) => (
              <a
                key={i}
                href={newspaper.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-4 rounded-xl border transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                    }`}>
                      <newspaper.icon className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <span className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {newspaper.name}
                    </span>
                  </div>
                  <ExternalLink className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                    darkMode ? 'text-orange-400' : 'text-orange-600'
                  }`} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Free Courses Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold flex items-center gap-2 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              <BookOpen className="w-6 h-6" />
              Free Courses
            </h2>
            <button className={`text-sm font-medium flex items-center gap-1 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`}>
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.freeCourses.map((course: Course, i: number) => (
              <div
                key={i}
                className={`group p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-xl'
                }`}
              >
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                }`}>
                  FREE
                </div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {course.title}
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {course.provider}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {course.level}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-500'}`}>
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Users className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <span className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-500'}`}>
                      {course.students}
                    </span>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white text-sm font-semibold hover:shadow-lg transition-all">
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Channels Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold flex items-center gap-2 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              <Video className="w-6 h-6" />
              YouTube Channels
            </h2>
            <button className={`text-sm font-medium flex items-center gap-1 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`}>
              Explore More <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.youtubeChannels.map((channel: YouTubeChannel, i: number) => (
              <div
                key={i}
                className={`group p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-xl'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-red-900/30' : 'bg-red-50'
                }`}>
                  <Play className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {channel.name}
                </h3>
                <p className={`text-sm mb-3 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {channel.category}
                </p>
                <div className="flex items-center gap-2">
                  <Users className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <span className={`text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    {channel.subscribers}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Courses Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            <Award className="w-6 h-6" />
            Premium Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.premiumCourses.map((course: Course & { rating: number; price: string }, i: number) => (
              <div
                key={i}
                className={`group p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-50 text-orange-700'
                  }`}>
                    PREMIUM
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className={`w-4 h-4 fill-yellow-500 text-yellow-500`} />
                    <span className={`text-sm font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {course.rating}
                    </span>
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {course.title}
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {course.provider}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                      {course.price}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-500'}`}>
                      {course.students} enrolled
                    </div>
                  </div>
                  <button className="px-6 py-3 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Short Notes Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            <FileText className="w-6 h-6" />
            Quick Reference Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.shortNotes.map((note: Note, i: number) => (
              <div
                key={i}
                className={`group p-5 rounded-xl border transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                    <FileText className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {note.pages} pages
                  </span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {note.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-500'}`}>
                    {note.downloads} downloads
                  </span>
                  <button className={`text-sm font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            <Book className="w-6 h-6" />
            Complete Documentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.documentation.map((doc: Documentation, i: number) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${darkMode ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                    <Book className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                        {doc.type}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                      }`}>
                        {doc.size}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">
                    Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creators to Follow Section */}
      <section className="py-8 px-4 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            <TrendingUp className="w-6 h-6" />
            Follow Top Creators
          </h2>
          
          {/* Instagram */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              darkMode ? 'text-orange-200' : 'text-gray-700'
            }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0m5.521 17.05c-.881.881-2.303 1.43-3.85 1.43H10.33c-1.547 0-2.969-.549-3.85-1.43-.881-.881-1.43-2.303-1.43-3.85V10.33c0-1.547.549-2.969 1.43-3.85.881-.881 2.303-1.43 3.85-1.43h3.34c1.547 0 2.969.549 3.85 1.43.881.881 1.43 2.303 1.43 3.85v3.34c0 1.547-.549 2.969-1.43 3.85z"/>
              </svg>
              Instagram
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resources.creators.instagram.map((creator: Creator, i: number) => (
                <div
                  key={i}
                  className={`group p-4 rounded-xl border transition-all hover:scale-105 ${
                    darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                      : 'bg-white border-orange-100 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                        {creator.name}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                        {creator.focus}
                      </p>
                      <span className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                        {creator.followers} followers
                      </span>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      darkMode 
                        ? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30' 
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}>
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Twitter */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              darkMode ? 'text-orange-200' : 'text-gray-700'
            }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.974 6.807H2.882l7.432-8.499L1.077 2.25h6.85l4.73 6.247 5.565-6.247zM17.15 18.75h1.832L5.904 4.07H3.957l13.193 14.68z"/>
              </svg>
              X (Twitter)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resources.creators.twitter.map((creator: Creator, i: number) => (
                <div
                  key={i}
                  className={`group p-4 rounded-xl border transition-all hover:scale-105 ${
                    darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                      : 'bg-white border-orange-100 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                        {creator.name}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                        {creator.focus}
                      </p>
                      <span className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                        {creator.followers} followers
                      </span>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      darkMode 
                        ? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30' 
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}>
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              darkMode ? 'text-orange-200' : 'text-gray-700'
            }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.945v5.442h-3.554s.05-8.736 0-9.646h3.554v1.348c.42-.648 1.36-1.573 3.322-1.573 2.432 0 4.261 1.579 4.261 4.975v5.896zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.951.77-1.71 1.915-1.71 1.144 0 1.915.759 1.915 1.71 0 .951-.771 1.71-1.915 1.71zm1.6 11.597H3.738V9.859h3.199v10.593zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
              LinkedIn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resources.creators.linkedin.map((creator: Creator, i: number) => (
                <div
                  key={i}
                  className={`group p-4 rounded-xl border transition-all hover:scale-105 ${
                    darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                      : 'bg-white border-orange-100 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                        {creator.name}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                        {creator.focus}
                      </p>
                      <span className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                        {creator.followers} followers
                      </span>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      darkMode 
                        ? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30' 
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}>
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 relative overflow-hidden ${
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
            <span className="text-sm font-semibold">Start Learning Today</span>
          </div>

          <h2 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Ready to Master {resources.name.split('•')[0].trim()}?
          </h2>

          <p className={`text-lg mb-8 max-w-xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Connect with native speakers and accelerate your learning journey
          </p>

          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base
            bg-linear-to-r from-orange-500 to-red-600 text-white
            hover:shadow-xl hover:scale-105 transition-all"
          >
            Find a Language Partner
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
      </section>
     
      {/* Footer spacer */}
      <div className="h-20"></div>
       <Footer/>
    </div>
  );
}