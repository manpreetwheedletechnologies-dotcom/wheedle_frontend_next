'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../lib/api';
import {
  Download, ChevronLeft, ChevronRight, BarChart2,
  CheckCircle2, ClipboardList, Users, Clock
} from 'lucide-react';

const authHeader = () => ({
  Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('adminToken') || '' : ''}`,
});

export default function ReportsTab({ currentUser }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [currentDateStart, setCurrentDateStart] = useState(null);
  const [timeframe, setTimeframe] = useState('weekly');

  useEffect(() => {
    const now = new Date();
    if (timeframe === 'weekly') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(now);
      monday.setDate(diff);
      monday.setHours(0, 0, 0, 0);
      setCurrentDateStart(monday);
    } else if (timeframe === 'monthly') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      setCurrentDateStart(startOfMonth);
    } else if (timeframe === 'yearly') {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      setCurrentDateStart(startOfYear);
    }
  }, [timeframe]);

  useEffect(() => {
    if (currentDateStart) fetchReport();
  }, [currentDateStart, timeframe]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const startDateStr = currentDateStart.toISOString().split('T')[0];
      const res = await axios.get(`${API_BASE_URL}/dashboard/employee-task/reports`, {
        headers: authHeader(),
        params: { startDate: startDateStr, timeframe },
      });
      setReport(res.data);
    } catch (e) {
      console.error('Failed to fetch report', e);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const startDateStr = currentDateStart.toISOString().split('T')[0];
      const res = await axios.get(`${API_BASE_URL}/dashboard/employee-task/reports/export`, {
        headers: authHeader(),
        params: { startDate: startDateStr, timeframe },
        responseType: 'blob',
      });
      const blob = new Blob([res.data], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${timeframe}-report-${startDateStr}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to export CSV', e);
    } finally {
      setExporting(false);
    }
  };

  const handlePrevPeriod = () => {
    const prev = new Date(currentDateStart);
    if (timeframe === 'weekly') prev.setDate(prev.getDate() - 7);
    else if (timeframe === 'monthly') prev.setMonth(prev.getMonth() - 1);
    else if (timeframe === 'yearly') prev.setFullYear(prev.getFullYear() - 1);
    setCurrentDateStart(prev);
  };

  const handleNextPeriod = () => {
    const next = new Date(currentDateStart);
    if (timeframe === 'weekly') next.setDate(next.getDate() + 7);
    else if (timeframe === 'monthly') next.setMonth(next.getMonth() + 1);
    else if (timeframe === 'yearly') next.setFullYear(next.getFullYear() + 1);
    setCurrentDateStart(next);
  };

  const getPeriodRangeLabel = () => {
    if (!currentDateStart) return '';
    if (timeframe === 'weekly') {
      const end = new Date(currentDateStart);
      end.setDate(end.getDate() + 6);
      return `${currentDateStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else if (timeframe === 'monthly') {
      return currentDateStart.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    } else if (timeframe === 'yearly') {
      return currentDateStart.getFullYear().toString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Reports</h2>
          <p className="text-gray-500 text-sm mt-1">Review performance summaries and export CSV reports.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
          <select
            className="bg-white border px-3 py-2 rounded-xl shadow-sm text-sm font-semibold text-gray-700 outline-none"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          {/* Period Selector */}
          <div className="flex items-center gap-2 bg-white border px-3 py-2 rounded-xl shadow-sm">
            <button onClick={handlePrevPeriod} className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition">
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-gray-700 min-w-[180px] text-center">{getPeriodRangeLabel()}</span>
            <button onClick={handleNextPeriod} className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition">
              <ChevronRight size={16} />
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            disabled={exporting || !report}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl font-semibold transition shadow-md"
          >
            <Download size={16} />
            <span>{exporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Generating report...</div>
      ) : !report ? (
        <div className="text-center py-20 text-gray-400">No report data available.</div>
      ) : (
        <div className="space-y-6">
          {/* Summary KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                label: 'Tasks Created',
                value: report.taskSummary.total,
                icon: ClipboardList,
                color: 'from-blue-500 to-blue-700',
                light: 'bg-blue-50 text-blue-600',
              },
              {
                label: 'Tasks Completed',
                value: report.taskSummary.completed,
                icon: CheckCircle2,
                color: 'from-emerald-500 to-emerald-700',
                light: 'bg-emerald-50 text-emerald-600',
              },
              {
                label: 'Queries Raised',
                value: report.querySummary.totalRaised,
                icon: BarChart2,
                color: 'from-amber-500 to-amber-700',
                light: 'bg-amber-50 text-amber-600',
              },
              {
                label: 'Avg Resolution (hrs)',
                value: report.querySummary.avgResolutionTime,
                icon: Clock,
                color: 'from-purple-500 to-purple-700',
                light: 'bg-purple-50 text-purple-600',
              },
            ].map(({ label, value, icon: Icon, color, light }) => (
              <div key={label} className="bg-white rounded-2xl p-6 border shadow-sm hover:-translate-y-1 hover:shadow-lg transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">{label}</p>
                    <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl ${light}`}>
                    <Icon size={22} />
                  </div>
                </div>
                <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${color} opacity-60`} />
              </div>
            ))}
          </div>

          {/* Task + Query Summary Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wide border-b pb-3">Task Summary</h4>
              <div className="grid grid-cols-3 text-center divide-x">
                {[
                  { label: 'Total', value: report.taskSummary.total },
                  { label: 'In Progress', value: report.taskSummary.inProgress },
                  { label: 'Avg Progress', value: `${report.taskSummary.avgProgress}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="py-3 px-4">
                    <p className="text-2xl font-extrabold text-gray-800">{value}</p>
                    <p className="text-xs text-gray-400 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wide border-b pb-3">Client Query Summary</h4>
              <div className="grid grid-cols-3 text-center divide-x">
                {[
                  { label: 'Raised', value: report.querySummary.totalRaised },
                  { label: 'Resolved', value: report.querySummary.totalResolved },
                  { label: 'Avg Resolution', value: `${report.querySummary.avgResolutionTime} hrs` },
                ].map(({ label, value }) => (
                  <div key={label} className="py-3 px-4">
                    <p className="text-2xl font-extrabold text-gray-800">{value}</p>
                    <p className="text-xs text-gray-400 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Employee Performance Table */}
          {(currentUser?.role === 'Super Admin' || currentUser?.role === 'Admin' || currentUser?.userType === 'admin') && (
            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b bg-gradient-to-r from-[#2E1A6D] to-[#4B2D73]">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Users size={18} />
                <span>Employee Performance Sheet</span>
              </h4>
              <p className="text-white/60 text-xs mt-0.5">Task assignments and completion rates for this week.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b text-xs font-bold text-gray-500 uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 text-left">Employee</th>
                    <th className="px-6 py-3 text-center">Email</th>
                    <th className="px-6 py-3 text-center">Assigned Tasks</th>
                    <th className="px-6 py-3 text-center">Completed Tasks</th>
                    <th className="px-6 py-3 text-center">Avg Progress</th>
                    <th className="px-6 py-3 text-center">Completion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {report.employeeRows && report.employeeRows.length > 0 ? (
                    report.employeeRows.map((row, idx) => {
                      const rate = row.totalTasks > 0
                        ? Math.round((row.completedTasks / row.totalTasks) * 100)
                        : 0;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4 font-semibold text-gray-800">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2E1A6D] to-[#4B2D73] text-white flex items-center justify-center text-xs font-bold">
                                {row.name?.[0]?.toUpperCase() || '?'}
                              </div>
                              {row.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-center text-xs">{row.email}</td>
                          <td className="px-6 py-4 text-center font-bold text-gray-700">{row.totalTasks}</td>
                          <td className="px-6 py-4 text-center font-bold text-emerald-600">{row.completedTasks}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-[#0B2CC3] to-purple-600 h-full rounded-full"
                                  style={{ width: `${row.avgProgress}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-gray-600 min-w-[30px]">{row.avgProgress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              rate >= 80 ? 'bg-emerald-100 text-emerald-700' :
                              rate >= 50 ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {rate}%
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-gray-400 text-sm">
                        No employee data available for this week.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
}
