"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Video, FileText, DollarSign, Users, TrendingUp,
  Plus, Edit, Trash2, Eye, Upload, Calendar, Clock, Globe,
  Heart, Sparkles, ArrowRight, Settings, BarChart3, Check,
  X, Save, Image as ImageIcon, PlayCircle, Lock, Unlock,
  MessageSquare, Zap, Award, Star, ChevronDown, Search,
  Filter, Download, Share2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

// Type definitions
interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  price: number;
  isPremium: boolean;
  thumbnail: string;
  students: number;
  rating: number;
  status: 'draft' | 'published';
  createdAt: string;
}

interface Note {
  id: string;
  title: string;
  description: string;
  pages: number;
  downloads: number;
  isPremium: boolean;
  price: number;
  fileSize: string;
  language: string;
  status: 'draft' | 'published';
}

interface Session {
  id: string;
  type: '1:1' | 'group' | 'live-class';
  title: string;
  duration: number;
  price: number;
  platform: 'google-meet' | 'zoom';
  maxStudents?: number;
  status: 'active' | 'paused';
}

export default function CreatorsPage() {
  const { darkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'notes' | 'sessions' | 'earnings'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'course' | 'note' | 'session'>('course');
  
  // Mock data - replace with actual API calls
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete Hindi Grammar Masterclass',
      description: 'Master Hindi grammar from basics to advanced',
      language: 'Hindi',
      level: 'Intermediate',
      price: 999,
      isPremium: true,
      thumbnail: '',
      students: 234,
      rating: 4.8,
      status: 'published',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Conversational Hindi for Beginners',
      description: 'Learn to speak Hindi confidently',
      language: 'Hindi',
      level: 'Beginner',
      price: 0,
      isPremium: false,
      thumbnail: '',
      students: 567,
      rating: 4.6,
      status: 'published',
      createdAt: '2024-02-01'
    }
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Hindi Verb Conjugation Guide',
      description: 'Complete guide to Hindi verb forms',
      pages: 25,
      downloads: 1234,
      isPremium: false,
      price: 0,
      fileSize: '2.5 MB',
      language: 'Hindi',
      status: 'published'
    },
    {
      id: '2',
      title: 'Advanced Grammar Reference',
      description: 'Comprehensive grammar reference',
      pages: 50,
      downloads: 456,
      isPremium: true,
      price: 199,
      fileSize: '5.2 MB',
      language: 'Hindi',
      status: 'published'
    }
  ]);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      type: '1:1',
      title: 'Personal Hindi Tutoring',
      duration: 60,
      price: 499,
      platform: 'google-meet',
      status: 'active'
    },
    {
      id: '2',
      type: 'live-class',
      title: 'Weekly Grammar Workshop',
      duration: 90,
      price: 299,
      platform: 'zoom',
      maxStudents: 50,
      status: 'active'
    }
  ]);

  const stats = {
    totalRevenue: 45678,
    totalStudents: 801,
    activeCourses: 2,
    totalDownloads: 1690,
    averageRating: 4.7,
    completionRate: 78
  };

  // Create Course Form
  const CourseForm = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Course Title
        </label>
        <input
          type="text"
          placeholder="e.g., Complete Hindi for Beginners"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
          }`}
        />
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Description
        </label>
        <textarea
          rows={4}
          placeholder="Describe what students will learn..."
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
          }`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Language
          </label>
          <select className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
          }`}>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>English</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Level
          </label>
          <select className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
          }`}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Course Thumbnail
        </label>
        <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          darkMode 
            ? 'border-orange-800/30 hover:border-orange-600/50 bg-orange-900/5' 
            : 'border-orange-200 hover:border-orange-400 bg-orange-50/50'
        }`}>
          <ImageIcon className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Click to upload or drag and drop
          </p>
          <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
            PNG, JPG up to 5MB
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl border ${
        darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-orange-50 border-orange-100'
      }">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
          }`}>
            <Lock className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>
          <div>
            <h4 className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Premium Course
            </h4>
            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Set a price for your course
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-linear-to-r peer-checked:from-orange-500 peer-checked:to-red-600"></div>
        </label>
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Price (₹)
        </label>
        <input
          type="number"
          placeholder="999"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
          }`}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">
          Create Course
        </button>
        <button 
          onClick={() => setShowCreateModal(false)}
          className={`px-6 py-3 rounded-xl border font-medium transition-all ${
            darkMode 
              ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
              : 'border-orange-200 text-gray-700 hover:bg-orange-50'
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  // Create Note Form
  const NoteForm = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Note Title
        </label>
        <input
          type="text"
          placeholder="e.g., Hindi Grammar Quick Reference"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
          }`}
        />
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Brief description of the content..."
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
          }`}
        />
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Upload PDF
        </label>
        <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          darkMode 
            ? 'border-orange-800/30 hover:border-orange-600/50 bg-orange-900/5' 
            : 'border-orange-200 hover:border-orange-400 bg-orange-50/50'
        }`}>
          <Upload className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Click to upload PDF
          </p>
          <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
            PDF up to 50MB
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Language
          </label>
          <select className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
          }`}>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Telugu</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Price (₹)
          </label>
          <input
            type="number"
            placeholder="0 for free"
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl border ${
        darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-orange-50 border-orange-100'
      }">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
          }`}>
            <Lock className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>
          <div>
            <h4 className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Premium Content
            </h4>
            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Charge for this resource
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-linear-to-r peer-checked:from-orange-500 peer-checked:to-red-600"></div>
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">
          Upload Note
        </button>
        <button 
          onClick={() => setShowCreateModal(false)}
          className={`px-6 py-3 rounded-xl border font-medium transition-all ${
            darkMode 
              ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
              : 'border-orange-200 text-gray-700 hover:bg-orange-50'
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  // Create Session Form
  const SessionForm = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Session Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '1:1', label: '1:1 Tutoring', icon: MessageSquare },
            { value: 'group', label: 'Group Class', icon: Users },
            { value: 'live-class', label: 'Live Workshop', icon: Video }
          ].map((type) => (
            <button
              key={type.value}
              className={`p-4 rounded-xl border transition-all text-center ${
                darkMode 
                  ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                  : 'bg-white border-orange-100 hover:bg-orange-50'
              }`}
            >
              <type.icon className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Session Title
        </label>
        <input
          type="text"
          placeholder="e.g., Personal Hindi Coaching"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
          }`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Duration (minutes)
          </label>
          <select className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
          }`}>
            <option>30</option>
            <option>60</option>
            <option>90</option>
            <option>120</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Platform
          </label>
          <select className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
          }`}>
            <option>Google Meet</option>
            <option>Zoom</option>
          </select>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Max Students (for group sessions)
        </label>
        <input
          type="number"
          placeholder="e.g., 10"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
          }`}
        />
      </div>

      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
          Price per Session (₹)
        </label>
        <input
          type="number"
          placeholder="499"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
              : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
          }`}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">
          Create Session
        </button>
        <button 
          onClick={() => setShowCreateModal(false)}
          className={`px-6 py-3 rounded-xl border font-medium transition-all ${
            darkMode 
              ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
              : 'border-orange-200 text-gray-700 hover:bg-orange-50'
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      
      {/* Space for Global Header */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 relative overflow-hidden">
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/40'
        }`}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-800/40 text-orange-300' 
                  : 'bg-orange-50 border-orange-200 text-orange-700'
              }`}>
                <Sparkles className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">Creator Dashboard</span>
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                Your Teaching Hub
              </h1>
              <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                Create, manage, and monetize your educational content
              </p>
            </div>
            
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create New
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'green' },
              { label: 'Students', value: stats.totalStudents, icon: Users, color: 'blue' },
              { label: 'Active Courses', value: stats.activeCourses, icon: BookOpen, color: 'orange' },
              { label: 'Downloads', value: stats.totalDownloads, icon: Download, color: 'purple' },
              { label: 'Avg. Rating', value: stats.averageRating, icon: Star, color: 'yellow' },
              { label: 'Completion', value: `${stats.completionRate}%`, icon: TrendingUp, color: 'teal' }
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                  }`}>
                    <stat.icon className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                </div>
                <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'notes', label: 'Notes & Resources', icon: FileText },
              { id: 'sessions', label: 'Live Sessions', icon: Video },
              { id: 'earnings', label: 'Earnings', icon: DollarSign }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-linear-to-r from-orange-500 to-red-600 text-white'
                    : darkMode
                      ? 'bg-orange-900/10 border border-orange-800/30 text-orange-200 hover:bg-orange-900/20'
                      : 'bg-white border border-orange-100 text-gray-700 hover:bg-orange-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                    darkMode ? 'text-orange-50' : 'text-gray-900'
                  }`}>
                    <TrendingUp className="w-5 h-5" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {[
                      { action: 'New student enrolled', course: 'Complete Hindi Grammar', time: '2 hours ago' },
                      { action: 'Note downloaded', course: 'Verb Conjugation Guide', time: '5 hours ago' },
                      { action: 'Session booked', course: '1:1 Tutoring', time: '1 day ago' }
                    ].map((activity, i) => (
                      <div key={i} className={`p-3 rounded-lg ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                        <p className={`text-sm font-medium ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                          {activity.action}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          {activity.course} • {activity.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                    darkMode ? 'text-orange-50' : 'text-gray-900'
                  }`}>
                    <Zap className="w-5 h-5" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'New Course', icon: BookOpen, action: () => { setCreateType('course'); setShowCreateModal(true); } },
                      { label: 'Upload Note', icon: FileText, action: () => { setCreateType('note'); setShowCreateModal(true); } },
                      { label: 'Add Session', icon: Video, action: () => { setCreateType('session'); setShowCreateModal(true); } },
                      { label: 'View Analytics', icon: BarChart3, action: () => {} }
                    ].map((action, i) => (
                      <button
                        key={i}
                        onClick={action.action}
                        className={`p-4 rounded-xl border transition-all hover:scale-105 text-center ${
                          darkMode 
                            ? 'bg-orange-900/20 border-orange-800/30 hover:bg-orange-900/30' 
                            : 'bg-orange-50 border-orange-100 hover:bg-orange-100'
                        }`}
                      >
                        <action.icon className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                        <span className={`text-sm font-medium ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                          {action.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  My Courses
                </h2>
                <div className="flex gap-3">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                    darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30' 
                      : 'bg-white border-orange-100'
                  }`}>
                    <Search className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className={`bg-transparent outline-none text-sm ${
                        darkMode ? 'text-orange-50 placeholder-orange-300/50' : 'text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>
                  <button className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
                    darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30 text-orange-200' 
                      : 'bg-white border-orange-100 text-gray-700'
                  }`}>
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`group rounded-2xl border overflow-hidden transition-all hover:scale-[1.02] ${
                      darkMode 
                        ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                        : 'bg-white border-orange-100 hover:shadow-xl'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className={`h-40 flex items-center justify-center ${
                      darkMode ? 'bg-orange-900/30' : 'bg-orange-50'
                    }`}>
                      <BookOpen className={`w-16 h-16 ${darkMode ? 'text-orange-400/50' : 'text-orange-600/50'}`} />
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          course.isPremium
                            ? darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-50 text-orange-700'
                            : darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                        }`}>
                          {course.isPremium ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          {course.isPremium ? `₹${course.price}` : 'FREE'}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          course.status === 'published'
                            ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {course.status}
                        </span>
                      </div>

                      <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                        {course.title}
                      </h3>
                      <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                        {course.description}
                      </p>

                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                          <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                            {course.students}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className={`w-4 h-4 fill-yellow-500 text-yellow-500`} />
                          <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                            {course.rating}
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                        }`}>
                          {course.level}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white text-sm font-semibold hover:shadow-lg transition-all">
                          Edit
                        </button>
                        <button className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                          darkMode 
                            ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                            : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                        }`}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                          darkMode 
                            ? 'border-orange-800/30 text-red-400 hover:bg-orange-900/20' 
                            : 'border-orange-200 text-red-600 hover:bg-orange-50'
                        }`}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  Notes & Resources
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
                      darkMode 
                        ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                        : 'bg-white border-orange-100 hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                        <FileText className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          note.isPremium
                            ? darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-50 text-orange-700'
                            : darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                        }`}>
                          {note.isPremium ? `₹${note.price}` : 'FREE'}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                        }`}>
                          {note.pages} pages
                        </span>
                      </div>
                    </div>

                    <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {note.title}
                    </h3>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                      {note.description}
                    </p>

                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Download className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                        <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                          {note.downloads}
                        </span>
                      </div>
                      <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                        {note.fileSize}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white text-sm font-semibold hover:shadow-lg transition-all">
                        Edit
                      </button>
                      <button className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        darkMode 
                          ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                          : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                      }`}>
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        darkMode 
                          ? 'border-orange-800/30 text-red-400 hover:bg-orange-900/20' 
                          : 'border-orange-200 text-red-600 hover:bg-orange-50'
                      }`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  Live Sessions
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-6 rounded-2xl border ${
                      darkMode 
                        ? 'bg-orange-900/10 border-orange-800/30' 
                        : 'bg-white border-orange-100 shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${
                          darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                        }`}>
                          {session.type === '1:1' ? (
                            <MessageSquare className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                          ) : session.type === 'group' ? (
                            <Users className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                          ) : (
                            <Video className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                          )}
                        </div>
                        <div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                          }`}>
                            {session.type === '1:1' ? 'One-on-One' : session.type === 'group' ? 'Group' : 'Live Class'}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        session.status === 'active'
                          ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {session.status}
                      </span>
                    </div>

                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {session.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          Duration
                        </span>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                          {session.duration} min
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          Platform
                        </span>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                          {session.platform === 'google-meet' ? 'Google Meet' : 'Zoom'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          Price
                        </span>
                        <span className={`text-lg font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                          ₹{session.price}
                        </span>
                      </div>
                      {session.maxStudents && (
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                            Max Students
                          </span>
                          <span className={`text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                            {session.maxStudents}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">
                        Manage
                      </button>
                      <button className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                        darkMode 
                          ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                          : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                      }`}>
                        {session.status === 'active' ? 'Pause' : 'Activate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className={`p-8 rounded-2xl border text-center ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30' 
                  : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-100 shadow-xl'
              }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                }`}>
                  <DollarSign className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <p className={`text-sm mb-2 ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                  Total Earnings
                </p>
                <h2 className={`text-5xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  ₹{stats.totalRevenue.toLocaleString()}
                </h2>
                <button className="px-8 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">
                  Withdraw Funds
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}>
                  <h4 className={`text-sm mb-2 ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    From Courses
                  </h4>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    ₹32,450
                  </p>
                </div>
                <div className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}>
                  <h4 className={`text-sm mb-2 ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    From Notes
                  </h4>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    ₹8,120
                  </p>
                </div>
                <div className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}>
                  <h4 className={`text-sm mb-2 ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    From Sessions
                  </h4>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    ₹5,108
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border ${
            darkMode 
              ? 'bg-[#1a1410] border-orange-800/30' 
              : 'bg-white border-orange-100'
          }`}>
            <div className={`sticky top-0 p-6 border-b ${
              darkMode 
                ? 'bg-[#1a1410] border-orange-800/30' 
                : 'bg-white border-orange-100'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {createType === 'course' ? 'Create New Course' : 
                   createType === 'note' ? 'Upload New Note' : 
                   'Create Live Session'}
                </h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className={`p-2 rounded-lg transition-all ${
                    darkMode ? 'hover:bg-orange-900/20' : 'hover:bg-orange-50'
                  }`}
                >
                  <X className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-gray-600'}`} />
                </button>
              </div>
              
              <div className="flex gap-2 mt-4">
                {[
                  { type: 'course', label: 'Course', icon: BookOpen },
                  { type: 'note', label: 'Note', icon: FileText },
                  { type: 'session', label: 'Session', icon: Video }
                ].map((tab) => (
                  <button
                    key={tab.type}
                    onClick={() => setCreateType(tab.type as any)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                      createType === tab.type
                        ? 'bg-linear-to-r from-orange-500 to-red-600 text-white'
                        : darkMode
                          ? 'bg-orange-900/10 text-orange-200 hover:bg-orange-900/20'
                          : 'bg-orange-50 text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              {createType === 'course' && <CourseForm />}
              {createType === 'note' && <NoteForm />}
              {createType === 'session' && <SessionForm />}
            </div>
          </div>
        </div>
      )}

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
            <Award className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">Grow Your Teaching Career</span>
          </div>

          <h2 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Share Your Knowledge, Earn Income
          </h2>

          <p className={`text-lg mb-8 max-w-xl mx-auto ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Join thousands of educators building their teaching business on VartaLang
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base
              bg-linear-to-r from-orange-500 to-red-600 text-white
              hover:shadow-xl hover:scale-105 transition-all"
            >
              Create Content
              <Plus className="w-5 h-5" />
            </button>
            <Link
              href="/learn"
              className={`inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base border transition-all hover:scale-105 ${
                darkMode 
                  ? 'border-orange-800/50 text-orange-200 hover:bg-orange-900/20' 
                  : 'border-orange-200 text-gray-700 hover:bg-orange-50'
              }`}
            >
              View Resources
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="h-20"></div>
      <Footer />
    </div>
  );
}