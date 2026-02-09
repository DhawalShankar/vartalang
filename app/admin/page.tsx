"use client";
import { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, Users, Briefcase, Clock, 
  CheckCircle, XCircle, Eye, Search, Filter, Download,
  Calendar, ArrowUpRight, ArrowDownRight, MoreVertical,
  RefreshCw, AlertCircle, Ban, CheckCheck, Loader2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

// Mock Data
const MOCK_STATS = {
  totalRevenue: 24750,
  pendingExtensions: 8,
  activeJobs: 156,
  totalExtensions: 342,
  revenueGrowth: 12.5,
  newJobsToday: 5
};

const MOCK_EXTENSIONS = [
  {
    id: '1',
    userName: 'Rajesh Kumar',
    userEmail: 'rajesh@example.com',
    jobTitle: 'Hindi Translation Expert Needed',
    extensionType: '1_month',
    amount: 149,
    paymentStatus: 'pending',
    createdAt: '2024-02-08T10:30:00Z',
    razorpayOrderId: 'order_NjHx...'
  },
  {
    id: '2',
    userName: 'Priya Sharma',
    userEmail: 'priya@example.com',
    jobTitle: 'Tamil Language Teacher',
    extensionType: '15_days',
    amount: 99,
    paymentStatus: 'completed',
    createdAt: '2024-02-07T14:20:00Z',
    razorpayOrderId: 'order_NjHz...',
    razorpayPaymentId: 'pay_NjI1...'
  },
  {
    id: '3',
    userName: 'Amit Patel',
    userEmail: 'amit@example.com',
    jobTitle: 'Gujarati Content Writer',
    extensionType: '1_month',
    amount: 149,
    paymentStatus: 'completed',
    createdAt: '2024-02-07T09:15:00Z',
    razorpayOrderId: 'order_NjI2...',
    razorpayPaymentId: 'pay_NjI3...'
  },
  {
    id: '4',
    userName: 'Sneha Reddy',
    userEmail: 'sneha@example.com',
    jobTitle: 'Telugu Translation for Documents',
    extensionType: '15_days',
    amount: 99,
    paymentStatus: 'failed',
    createdAt: '2024-02-06T16:45:00Z',
    razorpayOrderId: 'order_NjI4...'
  },
  {
    id: '5',
    userName: 'Vikram Singh',
    userEmail: 'vikram@example.com',
    jobTitle: 'Punjabi Language Tutor',
    extensionType: '1_month',
    amount: 149,
    paymentStatus: 'pending',
    createdAt: '2024-02-06T11:30:00Z',
    razorpayOrderId: 'order_NjI5...'
  }
];

export default function AdminDashboard() {
  const { darkMode } = useDarkMode();
  const [stats, setStats] = useState(MOCK_STATS);
  const [extensions, setExtensions] = useState(MOCK_EXTENSIONS);
  const [filteredExtensions, setFilteredExtensions] = useState(MOCK_EXTENSIONS);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    applyFilters();
  }, [searchQuery, statusFilter, typeFilter, extensions]);

  const applyFilters = () => {
    let filtered = [...extensions];

    if (searchQuery) {
      filtered = filtered.filter(ext =>
        ext.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ext.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ext.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(ext => ext.paymentStatus === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(ext => ext.extensionType === typeFilter);
    }

    setFilteredExtensions(filtered);
  };

  const handleApprove = (id: string) => {
    setExtensions(prev => prev.map(ext =>
      ext.id === id ? { ...ext, paymentStatus: 'completed' as const } : ext
    ));
  };

  const handleReject = (id: string) => {
    setExtensions(prev => prev.map(ext =>
      ext.id === id ? { ...ext, paymentStatus: 'failed' as const } : ext
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: darkMode 
        ? 'bg-yellow-900/20 text-yellow-300 border-yellow-800/30'
        : 'bg-yellow-50 text-yellow-700 border-yellow-200',
      completed: darkMode
        ? 'bg-green-900/20 text-green-300 border-green-800/30'
        : 'bg-green-50 text-green-700 border-green-200',
      failed: darkMode
        ? 'bg-red-900/20 text-red-300 border-red-800/30'
        : 'bg-red-50 text-red-700 border-red-200'
    };

    const icons = {
      pending: Clock,
      completed: CheckCircle,
      failed: XCircle
    };

    const Icon = icons[status as keyof typeof icons];

    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5 ${styles[status as keyof typeof styles]}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      
      <div className="h-20"></div>

      {/* Header */}
      <section className="pt-8 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r ${
                darkMode 
                  ? 'from-orange-400 to-red-400' 
                  : 'from-orange-600 to-red-600'
              } bg-clip-text text-transparent`}>
                Admin Dashboard
              </h1>
              <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                Manage job extensions and payments
              </p>
            </div>
            
            <button 
              onClick={() => setLoading(true)}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2 self-start md:self-auto mt-4 md:mt-0"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Total Revenue */}
            <div className={`relative overflow-hidden rounded-2xl p-6 ${
              darkMode 
                ? 'bg-linear-to-br from-orange-900/20 to-orange-800/10 border border-orange-800/30' 
                : 'bg-linear-to-br from-orange-50 to-orange-100/50 border border-orange-200 shadow-lg'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                }`}>
                  <DollarSign className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <span className={`flex items-center gap-1 text-sm font-semibold ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  <ArrowUpRight className="w-4 h-4" />
                  +{stats.revenueGrowth}%
                </span>
              </div>
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                Total Revenue
              </p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className={`text-xs mt-2 ${darkMode ? 'text-orange-200/50' : 'text-gray-500'}`}>
                This month
              </p>
            </div>

            {/* Pending Extensions */}
            <div className={`relative overflow-hidden rounded-2xl p-6 ${
              darkMode 
                ? 'bg-linear-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-800/30' 
                : 'bg-linear-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200 shadow-lg'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  darkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'
                }`}>
                  <Clock className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                }`}>
                  Action needed
                </span>
              </div>
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-yellow-300/70' : 'text-gray-600'}`}>
                Pending Extensions
              </p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-yellow-50' : 'text-gray-900'}`}>
                {stats.pendingExtensions}
              </p>
              <p className={`text-xs mt-2 ${darkMode ? 'text-yellow-200/50' : 'text-gray-500'}`}>
                Awaiting approval
              </p>
            </div>

            {/* Active Jobs */}
            <div className={`relative overflow-hidden rounded-2xl p-6 ${
              darkMode 
                ? 'bg-linear-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/30' 
                : 'bg-linear-to-br from-blue-50 to-blue-100/50 border border-blue-200 shadow-lg'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <Briefcase className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <span className={`flex items-center gap-1 text-sm font-semibold ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  +{stats.newJobsToday}
                </span>
              </div>
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-blue-300/70' : 'text-gray-600'}`}>
                Active Jobs
              </p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-blue-50' : 'text-gray-900'}`}>
                {stats.activeJobs}
              </p>
              <p className={`text-xs mt-2 ${darkMode ? 'text-blue-200/50' : 'text-gray-500'}`}>
                Today: +{stats.newJobsToday}
              </p>
            </div>

            {/* Total Extensions */}
            <div className={`relative overflow-hidden rounded-2xl p-6 ${
              darkMode 
                ? 'bg-linear-to-br from-green-900/20 to-green-800/10 border border-green-800/30' 
                : 'bg-linear-to-br from-green-50 to-green-100/50 border border-green-200 shadow-lg'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  darkMode ? 'bg-green-500/20' : 'bg-green-100'
                }`}>
                  <TrendingUp className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                }`}>
                  All time
                </span>
              </div>
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-green-300/70' : 'text-gray-600'}`}>
                Total Extensions
              </p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-green-50' : 'text-gray-900'}`}>
                {stats.totalExtensions}
              </p>
              <p className={`text-xs mt-2 ${darkMode ? 'text-green-200/50' : 'text-gray-500'}`}>
                Since launch
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Extensions Table Section */}
      <section className="py-6 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className={`rounded-2xl overflow-hidden ${
            darkMode 
              ? 'bg-orange-900/10 border border-orange-800/30' 
              : 'bg-white border border-orange-100 shadow-xl'
          }`}>
            
            {/* Table Header */}
            <div className="p-6 border-b border-orange-800/30">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Extension Requests
              </h2>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Search */}
                <div className={`col-span-1 md:col-span-2 flex items-center gap-3 px-4 py-3 rounded-xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <Search className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search by name, email, or job..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`flex-1 bg-transparent outline-none ${
                      darkMode ? 'text-orange-50 placeholder-orange-300/50' : 'text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`px-4 py-3 rounded-xl border outline-none transition-all ${
                    darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30 text-orange-50' 
                      : 'bg-orange-50 border-orange-200 text-gray-900'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>

                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={`px-4 py-3 rounded-xl border outline-none transition-all ${
                    darkMode 
                      ? 'bg-orange-900/10 border-orange-800/30 text-orange-50' 
                      : 'bg-orange-50 border-orange-200 text-gray-900'
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="15_days">15 Days (₹99)</option>
                  <option value="1_month">1 Month (₹149)</option>
                </select>

              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      User
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      Job Title
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      Extension
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      Amount
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      Date
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExtensions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className={`text-center ${darkMode ? 'text-orange-200/50' : 'text-gray-400'}`}>
                          <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p className="font-medium">No extensions found</p>
                          <p className="text-sm mt-1">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredExtensions.map((ext, index) => (
                      <tr 
                        key={ext.id}
                        className={`border-b transition-all ${
                          darkMode 
                            ? 'border-orange-800/20 hover:bg-orange-900/10' 
                            : 'border-orange-100 hover:bg-orange-50/50'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                              {ext.userName}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-orange-200/50' : 'text-gray-500'}`}>
                              {ext.userEmail}
                            </p>
                          </div>
                        </td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                          <p className="max-w-xs truncate">{ext.jobTitle}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {ext.extensionType === '15_days' ? '15 Days' : '1 Month'}
                          </span>
                        </td>
                        <td className={`px-6 py-4 font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                          ₹{ext.amount}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(ext.paymentStatus)}
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          {formatDate(ext.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {ext.paymentStatus === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApprove(ext.id)}
                                  className={`p-2 rounded-lg transition-all ${
                                    darkMode 
                                      ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' 
                                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                                  }`}
                                  title="Approve"
                                >
                                  <CheckCheck className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleReject(ext.id)}
                                  className={`p-2 rounded-lg transition-all ${
                                    darkMode 
                                      ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                                  }`}
                                  title="Reject"
                                >
                                  <Ban className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button
                              className={`p-2 rounded-lg transition-all ${
                                darkMode 
                                  ? 'bg-orange-900/30 text-orange-400 hover:bg-orange-900/50' 
                                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                              }`}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className={`p-4 border-t flex items-center justify-between ${
              darkMode ? 'border-orange-800/30' : 'border-orange-100'
            }`}>
              <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                Showing {filteredExtensions.length} of {extensions.length} extensions
              </p>
              <button className="px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}