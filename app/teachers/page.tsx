"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, Video, FileText, Users, TrendingUp,
  Plus, Edit, Trash2, Eye, Upload, 
  Sparkles, ArrowRight, BarChart3,
  X, MessageSquare, Award, Star, Search,
  Filter, Download, Share2, Mic, Headphones,
  Calendar, Clock, Globe, Target, CheckCircle,
  BookMarked, BriefcaseBusiness, GraduationCap,
  Zap, Bell, Languages, PlayCircle, Send,
  AlertCircle, TrendingDown, UserCheck
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Type definitions
interface FeedbackRequest {
  _id: string;
  studentId: {
    name: string;
    profilePhoto?: string;
  };
  language: string;
  studentLevel?: string;
  audioFile: string;
  text?: string;
  submittedAt: string;
  status: 'pending' | 'reviewed';
  feedback?: string;
  rating?: number;
}

interface MentorshipSession {
  _id: string;
  type: '1:1' | 'group';
  studentId?: {
    name: string;
    profilePhoto?: string;
  };
  students?: Array<{ name: string; profilePhoto?: string }>;
  topic: string;
  language: string;
  scheduledDate: string;
  duration: number;
  platform: 'google-meet' | 'zoom';
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  studentCount?: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  thumbnail?: string;
  enrolledStudents: number;
  rating: number;
  status: 'draft' | 'published';
  createdAt: string;
  totalLessons: number;
  category: 'grammar' | 'conversation' | 'competitive-exam' | 'job-training' | 'general';
  isPaid: boolean;
  price?: number;
}

interface Note {
  _id: string;
  title: string;
  description: string;
  pages: number;
  downloads: number;
  fileSize: string;
  language: string;
  status: 'draft' | 'published';
  views: number;
  category: 'grammar' | 'vocabulary' | 'exam-prep' | 'job-training' | 'reference';
  fileUrl: string;
}

interface LiveClass {
  _id: string;
  title: string;
  description: string;
  language: string;
  scheduledDate: string;
  duration: number;
  maxStudents: number;
  enrolledStudents: number;
  platform: 'google-meet' | 'zoom';
  status: 'scheduled' | 'live' | 'completed';
  topic: string;
  meetingLink?: string;
}

interface TeacherStats {
  totalStudents: number;
  pendingFeedbacks: number;
  upcomingSessions: number;
  totalCourses: number;
  totalNotes: number;
  totalDownloads: number;
  averageRating: number;
  completedSessions: number;
}

