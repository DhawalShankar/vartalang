// components/admin/ExtendJobModal.tsx
"use client";
import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { useDarkMode } from '@/lib/DarkModeContext';

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

interface ExtendJobModalProps {
  job: Job;
  onClose: () => void;
  onExtend: (days: number) => Promise<void>;
  isLoading: boolean;
}

export default function ExtendJobModal({ job, onClose, onExtend, isLoading }: ExtendJobModalProps) {
  const { darkMode } = useDarkMode();
  const [extendDays, setExtendDays] = useState(7);

  const handleSubmit = async () => {
    await onExtend(extendDays);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`max-w-md w-full rounded-2xl border p-6 ${
        darkMode ? 'bg-[#1a1410] border-orange-800/30' : 'bg-white border-orange-100'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Extend Job Duration
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-orange-900/20 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className={`text-sm mb-4 ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
          {job.title}
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
            onChange={(e) => setExtendDays(parseInt(e.target.value) || 1)}
            className={`w-full px-4 py-3 rounded-xl border outline-none ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30 text-orange-50' 
                : 'bg-white border-orange-100 text-gray-900'
            }`}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Extending...' : `Extend by ${extendDays} days`}
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
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}