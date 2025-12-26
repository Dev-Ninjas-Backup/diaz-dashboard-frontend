import { Download } from 'lucide-react';
import React from 'react';

interface DailyLeadsHeaderProps {
  totalLeads: number;
  onExportCSV?: () => void;
}

export const DailyLeadsHeader: React.FC<DailyLeadsHeaderProps> = ({
  totalLeads,
  onExportCSV,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daily Leads</h1>
        <p className="text-sm text-gray-600 mt-1">
          Total {totalLeads} {totalLeads === 1 ? 'lead' : 'leads'} generated
          today
        </p>
      </div>
      <div className="flex items-center gap-3">
        {onExportCSV && (
          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        )}
      </div>
    </div>
  );
};
