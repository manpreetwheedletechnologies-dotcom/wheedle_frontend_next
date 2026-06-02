'use client';
/**
 * AdminDashboard.jsx
 * Admin dashboard with Live Chat Panel
 */

import React, { useState, useEffect, useRef } from "react";
import LogosData from '../../lib/LogosData';
import AdminJobForm from "./AdminJobForm";
import AdminPostTestimonial from "./AdminPostTestimonial";
import ViewAllJobs from "./ViewAllJobs";
import ViewAllTestimonials from "./ViewAllTestimonials";
import ViewAllBlogs from "./ViewAllBlogs";
import AdminPostBlog from "./AdminPostBlog";
import AdminPostHero from "./AdminPostHero";
import ViewAllPartners from "./ViewAllPartners";
import AddNewPartner from "./AddNewPartner";
import ViewAllSteps from "./ViewAllSteps";
import AdminAddStep from "./AdminAddStep";
import AdminProfilePopup from "./AdminProfilePopup";
import ViewAllContacts from "./ViewAllContacts";
import ViewAllLeads from "./ViewAllLeads";
import ViewAllFormLeads from "./ViewAllFormLeads";
import API_BASE_URL from '../../lib/api';
import { io } from "socket.io-client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Briefcase, FileText, MessageSquare,
  LogOut, User, X, Mail, Users, Newspaper, ClipboardList,
  MessageCircle, Send, ChevronLeft, Circle,
} from "lucide-react";

 

const getSocketUrl = () => {
  try {
    const u = new URL(API_BASE_URL);

    // Extract base path before /py/api
    const basePath = u.pathname.split('/py/api')[0];

    return `${u.protocol}//${u.host}${basePath}`;
  } catch {
    return API_BASE_URL.replace(/\/py\/api.*$/, '');
  }
};

const SOCKET_URL = getSocketUrl();


