// components/admin/ReportDetailsModal.tsx
"use client";
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useDarkMode } from '@/lib/DarkModeContext';

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
  chatId: string | { _id: string; [key: string]: any };
  reason: string;
  timestamp: string;
}

interface ReportDetailsModalProps {
  report: Report;
  onClose: () => void;
  onDelete: () => Promise<void>;
  isLoading: boolean;
}

export default function ReportDetailsModal({ report, onClose, onDelete, isLoading }: ReportDetailsModalProps) {
  const { darkMode } = useDarkMode();

  // Debug logging
  console.log('📋 Report data:', report);
  console.log('Reporter:', report.reporter);
  console.log('Reported User:', report.reportedUser);

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date format error:', error);
      return 'Invalid date';
    }
  };

  // Helper to safely extract chatId (handles both string and populated object)
  const getChatId = () => {
    if (typeof report.chatId === 'string') {
      return report.chatId;
    } else if (report.chatId && typeof report.chatId === 'object' && '_id' in report.chatId) {
      return report.chatId._id;
    }
    return 'N/A';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`max-w-2xl w-full rounded-2xl border p-6 ${
        darkMode ? 'bg-[#1a1410] border-orange-800/30' : 'bg-white border-orange-100'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Report Details
          </h3>
          <button
            onClick={onClose}
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
              {String(report.reporter?.name || 'N/A')} ({String(report.reporter?.email || 'N/A')})
            </p>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
              Reported User
            </label>
            <p className={`text-sm ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
              {String(report.reportedUser?.name || 'N/A')} ({String(report.reportedUser?.email || 'N/A')})
            </p>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
              Reason
            </label>
            <p className={`text-sm ${darkMode ? 'text-orange-100' : 'text-gray-900'} whitespace-pre-wrap`}>
              {String(report.reason || 'No reason provided')}
            </p>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
              Reported On
            </label>
            <p className={`text-sm ${darkMode ? 'text-orange-100' : 'text-gray-900'}`}>
              {formatDate(report.timestamp)}
            </p>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-orange-300' : 'text-gray-600'}`}>
              Chat ID
            </label>
            <p className={`text-xs font-mono ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              {getChatId()}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDelete}
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Mark as Reviewed & Delete
              </>
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
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
  );
}