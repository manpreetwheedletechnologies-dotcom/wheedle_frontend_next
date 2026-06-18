'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../lib/api';
import {
  Plus, MessageSquare, ShieldAlert, User, Clock,
  CheckCircle2, X, PlusCircle, Paperclip, Send, Notebook
} from 'lucide-react';
import { io } from "socket.io-client";
import Toast from './Toast';

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

export default function ClientQueriesTab({ currentUser, targetQueryTaskId, setTargetQueryTaskId }) {
  const [queries, setQueries] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuery, setActiveQuery] = useState(null);
  const [toast, setToast] = useState(null);

  // Filter states
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  // Modals
  const [isRaiseOpen, setIsRaiseOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Bug Report');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');

  // Chat state
  const [chatMessageText, setChatMessageText] = useState('');
  const [chatMediaUrl, setChatMediaUrl] = useState('');
  const [uploadingChatMedia, setUploadingChatMedia] = useState(false);

  const socketRef = React.useRef(null);

  const isClient = currentUser?.role === 'Client';
  const canAssign = currentUser?.role === 'Super Admin' || currentUser?.role === 'Admin' || currentUser?.role === 'Team Lead';
  const isStaff = currentUser?.role !== 'Client';

  useEffect(() => {
    fetchQueries();
    if (isStaff) {
      fetchTeamMembers();
    }

    const socket = io(SOCKET_URL, {
      path: "/socket.io",
      transports: ["polling", "websocket"],
      upgrade: true,
      withCredentials: true,
      reconnection: true,
    });
    socketRef.current = socket;

    socket.on('query_updated', (updatedQuery) => {
      setActiveQuery(prev => {
        if (prev?._id === updatedQuery._id) {
          return updatedQuery;
        }
        return prev;
      });
      setQueries(prevList => prevList.map(q => q._id === updatedQuery._id ? updatedQuery : q));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (targetQueryTaskId && queries.length > 0) {
      const q = queries.find(query => query.taskId === targetQueryTaskId || query.taskId?._id === targetQueryTaskId);
      if (q) {
        handleQueryClick(q);
        if (setTargetQueryTaskId) setTargetQueryTaskId(null);
      }
    }
  }, [targetQueryTaskId, queries]);

  useEffect(() => {
    if (socketRef.current && activeQuery?._id) {
      socketRef.current.emit('join_query', { queryId: activeQuery._id });
    }
    return () => {
      if (socketRef.current && activeQuery?._id) {
        socketRef.current.emit('leave_query', { queryId: activeQuery._id });
      }
    };
  }, [activeQuery?._id]);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/client-queries`, {
        headers: authHeader(),
        params: {
          status: filterStatus || undefined,
          priority: filterPriority || undefined,
        },
      });
      setQueries(res.data);
      if (activeQuery) {
        // Refresh active query details
        const updatedActive = res.data.find(q => q._id === activeQuery._id);
        if (updatedActive) {
          // If we need to fetch internal notes, we fetch by ID
          const details = await axios.get(`${API_BASE_URL}/client-queries/${activeQuery._id}`, { headers: authHeader() });
          setActiveQuery(details.data);
        }
      }
    } catch (e) {
      console.error('Failed to fetch queries', e);
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

  const handleRaiseQuery = async (e) => {
    e.preventDefault();
    try {
      const attachments = attachmentName && attachmentUrl ? [{ filename: attachmentName, url: attachmentUrl }] : [];
      await axios.post(
        `${API_BASE_URL}/client-queries`,
        { title, category, priority, description, attachments },
        { headers: authHeader() }
      );
      setIsRaiseOpen(false);
      resetForm();
      fetchQueries();
      setToast({ message: 'Query submitted successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to raise query', e);
      setToast({ message: e?.response?.data?.message || 'Failed to submit query', type: 'error' });
    }
  };

  const handleQueryClick = async (q) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/client-queries/${q._id}`, { headers: authHeader() });
      setActiveQuery(res.data);
    } catch (e) {
      console.error('Failed to fetch query details', e);
    }
  };

  const handleAssign = async (assigneeId) => {
    if (!activeQuery) return;
    try {
      await axios.put(
        `${API_BASE_URL}/client-queries/${activeQuery._id}/assign`,
        { assigneeId },
        { headers: authHeader() }
      );
      fetchQueries();
      setToast({ message: 'Query assigned successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to assign query', e);
      setToast({ message: e?.response?.data?.message || 'Failed to assign query', type: 'error' });
    }
  };

  const handleStatusChange = async (status) => {
    if (!activeQuery) return;
    try {
      await axios.patch(
        `${API_BASE_URL}/client-queries/${activeQuery._id}/status`,
        { status },
        { headers: authHeader() }
      );
      fetchQueries();
      setToast({ message: 'Status updated successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to update status', e);
      setToast({ message: e?.response?.data?.message || 'Failed to update status', type: 'error' });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessageText.trim() && !chatMediaUrl.trim()) return;
    try {
      const res = await axios.post(
        `${API_BASE_URL}/client-queries/${activeQuery._id}/messages`,
        { text: chatMessageText, mediaUrl: chatMediaUrl },
        { headers: authHeader() }
      );
      setActiveQuery(res.data);
      setChatMessageText('');
      setChatMediaUrl('');
    } catch (e) {
      console.error('Failed to send message', e);
      setToast({ message: e?.response?.data?.message || 'Failed to send message', type: 'error' });
    }
  };

  const handleChatFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingChatMedia(true);
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
      });
      if (res.data && res.data.url) {
        setChatMediaUrl(res.data.url);
      }
    } catch (err) {
      console.error('Upload failed', err);
      setToast({ message: 'File upload failed', type: 'error' });
    } finally {
      setUploadingChatMedia(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('General');
    setPriority('Medium');
    setDescription('');
    setAttachmentName('');
    setAttachmentUrl('');
  };

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
      case 'Open': return 'bg-blue-500/10 text-blue-500 border border-blue-500/30';
      case 'Assigned': return 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/30';
      case 'In Progress': return 'bg-amber-500/10 text-amber-500 border border-amber-500/30';
      case 'Resolved': return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30';
      case 'Closed': return 'bg-slate-500/10 text-slate-500 border border-slate-500/30';
      default: return 'bg-gray-500/10 text-gray-500 border border-gray-500/30';
    }
  };

  return (
    <div className="flex h-[75vh] gap-6 overflow-hidden">
      {/* Queries List (Left side) */}
      <div className="w-full md:w-[380px] flex flex-col bg-white border rounded-2xl shadow-sm overflow-hidden flex-shrink-0">
        <div className="p-4 border-b bg-gradient-to-r from-[#2E1A6D] to-[#4B2D73] text-white flex justify-between items-center flex-shrink-0">
          <div>
            <h3 className="font-bold text-base">Client Queries</h3>
            <p className="text-white/60 text-xs mt-0.5">Support tickets & client requests</p>
          </div>
          {isClient && (
            <button
              onClick={() => { resetForm(); setIsRaiseOpen(true); }}
              className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
              title="Raise Ticket"
            >
              <Plus size={18} />
            </button>
          )}
        </div>

        {/* Filter board */}
        <div className="p-3 border-b flex gap-2 flex-shrink-0">
          <select
            className="flex-1 text-xs text-black border border-gray-300 rounded-lg px-2 py-1.5 bg-white outline-none hover:border-blue-600 focus:border-blue-600"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            className="flex-1 text-xs text-black border border-gray-300 rounded-lg px-2 py-1.5 bg-white outline-none hover:border-blue-600 focus:border-blue-600"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            onClick={fetchQueries}
            className="text-xs bg-purple-100 hover:bg-purple-200 text-[#2E1A6D] px-3 py-1.5 rounded-lg font-semibold transition"
          >
            Go
          </button>
        </div>

        {/* Queries Scroll list */}
        <div className="flex-1 overflow-y-auto divide-y">
          {loading && queries.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">Loading queries...</div>
          ) : queries.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">No tickets found.</div>
          ) : (
            queries.map((q) => {
              const isActive = activeQuery?._id === q._id;
              return (
                <div
                  key={q._id}
                  onClick={() => handleQueryClick(q)}
                  className={`p-4 cursor-pointer hover:bg-slate-50 transition flex flex-col gap-2 ${isActive ? 'bg-purple-50/70 border-l-4 border-l-[#2E1A6D]' : ''}`}
                >
                  <div className="flex justify-between items-start gap-1">
                    <span className="font-bold text-xs text-gray-800 line-clamp-1">{q.title}</span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">
                      {new Date(q.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs line-clamp-2">{q.description}</p>

                  <div className="flex justify-between items-center mt-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusStyle(q.status)}`}>
                      {q.status}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getPriorityStyle(q.priority)}`}>
                      {q.priority}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Query Detail Pane (Right side) */}
      <div className="flex-1 bg-white border rounded-2xl shadow-sm flex flex-col overflow-hidden">
        {activeQuery ? (
          <>
            {/* Detail Header */}
            <div className="p-6 border-b flex justify-between items-start flex-shrink-0 bg-slate-50">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(activeQuery.status)}`}>
                    {activeQuery.status}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getPriorityStyle(activeQuery.priority)}`}>
                    {activeQuery.priority} Priority
                  </span>
                  <span className="text-xs font-bold text-[#2E1A6D] bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md">
                    Category: {activeQuery.category}
                  </span>
                  {activeQuery.taskId && (
                    <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                      Linked Task: {activeQuery.taskId.title || 'Unknown'}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-gray-800 mt-2">{activeQuery.title}</h2>
                <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                  <span>Client: <strong>{activeQuery.client?.name || 'Unknown'}</strong></span>
                  <span>·</span>
                  <span>Raised on: {new Date(activeQuery.createdAt).toLocaleString()}</span>
                  {activeQuery.resolutionTime > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                        Resolved in: {activeQuery.resolutionTime} hrs
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Status Controller (Staff only) */}
              {isStaff && (
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Set Status</label>
                  <select
                    className="text-xs border rounded-lg px-2.5 py-1.5 bg-white text-gray-700 outline-none focus:border-[#0B2CC3] cursor-pointer"
                    value={activeQuery.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting for Client">Waiting for Client</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              )}
            </div>

            {/* Description & Attachments Grid */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Query Description</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{activeQuery.description}</p>
              </div>

              {/* Attachments Section */}
              {activeQuery.attachments && activeQuery.attachments.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-1.5">
                    <Paperclip size={14} />
                    <span>Attachments</span>
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {activeQuery.attachments.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url.startsWith('/') ? `${API_BASE_URL}${file.url}` : file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-slate-50 hover:border-[#0B2CC3] transition text-xs font-semibold text-gray-600 bg-white"
                      >
                        <Paperclip size={14} className="text-[#0B2CC3]" />
                        <span>{file.filename}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignee Box (Staff only) */}
              {isStaff && (
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-gray-400" />
                    <div>
                      <h5 className="text-xs font-bold text-gray-700">Assigned Staff</h5>
                      <p className="text-xs text-gray-500">
                        {activeQuery.assignedTo?.name ? `${activeQuery.assignedTo.name} (${activeQuery.assignedTo.email})` : 'Unassigned'}
                      </p>
                    </div>
                  </div>

                  {canAssign && (
                    <select
                      className="text-xs text-black border rounded-lg px-2 py-1.5 bg-white outline-none focus:border-[#0B2CC3] cursor-pointer"
                      value={activeQuery.assignedTo?._id || ''}
                      onChange={(e) => handleAssign(e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {teamMembers.map(m => (
                        <option key={m._id} value={m._id}>{m.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {/* Public Chat Thread (All Roles) */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                  <MessageSquare size={14} />
                  <span>Conversation History</span>
                </h4>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {activeQuery.messages && activeQuery.messages.length > 0 ? (
                    activeQuery.messages.map((msg, idx) => {
                      const isMe = msg.authorId === currentUser?.id;
                      return (
                        <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl p-3 ${isMe ? 'bg-[#0B2CC3] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                            <div className="flex justify-between items-center text-[10px] opacity-70 mb-1 gap-4">
                              <span className="font-bold">{msg.authorName}</span>
                              <span>{new Date(msg.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                            </div>
                            <p className="text-sm leading-snug break-words">{msg.text}</p>
                            {msg.mediaUrl && (
                              <a href={msg.mediaUrl.startsWith('/') ? `${API_BASE_URL}${msg.mediaUrl}` : msg.mediaUrl} target="_blank" rel="noopener noreferrer" className={`text-xs mt-2 inline-flex items-center gap-1 font-semibold underline ${isMe ? 'text-blue-200' : 'text-blue-600'}`}>
                                View Attachment
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-center text-gray-400 italic py-4">No messages yet. Start the conversation!</p>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#0B2CC3] text-sm text-gray-800"
                      placeholder="Type a message..."
                      value={chatMessageText}
                      onChange={(e) => setChatMessageText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-[#0B2CC3] hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold text-sm flex items-center gap-1.5 transition disabled:opacity-50"
                      disabled={!chatMessageText.trim() && !chatMediaUrl.trim()}
                    >
                      <Send size={14} />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>
                  <div className="flex gap-2 items-center w-full mt-2">
                    <label className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-[#0B2CC3] rounded-lg hover:bg-blue-100 cursor-pointer text-xs font-semibold whitespace-nowrap">
                      <Paperclip size={14} />
                      {uploadingChatMedia ? 'Uploading...' : 'Upload File'}
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleChatFileUpload}
                        disabled={uploadingChatMedia}
                      />
                    </label>
                    <input
                      type="text"
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg outline-none focus:border-[#0B2CC3] text-xs text-gray-800"
                      placeholder="Or paste media link here..."
                      value={chatMediaUrl}
                      onChange={(e) => setChatMediaUrl(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <MessageSquare size={48} className="text-gray-300 mb-3" />
            <h3 className="font-bold text-gray-700">Select a Ticket</h3>
            <p className="text-gray-400 text-sm mt-1">Pick a support query from the list to display details.</p>
          </div>
        )}
      </div>

      {/* RAISE QUERY MODAL (Clients only) */}
      {isRaiseOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-popup border">
            <div className="p-6 border-b flex justify-between items-center bg-[#2E1A6D] text-white flex-shrink-0">
              <h3 className="font-bold text-lg">Raise Support Ticket</h3>
              <button onClick={() => setIsRaiseOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRaiseQuery} className="p-6 space-y-4 text-gray-700">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                  placeholder="Query subject..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Billing">Billing</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="General">General Question</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

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
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                <textarea
                  required
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800 h-28"
                  placeholder="Detail your request or problem here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="border-t pt-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase">Attachment File (Mockup)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    className="px-3 py-1.5 border rounded-lg text-xs"
                    placeholder="Filename (e.g. error.png)"
                    value={attachmentName}
                    onChange={(e) => setAttachmentName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="px-3 py-1.5 border rounded-lg text-xs"
                    placeholder="Mock url (drive-link)"
                    value={attachmentUrl}
                    onChange={(e) => setAttachmentUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t pt-4 flex gap-3 justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsRaiseOpen(false)}
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