/* ─────────────────────────────────────────────
   AUTH HEADER HELPER
───────────────────────────────────────────── */
const authHeader = () => ({
  Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("adminToken") || "" : ""}`,
});

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const formatTime = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
};

const initials = (name = "") => {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(" ").filter(p => p.length > 0);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return (parts[0][0] || "?").toUpperCase();
  return ((parts[0][0] || "") + (parts[parts.length - 1][0] || "")).toUpperCase();
};

/* ═══════════════════════════════════════════
   LIVE CHAT PANEL
═══════════════════════════════════════════ */
const LiveChatPanel = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [unread, setUnread] = useState({});
  const [mobileView, setMobileView] = useState("list");

  const socketRef = useRef(null);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const activeChatIdRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    activeChatIdRef.current = activeChat?._id ?? null;
  }, [activeChat?._id]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [activeChat?.messages?.length, activeChat?.messages]);

  const fetchChats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/live/chats`, { headers: authHeader() });
      setChats(res.data || []);
    } catch (e) {
      console.error("Failed to fetch chats", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchChats(); }, []);

  /* ── Socket.IO ── */
  useEffect(() => {
    isMountedRef.current = true;
    
    const socket = io("https://wheedletechnologies.ai", {
      path: "/socket.io",
      transports: ["polling", "websocket"],
      upgrade: true,
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[Dashboard] Connected:", socket.id);
      if (activeChatIdRef.current) {
        socket.emit("join_chat", { chat_id: activeChatIdRef.current, role: "agent" });
      }
    });

    socket.on("disconnect", () => {
      console.log("[Dashboard] Disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("[Dashboard] Connection error:", error);
    });

    socket.on("new_chat", (data) => {
      console.log("[Dashboard] New chat:", data);
      setChats((prev) => {
        if (prev.find((c) => c._id === data.chat_id)) return prev;
        return [{
          _id: data.chat_id,
          name: data.name,
          service: data.service,
          type: data.type,
          status: "open",
          messages: [],
          created_at: data.created_at,
          updated_at: data.created_at,
        }, ...prev];
      });
      
      setUnread((u) => ({
        ...u,
        [data.chat_id]: activeChatIdRef.current === data.chat_id ? 0 : (u[data.chat_id] || 0) + 1,
      }));
    });

    socket.on("new_message", (data) => {
      const { chat_id, sender, text, ts } = data;
      console.log("[Dashboard] new_message:", { chat_id, sender, text });

      // Skip agent's own messages — already added optimistically in sendReply
      if (sender === "agent") {
        setChats((prev) =>
          prev.map((c) =>
            c._id === chat_id ? { ...c, updated_at: ts, _lastMsg: text } : c
          )
        );
        return;
      }

      const msg = { sender, text, ts };

      if (activeChatIdRef.current === chat_id) {
        setActiveChat((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            messages: [...(prev.messages || []), msg]
          };
        });
      } else {
        setUnread((u) => ({ ...u, [chat_id]: (u[chat_id] || 0) + 1 }));
      }

      setChats((prev) =>
        prev.map((c) =>
          c._id === chat_id ? { ...c, updated_at: ts, _lastMsg: text } : c
        )
      );
    });

    socket.on("chat_closed", ({ chat_id }) => {
      console.log("[Dashboard] Chat closed:", chat_id);
      setChats((prev) =>
        prev.map((c) => c._id === chat_id ? { ...c, status: "closed" } : c)
      );
      setActiveChat((prev) =>
        prev?._id === chat_id ? { ...prev, status: "closed" } : prev
      );
    });

    return () => {
      isMountedRef.current = false;
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  const openChat = async (chatId) => {
    if (activeChatIdRef.current === chatId && activeChat?.messages?.length > 0) {
      setMobileView("chat");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/live/chats/${chatId}`, {
        headers: authHeader(),
      });
      
      const chatData = {
        ...res.data,
        messages: res.data.messages || []
      };
      
      setActiveChat(chatData);
      setUnread((u) => ({ ...u, [chatId]: 0 }));
      
      if (socketRef.current?.connected) {
        socketRef.current.emit("join_chat", { chat_id: chatId, role: "agent" });
        console.log("[Dashboard] Joined room:", chatId);
      }
      
      setMobileView("chat");
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (e) {
      console.error("Failed to load chat", e);
    }
  };

  const sendReply = () => {
    const text = input.trim();
    if (!text || !activeChat || activeChat.status === "closed") return;

    const chatId = activeChat._id;
    const timestamp = new Date().toISOString();
    const tempMsg = { sender: "agent", text, ts: timestamp, tempId: `temp-${Date.now()}` };

    setActiveChat((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...(prev.messages || []), tempMsg]
      };
    });

    setChats((prev) =>
      prev.map((c) => c._id === chatId ? { ...c, _lastMsg: text } : c)
    );

    setInput("");
    
    if (socketRef.current?.connected) {
      socketRef.current.emit("agent_message", { chat_id: chatId, text });
      console.log("[Dashboard] Sent agent_message:", text);
    } else {
      console.log("[Dashboard] Socket not connected!");
    }

    inputRef.current?.focus();
  };

  const closeChat = async () => {
    if (!activeChat || activeChat.status === "closed") return;
    try {
      await axios.patch(
        `${API_BASE_URL}/live/chats/${activeChat._id}/close`,
        {},
        { headers: authHeader() }
      );
    } catch (e) {
      console.error("Close chat failed", e);
    }
  };

  const totalOpen = chats.filter((c) => c.status === "open").length;
  const totalClosed = chats.filter((c) => c.status === "closed").length;
  const typeColor = (type) => type === "new_user" ? "#0B2CC3" : "#7c3aed";

  const visibleChats = chats.filter((c) => {
    const matchFilter = filter === "all" || c.status === filter;
    const matchSearch =
      !search ||
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.service || "").toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white" style={{ minHeight: 0 }}>

      {/* LIST PANEL */}
      <div className={`flex flex-col border-r border-gray-200 bg-white
        ${mobileView === "chat" ? "hidden md:flex" : "flex"}
        w-full md:w-[300px] lg:w-[320px] flex-shrink-0`}
      >
        <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-[#2E1A6D] to-[#4B2D73]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-white font-bold text-base">Live Chats</h2>
              <p className="text-white/60 text-xs mt-0.5">WheBot conversations</p>
            </div>
            <div className="flex gap-1.5">
              <span className="bg-green-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {totalOpen} open
              </span>
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {totalClosed} closed
              </span>
            </div>
          </div>

          <input
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20
              text-white placeholder:text-white/50 text-sm outline-none focus:bg-white/20 transition"
            placeholder="Search name or service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex border-b border-gray-100">
          {["all", "open", "closed"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-1 py-2.5 text-xs font-semibold transition capitalize
                ${filter === f
                  ? "text-[#2E1A6D] border-b-2 border-[#2E1A6D]"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center text-gray-400 py-10 text-sm">Loading…</div>
          ) : visibleChats.length === 0 ? (
            <div className="text-center text-gray-400 py-10 text-sm">No chats found</div>
          ) : (
            visibleChats.map((chat) => {
              const isActive = activeChat?._id === chat._id;
              const unreadCnt = unread[chat._id] || 0;

              return (
                <div key={chat._id} onClick={() => openChat(chat._id)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50
                    hover:bg-gray-50 transition
                    ${isActive ? "bg-purple-50 border-l-4 border-l-[#2E1A6D]" : ""}`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center
                    text-white text-xs font-bold flex-shrink-0"
                    style={{ background: typeColor(chat.type) }}
                  >
                    {initials(chat.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-gray-800 truncate">{chat.name || "Unknown"}</span>
                      <span className="text-[10px] text-gray-400 ml-1 flex-shrink-0">{formatTime(chat.updated_at)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <span className="text-xs text-gray-500 truncate">{chat.service || "-"}</span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className="w-2 h-2 rounded-full"
                          style={{ background: chat.status === "open" ? "#22c55e" : "#9ca3af" }}
                        />
                        {unreadCnt > 0 && (
                          <span className="bg-[#0B2CC3] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {unreadCnt}
                          </span>
                        )}
                      </div>
                    </div>
                    {chat._lastMsg && (
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">{chat._lastMsg}</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CHAT PANE */}
      <div className={`flex-1 flex flex-col min-w-0
        ${mobileView === "list" ? "hidden md:flex" : "flex"}`}
      >
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-2">
              <MessageCircle size={30} className="text-[#2E1A6D]" />
            </div>
            <h3 className="font-semibold text-gray-700">Select a conversation</h3>
            <p className="text-gray-400 text-sm">Pick a chat from the left to start replying</p>
          </div>
        ) : (
          <>
            <div className="px-4 py-3 border-b border-gray-100 bg-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <button className="md:hidden text-gray-500 mr-1"
                  onClick={() => { setMobileView("list"); setActiveChat(null); }}
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: typeColor(activeChat.type) }}
                >
                  {initials(activeChat.name)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-800">{activeChat.name || "Unknown"}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white"
                      style={{ background: typeColor(activeChat.type) }}
                    >
                      {activeChat.type === "new_user" ? "New User" : "Client"}
                    </span>
                    {activeChat.agent_joined && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-green-100 text-green-700">
                        Agent Connected
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{activeChat.service || "-"}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{formatDate(activeChat.created_at)}</span>
                    <Circle size={7}
                      className={activeChat.status === "open" ? "text-green-500 fill-green-500" : "text-gray-400 fill-gray-400"}
                    />
                    <span className={`text-xs font-medium ${activeChat.status === "open" ? "text-green-600" : "text-gray-400"}`}>
                      {activeChat.status}
                    </span>
                  </div>
                </div>
              </div>

              {activeChat.status === "open" && (
                <button onClick={closeChat}
                  className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg
                    hover:bg-red-50 transition font-medium"
                >
                  Close Chat
                </button>
              )}
            </div>

            {(activeChat.email || activeChat.mobile || activeChat.address || activeChat.issue) && (
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-3 flex-shrink-0">
                {activeChat.email && <span className="text-xs text-gray-500">✉ {activeChat.email}</span>}
                {activeChat.mobile && <span className="text-xs text-gray-500">📞 {activeChat.mobile}</span>}
                {activeChat.address && <span className="text-xs text-gray-500">📍 {activeChat.address}</span>}
                {activeChat.issue && <span className="text-xs text-gray-500">🔧 {activeChat.issue}</span>}
              </div>
            )}

            <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f8f9fc]">
              {(activeChat.messages || []).length === 0 ? (
                <div className="text-center text-gray-400 text-sm mt-10">
                  No messages yet — write the first reply
                </div>
              ) : (
                (activeChat.messages || []).map((msg, i) => {
                  const isAgent = msg.sender === "agent";
                  
                  return (
                    <div key={msg.tempId || i} className={`flex items-end gap-2 ${isAgent ? "flex-row-reverse" : "flex-row"}`}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mb-1"
                        style={{ background: isAgent ? "#4B2D73" : typeColor(activeChat.type) }}
                      >
                        {isAgent ? "AG" : initials(activeChat.name)}
                      </div>

                      <div className={`max-w-[65%] flex flex-col ${isAgent ? "items-end" : "items-start"}`}>
                        <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
                          ${isAgent
                            ? "text-white rounded-br-sm"
                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
                          }`}
                          style={isAgent ? { background: "linear-gradient(135deg, #2E1A6D 0%, #4B2D73 100%)" } : {}}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 px-1">
                          {isAgent ? "You" : (activeChat.name || "User")} · {formatTime(msg.ts)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
              {activeChat.status === "closed" ? (
                <div className="text-center text-gray-400 text-sm py-1">This chat has been closed</div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendReply()}
                    placeholder="Type your reply…"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                      text-sm text-gray-800 outline-none focus:border-[#2E1A6D] focus:bg-white transition"
                  />
                  <button onClick={sendReply}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0
                      hover:opacity-90 active:scale-95 transition"
                    style={{ background: "linear-gradient(135deg, #2E1A6D 0%, #4B2D73 100%)" }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN ADMIN DASHBOARD
═══════════════════════════════════════════ */
const AdminDashboard = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [jobCount, setJobCount] = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);
  const [blogCategory, setBlogCategory] = useState("");
  const [homeOpen, setHomeOpen] = useState(false);
  const [blogCount, setBlogCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [applications, setApplications] = useState(0);
  const [leadsCount, setLeadsCount] = useState(0);
  const [formLeadsCount, setFormLeadsCount] = useState(0);
  const [liveChatCount, setLiveChatCount] = useState(0);

  useEffect(() => { fetchCounts(); }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/live/chats`, { headers: authHeader() })
      .then((res) => setLiveChatCount(res.data.filter((c) => c.status === "open").length))
      .catch(() => {});

    const socket = io("https://wheedletechnologies.ai", {
      path: "/socket.io",
      transports: ["polling", "websocket"],
      upgrade: true,
      withCredentials: true,
    });

    socket.on("new_chat", () => setLiveChatCount((n) => n + 1));
    socket.on("chat_closed", () => setLiveChatCount((n) => Math.max(0, n - 1)));

    return () => socket.disconnect();
  }, []);

const fetchCounts = async () => {
  try {
    const headers = authHeader();
    
    // Fetch data and get counts from response length
    const [jobsRes, testimonialsRes, blogsRes, contactsRes, leadsRes, formLeadsRes] =
      await Promise.all([
        axios.get(`${API_BASE_URL}/jobs`, { headers }),
        axios.get(`${API_BASE_URL}/testimonial`, { headers }),
        axios.get(`${API_BASE_URL}/blogs`, { headers }),
        axios.get(`${API_BASE_URL}/contact`, { headers }),
        axios.get(`${API_BASE_URL}/leads`, { headers }),
        axios.get(`${API_BASE_URL}/formleads`, { headers }),
      ]);

    setJobCount(jobsRes.data.length || jobsRes.data.total || jobsRes.data.count || 0);
    setTestimonialCount(testimonialsRes.data.length || testimonialsRes.data.total || 0);
    setBlogCount(blogsRes.data.length || blogsRes.data.total || 0);
    setApplications(contactsRes.data.length || contactsRes.data.total || 0);
    setLeadsCount(leadsRes.data.length || leadsRes.data.total || 0);
    setFormLeadsCount(formLeadsRes.data.length || formLeadsRes.data.total || 0);
  } catch (error) {
    console.error("fetchCounts error:", error);
    // Set defaults to avoid breaking the UI
    setJobCount(0);
    setTestimonialCount(0);
    setBlogCount(0);
    setApplications(0);
    setLeadsCount(0);
    setFormLeadsCount(0);
  }
};

  const logout = () => {
    localStorage.removeItem("adminToken");
    router.push('/admin/login');
  };

  const NavBtn = ({ icon: Icon, label, pages, onClick, badge }) => {
    const isActive = Array.isArray(pages)
      ? pages.includes(activePage)
      : activePage === pages;

    return (
      <button
        onClick={onClick || (() => setActivePage(Array.isArray(pages) ? pages[0] : pages))}
        className={`flex items-center justify-between w-full px-5 py-3 rounded-lg
          transition-all duration-200 cursor-pointer
          ${isActive ? "bg-white text-black shadow-md" : "text-white hover:bg-white/10"}`}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={18} />}
          <span>{label}</span>
        </div>
        {badge > 0 && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
            ${isActive ? "bg-[#2E1A6D] text-white" : "bg-white text-[#2E1A6D]"}`}>
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:relative z-50 h-full w-72
        bg-gradient-to-b from-[#2E1A6D] via-[#3A2371] to-[#4B2D73]
        shadow-2xl flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <img src={LogosData.adminlogo} className="h-20 w-auto object-contain" alt="logo" />
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-white overflow-y-auto">
          <NavBtn icon={LayoutDashboard} label="Dashboard" pages="dashboard" />

          <div>
            <button
              onClick={() => setHomeOpen(!homeOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white/10 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                  <path d="M3 12l9-9 9 9h-3v9h-12v-9h-3z" />
                </svg>
                Home
              </div>
              <span>{homeOpen ? "⌄" : "›"}</span>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${homeOpen ? "max-h-40" : "max-h-0"}`}>
              {[
                { label: "Hero", page: "hero" },
                { label: "Partners", page: "partners" },
                { label: "Steps", page: "steps" },
              ].map(({ label, page }) => (
                <button key={page} onClick={() => setActivePage(page)}
                  className={`flex items-center gap-3 w-full px-5 py-3 rounded-lg transition-all duration-200 cursor-pointer
                    ${activePage === page ? "bg-white text-black shadow-md" : "text-white hover:bg-white/10"}`}
                >
                  <span className="w-[18px]" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <NavBtn icon={Briefcase} label="Jobs" pages={["jobs", "postJob"]} />
          <NavBtn icon={FileText} label="Blogs" pages={["blogs", "selectBlogCategory", "postBlog"]} />
          <NavBtn icon={MessageSquare} label="Testimonials" pages={["testimonials", "postTestimonial"]} />

          <div className="border-t border-white/10 my-2" />

          <NavBtn icon={ClipboardList} label="Applications" pages="applications" badge={applications} />
          <NavBtn icon={Mail} label="Newsletter" pages="leads" badge={leadsCount} />
          <NavBtn icon={Users} label="Form Leads" pages="formleads" badge={formLeadsCount} />
          <NavBtn icon={MessageCircle} label="Live Chats" pages="livechat" badge={liveChatCount} />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 lg:px-10 py-4
          flex items-center justify-between shadow-md sticky top-0 z-40"
        >
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-3xl" onClick={() => setSidebarOpen(true)}>☰</button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 tracking-wide">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-6 relative">
            <div onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="text-white p-2 rounded-full shadow-sm"
                style={{ background: "linear-gradient(135deg, #2E1A6D 0%, #4B2D73 100%)" }}>
                <User size={18} />
              </div>
              <p className="text-gray-700 font-semibold hidden sm:block">Admin</p>
            </div>

            {profileDropdown && (
              <div className="absolute right-0 top-14 w-44 bg-white border border-gray-200
                rounded-xl shadow-xl overflow-hidden z-50"
              >
                <button
                  onClick={() => { setProfileOpen(true); setProfileDropdown(false); }}
                  className="w-full text-left px-4 py-3 hover:bg-purple-50 flex items-center gap-2 text-black transition"
                >
                  <User size={16} /> Profile
                </button>
                <button onClick={logout}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-red-500 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">

          {activePage === "dashboard" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Admin 👋</h2>
                <p className="text-gray-500">
                  Manage jobs, blogs, testimonials and website content easily from this dashboard.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 p-2 rounded-2xl">
                {[
                  { label: "Total Jobs", count: jobCount, icon: Briefcase, page: "jobs" },
                  { label: "Applications", count: applications, icon: ClipboardList, page: "applications" },
                  { label: "Blogs", count: blogCount, icon: Newspaper, page: "blogs" },
                  { label: "Testimonials", count: testimonialCount, icon: MessageSquare, page: "testimonials" },
                  { label: "Newsletter", count: leadsCount, icon: Mail, page: "leads" },
                  { label: "Form Leads", count: formLeadsCount, icon: Users, page: "formleads" },
                  { label: "Open Chats", count: liveChatCount, icon: MessageCircle, page: "livechat" },
                ].map(({ label, count, icon: Icon, page }) => (
                  <div key={page} onClick={() => setActivePage(page)}
                    className="bg-white rounded-xl p-6 shadow-sm hover:-translate-y-2 hover:scale-[1.04]
                      transition cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <p className="text-gray-500 text-sm">{label}</p>
                      <h2 className="text-3xl font-bold mt-2 text-gray-800">{count || 0}</h2>
                    </div>
                    <div className="p-3 rounded-full bg-purple-100">
                      <Icon className="text-purple-600" size={26} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === "hero" && <AdminPostHero onBack={() => setActivePage("home")} />}
          {activePage === "partners" && <ViewAllPartners setActivePage={setActivePage} />}
          {activePage === "addPartner" && <AddNewPartner setActivePage={setActivePage} />}
          {activePage === "steps" && <ViewAllSteps setActivePage={setActivePage} />}
          {activePage === "addStep" && <AdminAddStep setActivePage={setActivePage} />}

          {activePage === "jobs" && <ViewAllJobs onPostNew={() => setActivePage("postJob")} />}
          {activePage === "postJob" && <AdminJobForm onViewAllJobs={() => setActivePage("jobs")} />}

          {activePage === "applications" && <ViewAllContacts />}
          {activePage === "leads" && <ViewAllLeads />}
          {activePage === "formleads" && <ViewAllFormLeads />}

          {activePage === "testimonials" && <ViewAllTestimonials onClose={() => setActivePage("postTestimonial")} />}
          {activePage === "postTestimonial" && <AdminPostTestimonial onViewAllTestimonials={() => setActivePage("testimonials")} />}

          {activePage === "selectBlogCategory" && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className="w-[400px] rounded-xl shadow-2xl p-6 text-white"
                style={{ background: "linear-gradient(135deg, #2E1A6D 0%, #4B2D73 100%)" }}>
                <h2 className="text-xl font-semibold mb-4">Select Category of Blogs</h2>
                <select
                  onChange={(e) => {
                    setBlogCategory(e.target.value);
                    setTimeout(() => setActivePage("postBlog"), 200);
                  }}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/30
                    text-white outline-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="services">Services Blog</option>
                  <option value="comprehensive">Comprehensive Blog</option>
                </select>
                <button
                  onClick={() => setActivePage("blogs")}
                  className="mt-4 text-white/70 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {activePage === "blogs" && <ViewAllBlogs onPostNew={() => setActivePage("selectBlogCategory")} />}
          {activePage === "postBlog" && <AdminPostBlog category={blogCategory} onBack={() => setActivePage("blogs")} />}

          {activePage === "livechat" && (
            <div className="flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
              <div className="mb-4 flex-shrink-0">
                <h2 className="text-xl font-bold text-gray-800">Live Chats</h2>
                <p className="text-gray-500 text-sm mt-1">Real-time WheBot conversations — reply as an agent</p>
              </div>
              <div className="flex-1 min-h-0">
                <LiveChatPanel />
              </div>
            </div>
          )}
        </main>
      </div>

      <AdminProfilePopup isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
};

export default AdminDashboard;