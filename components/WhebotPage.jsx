'use client';

/**
 * WhebotPage.jsx
 * WheBot - Interactive chatbot widget with live chat support
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";
import LogosData from "../lib/LogosData";
import API_BASE_URL from "../lib/api";
import {
  RefreshCcw, ChevronDown, Send, CheckCircle2, Pencil,
  UserPlus, Building2, Globe, Smartphone, Megaphone,
  BrainCircuit, Bot, Search, BarChart3, Briefcase,
  ShoppingCart, LayoutTemplate, Workflow, Cpu, Sparkles, Boxes,
} from "lucide-react";



/* ─────────────────────────────────────────────
   SOCKET URL
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const SERVICE_LIST = [
  'Web Development', 'App Development', 'Digital Marketing',
  'AI Solution & Intelligent Agent', 'Other',
];

const SUB_OPTIONS = {
  'Web Development':                   ['Business Website', 'Ecommerce Website', 'Landing Page', 'Custom Portal', 'Other'],
  'App Development':                   ['Android App', 'iOS App', 'Both Android & iOS', 'Internal App', 'Other'],
  'Digital Marketing':                 ['Leads Generation', 'Sales Growth', 'Brand Awareness', 'SEO Ranking', 'Other'],
  'AI Solution & Intelligent Agent':   ['AI Chatbot', 'Business Automation', 'CRM AI', 'Custom AI Agent', 'Other'],
};

const CLIENT_COMPANIES = ['Savorka', '123-setup(printer)', 'NCCL', 'Purifier India'];

const INPUT_ENABLED_STEPS = new Set([
  'requirement', 'name', 'mobile', 'email', 'address',
  'client_issue', 'client_email', 'client_mobile', 'live_chat',
]);

const EMPTY_FORM   = { service: '', subRequirement: '', requirement: '', name: '', mobile: '', email: '', address: '' };
const EMPTY_CLIENT = { company: '', issue: '', email: '', mobile: '' };

/* ─────────────────────────────────────────────
   ICON HELPERS
───────────────────────────────────────────── */
const getTypeIcon    = (i) => i === 'New User' ? UserPlus : Building2;
const getServiceIcon = (i) => ({
  'Web Development': Globe, 'App Development': Smartphone, 'Digital Marketing': Megaphone,
  'AI Solution & Intelligent Agent': BrainCircuit, Other: Boxes,
})[i] || Sparkles;
const getSubIcon = (i) => ({
  'Business Website': Briefcase, 'Ecommerce Website': ShoppingCart, 'Landing Page': LayoutTemplate,
  'Custom Portal': Globe, 'Android App': Smartphone, 'iOS App': Smartphone,
  'Both Android & iOS': Smartphone, 'Internal App': Building2, 'Leads Generation': Megaphone,
  'Sales Growth': BarChart3, 'Brand Awareness': Sparkles, 'SEO Ranking': Search,
  'AI Chatbot': Bot, 'Business Automation': Workflow, 'CRM AI': BrainCircuit,
  'Custom AI Agent': Cpu, Other: Boxes,
})[i] || Sparkles;

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
const SelectionButton = React.memo(({ label, onClick, Icon }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-full bg-black border border-white/10 text-white hover:border-[#0B2CC3] hover:bg-gradient-to-r hover:from-[#040010] hover:to-[#0B2CC3] hover:shadow-[0_0_14px_rgba(11,44,195,0.35)] active:scale-[0.98] transition-all duration-300"
  >
    <span className="w-7 h-7 rounded-full bg-[#0B2CC3]/15 border border-[#0B2CC3]/40 flex items-center justify-center shrink-0">
      <Icon size={14} className="text-[#7ea2ff]" />
    </span>
    <span className="text-[13px] font-medium text-left leading-tight">{label}</span>
  </button>
));
SelectionButton.displayName = 'SelectionButton';

const TypingIndicator = () => (
  <div className="flex items-start">
    <div className="max-w-[85%] px-4 py-3 rounded-xl bg-[#040010] border border-[#0B2CC3]">
      <div className="flex gap-1">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.span
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay }}
          />
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const sleep        = (ms) => new Promise((r) => setTimeout(r, ms));
const isValidName  = (v) => /^[A-Za-z ]{2,50}$/.test(v);
const isValidMobile = (v) => v.replace(/\D/g, '').length >= 10;
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const getInitialMessages = () => [
  { type: 'bot', text: "Hey! I'm WheBot, How can I help you?", isComplete: true },
  { type: 'bot', text: 'Please select an option below.', isComplete: true, showOptions: true },
];

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const WhebotPage = ({ isMinimized, setIsMinimized }) => {
  const [messages,       setMessages]       = useState([]);
  const [input,          setInput]          = useState('');
  const [showIntroText,  setShowIntroText]  = useState(false);
  const [isTyping,       setIsTyping]       = useState(false);
  const [chatStep,       setChatStep]       = useState('select_type');
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [formData,       setFormData]       = useState(EMPTY_FORM);
  const [clientFormData, setClientFormData] = useState(EMPTY_CLIENT);
  const [chatId,         setChatId]         = useState(null);
  const [isLive,         setIsLive]         = useState(false);
  const [agentOnline,    setAgentOnline]    = useState(false);

  // Socket.IO is loaded dynamically to avoid SSR issues in Next.js
  const chatBodyRef        = useRef(null);
  const userScrolledUpRef  = useRef(false);
  const scrollTimerRef     = useRef(null);
  const socketRef          = useRef(null);
  const chatIdRef          = useRef(null);
  const isMountedRef       = useRef(true);

  const isInputEnabled = INPUT_ENABLED_STEPS.has(chatStep);

  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  /* ─── Socket.IO setup (dynamic import prevents SSR crash) ─── */
  useEffect(() => {
    isMountedRef.current = true;
    let socket;

    // Dynamically import socket.io-client so Next.js doesn't try to SSR it
    import('socket.io-client').then(({ io }) => {
      if (!isMountedRef.current) return;

      socket = io('https://wheedletechnologies.ai', {
        path: '/socket.io',
        transports: ['polling', 'websocket'],
        upgrade: true,
        withCredentials: true,
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('[Bot] Connected:', socket.id);
        if (chatIdRef.current) {
          socket.emit('join_chat', { chat_id: chatIdRef.current, role: 'user' });
        }
      });

      socket.on('disconnect', () => console.log('[Bot] Disconnected'));
      socket.on('connect_error', (err) => console.error('[Bot] Connection error:', err));

      socket.on('new_message', (data) => {
        const { chat_id, sender, text } = data;
        if (chat_id !== chatIdRef.current) return;
        if (sender === 'agent') {
          setIsTyping(false);
          addStaticBot(text);
        }
      });

      socket.on('agent_connected', (data) => {
        if (data.chat_id === chatIdRef.current) {
          setAgentOnline(true);
          addStaticBot('🟢 An agent has joined the chat. You can start chatting now!');
        }
      });

      socket.on('chat_closed', (data) => {
        if (data.chat_id === chatIdRef.current) {
          addStaticBot('This chat has been closed by our team. Thank you!');
          setChatStep('completed');
          setIsLive(false);
          setAgentOnline(false);
        }
      });
    });

    return () => {
      isMountedRef.current = false;
      if (socket) {
        socket.disconnect();
        socket.removeAllListeners();
      }
    };
  }, []);

  /* ─── Join room when chatId changes ─── */
  useEffect(() => {
    if (!chatId) return;
    const socket = socketRef.current;
    if (!socket) return;

    const joinRoom = () => {
      socket.emit('join_chat', { chat_id: chatId, role: 'user' });
      setIsLive(true);
      setAgentOnline(false);
    };

    if (!socket.connected) {
      socket.connect();
      socket.once('connect', joinRoom);
    } else {
      joinRoom();
    }

    return () => {
      if (socket.connected && isMountedRef.current) {
        socket.emit('leave_chat', { chat_id: chatId });
      }
    };
  }, [chatId]);

  /* ─── Scroll helpers ─── */
  const isNearBottom = () => {
    const el = chatBodyRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 140;
  };

  const scrollToBottom = useCallback((smooth = true) => {
    const el = chatBodyRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  useEffect(() => {
    if (userScrolledUpRef.current) return;
    const id = requestAnimationFrame(() => scrollToBottom(messages.length > 1));
    return () => cancelAnimationFrame(id);
  }, [messages.length, isTyping, showConfirmBox, scrollToBottom]);

  useEffect(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      userScrolledUpRef.current = !isNearBottom();
      scrollTimerRef.current = setTimeout(() => {
        if (isNearBottom()) userScrolledUpRef.current = false;
      }, 150);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  /* ─── Intro ─── */
  useEffect(() => {
    if (!isMinimized && messages.length === 0) setMessages(getInitialMessages());
  }, [isMinimized]);

  useEffect(() => {
    if (!isMinimized) return;
    const show = setTimeout(() => setShowIntroText(true),  3000);
    const hide = setTimeout(() => setShowIntroText(false), 12000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [isMinimized]);

  /* ─── Message engine ─── */
  const typeWriterEffect = (text, ownerIndex) =>
    new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setMessages((prev) => {
          const updated = [...prev];
          const target  = updated[ownerIndex];
          if (!target || target.type !== 'bot' || target.isComplete) {
            clearInterval(interval);
            resolve();
            return prev;
          }
          const done = i >= text.length;
          updated[ownerIndex] = { ...target, displayText: text.slice(0, i), isComplete: done };
          if (done) { clearInterval(interval); resolve(); }
          return updated;
        });
      }, 35);
    });

  const addUserMessage = (text) => {
    userScrolledUpRef.current = false;
    setMessages((prev) => {
      const cleaned = prev.map((m) => ({
        ...m, showOptions: false, showServices: false,
        showSubOptions: false, showClientCompanies: false,
      }));
      return [...cleaned, { type: 'user', text, isComplete: true }];
    });
  };

  const addBotMessage = async (text, extra = {}) => {
    userScrolledUpRef.current = false;
    setIsTyping(true);
    await sleep(550);
    setIsTyping(false);

    // Use a ref to capture the real index synchronously inside the setter,
    // because React may batch the update — reading idx outside is not reliable.
    const idxRef = { current: -1 };
    await new Promise((resolve) => {
      setMessages((prev) => {
        idxRef.current = prev.length;
        resolve();
        return [...prev, { type: 'bot', text, displayText: '', isComplete: false, ...extra }];
      });
    });

    // Give React one frame to commit the new message before we start mutating it
    await new Promise((r) => requestAnimationFrame(r));

    await typeWriterEffect(text, idxRef.current);
  };

  const addStaticBot = (text, extra = {}) => {
    userScrolledUpRef.current = false;
    setMessages((prev) => [...prev, { type: 'bot', text, isComplete: true, ...extra }]);
  };

  /* ─── Reset ─── */
  const resetAll = () => {
    setFormData(EMPTY_FORM);
    setClientFormData(EMPTY_CLIENT);
    setChatStep('select_type');
    setShowConfirmBox(false);
    setIsTyping(false);
    setInput('');
    setChatId(null);
    setIsLive(false);
    setAgentOnline(false);
    userScrolledUpRef.current = false;
    if (socketRef.current?.connected) {
      socketRef.current.emit('leave_chat', { chat_id: chatId });
    }
    if (chatBodyRef.current) chatBodyRef.current.scrollTop = 0;
  };

  const refreshChat = () => { resetAll(); setMessages(getInitialMessages()); };

  /* ─── Flow handlers ─── */
  const handleSelectType = async (type) => {
    addUserMessage(type === 'new_user' ? 'New User' : 'Wheedle Client');
    if (type === 'new_user') {
      setChatStep('service_select');
      await addBotMessage('Please select the service you are interested in.');
      addStaticBot('Please choose one service from the options below.', { showServices: true });
    } else {
      setChatStep('client_company');
      await addBotMessage('Welcome back! Please select your company.');
      addStaticBot('Choose your company below.', { showClientCompanies: true });
    }
  };

  const handleServiceSelect = async (service) => {
    addUserMessage(service);
    setFormData((p) => ({ ...p, service }));
    if (service === 'Other') {
      setChatStep('requirement');
      await addBotMessage('Please describe your requirement or business need.');
      return;
    }
    setChatStep('sub_option');
    await addBotMessage('Please select one option below.');
    addStaticBot('Please choose one option below.', { showSubOptions: true, subItems: SUB_OPTIONS[service] });
  };

  const handleSubOption = async (option) => {
    addUserMessage(option);
    setFormData((p) => ({ ...p, subRequirement: option }));
    if (option === 'Other') {
      setChatStep('requirement');
      await addBotMessage('Please describe your exact requirement.');
      return;
    }
    setChatStep('name');
    await addBotMessage('Please share your full name.');
  };

  const handleClientCompany = async (company) => {
    addUserMessage(company);
    setClientFormData((p) => ({ ...p, company }));
    setChatStep('client_issue');
    await addBotMessage('Please share your issue.');
  };

  /* ─── API calls ─── */
  const submitLead = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/live/new-user-lead`,
        { userType: 'new_user', ...formData },
        { headers: { 'x-api-key': 'test_tesing_chat', 'Content-Type': 'application/json' } }
      );
      const id = res.data.chat_id;
      setShowConfirmBox(false);
      setChatId(id);
      setChatStep('live_chat');
      await addBotMessage(
        '✅ Your enquiry is submitted!\n\nYou are now connected to our support team. Please type your message below — an agent will reply shortly.'
      );
    } catch (err) {
      setShowConfirmBox(false);
      const msg = err?.response?.data?.error || 'Unable to submit request right now. Please try again later.';
      await addBotMessage(msg);
    }
  };

  const submitClientSupport = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/live/client-support`,
        clientFormData,
        { headers: { 'x-api-key': 'test_tesing_chat', 'Content-Type': 'application/json' } }
      );
      const id = res.data.chat_id;
      setChatId(id);
      setChatStep('live_chat');
      await addBotMessage('✅ Support request submitted!\n\nYou are now connected to our team. An agent will reply to you shortly.');
    } catch (err) {
      const msg = err?.response?.data?.error || 'Unable to submit request right now. Please try again later.';
      await addBotMessage(msg);
    }
  };

  const restartFlow = async () => {
    setShowConfirmBox(false);
    setFormData(EMPTY_FORM);
    setChatStep('service_select');
    await addBotMessage("Let's start again. Please select the service you are interested in.");
    addStaticBot('Please select your service again.', { showServices: true });
  };

  /* ─── Send message ─── */
  const sendMessage = async () => {
    const value = input.trim();
    if (!value || !isInputEnabled) return;

    if (chatStep === 'live_chat' && chatId) {
      addUserMessage(value);
      setInput('');
      if (socketRef.current?.connected) {
        socketRef.current.emit('user_message', { chat_id: chatId, text: value });
      }
      return;
    }

    const steps = {
      client_issue: async () => {
        if (value.length < 3) { await addBotMessage('Please enter a valid issue.'); return; }
        addUserMessage(value); setClientFormData((p) => ({ ...p, issue: value })); setInput('');
        setChatStep('client_email'); await addBotMessage('Please share your email address.');
      },
      client_email: async () => {
        if (!isValidEmail(value)) { await addBotMessage('Please enter a valid email.'); return; }
        addUserMessage(value); setClientFormData((p) => ({ ...p, email: value })); setInput('');
        setChatStep('client_mobile'); await addBotMessage('Please share your mobile number.');
      },
      client_mobile: async () => {
        if (!isValidMobile(value)) { await addBotMessage('Please enter a valid mobile number.'); return; }
        addUserMessage(value); setClientFormData((p) => ({ ...p, mobile: value })); setInput('');
        await submitClientSupport();
      },
      requirement: async () => {
        if (value.length < 3) { await addBotMessage('Please enter a valid requirement.'); return; }
        addUserMessage(value); setFormData((p) => ({ ...p, requirement: value })); setInput('');
        setChatStep('name'); await addBotMessage('Please share your full name.');
      },
      name: async () => {
        if (!isValidName(value)) { await addBotMessage('Please enter a valid full name.'); return; }
        addUserMessage(value); setFormData((p) => ({ ...p, name: value })); setInput('');
        setChatStep('mobile'); await addBotMessage('Please share your mobile number.');
      },
      mobile: async () => {
        if (!isValidMobile(value)) { await addBotMessage('Please enter a valid 10 digit mobile number.'); return; }
        addUserMessage(value); setFormData((p) => ({ ...p, mobile: value })); setInput('');
        setChatStep('email'); await addBotMessage('Please share your email address.');
      },
      email: async () => {
        if (!isValidEmail(value)) { await addBotMessage('Please enter a valid email address.'); return; }
        addUserMessage(value); setFormData((p) => ({ ...p, email: value })); setInput('');
        setChatStep('address'); await addBotMessage('Please provide your complete address.');
      },
      address: async () => {
        if (value.length < 5) { await addBotMessage('Please enter a valid address.'); return; }
        addUserMessage(value); setFormData((p) => ({ ...p, address: value })); setInput('');
        setChatStep('confirm'); setShowConfirmBox(true);
      },
    };

    if (steps[chatStep]) await steps[chatStep]();
  };

  /* ─── Minimized view ─── */
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        {showIntroText && (
          <div className="px-4 py-2 bg-[#040010] border border-[#0B2CC3] rounded-full text-white text-[13px] max-w-[210px]">
            Hey! I'm <span className="font-semibold">WheBot</span><br />How can I help you?
          </div>
        )}
        <button
          onClick={() => setIsMinimized(false)}
          className="w-10 h-10 rounded-full bg-black border-2 border-[#0B2CC3] animate-bounce"
          aria-label="Open WheBot chat"
        >
          <img src={LogosData.botLogo} alt="WheBot" className="w-full h-full object-contain scale-[2.2]" />
        </button>
      </div>
    );
  }

  /* ─── Full view ─── */
  return (
    <div className="fixed bottom-4 right-4 sm:right-6 sm:bottom-6 z-50">
      <div className="rounded-[26px] p-[1.5px] bg-gradient-to-b from-[#0B2CC3] to-white">
        <div className="relative w-[92vw] sm:w-[380px] h-[75vh] sm:h-[600px] rounded-[26px] px-4 pt-4 pb-3 flex flex-col bg-gradient-to-b from-[#040010] to-[#0B2CC3] text-white overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between h-[38px]">
            <div className="flex items-center gap-2">
              <img src={LogosData.whebot} alt="WheBot" className="w-[200px] h-[200px]" />
              {isLive && (
                <span className="flex items-center gap-1 text-[11px] text-green-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={refreshChat} aria-label="Refresh chat"><RefreshCcw size={18} /></button>
              <button onClick={() => setIsMinimized(true)} aria-label="Minimize chat"><ChevronDown size={20} /></button>
            </div>
          </div>

          {/* LIVE CHAT BANNER */}
          {isLive && (
            <div className="mt-2 mb-1 px-3 py-1.5 rounded-xl bg-[#0B2CC3]/30 border border-[#0B2CC3]/60 text-[12px] text-center text-white/80">
              💬 Connected to support — agent will reply shortly
            </div>
          )}

          {/* BODY */}
          <div
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 mt-3 mb-3 overscroll-contain"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[11px] opacity-80 mb-1">
                  {msg.type === 'user' ? 'You' : msg.sender === 'agent' ? 'Agent' : 'WheBot'}
                </span>
                <div className={`max-w-[85%] text-sm px-4 py-2 rounded-xl whitespace-pre-line ${
                  msg.type === 'user'
                    ? 'bg-[#0B2CC3]'
                    : 'bg-[#040010] border border-[#0B2CC3]'
                }`}>
                  {msg.type === 'bot' && !msg.isComplete ? (
                    <>{msg.displayText}<span className="inline-block w-[2px] h-[14px] bg-white ml-[2px] animate-pulse" /></>
                  ) : msg.text}

                  {msg.showOptions && (
                    <div className="mt-3">
                      <div className="text-[12px] text-white/70 mb-2 px-1">Please choose one option</div>
                      <div className="space-y-2">
                        {['Wheedle Client', 'New User'].map((item) => (
                          <SelectionButton
                            key={item} label={item} Icon={getTypeIcon(item)}
                            onClick={() => handleSelectType(item === 'New User' ? 'new_user' : 'wheedle_client')}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.showClientCompanies && (
                    <div className="mt-3">
                      <div className="text-[12px] text-white/70 mb-2 px-1">Select your company</div>
                      <div className="space-y-2">
                        {CLIENT_COMPANIES.map((item) => (
                          <SelectionButton key={item} label={item} Icon={Building2} onClick={() => handleClientCompany(item)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.showServices && (
                    <div className="mt-3">
                      <div className="text-[12px] text-white/70 mb-2 px-1">Select a service</div>
                      <div className="space-y-2">
                        {SERVICE_LIST.map((item) => (
                          <SelectionButton key={item} label={item} Icon={getServiceIcon(item)} onClick={() => handleServiceSelect(item)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.showSubOptions && (
                    <div className="mt-3">
                      <div className="text-[12px] text-white/70 mb-2 px-1">Choose requirement</div>
                      <div className="space-y-2">
                        {msg.subItems?.map((item) => (
                          <SelectionButton key={item} label={item} Icon={getSubIcon(item)} onClick={() => handleSubOption(item)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <span className="text-[11px] opacity-80 mb-1">WheBot</span>
                <TypingIndicator />
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="mt-auto">
            <div className={`flex items-center gap-2 border rounded-[12px] px-4 py-2 ${
              isInputEnabled ? 'border-white bg-[#040010]' : 'border-white/20 bg-[#040010]/50'
            }`}>
              <input
                type="text"
                disabled={!isInputEnabled}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isLive ? 'Type your message...'
                  : isInputEnabled ? 'Type your answer...'
                  : 'Select option above...'
                }
                className="bg-transparent outline-none flex-1 text-sm text-white disabled:cursor-not-allowed placeholder:text-white/50"
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                disabled={!isInputEnabled}
                onClick={sendMessage}
                aria-label="Send message"
                className="w-8 h-8 rounded-full bg-[#0B2CC3] flex items-center justify-center disabled:opacity-40"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <div className="text-center text-xs mt-2 text-white/50">
            Powered by <span className="font-semibold text-white">Wheedle</span> Technologies
          </div>

          {/* CONFIRM BOX */}
          {showConfirmBox && (
            <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
              <div className="w-full max-w-sm rounded-2xl border border-[#0B2CC3] bg-gradient-to-b from-[#040010] to-[#0B2CC3] p-5">
                <div className="text-lg font-semibold mb-4 text-white">Confirm Details</div>
                <div className="space-y-2 text-sm mb-5 text-white">
                  <div><b>Service:</b>     {formData.service}</div>
                  <div><b>Option:</b>      {formData.subRequirement}</div>
                  <div><b>Requirement:</b> {formData.requirement}</div>
                  <div><b>Name:</b>        {formData.name}</div>
                  <div><b>Mobile:</b>      {formData.mobile}</div>
                  <div><b>Email:</b>       {formData.email}</div>
                  <div><b>Address:</b>     {formData.address}</div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={restartFlow}
                    className="flex-1 border border-white rounded-xl py-2 flex justify-center items-center gap-2 text-white"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={submitLead}
                    className="flex-1 bg-[#0B2CC3] rounded-xl py-2 flex justify-center items-center gap-2 text-white"
                  >
                    <CheckCircle2 size={16} /> Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default WhebotPage;