// app/admin/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ExtendJobModal from '@/components/ExtendJobModal';
import ReportDetailsModal from '@/components/ReportDetailsModal';
import { 
  Shield, Users, Briefcase, TrendingUp, Clock, 
  Trash2, Calendar, Loader2, AlertTriangle, CheckCircle,
  AlertCircle as ReportIcon, Eye, Link2Off
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

// ✅ NEW
interface Member {
  _id: string;
  name: string;
  email: string;
  primaryRole?: string;
  createdAt: string;
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
  const [members, setMembers] = useState<Member[]>([]); // ✅ NEW
  const [memberSearch, setMemberSearch] = useState(''); // ✅ NEW
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]); // ✅ NEW: max 2
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [resetLoadingId, setResetLoadingId] = useState<string | null>(null);
  const [membersResetLoading, setMembersResetLoading] = useState(false); // ✅ NEW
  const [activeTab, setActiveTab] = useState<'jobs' | 'reports' | 'users'>('jobs'); // ✅ 'users' added

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
      await Promise.all([fetchStats(), fetchJobs(), fetchReports(), fetchMembers()]); // ✅ fetchMembers added
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

  // ✅ NEW
  const fetchMembers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setMembers(data.users);
    } catch (error) {
      console.error('Fetch members error:', error);
    }
  };

  const handleExtendJob = async (days: number) => {
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
        body: JSON.stringify({ days })
      });

      const data = await res.json();

      if (data.success) {
        alert(`Job extended by ${days} days!`);
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

  const handleDeleteReport = async () => {
    if (!selectedReport) return;
    if (!confirm('Mark this report as reviewed and delete it?')) return;

    setActionLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_URL}/admin/reports/${selectedReport._id}`, {
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

  // ✅ Reset via a report row (existing flow, unchanged)
  const handleResetConnection = async (report: Report) => {
    const reporterName = report.reporter?.name || 'this user';
    const reportedName = report.reportedUser?.name || 'the reported user';

    if (
      !confirm(
        `Delete the match and chat between ${reporterName} and ${reportedName}?\n\n` +
        `This removes their existing conversation entirely — they will be able to match and chat again as if they never connected.`
      )
    ) {
      return;
    }

    setResetLoadingId(report._id);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(
        `${API_URL}/admin/connections/${report.reporter._id}/${report.reportedUser._id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          `Connection reset: ${data.matchesDeleted} match(es) deleted, ` +
          `chat deleted: ${data.chatDeleted ? 'yes' : 'no'}, ` +
          `${data.notificationsDeleted} notification(s) cleared.`
        );
        await fetchStats();
      } else {
        alert(data.error || 'Failed to reset connection');
      }
    } catch (error) {
      console.error('Reset connection error:', error);
      alert('Failed to reset connection');
    } finally {
      setResetLoadingId(null);
    }
  };

  // ✅ NEW: toggle a member's selection — capped at 2
  const toggleMemberSelection = (userId: string) => {
    setSelectedMemberIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }
      if (prev.length >= 2) {
        // swap out the oldest selection so a third click still feels responsive
        return [prev[1], userId];
      }
      return [...prev, userId];
    });
  };

  // ✅ NEW: reset connection between the two selected members
  const handleResetSelectedMembers = async () => {
    if (selectedMemberIds.length !== 2) return;

    const [id1, id2] = selectedMemberIds;
    const name1 = members.find((m) => m._id === id1)?.name || 'User A';
    const name2 = members.find((m) => m._id === id2)?.name || 'User B';

    if (
      !confirm(
        `Delete the match and chat between ${name1} and ${name2}?\n\n` +
        `This removes their existing conversation entirely — they will be able to match and chat again as if they never connected.`
      )
    ) {
      return;
    }

    setMembersResetLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_URL}/admin/connections/${id1}/${id2}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (data.success) {
        alert(
          `Connection reset: ${data.matchesDeleted} match(es) deleted, ` +
          `chat deleted: ${data.chatDeleted ? 'yes' : 'no'}, ` +
          `${data.notificationsDeleted} notification(s) cleared.`
        );
        setSelectedMemberIds([]);
        await fetchStats();
      } else {
        alert(data.error || 'Failed to reset connection');
      }
    } catch (error) {
      console.error('Reset connection error:', error);
      alert('Failed to reset connection');
    } finally {
      setMembersResetLoading(false);
    }
  };

  // Returns raw days (can be negative for expired)
  const getDaysRemaining = (expiryDate: string) => {
    return Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  const isActuallyExpired = (job: Job) => {
    return new Date(job.expiryDate) < new Date();
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

  // ✅ NEW: filter members by search
  const filteredMembers = members.filter((m) => {
    const q = memberSearch.trim().toLowerCase();
    if (!q) return true;
    return m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q);
  });

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
            {/* ✅ NEW TAB */}
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'users'
                  ? darkMode
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-600 text-white'
                  : darkMode
                    ? 'bg-orange-900/10 text-orange-300 border border-orange-800/30'
                    : 'bg-white text-gray-700 border border-orange-200'
              }`}
            >
              Users ({members.length})
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
                            !isActuallyExpired(job)
                              ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                              : darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                          }`}>
                            {isActuallyExpired(job) ? 'expired' : 'active'}
                          </span>
                        </td>

                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                          {isActuallyExpired(job) ? (
                            <div>
                              <span className={darkMode ? 'text-red-400' : 'text-red-600'}>—</span>
                              <p className={`text-xs mt-0.5 ${darkMode ? 'text-orange-300/50' : 'text-gray-400'}`}>
                                Auto-deletes in {Math.max(0, 30 - Math.abs(getDaysRemaining(job.expiryDate)))} days
                              </p>
                            </div>
                          ) : (
                            `${getDaysRemaining(job.expiryDate)} days`
                          )}
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
                            <p className="font-medium">{String(report.reporter?.name || 'Unknown')}</p>
                            <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                              {String(report.reporter?.email || 'N/A')}
                            </p>
                          </td>
                          <td className={`px-6 py-4 ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                            <p className="font-medium">{String(report.reportedUser?.name || 'Unknown')}</p>
                            <p className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                              {String(report.reportedUser?.email || 'N/A')}
                            </p>
                          </td>
                          <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                            <p className="line-clamp-2">{String(report.reason || 'No reason')}</p>
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
                                onClick={() => handleResetConnection(report)}
                                disabled={resetLoadingId === report._id}
                                className="p-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Delete match & chat between these two users"
                              >
                                {resetLoadingId === report._id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Link2Off className="w-4 h-4" />
                                )}
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

          {/* ✅ NEW: Users Tab — pick any 2 members and reset their connection */}
          {activeTab === 'users' && (
            <div className={`rounded-2xl border overflow-hidden ${
              darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-100'
            }`}>
              <div className="p-6 border-b border-orange-800/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    All Members ({members.length})
                  </h2>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    Select exactly two users to delete their match & chat, so they can connect again
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className={`px-4 py-2 rounded-lg text-sm border w-64 focus:outline-none ${
                      darkMode
                        ? 'bg-orange-900/10 border-orange-800/30 text-orange-100 placeholder:text-orange-300/40'
                        : 'bg-white border-orange-200 text-gray-900 placeholder:text-gray-400'
                    }`}
                  />
                  <button
                    onClick={handleResetSelectedMembers}
                    disabled={selectedMemberIds.length !== 2 || membersResetLoading}
                    className="px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold text-sm hover:bg-amber-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                  >
                    {membersResetLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Link2Off className="w-4 h-4" />
                    )}
                    Reset Connection ({selectedMemberIds.length}/2)
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full">
                  <thead className={`sticky top-0 ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Select
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Name
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Email
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Role
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-800/20">
                    {filteredMembers.map((member) => {
                      const isSelected = selectedMemberIds.includes(member._id);
                      return (
                        <tr
                          key={member._id}
                          onClick={() => toggleMemberSelection(member._id)}
                          className={`cursor-pointer transition-all ${
                            isSelected
                              ? darkMode ? 'bg-amber-900/30' : 'bg-amber-50'
                              : darkMode ? 'hover:bg-orange-900/10' : 'hover:bg-orange-50/50'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleMemberSelection(member._id)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-4 h-4 accent-amber-500"
                            />
                          </td>
                          <td className={`px-6 py-4 font-medium ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
                            {member.name}
                          </td>
                          <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                            {member.email}
                          </td>
                          <td className={`px-6 py-4 text-sm capitalize ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                            {member.primaryRole || '—'}
                          </td>
                          <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-700'}`}>
                            {formatDate(member.createdAt)}
                          </td>
                        </tr>
                      );
                    })}
                    {filteredMembers.length === 0 && (
                      <tr>
                        <td colSpan={5} className={`px-6 py-12 text-center text-sm ${darkMode ? 'text-orange-300/60' : 'text-gray-500'}`}>
                          No members match your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showExtendModal && selectedJob && (
        <ExtendJobModal
          job={selectedJob}
          onClose={() => {
            setShowExtendModal(false);
            setSelectedJob(null);
          }}
          onExtend={handleExtendJob}
          isLoading={actionLoading}
        />
      )}

      {showReportModal && selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => {
            setShowReportModal(false);
            setSelectedReport(null);
          }}
          onDelete={handleDeleteReport}
          isLoading={actionLoading}
        />
      )}
    </div>
  );
}