"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Briefcase, Globe, Mail, MapPin, Building2, Clock,
  Search, Filter, X, Plus, Calendar, ExternalLink,
  Languages, Target, Award, TrendingUp, AlertCircle,
  Send, CheckCircle, ArrowRight, Eye, Users, Sparkles,
  BookOpen, MessageSquare, FileText, Zap, Star, Ban,
  ChevronDown, Loader2, Info, Shield
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Type definitions
// Type definitions
interface Job {
  _id: string;
  title: string;
  language: string;
  proficiencyLevel: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
  jobType: 'translation' | 'teaching' | 'interpretation' | 'content' | 'assistance' | 'research' | 'other';
  companyName: string;
  location: string;
  isRemote: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  contactEmail: string;
  postedDate: string;
  expiryDate: string;
  status: 'active' | 'expired';
  views: number;
  // ✅ ADD THESE
  postedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  postedByName?: string;
}

interface JobFormData {
  title: string;
  language: string;
  proficiencyLevel: string;
  jobType: string;
  companyName: string;
  location: string;
  isRemote: boolean;
  description: string;
  responsibilities: string;
  requirements: string;
  contactEmail: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  contactEmail?: string;
  general?: string;
}

export default function VartaLangJobsBoard() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);

  // Form state
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    language: 'Hindi',
    proficiencyLevel: 'Intermediate',
    jobType: 'translation',
    companyName: '',
    location: '',
    isRemote: false,
    description: '',
    responsibilities: '',
    requirements: '',
    contactEmail: ''
  });

  const languages = [
    'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 
    'Marathi', 'Gujarati', 'Malayalam', 'Punjabi', 'Odia',
    'English', 'Urdu', 'Sanskrit', 'Other'
  ];

  const jobTypes = [
    { value: 'translation', label: 'Translation' },
    { value: 'teaching', label: 'Teaching / Training' },
    { value: 'interpretation', label: 'Interpretation' },
    { value: 'content', label: 'Content Writing / Editing' },
    { value: 'assistance', label: 'Language Assistance' },
    { value: 'research', label: 'Language Research' },
    { value: 'other', label: 'Other' }
  ];

  const proficiencyLevels = ['Basic', 'Intermediate', 'Advanced', 'Native'];

  useEffect(() => {
    fetchJobs();
    if (searchParams.get('post') === 'true') {
      setShowPostModal(true);
    }
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [jobs, searchQuery, selectedLanguage, selectedJobType, selectedLocation, showRemoteOnly]);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs/listings`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(job => job.language === selectedLanguage);
    }

    if (selectedJobType !== 'all') {
      filtered = filtered.filter(job => job.jobType === selectedJobType);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => job.location.includes(selectedLocation));
    }

    if (showRemoteOnly) {
      filtered = filtered.filter(job => job.isRemote);
    }

    setFilteredJobs(filtered);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (formData.title.trim().length === 0) {
      errors.title = "Job title is required";
    }

    if (formData.description.trim().length === 0) {
      errors.description = "Description is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      errors.contactEmail = "Please enter a valid email";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePostJob = async (e: React.FormEvent) => {
  e.preventDefault();
  
  setFormErrors({});

  if (!validateForm()) {
    return;
  }

  setSubmitting(true);

  try {
    // ✅ GET TOKEN
    const token = localStorage.getItem('token');
    if (!token) {
      setFormErrors({
        general: 'You must be logged in to post a job. Please log in and try again.'
      });
      setSubmitting(false);
      return;
    }

    const processedResponsibilities = formData.responsibilities
      .split('\n')
      .map(r => r.trim().replace(/^[•\-*]\s*/, ''))
      .filter(r => r.length > 0);

    const processedRequirements = formData.requirements
      .split('\n')
      .map(r => r.trim().replace(/^[•\-*]\s*/, ''))
      .filter(r => r.length > 0);

    const jobData = {
      ...formData,
      title: formData.title.trim(),
      companyName: formData.companyName.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
      contactEmail: formData.contactEmail.trim().toLowerCase(),
      responsibilities: processedResponsibilities,
      requirements: processedRequirements
    };

    // ✅ ADD AUTHORIZATION HEADER
    const res = await fetch(`${API_URL}/jobs/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // ← ADD THIS
      },
      body: JSON.stringify(jobData)
    });

    const data = await res.json();

    if (res.ok) {
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowPostModal(false);
        setShowSuccessMessage(false);
        fetchJobs();
        
        setFormData({
          title: '',
          language: 'Hindi',
          proficiencyLevel: 'Intermediate',
          jobType: 'translation',
          companyName: '',
          location: '',
          isRemote: false,
          description: '',
          responsibilities: '',
          requirements: '',
          contactEmail: ''
        });
      }, 2000);
    } else {
      setFormErrors({
        general: data.error || 'Failed to post job. Please try again.'
      });
    }
  } catch (error) {
    console.error("Error posting job:", error);
    setFormErrors({
      general: 'Network error. Please check your connection and try again.'
    });
  } finally {
    setSubmitting(false);
  }
};

  const getJobTypeLabel = (type: string) => {
    const jobType = jobTypes.find(jt => jt.value === type);
    return jobType ? jobType.label : type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (expiryDate: string) => {
    const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <div className="text-center">
          <Loader2 className={`w-16 h-16 animate-spin mx-auto mb-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          <p className={`text-lg font-medium ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Loading opportunities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      
      <div className="h-20"></div>

      {/* Header */}
      <section className="pt-12 pb-8 px-4 relative overflow-hidden">
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/40'
        }`}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/40 text-orange-300' 
                  : 'bg-orange-50 border-orange-200 text-orange-700'
              }`}>
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-semibold">Language-Only Jobs</span>
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                Find Your Next Opportunity
              </h1>
              <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                {filteredJobs.length} active language-focused positions
              </p>
            </div>
            
            <button 
              onClick={() => setShowPostModal(true)}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2 self-start md:self-auto"
            >
              <Plus className="w-5 h-5" />
              Post a Job (Free)
            </button>
          </div>

          {/* Notice Banner */}
          <div className={`p-4 rounded-xl border mb-6 ${
            darkMode 
              ? 'bg-blue-900/10 border-blue-800/30' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start gap-3">
              <Info className={`w-5 h-5 mt-0.5 shrink-0 ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <div className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                <strong>How to apply:</strong> Contact employers directly using the email provided in each listing. 
                VartaLang does not accept applications or intermediate hiring.
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-100'
            }`}>
              <Search className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search jobs by title, company, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 bg-transparent outline-none ${
                  darkMode ? 'text-orange-50 placeholder-orange-300/50' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`p-1 rounded-lg hover:bg-orange-900/20 transition-all ${
                    darkMode ? 'text-orange-400' : 'text-gray-500'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className={`px-4 py-3 rounded-xl border outline-none transition-all ${
                    darkMode 
                      ? 'bg-orange-900/20 border-orange-800/30 text-orange-100 focus:border-orange-600 [&>option]:bg-orange-900 [&>option]:text-orange-100' 
                      : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
                  }`}
                >
                  <option value="all">All Languages</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>

                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className={`px-4 py-3 rounded-xl border outline-none transition-all ${
                    darkMode 
                      ? 'bg-orange-900/20 border-orange-800/30 text-orange-100 focus:border-orange-600 [&>option]:bg-orange-900 [&>option]:text-orange-100' 
                      : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
                  }`}
                >
                  <option value="all">All Job Types</option>
                  {jobTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              <input
                type="text"
                placeholder="Filter by location..."
                value={selectedLocation === 'all' ? '' : selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value || 'all')}
                className={`px-4 py-3 rounded-xl border outline-none transition-all ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                    : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                }`}
              />

              <button
                onClick={() => setShowRemoteOnly(!showRemoteOnly)}
                className={`px-4 py-3 rounded-xl border font-medium transition-all ${
                  showRemoteOnly
                    ? 'bg-linear-to-r from-orange-500 to-red-600 text-white border-transparent'
                    : darkMode
                      ? 'bg-orange-900/10 border-orange-800/30 text-orange-200 hover:bg-orange-900/20'
                      : 'bg-white border-orange-100 text-gray-700 hover:bg-orange-50'
                }`}
              >
                <Globe className="w-4 h-4 inline mr-2" />
                Remote Only
              </button>
            </div>

            {(selectedLanguage !== 'all' || selectedJobType !== 'all' || selectedLocation !== 'all' || showRemoteOnly) && (
              <div className="flex flex-wrap gap-2">
                {selectedLanguage !== 'all' && (
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                    darkMode ? 'bg-orange-900/20 text-orange-300' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {selectedLanguage}
                    <button onClick={() => setSelectedLanguage('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedJobType !== 'all' && (
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                    darkMode ? 'bg-orange-900/20 text-orange-300' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {getJobTypeLabel(selectedJobType)}
                    <button onClick={() => setSelectedJobType('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedLocation !== 'all' && (
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                    darkMode ? 'bg-orange-900/20 text-orange-300' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {selectedLocation}
                    <button onClick={() => setSelectedLocation('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredJobs.length === 0 ? (
            <div className={`p-12 rounded-2xl border text-center ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-100 shadow-lg'
            }`}>
              <Briefcase className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-orange-400/50' : 'text-orange-600/50'}`} />
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                No Jobs Found
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                Try adjusting your filters or check back later for new opportunities
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLanguage('all');
                  setSelectedJobType('all');
                  setSelectedLocation('all');
                  setShowRemoteOnly(false);
                }}
                className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className={`group p-6 rounded-2xl border transition-all hover:scale-[1.01] cursor-pointer ${
                    darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                      : 'bg-white border-orange-100 hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-3 rounded-xl ${
                          darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                        }`}>
                          <Briefcase className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                            {job.title}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                            {job.companyName}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-50 text-orange-700'
                        }`}>
                          <Languages className="w-3 h-3 inline mr-1" />
                          {job.language}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                        }`}>
                          {job.proficiencyLevel}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                        }`}>
                          {getJobTypeLabel(job.jobType)}
                        </span>
                        {job.isRemote && (
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                          }`}>
                            <Globe className="w-3 h-3 inline mr-1" />
                            Remote
                          </span>
                        )}
                      </div>

                      <p className={`text-sm line-clamp-2 mb-3 ${
                        darkMode ? 'text-orange-200/70' : 'text-gray-600'
                      }`}>
                        {job.description}
                      </p>

                     <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                          <span className={darkMode ? 'text-orange-200' : 'text-gray-700'}>
                            {job.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                          <span className={darkMode ? 'text-orange-200/70' : 'text-gray-500'}>
                            {job.views} views
                          </span>
                        </div>
                        {/* ✅ ADD THIS */}
                        {job.postedByName && (
                          <div className="flex items-center gap-1">
                            <Users className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                            <span className={darkMode ? 'text-orange-200/70' : 'text-gray-500'}>
                              Posted by {job.postedByName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        getDaysRemaining(job.expiryDate) <= 2
                          ? darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'
                          : darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                      }`}>
                        {getDaysRemaining(job.expiryDate)} days left
                      </div>
                      <span className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                        Posted {formatDate(job.postedDate)}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(job);
                        }}
                        className="px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white text-sm font-semibold hover:shadow-lg transition-all"
                      >
                        View Details
                      </button>
                    </div>
                    
                  </div>
                  
                </div>
                
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border ${
            darkMode 
              ? 'bg-[#1a1410] border-orange-800/30' 
              : 'bg-white border-orange-100'
          }`}>
            <div className={`sticky top-0 p-6 border-b backdrop-blur-lg ${
              darkMode ? 'bg-[#1a1410]/95 border-orange-800/30' : 'bg-white/95 border-orange-100'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {selectedJob.title}
                  </h2>
                  <p className={`text-lg mb-3 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    {selectedJob.companyName}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-50 text-orange-700'
                    }`}>
                      <Languages className="w-3 h-3 inline mr-1" />
                      {selectedJob.language} • {selectedJob.proficiencyLevel}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                    }`}>
                      {getJobTypeLabel(selectedJob.jobType)}
                    </span>
                    {selectedJob.isRemote && (
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                      }`}>
                        <Globe className="w-3 h-3 inline mr-1" />
                        Remote
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className={`p-2 rounded-lg hover:bg-orange-900/20 transition-all ${
                    darkMode ? 'text-orange-200' : 'text-gray-700'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

           <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <span className={darkMode ? 'text-orange-200' : 'text-gray-700'}>
                    {selectedJob.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                    Posted {formatDate(selectedJob.postedDate)}
                  </span>
                </div>
                {/* ✅ ADD THIS */}
                {selectedJob.postedByName && (
                  <div className="flex items-center gap-2">
                    <Users className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                      by {selectedJob.postedByName}
                    </span>
                  </div>
                )}
              </div>


              <div>
                <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                  darkMode ? 'text-orange-50' : 'text-gray-900'
                }`}>
                  <FileText className="w-5 h-5" />
                  Job Description
                </h3>
                <p className={`leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                  {selectedJob.description}
                </p>
              </div>

              {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                <div>
                  <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                    darkMode ? 'text-orange-50' : 'text-gray-900'
                  }`}>
                    <Target className="w-5 h-5" />
                    Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${
                          darkMode ? 'text-orange-400' : 'text-orange-600'
                        }`} />
                        <span className={darkMode ? 'text-orange-200/80' : 'text-gray-700'}>
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div>
                  <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                    darkMode ? 'text-orange-50' : 'text-gray-900'
                  }`}>
                    <Award className="w-5 h-5" />
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Star className={`w-4 h-4 mt-0.5 shrink-0 ${
                          darkMode ? 'text-orange-400' : 'text-orange-600'
                        }`} />
                        <span className={darkMode ? 'text-orange-200/80' : 'text-gray-700'}>
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={`p-6 rounded-xl border ${
                darkMode 
                  ? 'bg-orange-900/10 border-orange-800/30' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                  darkMode ? 'text-orange-50' : 'text-gray-900'
                }`}>
                  <Mail className="w-5 h-5" />
                  How to Apply
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                  Interested candidates should contact the employer directly:
                </p>
                <a
                  href={`mailto:${selectedJob.contactEmail}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                  {selectedJob.contactEmail}
                </a>
                <p className={`mt-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  <Shield className="w-4 h-4 inline mr-1" />
                  VartaLang does not accept applications. Contact the employer directly.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                getDaysRemaining(selectedJob.expiryDate) <= 2
                  ? darkMode ? 'bg-red-900/10 border-red-800/30' : 'bg-red-50 border-red-200'
                  : darkMode ? 'bg-green-900/10 border-green-800/30' : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${
                    getDaysRemaining(selectedJob.expiryDate) <= 2
                      ? darkMode ? 'text-red-400' : 'text-red-600'
                      : darkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    getDaysRemaining(selectedJob.expiryDate) <= 2
                      ? darkMode ? 'text-red-300' : 'text-red-900'
                      : darkMode ? 'text-green-300' : 'text-green-900'
                  }`}>
                    This listing expires in {getDaysRemaining(selectedJob.expiryDate)} days
                    ({formatDate(selectedJob.expiryDate)})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Job Modal - FIXED SCROLLING VERSION */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`max-w-3xl w-full max-h-[90vh] rounded-2xl border overflow-hidden flex flex-col ${
            darkMode 
              ? 'bg-[#1a1410] border-orange-800/30' 
              : 'bg-white border-orange-100'
          }`}>
            {/* Fixed Header */}
            <div className="p-6 border-b border-orange-800/30 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    Post a Language Job
                  </h2>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Free for 7 days
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowPostModal(false);
                    setFormErrors({});
                  }}
                  className={`p-2 rounded-lg hover:bg-orange-900/20 transition-all ${
                    darkMode ? 'text-orange-200' : 'text-gray-700'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Form Content */}
            <div className="overflow-y-auto flex-1">
              <form onSubmit={handlePostJob} className="p-6 space-y-6">
                {formErrors.general && (
                  <div className={`p-4 rounded-xl border ${
                    darkMode 
                      ? 'bg-red-900/10 border-red-800/30' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`w-5 h-5 mt-0.5 shrink-0 ${
                        darkMode ? 'text-red-400' : 'text-red-600'
                      }`} />
                      <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-900'}`}>
                        {formErrors.general}
                      </p>
                    </div>
                  </div>
                )}

                {showSuccessMessage && (
                  <div className={`p-4 rounded-xl border ${
                    darkMode 
                      ? 'bg-green-900/10 border-green-800/30' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 shrink-0 ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <p className={`text-sm font-medium ${darkMode ? 'text-green-200' : 'text-green-900'}`}>
                        Job posted successfully! It will be live for 7 days.
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Hindi Translator for Legal Documents"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      formErrors.title
                        ? darkMode
                          ? 'border-red-500 bg-red-900/10'
                          : 'border-red-500 bg-red-50'
                        : darkMode 
                          ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                          : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                  {formErrors.title && (
                    <p className={`text-xs mt-1 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {formErrors.title}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      Language Required *
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        darkMode 
                          ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                          : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
                      }`}
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      Proficiency Level *
                    </label>
                    <select
                      value={formData.proficiencyLevel}
                      onChange={(e) => setFormData({ ...formData, proficiencyLevel: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        darkMode 
                          ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                          : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
                      }`}
                    >
                      {proficiencyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    Type of Work *
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      darkMode 
                        ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                        : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
                    }`}
                  >
                    {jobTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your company name"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      darkMode 
                        ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                        : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Mumbai, India or Remote"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      darkMode 
                        ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                        : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isRemote"
                    checked={formData.isRemote}
                    onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="isRemote" className={`text-sm font-medium ${
                    darkMode ? 'text-orange-200' : 'text-gray-700'
                  }`}>
                    This is a remote position
                  </label>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    Job Description *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the role and what the candidate will do..."
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                      formErrors.description
                        ? darkMode
                          ? 'border-red-500 bg-red-900/10'
                          : 'border-red-500 bg-red-50'
                        : darkMode 
                          ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                          : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                  {formErrors.description && (
                    <p className={`text-xs mt-1 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {formErrors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    Key Responsibilities (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    placeholder="One responsibility per line"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                      darkMode 
                        ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                        : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    Requirements (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="One requirement per line"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                      darkMode 
                        ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                        : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    Official Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="hr@yourcompany.com"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      formErrors.contactEmail
                        ? darkMode
                          ? 'border-red-500 bg-red-900/10'
                          : 'border-red-500 bg-red-50'
                        : darkMode 
                          ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                          : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                  {formErrors.contactEmail && (
                    <p className={`text-xs mt-1 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {formErrors.contactEmail}
                    </p>
                  )}
                  <p className={`text-xs mt-2 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    This email will be publicly visible. Candidates will contact you directly.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting || showSuccessMessage}
                    className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Posting...
                      </>
                    ) : showSuccessMessage ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Posted Successfully!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Post Job (Free for 7 Days)
                      </>
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowPostModal(false);
                      setFormErrors({});
                    }}
                    disabled={submitting}
                    className={`px-6 py-3 rounded-xl border font-medium transition-all disabled:opacity-50 ${
                      darkMode 
                        ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                        : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="h-20"></div>
      <Footer />
    </div>
  );
}