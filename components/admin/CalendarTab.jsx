'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../lib/api';
import { ChevronLeft, ChevronRight, Calendar, User, Clock, AlertCircle } from 'lucide-react';
import Toast from './Toast';

const authHeader = () => ({
  Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('adminToken') || '' : ''}`,
});

export default function CalendarTab({ currentUser }) {
  const [weeklyTasks, setWeeklyTasks] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [toast, setToast] = useState(null);

  const canEdit = currentUser?.role === 'Super Admin' || currentUser?.role === 'Admin' || currentUser?.role === 'Team Lead';

  useEffect(() => {
    // Set to current Monday
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    setCurrentWeekStart(monday);
    if (canEdit) {
      fetchTeamMembers();
    }
  }, []);

  useEffect(() => {
    if (currentWeekStart) {
      fetchWeeklyTasks();
    }
  }, [currentWeekStart]);

  const fetchWeeklyTasks = async () => {
    try {
      setLoading(true);
      const startOfWeekStr = currentWeekStart.toISOString().split('T')[0];
      const res = await axios.get(`${API_BASE_URL}/tasks/calendar`, {
        headers: authHeader(),
        params: { startOfWeek: startOfWeekStr },
      });
      setWeeklyTasks(res.data);
    } catch (e) {
      console.error('Failed to fetch calendar tasks', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/rbac/team-members`, { headers: authHeader() });
      setTeamMembers(res.data);
    } catch (e) {
      console.error('Failed to fetch team members', e);
    }
  };

  const handlePrevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDrop = async (e, dayName) => {
    e.preventDefault();
    if (!canEdit) return;

    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    // Calculate calendarDate for dropped day
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayIndex = days.indexOf(dayName);
    const targetDate = new Date(currentWeekStart);
    targetDate.setDate(targetDate.getDate() + dayIndex);
    const targetDateStr = targetDate.toISOString().split('T')[0];

    try {
      setLoading(true);
      await axios.patch(
        `${API_BASE_URL}/tasks/${taskId}/calendar-assign`,
        { calendarDate: targetDateStr },
        { headers: authHeader() }
      );
      fetchWeeklyTasks();
      setToast({ message: 'Task rescheduled successfully', type: 'success' });
    } catch (err) {
      console.error('Failed to update task calendar date', err);
      setToast({ message: err?.response?.data?.message || 'Failed to reschedule task', type: 'error' });
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getWeekRangeLabel = () => {
    if (!currentWeekStart) return '';
    const end = new Date(currentWeekStart);
    end.setDate(end.getDate() + 6);
    return `${currentWeekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const getPriorityBorder = (p) => {
    switch (p) {
      case 'High': return 'border-l-4 border-l-red-500';
      case 'Medium': return 'border-l-4 border-l-amber-500';
      case 'Low': return 'border-l-4 border-l-emerald-500';
      default: return 'border-l-4 border-l-slate-400';
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      {/* Calendar Header Nav */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Weekly Planning Calendar</h2>
          <p className="text-gray-500 text-sm mt-1">Plan deadlines and reschedule tasks via drag-and-drop.</p>
        </div>

        <div className="flex items-center gap-3 bg-white border px-4 py-2 rounded-xl shadow-sm">
          <button
            onClick={handlePrevWeek}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-bold text-gray-700 text-sm min-w-[180px] text-center">
            {getWeekRangeLabel()}
          </span>
          <button
            onClick={handleNextWeek}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Grid Columns for Days */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading weekly plans...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 min-h-[500px]">
          {days.map((dayName) => {
            const tasksForDay = weeklyTasks[dayName] || [];
            return (
              <div
                key={dayName}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, dayName)}
                className="bg-white rounded-2xl border p-4 shadow-sm flex flex-col min-w-[150px] transition-all hover:bg-slate-50/50"
              >
                {/* Day Header */}
                <div className="border-b pb-2 mb-3">
                  <h3 className="font-bold text-gray-700 text-sm">{dayName}</h3>
                  <span className="text-xs text-gray-400">
                    {tasksForDay.length} {tasksForDay.length === 1 ? 'task' : 'tasks'}
                  </span>
                </div>

                {/* Day Task List */}
                <div className="flex-1 space-y-3 min-h-[350px]">
                  {tasksForDay.map((task) => (
                    <div
                      key={task._id}
                      draggable={canEdit}
                      onDragStart={(e) => handleDragStart(e, task._id)}
                      className={`bg-white rounded-xl p-3 border shadow-sm ${getPriorityBorder(task.priority)} ${canEdit ? 'cursor-grab active:cursor-grabbing hover:shadow-md' : ''} transition`}
                    >
                      <h4 className="font-bold text-xs text-gray-800 line-clamp-2 leading-tight mb-2">
                        {task.title}
                      </h4>

                      {/* Info Row */}
                      <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1">
                        <div className="flex items-center gap-1">
                          <User size={10} />
                          <span className="truncate max-w-[60px]" title={task.assignees?.map(a => a.name).join(', ')}>
                            {task.assignees && task.assignees[0] ? task.assignees[0].name : 'Unassigned'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {task.status}
                        </div>
                      </div>
                    </div>
                  ))}

                  {tasksForDay.length === 0 && (
                    <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl py-10">
                      <span className="text-[10px] text-gray-300 font-medium select-none">No Tasks</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
