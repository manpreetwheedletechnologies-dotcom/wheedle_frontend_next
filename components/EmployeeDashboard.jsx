'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '../lib/api';
import TasksTab from './admin/TasksTab';
import CalendarTab from './admin/CalendarTab';
import ClientQueriesTab from './admin/ClientQueriesTab';
import ReportsTab from './admin/ReportsTab';
import TeamTab from './admin/TeamTab';
import {
  LayoutDashboard, CheckSquare, CalendarDays, MessageCircleQuestion,
  BarChart2, Users, Bell, LogOut, User, X, ChevronDown, Menu,
  CheckCircle2, Clock, AlertCircle, ClipboardList,
} from 'lucide-react';
import Toast from './admin/Toast';

const authHeader = () => ({
  Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('adminToken') || '' : ''}`,
});

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'tasks', label: 'Tasks', icon: CheckSquare, module: 'tasks', perm: 'tasks.view' },
  { key: 'calendar', label: 'Calendar', icon: CalendarDays, module: 'tasks', perm: 'tasks.view' },
  { key: 'queries', label: 'Client Queries', icon: MessageCircleQuestion, module: 'client-queries', perm: 'queries.view' },
  { key: 'reports', label: 'Reports', icon: BarChart2, module: 'reports', perm: 'reports.view' },
  { key: 'team', label: 'Team', icon: Users, module: 'user-management', perm: 'users.view' },
];

export default function EmployeeDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [toast, setToast] = useState(null);
  const [targetQueryTaskId, setTargetQueryTaskId] = useState(null);

  // Modals for auth
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSessionWarningOpen, setIsSessionWarningOpen] = useState(false);

  // Activity timer ref
  const inactivityTimerRef = React.useRef(null);
  const warningTimerRef = React.useRef(null);

  const resetTimers = React.useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    setIsSessionWarningOpen(false);

    // 19 minutes = 1140000 ms
    warningTimerRef.current = setTimeout(() => {
      setIsSessionWarningOpen(true);
    }, 1140000);

    // 20 minutes = 1200000 ms
    inactivityTimerRef.current = setTimeout(() => {
      logout(true);
    }, 1200000);
  }, []);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimers));
    resetTimers(); // start initially

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimers));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    };
  }, [resetTimers]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { router.push('/employee/login'); return; }
    fetchCurrentUser();
    fetchNotifications();
    fetchOverviewStats();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/auth/me`, { headers: authHeader() });
      setCurrentUser(res.data);
    } catch {
      // Token invalid or expired
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/dashboard/employee-task/notifications`, { headers: authHeader() });
      setNotifications(res.data || []);
    } catch { /* ignore */ }
  };

  const markNotifRead = async (notifId) => {
    try {
      await axios.patch(`${API_BASE_URL}/dashboard/employee-task/notifications/${notifId}/read`, {}, { headers: authHeader() });
      setNotifications(prev => prev.map(n => n._id === notifId ? { ...n, isRead: true } : n));
    } catch { /* ignore */ }
  };

  const markAllRead = async () => {
    try {
      await axios.patch(`${API_BASE_URL}/dashboard/employee-task/notifications/mark-all-read`, {}, { headers: authHeader() });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch { /* ignore */ }
  };

  const fetchOverviewStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/dashboard/employee-task/overview`, { headers: authHeader() });
      setStats(res.data);
    } catch { /* ignore */ }
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const logout = (isAuto = false) => {
    setIsLogoutModalOpen(false);
    setIsSessionWarningOpen(false);
    if (!isAuto) {
      setToast({ message: 'Logged out successfully!', type: 'success' });
    }
    setTimeout(() => {
      localStorage.removeItem('adminToken');
      router.push('/employee/login');
    }, isAuto ? 0 : 1000);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative z-50 h-full w-72 flex flex-col
        bg-gradient-to-b from-[#1A0E42] via-[#2E1A6D] to-[#4B2D73] shadow-2xl
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-white font-extrabold text-lg tracking-tight">Wheedle</h1>
            <p className="text-white/50 text-xs mt-0.5 font-medium">Task Management</p>
          </div>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* User card */}
        <div className="mx-4 mt-5 mb-3 p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {currentUser?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{currentUser?.name || 'User'}</p>
              <p className="text-white/50 text-xs truncate">{currentUser?.role || currentUser?.userType || '—'}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.filter(item => {
            if (!item.module) return true;
            if (!currentUser || !currentUser.permissions) return false;
            return currentUser.permissions.includes(`${item.module}:${item.perm}`);
          }).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                ${activeTab === key
                  ? 'bg-white text-[#2E1A6D] shadow-lg font-semibold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon size={18} className={activeTab === key ? 'text-[#2E1A6D]' : 'text-white/70'} />
              {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-white/70 hover:text-white px-4 py-2.5 rounded-xl hover:bg-white/10 w-full transition text-sm font-medium"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-5 lg:px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-600 hover:text-gray-900 transition" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {NAV_ITEMS.find(n => n.key === activeTab)?.label || 'Dashboard'}
              </h2>
              <p className="text-gray-400 text-xs hidden sm:block">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); fetchNotifications(); }}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 transition text-gray-600"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-14 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b flex justify-between items-center">
                    <span className="font-bold text-gray-800 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-400 text-sm">No notifications</div>
                    ) : notifications.slice(0, 10).map((notif) => (
                      <div
                        key={notif._id}
                        onClick={() => markNotifRead(notif._id)}
                        className={`p-4 cursor-pointer hover:bg-slate-50 transition ${!notif.isRead ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="flex gap-3 items-start">
                          <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${!notif.isRead ? 'bg-blue-500' : 'bg-gray-300'}`} />
                          <div>
                            <p className="text-sm text-gray-700 font-medium leading-snug">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notif.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2E1A6D] to-[#4B2D73] text-white flex items-center justify-center text-sm font-bold">
                  {currentUser?.name?.[0]?.toUpperCase() || '?'}
                </div>
                <span className="text-sm font-semibold text-gray-700 hidden sm:block">{currentUser?.name || 'User'}</span>
                <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="p-3 border-b">
                    <p className="text-xs font-bold text-gray-700 truncate">{currentUser?.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{currentUser?.email}</p>
                  </div>
                  <button
                    onClick={confirmLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-red-500 text-sm transition"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8"
          onClick={() => { if (notifOpen) setNotifOpen(false); if (profileOpen) setProfileOpen(false); }}
        >
          {activeTab === 'overview' && <OverviewPage stats={stats} setActiveTab={setActiveTab} currentUser={currentUser} />}
          {activeTab === 'tasks' && <TasksTab currentUser={currentUser} onNavigateToQuery={(taskId) => { setTargetQueryTaskId(taskId); setActiveTab('queries'); }} />}
          {activeTab === 'calendar' && <CalendarTab currentUser={currentUser} />}
          {activeTab === 'queries' && <ClientQueriesTab currentUser={currentUser} targetQueryTaskId={targetQueryTaskId} setTargetQueryTaskId={setTargetQueryTaskId} />}
          {activeTab === 'reports' && <ReportsTab currentUser={currentUser} />}
          {activeTab === 'team' && <TeamTab currentUser={currentUser} />}
        </main>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-popup border">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle size={28} />
              <h3 className="text-xl font-bold text-gray-800">Confirm Logout</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-gray-700 font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => logout(false)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SESSION EXPIRING WARNING MODAL */}
      {isSessionWarningOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-popup border border-orange-200">
            <div className="flex items-center gap-3 text-orange-500 mb-4">
              <AlertCircle size={28} />
              <h3 className="text-xl font-bold text-gray-800">Session Expiring</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">You will be logged out in 1 minute due to inactivity.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => logout(true)}
                className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-gray-700 font-semibold transition"
              >
                Logout Now
              </button>
              <button
                onClick={resetTimers}
                className="px-5 py-2 bg-[#0B2CC3] hover:bg-blue-700 text-white rounded-xl font-bold shadow transition"
              >
                Stay Logged In
              </button>
            </div>
          </div>
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

/* ─────────────── Overview / Home Page ─────────────── */
function OverviewPage({ stats, setActiveTab, currentUser }) {
  const quickStats = [
    {
      label: 'My Active Tasks',
      value: stats?.myActiveTasks ?? '—',
      icon: CheckSquare,
      color: 'from-blue-500 to-blue-700',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      tab: 'tasks',
    },
    {
      label: 'Overdue Tasks',
      value: stats?.overdueTasks ?? '—',
      icon: AlertCircle,
      color: 'from-red-500 to-red-700',
      bg: 'bg-red-50',
      iconColor: 'text-red-500',
      tab: 'tasks',
    },
    {
      label: 'Open Client Queries',
      value: stats?.openQueries ?? '—',
      icon: MessageCircleQuestion,
      color: 'from-amber-500 to-amber-700',
      bg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      tab: 'queries',
    },
    {
      label: 'Completed This Week',
      value: stats?.completedThisWeek ?? '—',
      icon: CheckCircle2,
      color: 'from-emerald-500 to-emerald-700',
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      tab: 'reports',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1A0E42] via-[#2E1A6D] to-[#4B2D73] rounded-3xl p-8 text-white shadow-xl">
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium mb-1">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <h2 className="text-3xl font-extrabold leading-tight">
            Welcome back, {currentUser?.name?.split(' ')[0] || 'there'} 👋
          </h2>
          <p className="text-white/60 mt-2 max-w-md">
            Here's your task summary for today. Stay focused and track your progress.
          </p>
        </div>
        {/* Decorative bubbles */}
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-white/5" />
        <div className="absolute right-20 -bottom-12 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute right-52 top-4 w-24 h-24 rounded-full bg-white/5" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {quickStats.map(({ label, value, icon: Icon, color, bg, iconColor, tab }) => (
          <div
            key={label}
            onClick={() => setActiveTab(tab)}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition duration-300 cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{label}</p>
                <h3 className="text-4xl font-extrabold text-gray-800 mt-1 group-hover:text-[#2E1A6D] transition">{value}</h3>
              </div>
              <div className={`p-3 rounded-2xl ${bg}`}>
                <Icon size={22} className={iconColor} />
              </div>
            </div>
            <div className={`h-1 w-full rounded-full bg-gradient-to-r ${color} opacity-70`} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Task Board',
            desc: 'View, create and manage your tasks with full status tracking.',
            tab: 'tasks',
            icon: ClipboardList,
            gradient: 'from-[#0B2CC3] to-[#4B2D73]',
          },
          {
            title: 'Weekly Calendar',
            desc: 'Plan your week visually and drag tasks onto your schedule.',
            tab: 'calendar',
            icon: CalendarDays,
            gradient: 'from-violet-600 to-purple-800',
          },
          {
            title: 'Client Queries',
            desc: 'Respond to open client queries and track resolution status.',
            tab: 'queries',
            icon: MessageCircleQuestion,
            gradient: 'from-amber-500 to-orange-600',
          },
          {
            title: 'Weekly Reports',
            desc: 'View performance summaries and export CSV reports for any week.',
            tab: 'reports',
            icon: BarChart2,
            gradient: 'from-emerald-500 to-teal-700',
          },
          {
            title: 'Team Management',
            desc: 'Manage users, roles, and assign module-level permissions.',
            tab: 'team',
            icon: Users,
            gradient: 'from-rose-500 to-red-700',
          },
        ].map(({ title, desc, tab, icon: Icon, gradient }) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="group bg-white border rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition duration-300 rounded-2xl`} />
            <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-4 shadow-md`}>
              <Icon size={20} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#2E1A6D] transition">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
