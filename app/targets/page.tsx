"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Search,
  TrendingUp,
  Award,
  Users,
  BookOpen,
  Target,
  Mic,
  Tv,
  Edit3,
  FileText,
  Radio,
  Newspaper,
  Languages,
  Building2,
  GraduationCap,
  Headphones,
  Video,
  MessageSquare,
  PenTool,
  Film,
  Mail,
  Phone,
  BadgeCheck,
  Lightbulb,
  Rocket,
  Heart,
  Scale
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

export default function TargetRolesPage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
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

  const roles = [
    // Media & Broadcasting
    {
      title: 'Regional Radio Jockey (RJ)',
      nativeTitle: 'रेडियो जॉकी',
      slug: 'regional-radio-jockey',
      icon: Radio,
      category: 'media',
      level: 'Intermediate',
      salary: '₹3-8 LPA',
      demand: 'High',
      color: 'from-purple-500 to-pink-500',
      description: 'Host radio shows, engage audiences, and entertain in regional languages',
      skills: ['Voice Modulation', 'Script Writing', 'Audience Engagement', 'Improvisation'],
      companies: ['All India Radio', 'Radio Mirchi', 'Big FM', 'Red FM'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali']
    },
    {
      title: 'News Reader/Anchor',
      nativeTitle: 'समाचार वाचक',
      slug: 'news-reader-anchor',
      icon: Tv,
      category: 'media',
      level: 'Intermediate',
      salary: '₹4-12 LPA',
      demand: 'Very High',
      color: 'from-red-500 to-orange-600',
      description: 'Present news bulletins on regional television channels with clarity',
      skills: ['Diction', 'On-Camera Presence', 'News Writing', 'Current Affairs'],
      companies: ['Aaj Tak', 'News18', 'TV9', 'ABP News', 'Zee News'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Marathi', 'Bengali', 'Gujarati']
    },
    {
      title: 'Video Content Creator',
      nativeTitle: 'वीडियो निर्माता',
      slug: 'video-content-creator',
      icon: Video,
      category: 'media',
      level: 'Beginner',
      salary: '₹2-10 LPA',
      demand: 'Very High',
      color: 'from-blue-500 to-cyan-500',
      description: 'Create engaging regional content for YouTube, Instagram, and OTT platforms',
      skills: ['Video Editing', 'Storytelling', 'Social Media', 'Audience Building'],
      companies: ['YouTube', 'Instagram', 'Josh', 'MX TakaTak', 'ShareChat'],
      languages: ['All Regional Languages', 'Hindi', 'English']
    },
    {
      title: 'Voice-over Artist',
      nativeTitle: 'आवाज कलाकार',
      slug: 'voice-over-artist',
      icon: Headphones,
      category: 'media',
      level: 'Intermediate',
      salary: '₹3-15 LPA',
      demand: 'High',
      color: 'from-indigo-500 to-purple-600',
      description: 'Provide voice for documentaries, ads, animations, and dubbed content',
      skills: ['Voice Control', 'Emotion Delivery', 'Multiple Accents', 'Studio Recording'],
      companies: ['Audible', 'Netflix', 'Amazon Prime', 'Hotstar', 'Dubbing Studios'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali']
    },

    // Publishing & Editorial
    {
      title: 'Regional Newspaper Editor',
      nativeTitle: 'समाचार पत्र संपादक',
      slug: 'regional-newspaper-editor',
      icon: Newspaper,
      category: 'editorial',
      level: 'Advanced',
      salary: '₹5-18 LPA',
      demand: 'Moderate',
      color: 'from-gray-600 to-gray-800',
      description: 'Oversee editorial content, manage reporters, and ensure quality journalism',
      skills: ['Editorial Judgment', 'Team Management', 'AP Style', 'Fact-Checking'],
      companies: ['Dainik Jagran', 'Amar Ujala', 'Dinamalar', 'Eenadu', 'Anandabazar'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Malayalam']
    },
    {
      title: 'Content Writer/Copywriter',
      nativeTitle: 'विषय लेखक',
      slug: 'content-writer-copywriter',
      icon: PenTool,
      category: 'editorial',
      level: 'Beginner',
      salary: '₹3-10 LPA',
      demand: 'Very High',
      color: 'from-teal-500 to-green-500',
      description: 'Craft compelling marketing copy, blogs, and content in regional languages',
      skills: ['Creative Writing', 'SEO', 'Brand Voice', 'Persuasive Writing'],
      companies: ['Swiggy', 'Zomato', 'Flipkart', 'Meesho', 'Digital Agencies'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi']
    },
    {
      title: 'Script Writer',
      nativeTitle: 'पटकथा लेखक',
      slug: 'script-writer',
      icon: Edit3,
      category: 'editorial',
      level: 'Intermediate',
      salary: '₹4-20 LPA',
      demand: 'High',
      color: 'from-yellow-500 to-orange-500',
      description: 'Write scripts for films, web series, TV shows in regional languages',
      skills: ['Storytelling', 'Dialogue Writing', 'Character Development', 'Scene Structure'],
      companies: ['Yash Raj Films', 'Netflix India', 'Amazon Prime', 'Hotstar', 'Zee5'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Marathi']
    },
    {
      title: 'Subtitler/Translator',
      nativeTitle: 'उपशीर्षक अनुवादक',
      slug: 'subtitler-translator',
      icon: FileText,
      category: 'editorial',
      level: 'Beginner',
      salary: '₹2-8 LPA',
      demand: 'High',
      color: 'from-pink-500 to-rose-500',
      description: 'Create accurate subtitles and translations for multimedia content',
      skills: ['Translation', 'Time-coding', 'Cultural Adaptation', 'Attention to Detail'],
      companies: ['Netflix', 'Amazon Prime', 'Disney+ Hotstar', 'Iyuno', 'ZOO Digital'],
      languages: ['All Major Indian Languages', 'English', 'Hindi']
    },

    // International & Diplomatic
    {
      title: 'UN Interpreter',
      nativeTitle: 'संयुक्त राष्ट्र दुभाषिया',
      slug: 'un-interpreter',
      icon: Languages,
      category: 'international',
      level: 'Advanced',
      salary: '₹8-25 LPA',
      demand: 'Moderate',
      color: 'from-blue-600 to-indigo-700',
      description: 'Provide simultaneous interpretation at international conferences',
      skills: ['Simultaneous Interpretation', 'Diplomacy', 'Cultural Knowledge', 'Mental Agility'],
      companies: ['United Nations', 'WHO', 'UNESCO', 'International NGOs'],
      languages: ['English', 'Hindi', 'French', 'Spanish', 'Arabic', 'Chinese']
    },
    {
      title: 'Embassy/Consulate Officer',
      nativeTitle: 'राजदूतावास अधिकारी',
      slug: 'embassy-consulate-officer',
      icon: Building2,
      category: 'international',
      level: 'Advanced',
      salary: '₹6-20 LPA',
      demand: 'Low',
      color: 'from-emerald-600 to-teal-700',
      description: 'Facilitate diplomatic relations, visa processing, and cultural exchange',
      skills: ['Diplomatic Protocol', 'Cross-Cultural Communication', 'Administration', 'Public Relations'],
      companies: ['Ministry of External Affairs', 'Foreign Embassies', 'High Commissions'],
      languages: ['English', 'Hindi', 'French', 'German', 'Japanese', 'Mandarin']
    },
    {
      title: 'International Tour Guide',
      nativeTitle: 'अंतर्राष्ट्रीय पर्यटन गाइड',
      slug: 'international-tour-guide',
      icon: Globe,
      category: 'international',
      level: 'Intermediate',
      salary: '₹3-12 LPA',
      demand: 'High',
      color: 'from-orange-500 to-red-500',
      description: 'Guide international tourists and share cultural heritage in their languages',
      skills: ['Multilingual Communication', 'History Knowledge', 'Customer Service', 'Storytelling'],
      companies: ['Thomas Cook', 'Cox & Kings', 'MakeMyTrip', 'Independent'],
      languages: ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese']
    },
    {
      title: 'Foreign Language Trainer',
      nativeTitle: 'विदेशी भाषा प्रशिक्षक',
      slug: 'foreign-language-trainer',
      icon: GraduationCap,
      category: 'international',
      level: 'Intermediate',
      salary: '₹4-15 LPA',
      demand: 'High',
      color: 'from-purple-600 to-pink-600',
      description: 'Teach foreign languages to corporate clients, students, and professionals',
      skills: ['Teaching Methodology', 'Curriculum Design', 'Assessment', 'Cultural Training'],
      companies: ['British Council', 'Alliance Française', 'Goethe-Institut', 'Universities'],
      languages: ['English', 'French', 'German', 'Spanish', 'Japanese', 'Mandarin']
    },

    // Corporate & Technology
    {
      title: 'Localization Specialist',
      nativeTitle: 'स्थानीयकरण विशेषज्ञ',
      slug: 'localization-specialist',
      icon: Target,
      category: 'corporate',
      level: 'Intermediate',
      salary: '₹5-18 LPA',
      demand: 'Very High',
      color: 'from-cyan-500 to-blue-600',
      description: 'Adapt software, apps, and content for regional markets',
      skills: ['Translation', 'Cultural Adaptation', 'QA Testing', 'Project Management'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'PhonePe'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Kannada']
    },
    {
      title: 'Regional Marketing Manager',
      nativeTitle: 'क्षेत्रीय विपणन प्रबंधक',
      slug: 'regional-marketing-manager',
      icon: TrendingUp,
      category: 'corporate',
      level: 'Advanced',
      salary: '₹8-25 LPA',
      demand: 'Very High',
      color: 'from-green-500 to-emerald-600',
      description: 'Lead marketing campaigns targeting regional language audiences',
      skills: ['Market Research', 'Campaign Strategy', 'Budget Management', 'Team Leadership'],
      companies: ['Unilever', 'P&G', 'Amazon', 'Flipkart', 'Swiggy'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Regional']
    },
    {
      title: 'Customer Support (Multilingual)',
      nativeTitle: 'ग्राहक सेवा प्रतिनिधि',
      slug: 'customer-support-multilingual',
      icon: Headphones,
      category: 'corporate',
      level: 'Beginner',
      salary: '₹2-6 LPA',
      demand: 'Very High',
      color: 'from-blue-400 to-indigo-500',
      description: 'Provide customer assistance in multiple Indian languages',
      skills: ['Communication', 'Problem-Solving', 'Empathy', 'Product Knowledge'],
      companies: ['Amazon', 'Flipkart', 'Zomato', 'Swiggy', 'Ola', 'Uber'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali']
    },
    {
      title: 'Technical Writer (Regional)',
      nativeTitle: 'तकनीकी लेखक',
      slug: 'technical-writer-regional',
      icon: BookOpen,
      category: 'corporate',
      level: 'Intermediate',
      salary: '₹4-12 LPA',
      demand: 'High',
      color: 'from-slate-500 to-gray-600',
      description: 'Create user manuals, documentation, and help content in regional languages',
      skills: ['Technical Writing', 'Information Architecture', 'Translation', 'User Research'],
      companies: ['Microsoft', 'Google', 'SAP', 'Salesforce', 'Tech Companies'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi']
    },

    // Entertainment & Creative
    {
      title: 'Film Dialogue Writer',
      nativeTitle: 'संवाद लेखक',
      slug: 'film-dialogue-writer',
      icon: Film,
      category: 'entertainment',
      level: 'Intermediate',
      salary: '₹5-30 LPA',
      demand: 'Moderate',
      color: 'from-red-600 to-pink-600',
      description: 'Craft impactful dialogues for regional cinema',
      skills: ['Creative Writing', 'Regional Idioms', 'Character Voice', 'Punchlines'],
      companies: ['Bollywood Studios', 'Tollywood', 'Kollywood', 'Production Houses'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Marathi']
    },
    {
      title: 'Lyricist',
      nativeTitle: 'गीतकार',
      slug: 'lyricist',
      icon: Mic,
      category: 'entertainment',
      level: 'Advanced',
      salary: '₹3-50 LPA',
      demand: 'Moderate',
      color: 'from-purple-500 to-indigo-600',
      description: 'Write songs for films, albums, and digital platforms',
      skills: ['Poetry', 'Rhythm & Meter', 'Emotional Expression', 'Music Knowledge'],
      companies: ['T-Series', 'Sony Music', 'Zee Music', 'Film Production Houses'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Punjabi', 'Bengali', 'Marathi']
    },
    {
      title: 'Stand-up Comedian',
      nativeTitle: 'स्टैंड-अप कॉमेडियन',
      slug: 'stand-up-comedian',
      icon: MessageSquare,
      category: 'entertainment',
      level: 'Intermediate',
      salary: '₹2-20 LPA',
      demand: 'High',
      color: 'from-yellow-400 to-orange-500',
      description: 'Perform comedy shows in regional languages',
      skills: ['Humor Writing', 'Stage Presence', 'Improvisation', 'Audience Reading'],
      companies: ['Amazon Prime', 'Netflix', 'Comedy Clubs', 'Independent'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi']
    },
    {
      title: 'Podcast Host/Producer',
      nativeTitle: 'पॉडकास्ट होस्ट',
      slug: 'podcast-host-producer',
      icon: Radio,
      category: 'entertainment',
      level: 'Beginner',
      salary: '₹2-10 LPA',
      demand: 'Very High',
      color: 'from-green-400 to-teal-500',
      description: 'Create and host podcasts on diverse topics in regional languages',
      skills: ['Audio Editing', 'Interviewing', 'Research', 'Storytelling'],
      companies: ['Spotify', 'Apple Podcasts', 'Independent', 'IVM Podcasts'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'English', 'Bengali', 'Kannada']
    },

    // Accessibility & Inclusion
    {
      title: 'ISL (Indian Sign Language) Interpreter',
      nativeTitle: 'संकेत भाषा दुभाषिया',
      slug: 'isl-interpreter',
      icon: Users,
      category: 'accessibility',
      level: 'Advanced',
      salary: '₹3-12 LPA',
      demand: 'High',
      color: 'from-blue-500 to-purple-600',
      description: 'Facilitate communication for the deaf and hard-of-hearing community',
      skills: ['ISL Fluency', 'Quick Interpretation', 'Empathy', 'Cultural Sensitivity'],
      companies: ['Government Offices', 'Educational Institutions', 'News Channels', 'NGOs'],
      languages: ['ISL', 'Hindi', 'English', 'Regional Languages']
    },
    {
      title: 'Braille Transcriber',
      nativeTitle: 'ब्रेल लिपिकार',
      slug: 'braille-transcriber',
      icon: BookOpen,
      category: 'accessibility',
      level: 'Intermediate',
      salary: '₹2-8 LPA',
      demand: 'Moderate',
      color: 'from-indigo-500 to-blue-600',
      description: 'Convert print materials to Braille for visually impaired readers',
      skills: ['Braille Proficiency', 'Attention to Detail', 'Formatting', 'Proofreading'],
      companies: ['National Association for the Blind', 'Schools for Blind', 'Publishers'],
      languages: ['Braille', 'Hindi', 'English', 'Regional Languages']
    },
    {
      title: 'Accessibility Content Creator',
      nativeTitle: 'सुलभता सामग्री निर्माता',
      slug: 'accessibility-content-creator',
      icon: Heart,
      category: 'accessibility',
      level: 'Intermediate',
      salary: '₹4-14 LPA',
      demand: 'High',
      color: 'from-pink-500 to-rose-600',
      description: 'Develop inclusive content with captions, audio descriptions, and accessible formats',
      skills: ['WCAG Standards', 'Captioning', 'Audio Description', 'Inclusive Design'],
      companies: ['Tech Companies', 'OTT Platforms', 'Educational Platforms', 'NGOs'],
      languages: ['English', 'Hindi', 'Regional Languages', 'ISL']
    },

    // Education & Training
    {
      title: 'Regional Language Teacher',
      nativeTitle: 'भाषा शिक्षक',
      slug: 'regional-language-teacher',
      icon: GraduationCap,
      category: 'education',
      level: 'Intermediate',
      salary: '₹3-10 LPA',
      demand: 'High',
      color: 'from-teal-600 to-cyan-600',
      description: 'Teach regional languages in schools, colleges, and coaching centers',
      skills: ['Teaching Methods', 'Curriculum Planning', 'Student Assessment', 'Communication'],
      companies: ['CBSE Schools', 'State Boards', 'Language Institutes', 'EdTech'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Sanskrit', 'Bengali', 'All Regional']
    },
    {
      title: 'E-Learning Content Developer',
      nativeTitle: 'ई-लर्निंग सामग्री निर्माता',
      slug: 'elearning-content-developer',
      icon: Lightbulb,
      category: 'education',
      level: 'Intermediate',
      salary: '₹4-15 LPA',
      demand: 'Very High',
      color: 'from-amber-500 to-orange-600',
      description: 'Create educational content for apps and platforms in regional languages',
      skills: ['Instructional Design', 'Video Production', 'Animation', 'Subject Knowledge'],
      companies: ['BYJU\'S', 'Unacademy', 'Vedantu', 'Khan Academy', 'Coursera'],
      languages: ['Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Kannada']
    },
    {
      title: 'Language Assessment Specialist',
      nativeTitle: 'भाषा मूल्यांकन विशेषज्ञ',
      slug: 'language-assessment-specialist',
      icon: BadgeCheck,
      category: 'education',
      level: 'Advanced',
      salary: '₹5-18 LPA',
      demand: 'Moderate',
      color: 'from-violet-500 to-purple-600',
      description: 'Design language proficiency tests and evaluate learners',
      skills: ['Test Design', 'Psychometrics', 'Evaluation', 'Research'],
      companies: ['British Council', 'Cambridge', 'Educational Testing Services', 'Universities'],
      languages: ['English', 'Hindi', 'Regional Languages']
    },

    // Government & Public Sector
    {
      title: 'Official Language Officer',
      nativeTitle: 'राजभाषा अधिकारी',
      slug: 'official-language-officer',
      icon: Building2,
      category: 'government',
      level: 'Advanced',
      salary: '₹6-15 LPA',
      demand: 'Moderate',
      color: 'from-blue-700 to-indigo-800',
      description: 'Promote use of Hindi and regional languages in government offices',
      skills: ['Policy Implementation', 'Translation', 'Administration', 'Documentation'],
      companies: ['Central Government', 'State Governments', 'PSUs', 'Banks'],
      languages: ['Hindi', 'English', 'Regional Languages']
    },
    {
      title: 'Court Interpreter',
      nativeTitle: 'न्यायालय दुभाषिया',
      slug: 'court-interpreter',
      icon: Scale,
      category: 'government',
      level: 'Advanced',
      salary: '₹4-12 LPA',
      demand: 'Moderate',
      color: 'from-gray-700 to-slate-800',
      description: 'Provide accurate interpretation during legal proceedings',
      skills: ['Legal Terminology', 'Accuracy', 'Confidentiality', 'Quick Thinking'],
      companies: ['District Courts', 'High Courts', 'Supreme Court', 'Legal Firms'],
      languages: ['Hindi', 'English', 'Regional Languages']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: Briefcase },
    { value: 'media', label: 'Media & Broadcasting', icon: Tv },
    { value: 'editorial', label: 'Publishing & Editorial', icon: Edit3 },
    { value: 'international', label: 'International & Diplomatic', icon: Globe },
    { value: 'corporate', label: 'Corporate & Tech', icon: Building2 },
    { value: 'entertainment', label: 'Entertainment', icon: Film },
    { value: 'accessibility', label: 'Accessibility & Inclusion', icon: Heart },
    { value: 'education', label: 'Education & Training', icon: GraduationCap },
    { value: 'government', label: 'Government & Public', icon: BadgeCheck }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Entry Level' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         role.nativeTitle.includes(searchQuery) ||
                         role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || role.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || role.category === selectedCategory;
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
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-semibold">Language-Powered Careers</span>
          </div>

          {/* Headline */}
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Turn your language skills
            <br />
            into a
            <span className={` bg-clip-text text-transparent bg-linear-to-r ${
              darkMode ? 'from-orange-400 to-red-400' : 'from-orange-600 to-red-600'
            }`}>
              {' '}thriving career
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Discover 30+ exciting career paths where your multilingual abilities become your superpower.
            From media to diplomacy, from tech to entertainment—your language journey starts here.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { icon: Briefcase, label: '30+ Career Paths', value: 'Explored' },
              { icon: TrendingUp, label: 'High Growth', value: 'Sectors' },
              { icon: Award, label: 'Competitive', value: 'Salaries' }
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

      {/* Accessibility & Inclusion Highlight */}
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
                  Careers in Accessibility & Inclusion
                </h3>
                <p className={`text-sm ${darkMode ? 'text-blue-200/70' : 'text-gray-700'}`}>
                  Make a difference! Explore roles in ISL interpretation, Braille transcription, and accessible content creation. 
                  Use your language skills to build an inclusive India where everyone has equal access to information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-4 pb-6">
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
                placeholder="Search roles... (e.g., Radio Jockey, Interpreter, Script Writer)"
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
            <div className="flex-1 min-w-75">
              <label className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-orange-300' : 'text-gray-700'
              }`}>
                Industry
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedCategory === cat.value
                        ? darkMode
                          ? 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg'
                          : 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg'
                        : darkMode
                        ? 'bg-orange-900/20 text-orange-200 hover:bg-orange-900/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="min-w-50">
              <label className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-orange-300' : 'text-gray-700'
              }`}>
                Experience Level
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
              Showing <span className="font-bold">{filteredRoles.length}</span> career{filteredRoles.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredRoles.length === 0 ? (
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
                No roles found
              </h3>
              <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoles.map((role, i) => (
                <Link
                  key={i}
                  href={`/roles/${role.slug}`}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] overflow-hidden ${
                    darkMode 
                      ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30 hover:bg-orange-900/20 hover:border-orange-700/50' 
                      : 'bg-white border-orange-100 hover:shadow-2xl hover:border-orange-200'
                  }`}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-linear-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        darkMode ? 'bg-orange-900/30' : 'bg-orange-50'
                      }`}>
                        <role.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                      </div>
                      <div className="flex gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          role.demand === 'Very High' 
                            ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                            : role.demand === 'High'
                            ? darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                            : darkMode ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-50 text-yellow-700'
                        }`}>
                          {role.demand === 'Very High' ? '🔥' : role.demand === 'High' ? '📈' : '💼'} {role.demand}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-1 ${
                      darkMode ? 'text-orange-50' : 'text-gray-900'
                    }`}>
                      {role.title}
                    </h3>
                    <p className={`text-base mb-3 ${
                      darkMode ? 'text-orange-300' : 'text-orange-600'
                    }`}>
                      {role.nativeTitle}
                    </p>

                    {/* Description */}
                    <p className={`text-sm mb-4 leading-relaxed ${
                      darkMode ? 'text-orange-200/70' : 'text-gray-600'
                    }`}>
                      {role.description}
                    </p>

                    {/* Salary & Level */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        darkMode ? 'bg-green-900/20 text-green-300' : 'bg-green-50 text-green-700'
                      }`}>
                        💰 {role.salary}
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        role.level === 'Beginner' 
                          ? darkMode ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-700'
                          : role.level === 'Intermediate'
                          ? darkMode ? 'bg-purple-900/20 text-purple-300' : 'bg-purple-50 text-purple-700'
                          : darkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-700'
                      }`}>
                        {role.level}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <p className={`text-xs font-semibold mb-2 ${
                        darkMode ? 'text-orange-300' : 'text-gray-700'
                      }`}>
                        Key Skills:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills.slice(0, 3).map((skill, idx) => (
                          <span 
                            key={idx}
                            className={`px-2 py-1 rounded-md text-xs ${
                              darkMode ? 'bg-orange-900/20 text-orange-200' : 'bg-orange-50 text-orange-700'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                        {role.skills.length > 3 && (
                          <span 
                            className={`px-2 py-1 rounded-md text-xs ${
                              darkMode ? 'bg-orange-900/20 text-orange-300' : 'bg-orange-50 text-orange-600'
                            }`}
                          >
                            +{role.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <p className={`text-xs font-semibold mb-2 ${
                        darkMode ? 'text-orange-300' : 'text-gray-700'
                      }`}>
                        Languages:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {role.languages.slice(0, 2).map((lang, idx) => (
                          <span 
                            key={idx}
                            className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 ${
                              darkMode ? 'bg-blue-900/20 text-blue-200' : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            <Languages className="w-3 h-3" />
                            {lang}
                          </span>
                        ))}
                        {role.languages.length > 2 && (
                          <span 
                            className={`px-2 py-1 rounded-md text-xs ${
                              darkMode ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-600'
                            }`}
                          >
                            +{role.languages.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Companies */}
                    <div className={`pt-4 border-t ${
                      darkMode ? 'border-orange-800/30' : 'border-orange-100'
                    }`}>
                      <p className={`text-xs font-semibold mb-2 ${
                        darkMode ? 'text-orange-300' : 'text-gray-700'
                      }`}>
                        Hiring Companies:
                      </p>
                      <p className={`text-xs ${
                        darkMode ? 'text-orange-200/70' : 'text-gray-600'
                      }`}>
                        {role.companies.slice(0, 3).join(' • ')}
                        {role.companies.length > 3 && ` • +${role.companies.length - 3} more`}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className={`flex items-center justify-between pt-4 mt-4 border-t ${
                      darkMode ? 'border-orange-800/30' : 'border-orange-100'
                    }`}>
                      <span className={`text-sm font-semibold ${
                        darkMode ? 'text-orange-300' : 'text-orange-700'
                      }`}>
                        Explore Career Path
                      </span>
                      <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                        darkMode ? 'text-orange-400' : 'text-orange-600'
                      }`} />
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${role.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Career Benefits */}
      <section className={`py-20 px-4 ${
        darkMode ? 'bg-linear-to-b from-transparent to-orange-900/10' : 'bg-linear-to-b from-transparent to-orange-50/50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              Why pursue language-based careers?
            </h2>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              The advantages of being multilingual in today's job market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'High Demand',
                desc: 'India\'s digital boom needs regional content creators'
              },
              {
                icon: Rocket,
                title: 'Fast Growth',
                desc: 'Language skills accelerate your career trajectory'
              },
              {
                icon: Globe,
                title: 'Global Opportunities',
                desc: 'Work with international organizations and clients'
              },
              {
                icon: Heart,
                title: 'Cultural Impact',
                desc: 'Preserve and promote India\'s linguistic heritage'
              }
            ].map((benefit, i) => (
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
                  <benefit.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  darkMode ? 'text-orange-50' : 'text-gray-900'
                }`}>
                  {benefit.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {benefit.desc}
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
            Ready to launch your language career?
          </h2>
          
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Start learning today and unlock opportunities in media, technology, diplomacy, and beyond.
            Your multilingual future awaits!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-semibold text-base
              bg-linear-to-r from-orange-500 to-red-600 text-white
              hover:shadow-xl hover:scale-105 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/matches"
              className={`inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-semibold text-base border-2 transition-all hover:scale-105 ${
                darkMode 
                  ? 'border-orange-400 text-orange-300 hover:bg-orange-900/20' 
                  : 'border-orange-600 text-orange-700 hover:bg-orange-50'
              }`}
            >
              <Users className="w-5 h-5" />
              Find Mentors
            </Link>
          </div>

          <p className={`mt-6 text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
            Join 10,000+ learners building language-powered careers
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}