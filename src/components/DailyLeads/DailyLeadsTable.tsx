import type { Lead } from '@/types/daily-leads-types';
import React from 'react';

interface DailyLeadsTableProps {
  leads: Lead[];
}

export const DailyLeadsTable: React.FC<DailyLeadsTableProps> = ({ leads }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Serial
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Name
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leads.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 md:px-6 py-8 text-center text-sm text-gray-500"
              >
                No leads found
              </td>
            </tr>
          ) : (
            leads.map((lead, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {lead.product || 'N/A'}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {lead.name || 'Anonymous'}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {lead.email || 'Anonymous'}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
