import React, { useState } from 'react';
import { Users, Globe, MessageCircle, User, Mail, Lock, ArrowRight } from 'lucide-react';

const VartaApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [authMode, setAuthMode] = useState('signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nativeLanguage: '',
    learningLanguage: '',
    proficiency: 'beginner'
  });

  const indianLanguages = [
    'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil',
    'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam',
    'Punjabi', 'Assamese', 'Sanskrit', 'English'
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner - शुरुआती' },
    { value: 'intermediate', label: 'Intermediate - मध्यम' },
    { value: 'advanced', label: 'Advanced - उन्नत' }
  ];

  const mockMatches = [
    { id: 1, name: 'Priya Sharma', native: 'Hindi', learning: 'Tamil', level: 'Intermediate', city: 'Mumbai' },
    { id: 2, name: 'Arjun Reddy', native: 'Telugu', learning: 'Hindi', level: 'Beginner', city: 'Hyderabad' },
    { id: 3, name: 'Kavya Menon', native: 'Malayalam', learning: 'Hindi', level: 'Advanced', city: 'Kochi' },
    { id: 4, name: 'Rahul Gupta', native: 'Bengali', learning: 'Tamil', level: 'Intermediate', city: 'Kolkata' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'signup' && formData.nativeLanguage && formData.learningLanguage) {
      setCurrentView('matches');
    } else if (authMode === 'login') {
      setCurrentView('matches');
    }
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">VārtāLang</h1>
          </div>
          <button
            onClick={() => { setAuthMode('login'); setCurrentView('auth'); }}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Login
          </button>
        </header>

        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Connect Through <span className="text-orange-600">Languages</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Exchange languages, share cultures, and build meaningful connections across India
          </p>
          <button
            onClick={() => { setAuthMode('signup'); setCurrentView('auth'); }}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">14+ Indian Languages</h3>
            <p className="text-gray-600">Connect with speakers of Hindi, Tamil, Bengali, and many more</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Matching</h3>
            <p className="text-gray-600">Find partners who speak what you learn and learn what you speak</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Conversations</h3>
            <p className="text-gray-600">Practice through authentic dialogue with native speakers</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AuthPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">VārtāLang</h1>
          </div>
          <p className="text-gray-600">
            {authMode === 'signup' ? 'Begin your language journey' : 'Welcome back'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                authMode === 'signup'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                authMode === 'login'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
          </div>

          <div className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your name"
                    required
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {authMode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I speak (Native Language)
                  </label>
                  <select
                    name="nativeLanguage"
                    value={formData.nativeLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select language</option>
                    {indianLanguages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I want to learn
                  </label>
                  <select
                    name="learningLanguage"
                    value={formData.learningLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select language</option>
                    {indianLanguages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Proficiency
                  </label>
                  <select
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {proficiencyLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
            >
              {authMode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('landing')}
          className="mt-6 w-full text-center text-gray-600 hover:text-gray-800"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );

  const MatchesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">VārtāLang</h1>
          </div>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Language Profile</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">I speak</p>
              <p className="text-xl font-semibold text-orange-700">
                {formData.nativeLanguage || 'Hindi'}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Learning</p>
              <p className="text-xl font-semibold text-red-700">
                {formData.learningLanguage || 'Tamil'}
              </p>
            </div>
          </div>
        </div>

        {/* Matches Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Matches</h2>
          <span className="text-sm text-gray-600">{mockMatches.length} partners found</span>
        </div>

        {/* Match Cards */}
        <div className="space-y-4">
          {mockMatches.map(match => (
            <div
              key={match.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {match.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{match.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{match.city}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        Speaks: {match.native}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Learning: {match.learning}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {match.level}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-sm hover:shadow-md">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased">
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'auth' && <AuthPage />}
      {currentView === 'matches' && <MatchesPage />}
    </div>
  );
};

export default VartaApp;