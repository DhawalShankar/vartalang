import { useState } from 'react';
import { Users, Globe, MessageCircle, User, Mail, Lock, ArrowRight, MapPin, BookOpen, Shield } from 'lucide-react';

const VartaLang = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [authMode, setAuthMode] = useState('signup');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    language: '',
    location: '',
    level: '',
    availability: ''
  });
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    password: '',
    nativeLanguages: [],
    learningLanguages: [],
    proficiency: 'beginner',
    city: '',
    interests: [],
    availability: 'flexible',
    isPremium: false
  });

  // Comprehensive language list
  const indianLanguages = [
    'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil',
    'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam',
    'Punjabi', 'Assamese', 'Maithili', 'Sanskrit', 'Konkani',
    'Nepali', 'Sindhi', 'Dogri', 'Kashmiri', 'Manipuri'
  ];

  const foreignLanguages = [
    'English', 'Spanish', 'French', 'German', 'Mandarin',
    'Japanese', 'Korean', 'Arabic', 'Russian', 'Portuguese',
    'Italian', 'Dutch', 'Turkish', 'Thai', 'Vietnamese'
  ];

  const allLanguages = [...indianLanguages, ...foreignLanguages].sort();

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner (A1-A2)', desc: 'Just starting out' },
    { value: 'intermediate', label: 'Intermediate (B1-B2)', desc: 'Comfortable with basics' },
    { value: 'advanced', label: 'Advanced (C1-C2)', desc: 'Fluent speaker' },
    { value: 'native', label: 'Native', desc: 'Mother tongue' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-rose-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-linear-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  VārtāLang
                </h1>
                <p className="text-xs text-gray-600">Language Bridge of India</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => { setAuthMode('login'); setCurrentView('auth'); }}
                className="px-6 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => { setAuthMode('signup'); setCurrentView('auth'); }}
                className="px-6 py-2 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
              🇮🇳 India's Premier Language Exchange Platform
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connect, Learn & Grow Through{' '}
            <span className="bg-linear-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Languages
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Exchange languages with native speakers across India and the world. Learn regional languages, 
            share your culture, and build meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setAuthMode('signup'); setCurrentView('auth'); }}
              className="px-8 py-4 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-xl text-lg font-semibold hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowPricingModal(true)}
              className="px-8 py-4 bg-white text-orange-600 border-2 border-orange-200 rounded-xl text-lg font-semibold hover:border-orange-400 transition-all"
            >
              View Premium Plans
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-orange-600">35+</div>
              <div className="text-gray-600 text-sm">Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">10k+</div>
              <div className="text-gray-600 text-sm">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">50k+</div>
              <div className="text-gray-600 text-sm">Exchanges Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose VārtāLang?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            India's most comprehensive language exchange platform with features designed for serious learners
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-orange-100">
            <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">35+ Languages</h4>
            <p className="text-gray-600 text-sm">
              All major Indian regional languages plus popular foreign languages
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-orange-100">
            <div className="w-14 h-14 bg-linear-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Smart Matching</h4>
            <p className="text-gray-600 text-sm">
              AI-powered algorithm finds your perfect language exchange partner
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-orange-100">
            <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Learning Resources</h4>
            <p className="text-gray-600 text-sm">
              Curated collection of best resources from across the internet
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-orange-100">
            <div className="w-14 h-14 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Verified Partners</h4>
            <p className="text-gray-600 text-sm">
              Premium program with verified members and trusted connections
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Create Profile</h4>
              <p className="text-gray-600 text-sm">
                Set your native and learning languages, interests, and availability
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Find Partners</h4>
              <p className="text-gray-600 text-sm">
                Get matched with native speakers who want to learn your language
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Start Learning</h4>
              <p className="text-gray-600 text-sm">
                Chat, video call, and exchange knowledge with your partners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-linear-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-4xl font-bold mb-4">Ready to Start Your Language Journey?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners connecting across India and beyond
          </p>
          <button
            onClick={() => { setAuthMode('signup'); setCurrentView('auth'); }}
            className="px-8 py-4 bg-white text-orange-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg inline-flex items-center space-x-2"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">VārtāLang</span>
          </div>
          <p className="text-gray-400 mb-4">Building bridges through languages</p>
          <p className="text-sm text-gray-500">© 2024 VārtāLang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );

  if (currentView === 'landing') {
    return <LandingPage />;
  }

  if (currentView === 'auth') {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 bg-linear-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  VārtāLang
                </h1>
                <p className="text-xs text-gray-600">Language Bridge of India</p>
              </div>
            </div>
            <p className="text-gray-600">
              {authMode === 'signup' ? 'Begin your language journey today' : 'Welcome back to VārtāLang'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  authMode === 'signup'
                    ? 'bg-linear-to-r from-orange-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  authMode === 'login'
                    ? 'bg-linear-to-r from-orange-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Login
              </button>
            </div>

            <div className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={userProfile.password}
                      onChange={(e) => setUserProfile({...userProfile, password: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {authMode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={userProfile.city}
                          onChange={(e) => setUserProfile({...userProfile, city: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Your city"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        I speak (Native Languages)
                      </label>
                      <select
                        value={userProfile.nativeLanguages[0] || ''}
                        onChange={(e) => setUserProfile({...userProfile, nativeLanguages: [e.target.value]})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select your native language</option>
                        {allLanguages.map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        I want to learn
                      </label>
                      <select
                        value={userProfile.learningLanguages[0] || ''}
                        onChange={(e) => setUserProfile({...userProfile, learningLanguages: [e.target.value]})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select language to learn</option>
                        {allLanguages.map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Proficiency Level
                      </label>
                      <select
                        value={userProfile.proficiency}
                        onChange={(e) => setUserProfile({...userProfile, proficiency: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {proficiencyLevels.map(level => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Availability
                      </label>
                      <select
                        value={userProfile.availability}
                        onChange={(e) => setUserProfile({...userProfile, availability: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="flexible">Flexible</option>
                        <option value="mornings">Mornings</option>
                        <option value="evenings">Evenings</option>
                        <option value="weekends">Weekends</option>
                      </select>
                    </div>
                  </>
                )}

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <span>{authMode === 'signup' ? 'Create Account' : 'Login'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

          </div>

          <button
            onClick={() => setCurrentView('landing')}
            className="mt-6 w-full text-center text-orange-600 hover:underline text-sm"
          >
            ← Back to Home
          </button>

        </div>
      </div>
    );
  }

  return <div />;
};

export default VartaLang;