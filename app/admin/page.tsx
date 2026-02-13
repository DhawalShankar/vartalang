// app/admin/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { 
  Shield, Users, Briefcase, TrendingUp, Clock, 
  Trash2, Calendar, Loader2, AlertTriangle, CheckCircle,
  X, AlertCircle as ReportIcon, Eye
} from 'lucide-react';
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  language: string;
  status: 'active' | 'expired';
  postedDate: string;
  expiryDate: string;
  postedBy: {
    name: string;
  };
  views: number;
}

interface Report {
  _id: string;
  reporter: {
    _id: string;
    name: string;
    email: string;
  };
  reportedUser: {
    _id: string;
    name: string;
    email: string;
  };
  chatId: string;
  reason: string;
  timestamp: string;
}

interface PlatformStats {
  users: {
    total: number;
    learners: number;
    teachers: number;
  };
  jobs: {
    total: number;
    active: number;
    expired: number;
  };
  engagement: {
    matches: number;
    chats: number;
  };
}

export default function AdminPortal() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [extendDays, setExtendDays] = useState(7);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'jobs' | 'reports'>('jobs');

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/admin/check`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (!data.isAdmin) {
        alert('Access Denied: Admin only');
        router.push('/');
        return;
      }

      setIsAdmin(true);
      await Promise.all([fetchStats(), fetchJobs(), fetchReports()]);
    } catch (error) {
      console.error('Admin check error:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  const fetchJobs = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/admin/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setJobs(data.jobs);
    } catch (error) {
      console.error('Fetch jobs error:', error);
    }
  };

  const fetchReports = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/admin/reports`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setReports(data.reports);
    } catch (error) {
      console.error('Fetch reports error:', error);
    }
  };

  const handleExtendJob = async () => {
    if (!selectedJob) return;

    setActionLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_URL}/admin/jobs/${selectedJob._id}/extend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ days: extendDays })
      });

      const data = await res.json();

      if (data.success) {
        alert(`Job extended by ${extendDays} days!`);
        setShowExtendModal(false);
        setSelectedJob(null);
        await fetchJobs();
      } else {
        alert(data.error || 'Failed to extend job');
      }
    } catch (error) {
      console.error('Extend job error:', error);
      alert('Failed to extend job');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    setActionLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_URL}/admin/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (data.success) {
        alert('Job deleted successfully');
        await fetchJobs();
      } else {
        alert(data.error || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Delete job error:', error);
      alert('Failed to delete job');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm('Mark this report as reviewed and delete it?')) return;

    setActionLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_URL}/admin/reports/${reportId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (data.success) {
        alert('Report reviewed and deleted successfully');
        setShowReportModal(false);
        setSelectedReport(null);
        await fetchReports();
      } else {
        alert(data.error || 'Failed to delete report');
      }
    } catch (error) {
      console.error('Delete report error:', error);
      alert('Failed to delete report');
    } finally {
      setActionLoading(false);
    }
  };

  const getDaysRemaining = (expiryDate: string) => {
    const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <Loader2 className={`w-16 h-16 animate-spin ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Admin Portal
              </h1>
            </div>
            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Manage VartaLang platform
            </p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <div className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-100'
              }`}>
                <Users className={`w-8 h-8 mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {stats.users.total}
                </p>
                <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Total Users
                </p>
                <p className={`text-xs mt-2 ${darkMode ? 'text-orange-300/50' : 'text-gray-500'}`}>
                  {stats.users.learners} learners • {stats.users.teachers} teachers
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-100'
              }`}>
                <Briefcase className={`w-8 h-8 mb-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {stats.jobs.active}
                </p>
                <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Active Jobs
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-100'
              }`}>
                <TrendingUp className={`w-8 h-8 mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {stats.jobs.total}
                </p>
                <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Total Jobs
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-100'
              }`}>
                <Clock className={`w-8 h-8 mb-3 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {stats.jobs.expired}
                </p>
                <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Expired Jobs
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-100'
              }`}>
                <ReportIcon className={`w-8 h-8 mb-3 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {reports.length}
                </p>
                <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  Pending Reports
                </p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'jobs'
                  ? darkMode
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-600 text-white'
                  : darkMode
                    ? 'bg-orange-900/10 text-orange-300 border border-orange-800/30'
                    : 'bg-white text-gray-700 border border-orange-200'
              }`}
            >
              Jobs ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'reports'
                  ? darkMode
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-600 text-white'
                  : darkMode
                    ? 'bg-orange-900/10 text-orange-300 border border-orange-800/30'
                    : 'bg-white text-gray-700 border border-orange-200'
              }`}
            >
              Reports ({reports.length})
              {reports.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {reports.length}
                </span>
              )}
            </button>
          </div>

          {/* Jobs Table */}
          {activeTab === 'jobs' && (
            <div className={`rounded-2xl border overflow-hidden ${
              darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-100'
            }`}>
              <div className="p-6 border-b border-orange-800/30">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  All Job Listings ({jobs.length})
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Job Title
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Company
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Language
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Status
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Expires In
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Views
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-800/20">
                    {jobs.map((job) => (
                      <tr key={job._id} className={darkMode ? 'hover:bg-orange-900/10' : 'hover:bg-orange-50/50'}>
                        <td className={`px-6 py-4 ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                          <p className="font-medium">{job.title}</p>
                          <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                            by {job.postedBy.name}
                          </p>
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                          {job.companyName}
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                          {job.language}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'active'
                              ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                              : darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                          {getDaysRemaining(job.expiryDate)} days
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                          {job.views}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedJob(job);
                                setShowExtendModal(true);
                              }}
                              className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
                              title="Extend duration"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job._id)}
                              className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                              title="Delete job"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Table */}
          {activeTab === 'reports' && (
            <div className={`rounded-2xl border overflow-hidden ${
              darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-100'
            }`}>
              <div className="p-6 border-b border-orange-800/30">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  User Reports ({reports.length})
                </h2>
              </div>

              {reports.length === 0 ? (
                <div className="p-12 text-center">
                  <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <p className={`text-lg font-semibold ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                    No pending reports
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    All reports have been reviewed
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}>
                      <tr>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                          Reporter
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                          Reported User
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                          Reason
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                          Date
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-800/20">
                      {reports.map((report) => (
                        <tr key={report._id} className={darkMode ? 'hover:bg-orange-900/10' : 'hover:bg-orange-50/50'}>
                          <td className={`px-6 py-4 ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                            <p className="font-medium">{report.reporter.name}</p>
                            <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                              {report.reporter.email}
                            </p>
                          </td>
                          <td className={`px-6 py-4 ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                            <p className="font-medium">{report.reportedUser.name}</p>
                            <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                              {report.reportedUser.email}
                            </p>
                          </td>
                          <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                            <p className="line-clamp-2">{report.reason}</p>
                          </td>
                          <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                            {formatDate(report.timestamp)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedReport(report);
                                  setShowReportModal(true);
                                }}
                                className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteReport(report._id)}
                                className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all"
                                title="Mark as reviewed"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Extend Job Modal */}
      {showExtendModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`max-w-md w-full rounded-2xl border p-6 ${
            darkMode ? 'bg-[#1a1410] border-orange-800/30' : 'bg-white border-orange-100'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Extend Job Duration
              </h3>
              <button
                onClick={() => setShowExtendModal(false)}
                className={`p-2 rounded-lg hover:bg-orange-900/20 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              {selectedJob.title}
            </p>

            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                Extend by (days)
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={extendDays}
                onChange={(e) => setExtendDays(parseInt(e.target.value))}
                className={`w-full px-4 py-3 rounded-xl border outline-none ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 text-orange-50' 
                    : 'bg-white border-orange-100 text-gray-900'
                }`}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleExtendJob}
                disabled={actionLoading}
                className="flex-1 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all disabled:opacity-50"
              >
                {actionLoading ? 'Extending...' : `Extend by ${extendDays} days`}
              </button>
              <button
                onClick={() => setShowExtendModal(false)}
                className={`px-6 py-3 rounded-xl border font-semibold ${
                  darkMode 
                    ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                    : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`max-w-2xl w-full rounded-2xl border p-6 ${
            darkMode ? 'bg-[#1a1410] border-orange-800/30' : 'bg-white border-orange-100'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Report Details
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className={`p-2 rounded-lg hover:bg-orange-900/20 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
                  Reporter
                </label>
                <p className={`text-sm ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                  {selectedReport.reporter.name} ({selectedReport.reporter.email})
                </p>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
                  Reported User
                </label>
                <p className={`text-sm ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                  {selectedReport.reportedUser.name} ({selectedReport.reportedUser.email})
                </p>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
                  Reason
                </label>
                <p className={`text-sm ${darkMode ? 'text-orange-100' : 'text-gray-900'} whitespace-pre-wrap`}>
                  {selectedReport.reason}
                </p>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
                  Reported On
                </label>
                <p className={`text-sm ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                  {formatDate(selectedReport.timestamp)}
                </p>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
                  Chat ID
                </label>
                <p className={`text-xs font-mono ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                  {selectedReport.chatId}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteReport(selectedReport._id)}
                disabled={actionLoading}
                className="flex-1 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Mark as Reviewed & Delete
                  </>
                )}
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className={`px-6 py-3 rounded-xl border font-semibold ${
                  darkMode 
                    ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                    : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}