export default function CreatorsPage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'feedback' | 'mentorship' | 'courses' | 'notes' | 'live-classes' | 'analytics'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'course' | 'note' | 'session' | 'live-class'>('course');
  
  // State for data
  const [stats, setStats] = useState<TeacherStats>({
    totalStudents: 0,
    pendingFeedbacks: 0,
    upcomingSessions: 0,
    totalCourses: 0,
    totalNotes: 0,
    totalDownloads: 0,
    averageRating: 0,
    completedSessions: 0
  });
  
  const [feedbackRequests, setFeedbackRequests] = useState<FeedbackRequest[]>([]);
  const [mentorshipSessions, setMentorshipSessions] = useState<MentorshipSession[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [userRole, setUserRole] = useState<'learner' | 'teacher' | null>(null);

  // Check if user is teacher and fetch data
  useEffect(() => {
    checkTeacherAccess();
  }, []);

  const checkTeacherAccess = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      // Fetch user profile to check role
      const profileRes = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!profileRes.ok) {
        throw new Error("Failed to fetch profile");
      }

      const profileData = await profileRes.json();
      
      // Check if user is a teacher
      if (profileData.user.primaryRole !== 'teacher') {
        alert("Access denied. This page is only for teachers.");
        router.push("/learn");
        return;
      }

      setUserRole(profileData.user.primaryRole);
      
      // Fetch all teacher data
      await Promise.all([
        fetchTeacherStats(),
        fetchFeedbackRequests(),
        fetchMentorshipSessions(),
        fetchCourses(),
        fetchNotes(),
        fetchLiveClasses()
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error checking teacher access:", error);
      alert("Failed to load teacher dashboard");
      router.push("/learn");
    }
  };

  const fetchTeacherStats = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/teachers/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchFeedbackRequests = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/teachers/feedback-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFeedbackRequests(data.feedbackRequests);
      }
    } catch (error) {
      console.error("Error fetching feedback requests:", error);
    }
  };

  const fetchMentorshipSessions = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/teachers/mentorship-sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMentorshipSessions(data.sessions);
      }
    } catch (error) {
      console.error("Error fetching mentorship sessions:", error);
    }
  };

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/teachers/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/teachers/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotes(data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const fetchLiveClasses = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/teachers/live-classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLiveClasses(data.liveClasses);
      }
    } catch (error) {
      console.error("Error fetching live classes:", error);
    }
  };

  const handleProvideFeedback = async (feedbackId: string, feedback: string, rating: number) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/teachers/feedback/${feedbackId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ feedback, rating, status: 'reviewed' }),
      });

      if (res.ok) {
        alert("Feedback submitted successfully!");
        fetchFeedbackRequests();
        fetchTeacherStats();
      } else {
        alert("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback");
    }
  };

  // Form Components
  const CourseForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      language: 'Hindi',
      level: 'Beginner',
      category: 'general',
      isPaid: false,
      price: 0,
      totalLessons: 0
    });

    const handleSubmit = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${API_URL}/teachers/courses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("Course created successfully!");
          setShowCreateModal(false);
          fetchCourses();
          fetchTeacherStats();
        } else {
          alert("Failed to create course");
        }
      } catch (error) {
        console.error("Error creating course:", error);
        alert("Error creating course");
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Course Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Complete Hindi for UPSC Preparation"
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Description *
          </label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              Language *
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
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Kannada</option>
              <option>Bengali</option>
              <option>Marathi</option>
              <option>English</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
              Level *
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                darkMode 
                  ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                  : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
              }`}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
            }`}
          >
            <option value="general">General Learning</option>
            <option value="grammar">Grammar</option>
            <option value="conversation">Conversation</option>
            <option value="competitive-exam">Competitive Exam Prep</option>
            <option value="job-training">Job Training</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Total Lessons
          </label>
          <input
            type="number"
            min="0"
            value={formData.totalLessons}
            onChange={(e) => setFormData({ ...formData, totalLessons: parseInt(e.target.value) })}
            placeholder="e.g., 20"
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
            }`}
          />
        </div>

        <div className={`p-4 rounded-xl border ${
          darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-orange-50 border-orange-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Paid Course (Optional)
              </h4>
              <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                You can make this course paid later when you're ready
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPaid}
                onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked, price: e.target.checked ? formData.price : 0 })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-linear-to-r peer-checked:from-orange-500 peer-checked:to-red-600"></div>
            </label>
          </div>

          {formData.isPaid && (
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                placeholder="999"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                    : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                }`}
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
          >
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
  };

  const NoteForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      language: 'Hindi',
      category: 'reference',
      file: null as File | null
    });

    const handleSubmit = async () => {
      if (!formData.file) {
        alert("Please upload a PDF file");
        return;
      }

      const token = localStorage.getItem("token");
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('language', formData.language);
      submitData.append('category', formData.category);
      submitData.append('file', formData.file);

      try {
        const res = await fetch(`${API_URL}/teachers/notes`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: submitData,
        });

        if (res.ok) {
          alert("Note uploaded successfully!");
          setShowCreateModal(false);
          fetchNotes();
          fetchTeacherStats();
        } else {
          alert("Failed to upload note");
        }
      } catch (error) {
        console.error("Error uploading note:", error);
        alert("Error uploading note");
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Note Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., SSC Hindi Grammar Guide"
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Description *
          </label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the content..."
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
              Language *
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
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Kannada</option>
              <option>Bengali</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                darkMode 
                  ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                  : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
              }`}
            >
              <option value="reference">Reference Material</option>
              <option value="grammar">Grammar</option>
              <option value="vocabulary">Vocabulary</option>
              <option value="exam-prep">Exam Preparation</option>
              <option value="job-training">Job Training</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Upload PDF *
          </label>
          <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            darkMode 
              ? 'border-orange-800/30 hover:border-orange-600/50 bg-orange-900/5' 
              : 'border-orange-200 hover:border-orange-400 bg-orange-50/50'
          }`}>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({ ...formData, file: e.target.files[0] });
                }
              }}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <Upload className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                {formData.file ? formData.file.name : 'Click to upload PDF'}
              </p>
              <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                PDF up to 50MB
              </p>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
          >
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
  };

  const SessionForm = () => {
    const [formData, setFormData] = useState({
      type: '1:1' as '1:1' | 'group',
      topic: '',
      language: 'Hindi',
      scheduledDate: '',
      duration: 60,
      platform: 'google-meet' as 'google-meet' | 'zoom',
      maxStudents: 1
    });

    const handleSubmit = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${API_URL}/teachers/mentorship-sessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("Session created successfully!");
          setShowCreateModal(false);
          fetchMentorshipSessions();
          fetchTeacherStats();
        } else {
          alert("Failed to create session");
        }
      } catch (error) {
        console.error("Error creating session:", error);
        alert("Error creating session");
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Session Type *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '1:1', label: '1:1 Mentorship', icon: MessageSquare },
              { value: 'group', label: 'Group Session', icon: Users }
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData({ ...formData, type: type.value as '1:1' | 'group', maxStudents: type.value === '1:1' ? 1 : 10 })}
                className={`p-4 rounded-xl border transition-all text-center ${
                  formData.type === type.value
                    ? 'bg-linear-to-r from-orange-500 to-red-600 text-white border-transparent'
                    : darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                      : 'bg-white border-orange-100 hover:bg-orange-50'
                }`}
              >
                <type.icon className={`w-6 h-6 mx-auto mb-2 ${formData.type === type.value ? 'text-white' : darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <span className={`text-sm font-medium ${formData.type === type.value ? 'text-white' : darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Topic *
          </label>
          <input
            type="text"
            required
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            placeholder="e.g., Interview Preparation - Hindi"
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
              Language *
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
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>English</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
              Duration (minutes) *
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                darkMode 
                  ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                  : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
              }`}
            >
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
              <option value={120}>120</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Scheduled Date & Time *
          </label>
          <input
            type="datetime-local"
            required
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Platform *
          </label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as 'google-meet' | 'zoom' })}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
            }`}
          >
            <option value="google-meet">Google Meet</option>
            <option value="zoom">Zoom</option>
          </select>
        </div>

        {formData.type === 'group' && (
          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
              Max Students
            </label>
            <input
              type="number"
              min="2"
              max="50"
              value={formData.maxStudents}
              onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
              placeholder="e.g., 10"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                darkMode 
                  ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                  : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
              }`}
            />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
          >
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
  };

  const LiveClassForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      topic: '',
      language: 'Hindi',
      scheduledDate: '',
      duration: 60,
      maxStudents: 50,
      platform: 'google-meet' as 'google-meet' | 'zoom'
    });

    const handleSubmit = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${API_URL}/teachers/live-classes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("Live class created successfully!");
          setShowCreateModal(false);
          fetchLiveClasses();
          fetchTeacherStats();
        } else {
          alert("Failed to create live class");
        }
      } catch (error) {
        console.error("Error creating live class:", error);
        alert("Error creating live class");
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Class Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Grammar Mastery Live Workshop"
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Description *
          </label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="What will be covered in this class..."
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 placeholder-orange-300/50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 placeholder-gray-400 focus:border-orange-400'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Topic *
          </label>
          <input
            type="text"
            required
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            placeholder="e.g., Advanced Grammar Concepts"
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
              Language *
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
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>English</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
              Duration (minutes) *
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                darkMode 
                  ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                  : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
              }`}
            >
              <option value={45}>45</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
              <option value={120}>120</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
            Scheduled Date & Time *
          </label>
          <input
            type="datetime-local"
            required
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
              Max Students *
            </label>
            <input
              type="number"
              min="10"
              max="500"
              value={formData.maxStudents}
              onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                darkMode 
                  ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                  : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
              Platform *
            </label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value as 'google-meet' | 'zoom' })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                darkMode 
                  ? 'bg-orange-900/10 border-orange-800/30 text-orange-50 focus:border-orange-600' 
                  : 'bg-white border-orange-100 text-gray-900 focus:border-orange-400'
              }`}
            >
              <option value="google-meet">Google Meet</option>
              <option value="zoom">Zoom</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            Create Live Class
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
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      
      {/* Space for Navbar */}
      <div className="h-20"></div>

      {/* Hero Section */}
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
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-semibold">Teacher Dashboard</span>
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                Your Teaching Hub
              </h1>
              <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                Help students master languages & earn through your expertise
              </p>
            </div>
            
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2 self-start md:self-auto"
            >
              <Plus className="w-5 h-5" />
              Create Content
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'blue' },
              { label: 'Pending Feedback', value: stats.pendingFeedbacks, icon: Mic, color: 'orange', highlight: stats.pendingFeedbacks > 0 },
              { label: 'Upcoming Sessions', value: stats.upcomingSessions, icon: Calendar, color: 'green' },
              { label: 'Avg. Rating', value: stats.averageRating.toFixed(1), icon: Star, color: 'yellow' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-all hover:scale-105 relative ${
                  stat.highlight 
                    ? darkMode 
                      ? 'bg-orange-500/10 border-orange-600/50 ring-2 ring-orange-500/30' 
                      : 'bg-orange-50 border-orange-400 ring-2 ring-orange-300/50'
                    : darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30' 
                      : 'bg-white border-orange-100 shadow-sm'
                }`}
              >
                {stat.highlight && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-4 h-4 bg-linear-to-r from-orange-500 to-red-600 rounded-full animate-pulse"></div>
                  </div>
                )}
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
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'feedback', label: 'Pronunciation Feedback', icon: Mic, badge: stats.pendingFeedbacks },
              { id: 'mentorship', label: 'Mentorship', icon: MessageSquare },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'notes', label: 'Notes & Resources', icon: FileText },
              { id: 'live-classes', label: 'Live Classes', icon: Video },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2 relative ${
                  activeTab === tab.id
                    ? 'bg-linear-to-r from-orange-500 to-red-600 text-white'
                    : darkMode
                      ? 'bg-orange-900/10 border border-orange-800/30 text-orange-200 hover:bg-orange-900/20'
                      : 'bg-white border border-orange-100 text-gray-700 hover:bg-orange-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                    activeTab === tab.id
                      ? 'bg-white text-orange-600'
                      : 'bg-linear-to-r from-orange-500 to-red-600 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
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
                      { label: 'Schedule Session', icon: MessageSquare, action: () => { setCreateType('session'); setShowCreateModal(true); } },
                      { label: 'Create Live Class', icon: Video, action: () => { setCreateType('live-class'); setShowCreateModal(true); } }
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

                {/* Recent Activity */}
                <div className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                    darkMode ? 'text-orange-50' : 'text-gray-900'
                  }`}>
                    <Bell className="w-5 h-5" />
                    Pending Tasks
                  </h3>
                  <div className="space-y-3">
                    {stats.pendingFeedbacks > 0 && (
                      <button 
                        onClick={() => setActiveTab('feedback')}
                        className={`w-full p-3 rounded-lg text-left transition-all ${darkMode ? 'bg-orange-900/20 hover:bg-orange-900/30' : 'bg-orange-50 hover:bg-orange-100'}`}
                      >
                        <p className={`text-sm font-medium ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                          {stats.pendingFeedbacks} Pronunciation Feedback{stats.pendingFeedbacks > 1 ? 's' : ''} Pending
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          Review student recordings
                        </p>
                      </button>
                    )}
                    {stats.upcomingSessions > 0 && (
                      <button 
                        onClick={() => setActiveTab('mentorship')}
                        className={`w-full p-3 rounded-lg text-left transition-all ${darkMode ? 'bg-orange-900/20 hover:bg-orange-900/30' : 'bg-orange-50 hover:bg-orange-100'}`}
                      >
                        <p className={`text-sm font-medium ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                          {stats.upcomingSessions} Upcoming Session{stats.upcomingSessions > 1 ? 's' : ''}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          Check your schedule
                        </p>
                      </button>
                    )}
                    {stats.pendingFeedbacks === 0 && stats.upcomingSessions === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className={`w-12 h-12 mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                        <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          All caught up!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Getting Started Guide */}
              <div className={`p-6 rounded-2xl border ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30' 
                  : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-100 shadow-lg'
              }`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                  darkMode ? 'text-orange-50' : 'text-gray-900'
                }`}>
                  <Target className="w-5 h-5" />
                  Getting Started as a Teacher
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { title: 'Review Feedback Requests', description: 'Help students improve pronunciation', icon: Headphones },
                    { title: 'Schedule Sessions', description: '1:1 or group mentorship', icon: Calendar },
                    { title: 'Create Courses', description: 'Build comprehensive learning paths', icon: BookOpen },
                    { title: 'Share Resources', description: 'Upload notes & study materials', icon: Upload }
                  ].map((step, i) => (
                    <div key={i} className={`p-4 rounded-xl ${darkMode ? 'bg-orange-900/20' : 'bg-white/70'}`}>
                      <div className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center ${
                        darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                      }`}>
                        <step.icon className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                      </div>
                      <h4 className={`font-semibold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                        {step.title}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pronunciation Feedback Tab */}
          {activeTab === 'feedback' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    Pronunciation Feedback Requests
                  </h2>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Standard pricing: ₹50 per feedback
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}>
                  <span className={`text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    {feedbackRequests.filter(f => f.status === 'pending').length} Pending
                  </span>
                </div>
              </div>

              {feedbackRequests.length === 0 ? (
                <div className={`p-12 rounded-2xl border text-center ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}>
                  <Mic className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-orange-400/50' : 'text-orange-600/50'}`} />
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    No Feedback Requests Yet
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Students will submit pronunciation recordings for your review
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {feedbackRequests.map((request) => (
                    <div
                      key={request._id}
                      className={`p-6 rounded-2xl border ${
                        request.status === 'pending'
                          ? darkMode 
                            ? 'bg-orange-500/5 border-orange-600/30 ring-2 ring-orange-500/20' 
                            : 'bg-orange-50/50 border-orange-200 ring-2 ring-orange-300/30'
                          : darkMode 
                            ? 'bg-orange-900/10 border-orange-800/30' 
                            : 'bg-white border-orange-100 shadow-lg'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold">
                            {request.studentId.name?.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h3 className={`font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                              {request.studentId.name}
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                              {request.studentLevel} • {request.language}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          request.status === 'pending'
                            ? darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                            : darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                        }`}>
                          {request.status === 'pending' ? 'Pending' : 'Reviewed'}
                        </span>
                      </div>

                      {request.text && (
                        <div className={`p-3 rounded-lg mb-3 ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                          <p className={`text-sm italic ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                            "{request.text}"
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-3">
                        <button className={`flex-1 px-4 py-2 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                          darkMode 
                            ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                            : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                        }`}>
                          <PlayCircle className="w-4 h-4" />
                          Play Audio
                        </button>
                        <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                          {request.submittedAt}
                        </p>
                      </div>

                      {request.status === 'pending' ? (
                        <button
                          onClick={() => {
                            const feedback = prompt("Enter your feedback:");
                            const rating = prompt("Rating (1-5):");
                            if (feedback && rating) {
                              handleProvideFeedback(request._id, feedback, parseInt(rating));
                            }
                          }}
                          className="w-full px-4 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Provide Feedback
                        </button>
                      ) : (
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/20 border border-green-800/30' : 'bg-green-50 border border-green-200'}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                            <span className={`text-sm font-semibold ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                              Feedback Provided • {request.rating}/5 ⭐
                            </span>
                          </div>
                          {request.feedback && (
                            <p className={`text-sm ${darkMode ? 'text-green-200/80' : 'text-green-700'}`}>
                              {request.feedback}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mentorship Sessions Tab */}
          {activeTab === 'mentorship' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  Mentorship Sessions
                </h2>
                <button 
                  onClick={() => { setCreateType('session'); setShowCreateModal(true); }}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Schedule Session
                </button>
              </div>

              {mentorshipSessions.length === 0 ? (
                <div className={`p-12 rounded-2xl border text-center ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}>
                  <MessageSquare className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-orange-400/50' : 'text-orange-600/50'}`} />
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    No Sessions Scheduled
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Create your first mentorship session
                  </p>
                  <button 
                    onClick={() => { setCreateType('session'); setShowCreateModal(true); }}
                    className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Schedule Session
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {mentorshipSessions.map((session) => (
                    <div
                      key={session._id}
                      className={`p-6 rounded-2xl border ${
                        session.status === 'upcoming'
                          ? darkMode 
                            ? 'bg-orange-500/5 border-orange-600/30 ring-2 ring-orange-500/20' 
                            : 'bg-orange-50/50 border-orange-200 ring-2 ring-orange-300/30'
                          : darkMode 
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
                            ) : (
                              <Users className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                            )}
                          </div>
                          <div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                            }`}>
                              {session.type === '1:1' ? '1:1 Session' : `Group (${session.studentCount || session.students?.length || 0} students)`}
                            </span>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          session.status === 'upcoming'
                            ? darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                            : session.status === 'completed'
                              ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {session.status}
                        </span>
                      </div>

                      {session.type === '1:1' && session.studentId && (
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold text-sm">
                            {session.studentId.name?.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                              {session.studentId.name}
                            </p>
                          </div>
                        </div>
                      )}

                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                        {session.topic}
                      </h3>

                      <div className={`p-3 rounded-lg mb-4 ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                            <span className={darkMode ? 'text-orange-200' : 'text-gray-700'}>
                              {session.duration} min
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                            <span className={darkMode ? 'text-orange-200' : 'text-gray-700'}>
                              {session.language}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                            <span className={darkMode ? 'text-orange-200' : 'text-gray-700'}>
                              {new Date(session.scheduledDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                            <span className={darkMode ? 'text-orange-200' : 'text-gray-700'}>
                              {session.platform === 'google-meet' ? 'Google Meet' : 'Zoom'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {session.status === 'upcoming' && (
                          <>
                            <button className="flex-1 px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">
                              Join Session
                            </button>
                            <button className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                              darkMode 
                                ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                                : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                            }`}>
                              <Edit className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {session.status === 'completed' && (
                          <button className={`w-full px-4 py-2 rounded-lg border font-medium transition-all ${
                            darkMode 
                              ? 'border-green-800/30 text-green-300 bg-green-900/20' 
                              : 'border-green-200 text-green-700 bg-green-50'
                          }`}>
                            <CheckCircle className="w-4 h-4 inline mr-2" />
                            Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                  <button 
                    onClick={() => { setCreateType('course'); setShowCreateModal(true); }}
                    className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    New Course
                  </button>
                </div>
              </div>

              {courses.length === 0 ? (
                <div className={`p-12 rounded-2xl border text-center ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100 shadow-lg'
                }`}>
                  <BookOpen className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-orange-400/50' : 'text-orange-600/50'}`} />
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    No Courses Yet
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    Create your first course to start teaching
                  </p>
                  <button 
                    onClick={() => { setCreateType('course'); setShowCreateModal(true); }}
                    className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Create Course
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course._id}
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
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            course.category === 'competitive-exam'
                              ? darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-50 text-purple-700'
                              : course.category === 'job-training'
                                ? darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                                : darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                          }`}>
                            {course.category === 'competitive-exam' ? 'Exam Prep' :
                             course.category === 'job-training' ? 'Job Training' :
                             course.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            course.status === 'published'
                              ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {course.status}
                          </span>
                        </div>

                        <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                          {course.title}
                        </h3>
                        <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          {course.description}
                        </p>

                        <div className="flex items-center gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                            <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                              {course.enrolledStudents}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className={`w-4 h-4 fill-yellow-500 text-yellow-500`} />
                            <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                              {course.rating.toFixed(1)}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'
                          }`}>
                            {course.level}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-4 pb-4 border-b ${darkMode ? 'border-orange-800/30' : 'border-orange-100'}">
                          <span className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                            {course.totalLessons} lessons • {course.language}
                          </span>
                          {course.isPaid && course.price && (
                            <span className={`text-lg font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                              ₹{course.price}
                            </span>
                          )}
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
              )}
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  Notes & Resources
                </h2>
                <button 
                  onClick={() => { setCreateType('note'); setShowCreateModal(true); }}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Upload Note
                </button>
              </div>

                            {notes.length === 0 ? (
                              <div className={`p-12 rounded-2xl border text-center ${
                                darkMode 
                                  ? 'bg-orange-900/10 border-orange-800/30' 
                                  : 'bg-white border-orange-100 shadow-lg'
                              }`}>
                                <FileText className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-orange-400/50' : 'text-orange-600/50'}`} />
                                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                                  No Notes Yet
                                </h3>
                                <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                                  Upload your first study material
                                </p>
                                <button 
                                  onClick={() => { setCreateType('note'); setShowCreateModal(true); }}
                                  className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
                                >
                                  Upload Note
                                </button>
                              </div>
                            ) : (
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {notes.map((note) => (
                                  <div
                                    key={note._id}
                                    className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                                      darkMode 
                                        ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                                        : 'bg-white border-orange-100 hover:shadow-xl'
                                    }`}
                                  >
                                    <div className="flex items-start justify-between mb-3">
                                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                                        <FileText className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                                      </div>
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        note.status === 'published'
                                          ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                      }`}>
                                        {note.status}
                                      </span>
                                    </div>
              
                                    <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                                      {note.title}
                                    </h3>
                                    <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                                      {note.description}
                                    </p>
              
                                    <div className="flex items-center gap-3 mb-4 text-sm">
                                      <div className="flex items-center gap-1">
                                        <Download className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                                        <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                                          {note.downloads}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Eye className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                                        <span className={darkMode ? 'text-orange-200/70' : 'text-gray-600'}>
                                          {note.views}
                                        </span>
                                      </div>
                                    </div>
              
                                    <div className="flex gap-2">
                                      <button className="flex-1 px-3 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white text-sm font-semibold hover:shadow-lg transition-all">
                                        Edit
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
                            )}
                          </div>
                        )}
              
                        {/* Live Classes Tab */}
                        {activeTab === 'live-classes' && (
                          <div>
                            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                              Live Classes
                            </h2>
                            <div className={`p-12 rounded-2xl border text-center ${
                              darkMode 
                                ? 'bg-orange-900/10 border-orange-800/30' 
                                : 'bg-white border-orange-100 shadow-lg'
                            }`}>
                              <Video className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-orange-400/50' : 'text-orange-600/50'}`} />
                              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                                Coming Soon
                              </h3>
                              <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                                Live classes feature will be available soon
                              </p>
                            </div>
                          </div>
                        )}
              
                        {/* Analytics Tab */}
                        {activeTab === 'analytics' && (
                          <div>
                            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                              Analytics
                            </h2>
                            <div className={`p-12 rounded-2xl border text-center ${
                              darkMode 
                                ? 'bg-orange-900/10 border-orange-800/30' 
                                : 'bg-white border-orange-100 shadow-lg'
                            }`}>
                              <BarChart3 className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-orange-400/50' : 'text-orange-600/50'}`} />
                              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                                Coming Soon
                              </h3>
                              <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                                Detailed analytics will be available soon
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
              
                    {/* Create Modal */}
                    {showCreateModal && (
                      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border ${
                          darkMode 
                            ? 'bg-[#1a1410] border-orange-800/30' 
                            : 'bg-white border-orange-100'
                        }`}>
                          <div className="p-6 border-b border-orange-800/30">
                            <div className="flex items-center justify-between">
                              <h2 className={`text-2xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                                {createType === 'course' && 'Create New Course'}
                                {createType === 'note' && 'Upload Study Material'}
                                {createType === 'session' && 'Schedule Mentorship Session'}
                                {createType === 'live-class' && 'Create Live Class'}
                              </h2>
                              <button 
                                onClick={() => setShowCreateModal(false)}
                                className={`p-2 rounded-lg hover:bg-orange-900/20 transition-all ${
                                  darkMode ? 'text-orange-200' : 'text-gray-700'
                                }`}
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <div className="p-6">
                            {createType === 'course' && <CourseForm />}
                            {createType === 'note' && <NoteForm />}
                            {createType === 'session' && <SessionForm />}
                            {createType === 'live-class' && <LiveClassForm />}
                          </div>
                        </div>
                      </div>
                    )}
              
                    <Footer />
                  </div>
                );
              }