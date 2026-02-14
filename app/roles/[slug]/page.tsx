"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Briefcase,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Users,
  Building2,
  Languages,
  CheckCircle,
  Target,
  Lightbulb,
  BookOpen,
  Award,
  ExternalLink,
  Share2,
  Bookmark,
  Sparkles,
  Rocket,
  Clock,
  MapPin
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

export default function RoleDetailPage() {
  const { darkMode } = useDarkMode();
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [roleData, setRoleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Fetch role data from backend
  useEffect(() => {
    if (!slug || isAuthenticating) return;

    const fetchRoleData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Replace with your actual API endpoint
        const response = await fetch(`/api/roles/${slug}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch role data');
        }

        const data = await response.json();
        setRoleData(data);
      } catch (err) {
        console.error('Error fetching role:', err);
        setError('Failed to load role details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoleData();
  }, [slug, isAuthenticating]);

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

  // Show loading state
  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>Loading role details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !roleData) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              darkMode ? 'bg-red-900/20' : 'bg-red-50'
            }`}>
              <ExternalLink className={`w-10 h-10 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Role Not Found
            </h1>
            <p className={`text-lg mb-8 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              {error || 'The role you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <Link
              href="/targets"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold
              bg-linear-to-r from-orange-500 to-red-600 text-white
              hover:shadow-xl hover:scale-105 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Roles
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get icon component from roleData
  const RoleIcon = roleData.icon || Briefcase;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/30'
        }`}></div>
        <div className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl ${
          darkMode ? 'bg-red-900/20' : 'bg-red-200/30'
        }`}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back Button */}
          <Link
            href="/targets"
            className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full font-medium transition-all ${
              darkMode 
                ? 'text-orange-300 hover:bg-orange-900/20' 
                : 'text-orange-700 hover:bg-orange-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Roles
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Icon */}
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 ${
              darkMode 
                ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' 
                : 'bg-linear-to-br from-orange-100 to-red-100'
            }`}>
              <RoleIcon className={`w-12 h-12 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>

            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  roleData.demand === 'Very High' 
                    ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                    : roleData.demand === 'High'
                    ? darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                    : darkMode ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {roleData.demand === 'Very High' ? '🔥' : roleData.demand === 'High' ? '📈' : '💼'} {roleData.demand} Demand
                </span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                }`}>
                  {roleData.category.charAt(0).toUpperCase() + roleData.category.slice(1)}
                </span>
              </div>

              {/* Title */}
              <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                {roleData.title}
              </h1>
              <p className={`text-2xl mb-4 ${
                darkMode ? 'text-orange-300' : 'text-orange-600'
              }`}>
                {roleData.nativeTitle}
              </p>

              {/* Description */}
              <p className={`text-lg mb-6 leading-relaxed ${
                darkMode ? 'text-orange-200/80' : 'text-gray-600'
              }`}>
                {roleData.description}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <DollarSign className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <span className={`font-semibold ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                    {roleData.salary}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <span className={`font-semibold ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                    {roleData.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 shrink-0">
              <button className={`p-3 rounded-xl transition-all ${
                darkMode 
                  ? 'bg-orange-900/20 text-orange-300 hover:bg-orange-900/30' 
                  : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
              }`}>
                <Bookmark className="w-5 h-5" />
              </button>
              <button className={`p-3 rounded-xl transition-all ${
                darkMode 
                  ? 'bg-orange-900/20 text-orange-300 hover:bg-orange-900/30' 
                  : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
              }`}>
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Skills */}
              <div className={`p-8 rounded-2xl border ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30' 
                  : 'bg-white border-orange-100'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                  }`}>
                    <CheckCircle className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    Key Skills Required
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {roleData.skills?.map((skill: string, idx: number) => (
                    <div 
                      key={idx}
                      className={`flex items-start gap-3 p-4 rounded-xl ${
                        darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
                      }`}
                    >
                      <Sparkles className={`w-5 h-5 mt-0.5 shrink-0 ${
                        darkMode ? 'text-orange-400' : 'text-orange-600'
                      }`} />
                      <span className={`font-medium ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className={`p-8 rounded-2xl border ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30' 
                  : 'bg-white border-orange-100'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                  }`}>
                    <Languages className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    Languages You'll Work With
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {roleData.languages?.map((language: string, idx: number) => (
                    <span 
                      key={idx}
                      className={`px-4 py-2 rounded-xl font-medium ${
                        darkMode ? 'bg-blue-900/20 text-blue-200' : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Path & Growth */}
              {roleData.careerPath && (
                <div className={`p-8 rounded-2xl border ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
                    }`}>
                      <Rocket className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      Career Growth Path
                    </h2>
                  </div>
                  <p className={`leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    {roleData.careerPath}
                  </p>
                </div>
              )}

              {/* Day in the Life */}
              {roleData.dayInLife && (
                <div className={`p-8 rounded-2xl border ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode ? 'bg-green-500/20' : 'bg-green-100'
                    }`}>
                      <Clock className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      A Day in the Life
                    </h2>
                  </div>
                  <p className={`leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    {roleData.dayInLife}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hiring Companies */}
              <div className={`p-6 rounded-2xl border ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30' 
                  : 'bg-white border-orange-100'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    Top Hiring Companies
                  </h3>
                </div>
                <div className="space-y-2">
                  {roleData.companies?.map((company: string, idx: number) => (
                    <div 
                      key={idx}
                      className={`px-4 py-2.5 rounded-lg ${
                        darkMode ? 'bg-orange-900/20 text-orange-100' : 'bg-orange-50 text-gray-900'
                      }`}
                    >
                      {company}
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Resources */}
              <div className={`p-6 rounded-2xl border ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30' 
                  : 'bg-white border-orange-100'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    Start Learning
                  </h3>
                </div>
                <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Build the skills needed for this role
                </p>
                <Link
                  href="/learn"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold
                  bg-linear-to-r from-orange-500 to-red-600 text-white
                  hover:shadow-xl hover:scale-105 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  Browse Courses
                </Link>
              </div>

              {/* Find Mentors */}
              <div className={`p-6 rounded-2xl border ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30' 
                  : 'bg-white border-orange-100'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Users className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    Find Mentors
                  </h3>
                </div>
                <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Connect with professionals in this field
                </p>
                <Link
                  href="/matches"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all hover:scale-105 ${
                    darkMode 
                      ? 'border-orange-400 text-orange-300 hover:bg-orange-900/20' 
                      : 'border-orange-600 text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Find Matches
                </Link>
              </div>

              {/* Quick Facts */}
              {roleData.quickFacts && (
                <div className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      Quick Facts
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {roleData.quickFacts.map((fact: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 mt-1 shrink-0 ${
                          darkMode ? 'text-green-400' : 'text-green-600'
                        }`} />
                        <span className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          {fact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
            <Target className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Ready to pursue this career?
          </h2>
          
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Start building the skills and connections you need to land your dream role.
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
            </Link>

            <Link
              href="/targets"
              className={`inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-semibold text-base border-2 transition-all hover:scale-105 ${
                darkMode 
                  ? 'border-orange-400 text-orange-300 hover:bg-orange-900/20' 
                  : 'border-orange-600 text-orange-700 hover:bg-orange-50'
              }`}
            >
              Explore More Roles
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}