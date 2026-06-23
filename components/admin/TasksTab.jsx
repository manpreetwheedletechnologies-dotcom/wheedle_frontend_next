'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../lib/api';
import {
  Plus, Search, Filter, Clock, User, CheckCircle2,
  AlertCircle, Trash2, Edit, X, Calendar, BarChart2,
  MessageSquare, Send, Paperclip
} from 'lucide-react';
import { io } from "socket.io-client";
import Toast from './Toast';
import DocumentViewerModal from './DocumentViewerModal';

const getSocketUrl = () => {
  try {
    const u = new URL(API_BASE_URL);
    const basePath = u.pathname.split('/py/api')[0];
    return `${u.protocol}//${u.host}${basePath}`;
  } catch {
    return API_BASE_URL.replace(/\/py\/api.*$/, '');
  }
};
const SOCKET_URL = getSocketUrl();

const authHeader = () => ({
  Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('adminToken') || '' : ''}`,
});

export default function TasksTab({ currentUser, onNavigateToQuery }) {
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [toast, setToast] = useState(null);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingDocument, setViewingDocument] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Not Started');
  const [deadline, setDeadline] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [assignees, setAssignees] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [progress, setProgress] = useState(0);
  const [calendarDate, setCalendarDate] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaUrlInput, setMediaUrlInput] = useState('');

  const [isRaiseQueryOpen, setIsRaiseQueryOpen] = useState(false);
  const [queryTitle, setQueryTitle] = useState('');
  const [queryDescription, setQueryDescription] = useState('');
  const [queryAttachmentUrl, setQueryAttachmentUrl] = useState('');
  const [queryAttachmentName, setQueryAttachmentName] = useState('');
  const [uploadingQueryMedia, setUploadingQueryMedia] = useState(false);
  const [isAttachmentsOpen, setIsAttachmentsOpen] = useState(false);


  const socketRef = React.useRef(null);

  const canEdit = currentUser?.role === 'Super Admin' || currentUser?.role === 'Admin' || currentUser?.role === 'Team Lead';
  const isEmployee = currentUser?.role === 'Employee';
  const isClient = currentUser?.role === 'Client';

  useEffect(() => {
    fetchTasks();
    if (canEdit) {
      fetchTeamMembers();
      fetchProjects();
    }

    const socket = io(SOCKET_URL, {
      path: "/socket.io",
      transports: ["polling", "websocket"],
      upgrade: true,
      withCredentials: true,
      reconnection: true,
    });
    socketRef.current = socket;



    return () => {
      socket.disconnect();
    };
  }, []);



  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: authHeader(),
        params: {
          status: filterStatus || undefined,
          priority: filterPriority || undefined,
        },
      });
      setTasks(res.data);
    } catch (e) {
      console.error('Failed to fetch tasks', e);
    } finally {
      setLoading(false);
    }
  };

  const openChatForTask = (task) => {
    if (onNavigateToQuery) {
      onNavigateToQuery(task._id);
    }
  };



  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/rbac/team-members`, { headers: authHeader() });
      // Filter out client accounts from assignees
      setTeamMembers(res.data);
    } catch (e) {
      console.error('Failed to fetch team members', e);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/projects`, { headers: authHeader() });
      setProjects(res.data);
    } catch (e) {
      console.error('Failed to fetch projects', e);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await axios.post(
        `${API_BASE_URL}/tasks`,
        {
          title,
          description,
          priority,
          status,
          deadline: deadline || undefined,
          estimatedHours: Number(estimatedHours) || 0,
          assignees,
          projectId: projectId || undefined,
          progress: Number(progress) || 0,
          calendarDate: calendarDate || undefined,
        },
        { headers: authHeader() }
      );
      setIsCreateOpen(false);
      resetForm();
      fetchTasks();
      setToast({ message: 'Task created successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to create task', e);
      setToast({ message: e?.response?.data?.message || 'Failed to create task', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (task) => {
    setActiveTask(task);
    setTitle(task.title || '');
    setDescription(task.description || '');
    setPriority(task.priority || 'Medium');
    setStatus(task.status || 'Not Started');
    setDeadline(task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '');
    setEstimatedHours(task.estimatedHours || 0);
    setAssignees(task.assignees ? task.assignees.map(a => a._id || a) : []);
    setProjectId(task.projectId?._id || task.projectId || '');
    setProgress(task.progress || 0);
    setCalendarDate(task.calendarDate ? task.calendarDate.split('T')[0] : '');
    setAttachments(task.attachments || []);
    setMediaUrlInput('');
    setIsEditOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${activeTask._id}`,
        {
          title,
          description,
          priority,
          status,
          deadline: deadline || undefined,
          estimatedHours: Number(estimatedHours) || 0,
          assignees,
          projectId: projectId || undefined,
          progress: Number(progress) || 0,
          calendarDate: calendarDate || undefined,
          attachments,
        },
        { headers: authHeader() }
      );
      setIsEditOpen(false);
      resetForm();
      fetchTasks();
      setToast({ message: 'Task updated successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to update task', e);
      setToast({ message: e?.response?.data?.message || 'Failed to update task', type: 'error' });
    }
  };

  const handleQuickStatusUpdate = async (task, newStatus, newProgress) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/tasks/${task._id}/status`,
        {
          status: newStatus,
          progress: newProgress !== undefined ? Number(newProgress) : undefined,
        },
        { headers: authHeader() }
      );
      fetchTasks();
      setToast({ message: 'Status updated successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to update status', e);
      setToast({ message: e?.response?.data?.message || 'Failed to update status', type: 'error' });
    }
  };

  const handleSaveAttachments = async () => {
    try {
      await axios.patch(
        `${API_BASE_URL}/tasks/${activeTask._id}/status`,
        { attachments },
        { headers: authHeader() }
      );
      setIsAttachmentsOpen(false);
      setActiveTask(null);
      setAttachments([]);
      fetchTasks();
      setToast({ message: 'Attachments updated successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to update attachments', e);
      setToast({ message: 'Failed to update attachments', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, { headers: authHeader() });
      fetchTasks();
      setToast({ message: 'Task deleted successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to delete task', e);
      setToast({ message: e?.response?.data?.message || 'Failed to delete task', type: 'error' });
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setStatus('Not Started');
    setDeadline('');
    setEstimatedHours(0);
    setAssignees([]);
    setProjectId('');
    setProgress(0);
    setCalendarDate('');
    setAttachments([]);
    setMediaUrlInput('');
    setActiveTask(null);
  };

  const filteredTasks = tasks.filter(t => {
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const getPriorityStyle = (p) => {
    switch (p) {
      case 'High': return 'bg-red-500/10 text-red-500 border border-red-500/30';
      case 'Medium': return 'bg-amber-500/10 text-amber-500 border border-amber-500/30';
      case 'Low': return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30';
      default: return 'bg-gray-500/10 text-gray-500 border border-gray-500/30';
    }
  };

  const getStatusStyle = (s) => {
    switch (s) {
      case 'Completed': return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30';
      case 'In Progress': return 'bg-blue-500/10 text-blue-500 border border-blue-500/30';
      case 'Under Review': return 'bg-purple-500/10 text-purple-500 border border-purple-500/30';
      case 'Blocked': return 'bg-red-500/10 text-red-500 border border-red-500/30';
      default: return 'bg-slate-500/10 text-slate-500 border border-slate-500/30';
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;
    try {
      setUploadingMedia(true);
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      const res = await axios.post(`${API_BASE_URL}/upload/multiple`, formData, {
        headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
      });
      if (res.data && res.data.files) {
        setAttachments(prev => [...prev, ...res.data.files]);
      }
    } catch (err) {
      console.error('Upload failed', err);
      setToast({ message: 'File upload failed', type: 'error' });
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleAddMediaUrl = () => {
    if (!mediaUrlInput.trim()) return;
    setAttachments([...attachments, { filename: 'Media Link', url: mediaUrlInput.trim() }]);
    setMediaUrlInput('');
  };

  const handleRaiseQuery = async (e) => {
    e.preventDefault();
    if (!activeTask) return;
    try {
      const queryAttachments = queryAttachmentName && queryAttachmentUrl ? [{ filename: queryAttachmentName, url: queryAttachmentUrl }] : [];
      await axios.post(
        `${API_BASE_URL}/client-queries`,
        {
          title: queryTitle,
          description: queryDescription,
          category: 'Task Query',
          priority: 'Medium',
          taskId: activeTask._id,
          projectId: activeTask.projectId?._id || activeTask.projectId,
          attachments: queryAttachments,
        },
        { headers: authHeader() }
      );
      setToast({ message: 'Query raised successfully', type: 'success' });
      setIsRaiseQueryOpen(false);
      setQueryTitle('');
      setQueryDescription('');
      setQueryAttachmentUrl('');
      setQueryAttachmentName('');
      setActiveTask(null);
    } catch (err) {
      console.error('Failed to raise query', err);
      setToast({ message: 'Failed to raise query', type: 'error' });
    }
  };

  const handleQueryFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingQueryMedia(true);
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
      });
      if (res.data && res.data.url) {
        setQueryAttachmentUrl(res.data.url);
        setQueryAttachmentName(res.data.filename || file.name);
      }
    } catch (err) {
      console.error('Upload failed', err);
      setToast({ message: 'File upload failed', type: 'error' });
    } finally {
      setUploadingQueryMedia(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Task Management</h2>
          <p className="text-gray-500 text-sm mt-1">Assign, track progress, and organize team projects.</p>
        </div>
        {canEdit && (
          <button
            onClick={() => { resetForm(); setIsCreateOpen(true); }}
            className="flex items-center gap-2 bg-[#0B2CC3] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-[0_0_15px_rgba(11,44,195,0.4)] transition duration-300"
          >
            <Plus size={18} />
            <span>Create Task</span>
          </button>
        )}
      </div>

      {/* Filters Board */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none text-gray-800 focus:border-[#0B2CC3] transition"
            placeholder="Search task title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <select
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-gray-600 focus:border-[#0B2CC3] transition"
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); }}
          >
            <option value="">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Under Review">Under Review</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <div>
          <select
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-gray-600 focus:border-[#0B2CC3] transition"
            value={filterPriority}
            onChange={(e) => { setFilterPriority(e.target.value); }}
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button
          onClick={() => { fetchTasks(); }}
          className="bg-purple-100 hover:bg-purple-200 text-[#2E1A6D] rounded-xl font-semibold transition py-2.5 px-4"
        >
          Apply Filters
        </button>
      </div>

      {/* Task Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-20 bg-white border rounded-2xl text-gray-400 shadow-sm">
          No tasks found matching your filter rules.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(task.priority)}`}>
                    {task.priority} Priority
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusStyle(task.status)}`}>
                    {task.status}
                  </span>
                </div>

                <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2">{task.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{task.description || 'No description provided.'}</p>

                {/* Progress Bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-xs font-semibold text-gray-500">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#0B2CC3] to-purple-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                {/* Assignees */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase">Assignees:</span>
                  <div className="flex -space-x-2 overflow-hidden">
                    {task.assignees && task.assignees.length > 0 ? (
                      task.assignees.map((a, idx) => (
                        <div
                          key={a._id || idx}
                          title={a.name}
                          className="w-8 h-8 rounded-full border-2 border-white bg-purple-600 text-white flex items-center justify-center text-xs font-bold"
                        >
                          {a.name ? a.name[0].toUpperCase() : '?'}
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 font-medium italic">Unassigned</span>
                    )}
                  </div>
                </div>

                {/* Dates & Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 border-t pt-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-400" />
                    <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No Deadline'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Clock size={14} className="text-gray-400" />
                    <span>{task.estimatedHours} Estimated Hrs</span>
                  </div>
                  {task.attachments && task.attachments.length > 0 && (
                    <div
                      className="flex items-center gap-1.5 col-span-2 pt-2 cursor-pointer hover:underline"
                      onClick={() => { setActiveTask(task); setAttachments(task.attachments || []); setIsAttachmentsOpen(true); }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                      <span className="text-[#0B2CC3] font-semibold">{task.attachments.length} Attachments</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 border-t mt-4 pt-4">
                {/* Employee Quick Status Updaters */}
                {isEmployee && (
                  <div className="flex items-center gap-2 w-full">
                    <select
                      className="text-xs border rounded-lg px-2 py-1.5 outline-none bg-gray-50 text-gray-600 focus:border-[#0B2CC3]"
                      value={task.status}
                      onChange={(e) => handleQuickStatusUpdate(task, e.target.value, task.progress)}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>

                    {/* <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      className="w-full accent-[#0B2CC3]"
                      value={task.progress}
                      onChange={(e) => handleQuickStatusUpdate(task, task.status, e.target.value)}
                    /> */}
                  </div>
                )}

                {canEdit && (
                  <>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </>
                )}

                {isClient && (
                  <button
                    onClick={() => {
                      if (!task.hasQuery) {
                        setActiveTask(task);
                        setIsRaiseQueryOpen(true);
                      } else {
                        openChatForTask(task);
                      }
                    }}
                    className={`flex items-center gap-1 text-xs font-semibold transition w-full justify-center py-1.5 rounded-lg ${task.hasQuery
                        ? 'text-green-700 bg-green-100 hover:bg-green-200'
                        : 'text-[#0B2CC3] hover:text-blue-800 bg-blue-50'
                      }`}
                  >
                    {task.hasQuery ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    <span>{task.hasQuery ? 'View Raised Query' : 'Raise Query'}</span>
                  </button>
                )}
                {!isClient && task.hasQuery && (
                  <button
                    onClick={() => openChatForTask(task)}
                    className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 transition w-full justify-center py-1.5 rounded-lg mt-2"
                  >
                    <MessageSquare size={14} />
                    <span>View Client Query</span>
                  </button>
                )}
                {!isClient && (
                  <button
                    onClick={() => {
                      setActiveTask(task);
                      setAttachments(task.attachments || []);
                      setIsAttachmentsOpen(true);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-[#0B2CC3] hover:text-blue-800 transition w-full justify-center bg-blue-50 py-1.5 rounded-lg mt-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                    <span>{task.attachments && task.attachments.length > 0 ? 'Manage Attachments' : 'Add Attachment'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-popup border max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-[#2E1A6D] text-white flex-shrink-0">
              <h3 className="font-bold text-lg">Create New Task</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 overflow-y-auto flex-1 text-gray-700">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800 h-24"
                  placeholder="Task details and deliverables..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Priority</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Deadline</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Estimated Hours</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Calendar Planning Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={calendarDate}
                    onChange={(e) => setCalendarDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Assign Project</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                  >
                    <option value="">No Project</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p._id}>{p.projectName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Assignees</label>
                <div className="border rounded-xl p-3 max-h-32 overflow-y-auto space-y-2">
                  {teamMembers.map((member) => (
                    <label key={member._id} className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="rounded accent-[#0B2CC3] cursor-pointer"
                        checked={assignees.includes(member._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAssignees([...assignees, member._id]);
                          } else {
                            setAssignees(assignees.filter(id => id !== member._id));
                          }
                        }}
                      />
                      <span className="font-semibold text-gray-700">{member.name}</span>
                      <span className="text-xs text-gray-400">({member.role || member.userType})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Attachments / Media</label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste Media URL..."
                      className="flex-1 px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-sm"
                      value={mediaUrlInput}
                      onChange={(e) => setMediaUrlInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleAddMediaUrl}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-sm font-semibold"
                    >
                      Add URL
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="px-4 py-2 bg-blue-50 text-[#0B2CC3] rounded-xl hover:bg-blue-100 cursor-pointer text-sm font-semibold flex items-center gap-2">
                      <Plus size={16} />
                      {uploadingMedia ? 'Uploading...' : 'Upload File'}
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploadingMedia}
                      />
                    </label>
                  </div>
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border text-sm">
                          <button 
                            type="button" 
                            onClick={() => setViewingDocument({ url: att.url.startsWith('/') ? `${API_BASE_URL}${att.url}` : att.url, filename: att.filename })}
                            className="text-[#0B2CC3] hover:underline truncate max-w-[150px] text-left"
                          >
                            {att.filename}
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 flex gap-3 justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2 rounded-xl font-semibold transition ${isSubmitting ? 'bg-blue-400 text-white cursor-not-allowed' : 'bg-[#0B2CC3] hover:bg-blue-700 text-white'}`}
                >
                  {isSubmitting ? 'Creating...' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-popup border max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-[#2E1A6D] text-white flex-shrink-0">
              <h3 className="font-bold text-lg">Edit Task</h3>
              <button onClick={() => setIsEditOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4 overflow-y-auto flex-1 text-gray-700">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800 h-24"
                  placeholder="Task details and deliverables..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Priority</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Deadline</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Estimated Hours</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Calendar Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={calendarDate}
                    onChange={(e) => setCalendarDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Assign Project</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                  >
                    <option value="">No Project</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p._id}>{p.projectName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Assignees</label>
                <div className="border rounded-xl p-3 max-h-32 overflow-y-auto space-y-2">
                  {teamMembers.map((member) => (
                    <label key={member._id} className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="rounded accent-[#0B2CC3] cursor-pointer"
                        checked={assignees.includes(member._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAssignees([...assignees, member._id]);
                          } else {
                            setAssignees(assignees.filter(id => id !== member._id));
                          }
                        }}
                      />
                      <span className="font-semibold text-gray-700">{member.name}</span>
                      <span className="text-xs text-gray-400">({member.role || member.userType})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Attachments / Media</label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste Media URL..."
                      className="flex-1 px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-sm"
                      value={mediaUrlInput}
                      onChange={(e) => setMediaUrlInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleAddMediaUrl}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-sm font-semibold"
                    >
                      Add URL
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="px-4 py-2 bg-blue-50 text-[#0B2CC3] rounded-xl hover:bg-blue-100 cursor-pointer text-sm font-semibold flex items-center gap-2">
                      <Plus size={16} />
                      {uploadingMedia ? 'Uploading...' : 'Upload File'}
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploadingMedia}
                      />
                    </label>
                  </div>
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border text-sm">
                          <button 
                            type="button" 
                            onClick={() => setViewingDocument({ url: att.url.startsWith('/') ? `${API_BASE_URL}${att.url}` : att.url, filename: att.filename })}
                            className="text-[#0B2CC3] hover:underline truncate max-w-[150px] text-left"
                          >
                            {att.filename}
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 flex gap-3 justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2CC3] hover:bg-blue-700 text-white rounded-xl font-semibold transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RAISE QUERY MODAL */}
      {isRaiseQueryOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-popup border">
            <div className="p-6 border-b flex justify-between items-center bg-[#2E1A6D] text-white flex-shrink-0">
              <h3 className="font-bold text-lg">Raise Query on Task</h3>
              <button onClick={() => { setIsRaiseQueryOpen(false); setActiveTask(null); }} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleRaiseQuery} className="p-6 space-y-4 text-gray-700">
              <div className="bg-blue-50 text-[#0B2CC3] p-3 rounded-xl text-sm font-semibold mb-4 border border-blue-100">
                Task: {activeTask?.title}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Query Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                  placeholder="What is this regarding?"
                  value={queryTitle}
                  onChange={(e) => setQueryTitle(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                <textarea
                  required
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800 h-24"
                  placeholder="Provide details about your query..."
                  value={queryDescription}
                  onChange={(e) => setQueryDescription(e.target.value)}
                />
              </div>

              <div className="border-t pt-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase">Attachment / Media</label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <label className="px-4 py-2 bg-blue-50 text-[#0B2CC3] rounded-xl hover:bg-blue-100 cursor-pointer text-sm font-semibold flex items-center gap-2 w-fit">
                      <Plus size={16} />
                      {uploadingQueryMedia ? 'Uploading...' : 'Upload File'}
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleQueryFileUpload}
                        disabled={uploadingQueryMedia}
                      />
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#0B2CC3]"
                      placeholder="Or Paste Media URL..."
                      value={queryAttachmentUrl}
                      onChange={(e) => {
                        setQueryAttachmentUrl(e.target.value);
                        if (!queryAttachmentName && e.target.value) setQueryAttachmentName('Media Link');
                      }}
                    />
                  </div>
                  {queryAttachmentUrl && (
                    <div className="flex items-center gap-2 mt-1">
                      <a href={queryAttachmentUrl.startsWith('/') ? `${API_BASE_URL}${queryAttachmentUrl}` : queryAttachmentUrl} target="_blank" rel="noopener noreferrer" className="text-[#0B2CC3] hover:underline text-xs max-w-xs truncate font-semibold">
                        {queryAttachmentName || 'View Link'}
                      </a>
                      <button
                        type="button"
                        onClick={() => { setQueryAttachmentUrl(''); setQueryAttachmentName(''); }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t pt-4 flex gap-3 justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsRaiseQueryOpen(false);
                    setActiveTask(null);
                    setQueryTitle('');
                    setQueryDescription('');
                    setQueryAttachmentUrl('');
                    setQueryAttachmentName('');
                  }}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2CC3] hover:bg-blue-700 text-white rounded-xl font-semibold transition"
                >
                  Submit Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ATTACHMENTS MODAL */}
      {isAttachmentsOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-popup border max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-[#2E1A6D] text-white flex-shrink-0">
              <h3 className="font-bold text-lg">Task Attachments</h3>
              <button onClick={() => { setIsAttachmentsOpen(false); setActiveTask(null); setAttachments([]); }} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-gray-700 overflow-y-auto flex-1">
              <div className="bg-blue-50 text-[#0B2CC3] p-3 rounded-xl text-sm font-semibold mb-4 border border-blue-100">
                Task: {activeTask?.title}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Attachments / Media</label>
                <div className="space-y-3">
                  {!isClient && (
                    <>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Paste Media URL..."
                          className="flex-1 px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-sm"
                          value={mediaUrlInput}
                          onChange={(e) => setMediaUrlInput(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={handleAddMediaUrl}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-sm font-semibold"
                        >
                          Add URL
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="px-4 py-2 bg-blue-50 text-[#0B2CC3] rounded-xl hover:bg-blue-100 cursor-pointer text-sm font-semibold flex items-center gap-2">
                          <Plus size={16} />
                          {uploadingMedia ? 'Uploading...' : 'Upload File'}
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={uploadingMedia}
                          />
                        </label>
                      </div>
                    </>
                  )}
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border text-sm justify-between w-full">
                          <span className="text-gray-700 font-medium truncate flex-1" title={att.filename}>
                            {att.filename}
                          </span>
                          <div className="flex items-center gap-3">
                            <button 
                              type="button"
                              onClick={() => setViewingDocument({ url: att.url.startsWith('/') ? `${API_BASE_URL}${att.url}` : att.url, filename: att.filename })}
                              className="text-[#0B2CC3] hover:underline text-xs font-bold px-2 py-1 bg-blue-100 rounded"
                            >
                              View
                            </button>
                            <a href={att.url.startsWith('/') ? `${API_BASE_URL}${att.url}` : att.url} download={att.filename} className="text-[#0B2CC3] hover:underline text-xs font-bold px-2 py-1 bg-blue-100 rounded">
                              Download
                            </a>
                            {!isClient && (
                              <button
                                type="button"
                                onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                                className="text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded"
                                title="Remove Attachment"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t pt-4 flex gap-3 justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={() => { setIsAttachmentsOpen(false); setActiveTask(null); setAttachments([]); }}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-gray-600 transition"
                >
                  {isClient ? 'Close' : 'Cancel'}
                </button>
                {!isClient && (
                  <button
                    type="button"
                    onClick={handleSaveAttachments}
                    className="px-5 py-2 bg-[#0B2CC3] hover:bg-blue-700 text-white rounded-xl font-semibold transition"
                  >
                    Save Attachments
                  </button>
                )}
              </div>
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
      
      {/* DOCUMENT VIEWER MODAL */}
      <DocumentViewerModal 
        file={viewingDocument} 
        onClose={() => setViewingDocument(null)} 
      />
    </div>
  );
}
