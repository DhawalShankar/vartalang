"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Search,
  Users,
  Award,
  Play,
  Book,
  MessageCircle,
  Heart
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

export default function LearnPage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setIsAuthenticating(false);
  }, [router]);

  const languages = [
    {
      name: 'Hindi',
      nativeName: 'हिंदी',
      slug: 'language',
      icon: '🇮🇳',
      learners: '+',
      difficulty: 'Beginner',
      category: 'north',
      color: 'from-orange-500 to-red-500',
      description: 'India\'s most widely spoken language',
      resources: 245
    },
    {
      name: 'Tamil',
      nativeName: 'தமிழ்',
      slug: 'language',
      icon: '🌴',
      learners: '+',
      difficulty: 'Intermediate',
      category: 'south',
      color: 'from-red-500 to-pink-500',
      description: 'Classical Dravidian language',
      resources: 198
    },
    {
      name: 'Telugu',
      nativeName: 'తెలుగు',
      slug: 'language',
      icon: '🎭',
      learners: '+',
      difficulty: 'Intermediate',
      category: 'south',
      color: 'from-yellow-500 to-orange-500',
      description: 'Sweet language of the South',
      resources: 176
    },
    {
      name: 'Bengali',
      nativeName: 'বাংলা',
      slug: 'language',
      icon: '📚',
      learners: '+',
      difficulty: 'Beginner',
      category: 'east',
      color: 'from-green-500 to-teal-500',
      description: 'Language of poetry and literature',
      resources: 167
    },
    {
      name: 'Marathi',
      nativeName: 'मराठी',
      slug: 'language',
      icon: '🏛️',
      learners: '+',
      difficulty: 'Beginner',
      category: 'west',
      color: 'from-purple-500 to-pink-500',
      description: 'Official language of Maharashtra',
      resources: 154
    },
    {
      name: 'Gujarati',
      nativeName: 'ગુજરાતી',
      slug: 'language',
      icon: '🪔',
      learners: '+',
      difficulty: 'Beginner',
      category: 'west',
      color: 'from-blue-500 to-indigo-500',
      description: 'Language of entrepreneurship',
      resources: 143
    },
    {
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      slug: 'language',
      icon: '☕',
      learners: '+',
      difficulty: 'Intermediate',
      category: 'south',
      color: 'from-red-600 to-orange-600',
      description: 'Language of Karnataka',
      resources: 132
    },
    {
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      slug: 'language',
      icon: '🌊',
      learners: '+',
      difficulty: 'Advanced',
      category: 'south',
      color: 'from-cyan-500 to-blue-500',
      description: 'Language of Kerala',
      resources: 128
    },
    {
      name: 'Punjabi',
      nativeName: 'ਪੰਜਾਬੀ',
      slug: 'language',
      icon: '🥁',
      learners: '+',
      difficulty: 'Beginner',
      category: 'north',
      color: 'from-orange-600 to-yellow-500',
      description: 'Language of Punjab',
      resources: 115
    },
    {
      name: 'Odia',
      nativeName: 'ଓଡ଼ିଆ',
      slug: 'language',
      icon: '🏛️',
      learners: '+',
      difficulty: 'Intermediate',
      category: 'east',
      color: 'from-teal-500 to-green-500',
      description: 'Classical language of Odisha',
      resources: 94
    },
    {
      name: 'Assamese',
      nativeName: 'অসমীয়া',
      slug: 'language',
      icon: '🎋',
      learners: '+',
      difficulty: 'Intermediate',
      category: 'east',
      color: 'from-emerald-500 to-green-600',
      description: 'Language of Assam',
      resources: 87
    },
    {
      name: 'Urdu',
      nativeName: 'اردو',
      slug: 'language',
      icon: '📜',
      learners: '+',
      difficulty: 'Intermediate',
      category: 'north',
      color: 'from-indigo-500 to-purple-500',
      description: 'Language of poetry and shayari',
      resources: 156
    },
    {
      name: 'English',
      nativeName: 'English',
      slug: 'language',
      icon: '🌍',
      learners: '+',
      difficulty: 'Beginner',
      category: 'global',
      color: 'from-gray-600 to-gray-800',
      description: 'Global language of opportunity',
      resources: 312
    },
    {
      name: 'Sanskrit',
      nativeName: 'संस्कृत',
      slug: 'language',
      icon: '🕉️',
      learners: '+',
      difficulty: 'Advanced',
      category: 'classical',
      color: 'from-amber-600 to-orange-700',
      description: 'Ancient language of wisdom',
      resources: 168
    },
    {
      name: 'Braille',
      nativeName: '⠃⠗⠁⠊⠇⠇⠑',
      slug: 'language',
      icon: '👁️',
      learners: '+',
      difficulty: 'Beginner',
      category: 'accessibility',
      color: 'from-blue-600 to-indigo-600',
      description: 'Tactile writing system for the visually impaired',
      resources: 89
    }
  ];

  const categories = [
    { value: 'all', label: 'All Regions', icon: Globe },
    { value: 'north', label: 'North India', icon: '🏔️' },
    { value: 'south', label: 'South India', icon: '🌴' },
    { value: 'east', label: 'East India', icon: '🎋' },
    { value: 'west', label: 'West India', icon: '🏖️' },
    { value: 'classical', label: 'Classical', icon: '🕉️' },
    { value: 'global', label: 'Global', icon: '🌍' },
    { value: 'accessibility', label: 'Accessibility', icon: '👁️' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const filteredLanguages = languages.filter(lang => {
    const matchesSearch = lang.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         lang.nativeName.includes(searchQuery);
    const matchesLevel = selectedLevel === 'all' || lang.difficulty === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || lang.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Show loading while authenticating
  if (isAuthenticating) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/30'
        }`}></div>
        <div className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl ${
          darkMode ? 'bg-red-900/20' : 'bg-red-200/30'
        }`}></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border ${
            darkMode 
              ? 'bg-orange-900/20 border-orange-800/40 text-orange-300' 
              : 'bg-orange-50 border-orange-200 text-orange-700'
          }`}>
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-semibold">Language Learning Hub</span>
          </div>

          {/* Headline */}
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Choose your
            <br />
            <span className={`bg-linear-to-r ${darkMode ? 'from-orange-400 to-red-400' : 'from-orange-600 to-red-600'} bg-clip-text text-transparent`}>
              linguistic journey
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Explore curated resources, connect with native speakers, and master any Indian language
            with our comprehensive learning paths.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { icon: Globe, label: '15 Languages', value: 'Available' },
              { icon: Users, label: 'Learners', value: 'Active' },
              { icon: Book, label: 'Resources', value: 'Curated' }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' 
                    : 'bg-linear-to-br from-orange-100 to-red-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div className="text-left">
                  <p className={`text-lg font-bold ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility Highlight Banner */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className={`p-6 rounded-2xl border backdrop-blur-lg ${
            darkMode 
              ? 'bg-linear-to-r from-blue-900/20 to-indigo-900/20 border-blue-800/30' 
              : 'bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Heart className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-blue-100' : 'text-gray-900'}`}>
                  Inclusive Learning for Everyone
                </h3>
                <p className={`text-sm ${darkMode ? 'text-blue-200/70' : 'text-gray-700'}`}>
                  VartaLang proudly supports Braille and accessible learning materials. Education should have no barriers—we're building for every Indian, including our specially-abled community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className=" px-4 pb-6">
        <div className={`max-w-6xl mx-auto p-6 rounded-2xl border backdrop-blur-lg ${
          darkMode 
            ? 'bg-[#1a1410]/95 border-orange-800/30 shadow-2xl' 
            : 'bg-white/95 border-orange-100 shadow-lg'
        }`}>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-orange-400/60' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search languages... (e.g., Hindi, தமிழ், Braille)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border text-base transition-all ${
                  darkMode 
                    ? 'bg-orange-900/20 border-orange-800/40 text-orange-100 placeholder:text-orange-400/40 focus:border-orange-600' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400'
                } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex-1 min-w-50">
              <label className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-orange-300' : 'text-gray-700'
              }`}>
                Region
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.value
                        ? darkMode
                          ? 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg'
                          : 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg'
                        : darkMode
                        ? 'bg-orange-900/20 text-orange-200 hover:bg-orange-900/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {typeof cat.icon === 'string' ? cat.icon : <cat.icon className="w-4 h-4 inline" />} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="min-w-50">
              <label className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-orange-300' : 'text-gray-700'
              }`}>
                Difficulty
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSelectedLevel(level.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedLevel === level.value
                        ? darkMode
                          ? 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg'
                          : 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg'
                        : darkMode
                        ? 'bg-orange-900/20 text-orange-200 hover:bg-orange-900/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-orange-800/30' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Showing <span className="font-bold">{filteredLanguages.length}</span> language{filteredLanguages.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Languages Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredLanguages.length === 0 ? (
            <div className={`text-center py-20 px-4 rounded-2xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-100'
            }`}>
              <Search className={`w-16 h-16 mx-auto mb-4 ${
                darkMode ? 'text-orange-400/40' : 'text-gray-300'
              }`} />
              <h3 className={`text-2xl font-bold mb-2 ${
                darkMode ? 'text-orange-100' : 'text-gray-900'
              }`}>
                No languages found
              </h3>
              <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLanguages.map((lang, i) => (
                <Link
                  key={i}
                  href={`/learn/${lang.slug}`}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] overflow-hidden ${
                    darkMode 
                      ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30 hover:bg-orange-900/20 hover:border-orange-700/50' 
                      : 'bg-white border-orange-100 hover:shadow-2xl hover:border-orange-200'
                  }`}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-linear-to-br ${lang.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`text-4xl w-14 h-14 flex items-center justify-center rounded-xl ${
                        darkMode ? 'bg-orange-900/30' : 'bg-orange-50'
                      }`}>
                        {lang.icon}
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        lang.difficulty === 'Beginner' 
                          ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                          : lang.difficulty === 'Intermediate'
                          ? darkMode ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-50 text-yellow-700'
                          : darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'
                      }`}>
                        {lang.difficulty}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl font-bold mb-1 ${
                      darkMode ? 'text-orange-50' : 'text-gray-900'
                    }`}>
                      {lang.name}
                    </h3>
                    <p className={`text-xl mb-3 ${
                      darkMode ? 'text-orange-300' : 'text-orange-600'
                    }`}>
                      {lang.nativeName}
                    </p>

                    {/* Description */}
                    <p className={`text-sm mb-4 leading-relaxed ${
                      darkMode ? 'text-orange-200/70' : 'text-gray-600'
                    }`}>
                      {lang.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Users className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-orange-200' : 'text-gray-700'
                        }`}>
                          {lang.learners}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Book className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-orange-200' : 'text-gray-700'
                        }`}>
                          {lang.resources} resources
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className={`flex items-center justify-between pt-4 border-t ${
                      darkMode ? 'border-orange-800/30' : 'border-orange-100'
                    }`}>
                      <span className={`text-sm font-semibold ${
                        darkMode ? 'text-orange-300' : 'text-orange-700'
                      }`}>
                        Start Learning
                      </span>
                      <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                        darkMode ? 'text-orange-400' : 'text-orange-600'
                      }`} />
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${lang.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning Features */}
      <section className={`py-20 px-4 ${
        darkMode ? 'bg-linear-to-b from-transparent to-orange-900/10' : 'bg-linear-to-b from-transparent to-orange-50/50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              What you'll get with each language
            </h2>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Comprehensive resources for every learning style
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Play,
                title: 'Video Lessons',
                desc: 'Curated YouTube channels and playlists'
              },
              {
                icon: MessageCircle,
                title: 'Native Speakers',
                desc: 'Connect with language partners'
              },
              {
                icon: BookOpen,
                title: 'Study Materials',
                desc: 'PDFs, guides, and structured courses'
              },
              {
                icon: Award,
                title: 'Progress Tracking',
                desc: 'Monitor your learning journey'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className={`p-6 rounded-2xl border transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' 
                    : 'bg-linear-to-br from-orange-100 to-red-100'
                }`}>
                  <feature.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  darkMode ? 'text-orange-50' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 ${
        darkMode ? 'bg-linear-to-br from-orange-900/20 to-red-900/10' : 'bg-linear-to-br from-orange-50 to-red-50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
            darkMode 
              ? 'bg-linear-to-br from-orange-500/30 to-red-600/30' 
              : 'bg-linear-to-br from-orange-200 to-red-200'
          }`}>
            <Sparkles className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Ready to start your journey?
          </h2>
          
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Join thousands of learners mastering Indian languages through real conversations 
            and curated resources.
          </p>

          <Link
            href="/matches"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base
            bg-linear-to-r from-orange-500 to-red-600 text-white
            hover:shadow-xl hover:scale-105 transition-all"
          >
            Find Learning Partner
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className={`mt-6 text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
            Start conversations • Practice daily
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}