'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { AnimatePresence, motion } from 'framer-motion';
import LogosData from '../lib/LogosData';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://wheedletechnologies.ai';

const SERVICES = ['Marketing & Advertising','AI & Tech Solutions','Social Media Management','Website Design & Dev','Ecommerce Solutions','Automation & AI Agents','Design & Media Production','Consulting & Strategy'];

const STEPS = {
  welcome: { key: 'welcome', text: null, buttons: [] },
  ask_type: { key: 'ask_type', text: "Let's get you to the right place! Are you a New User or an Existing Client?", buttons: ['New User', 'Existing Client'] },
  ask_service_new: { key: 'ask_service_new', text: "Which service are you interested in?", buttons: SERVICES },
  ask_service_existing: { key: 'ask_service_existing', text: "What do you need help with?", buttons: ['Technical Support', 'Billing Inquiry', 'Project Update', 'Other'] },
  ask_name: { key: 'ask_name', text: null, buttons: [] },
  ask_email: { key: 'ask_email', text: null, buttons: [] },
  ask_mobile: { key: 'ask_mobile', text: null, buttons: [] },
  ask_address: { key: 'ask_address', text: null, buttons: [] },
  ask_issue: { key: 'ask_issue', text: null, buttons: [] },
  live_chat: { key: 'live_chat', text: null, buttons: [] },
};

export default function WhebotPage({ isMinimized, setIsMinimized }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState('welcome');
  const [userData, setUserData] = useState({ type: '', service: '', name: '', email: '', mobile: '', address: '', issue: '' });
  const [chatId, setChatId] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [agentConnected, setAgentConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [inputError, setInputError] = useState('');
  const socketRef = useRef(null);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const isLiveRef = useRef(false);
  const chatIdRef = useRef(null);

  useEffect(() => { isLiveRef.current = isLive; }, [isLive]);
  useEffect(() => { chatIdRef.current = chatId; }, [chatId]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, isMinimized]);

  const addMsg = (sender, text, type = 'text', extra = {}) =>
    setMessages(prev => [...prev, { sender, text, type, ...extra, id: Date.now() + Math.random() }]);

  const addBotMsg = (text, type = 'text', extra = {}) => addMsg('bot', text, type, extra);

  useEffect(() => {
    addBotMsg("Hi there! 👋 I'm WheBot – your AI assistant. I can help you explore services, connect you with a live agent, or answer your questions.", 'text');
    setTimeout(() => {
      addBotMsg(STEPS.ask_type.text, 'buttons', { buttons: STEPS.ask_type.buttons });
      setStep('ask_type');
    }, 800);
  }, []);

  const initSocket = (cid, name, type) => {
    if (socketRef.current) { socketRef.current.disconnect(); socketRef.current.removeAllListeners(); }
    const socket = io(SOCKET_URL, {
      path: '/socket.io', transports: ['polling', 'websocket'], upgrade: true, withCredentials: true,
      reconnection: true, reconnectionAttempts: 10, reconnectionDelay: 1000,
    });
    socketRef.current = socket;
    socket.on('connect', () => { socket.emit('join_chat', { chat_id: cid, role: 'user' }); });
    socket.on('new_message', (data) => {
      if (data.chat_id !== chatIdRef.current || data.sender === 'user') return;
      addMsg('agent', data.text);
      if (isMinimized) setUnreadCount(n => n + 1);
      setAgentConnected(true);
    });
    socket.on('agent_joined', (data) => {
      if (data.chat_id === chatIdRef.current) {
        setAgentConnected(true);
        addBotMsg('🎉 A live agent has joined the chat!');
      }
    });
    socket.on('chat_closed', (data) => {
      if (data.chat_id === chatIdRef.current) {
        setIsLive(false);
        addBotMsg('This chat session has been closed. Thank you for contacting us!');
      }
    });
    socket.on('disconnect', () => {
      if (isLiveRef.current) setTimeout(() => socket.connect(), 2000);
    });
  };

  const handleBotFlow = async (text) => {
    addMsg('user', text);
    const val = text.trim();
    if (step === 'ask_type') {
      const type = val === 'New User' ? 'new_user' : 'existing_client';
      setUserData(u => ({ ...u, type }));
      if (type === 'new_user') {
        setTimeout(() => { addBotMsg(STEPS.ask_service_new.text, 'buttons', { buttons: STEPS.ask_service_new.buttons }); setStep('ask_service_new'); }, 400);
      } else {
        setTimeout(() => { addBotMsg(STEPS.ask_service_existing.text, 'buttons', { buttons: STEPS.ask_service_existing.buttons }); setStep('ask_service_existing'); }, 400);
      }
    } else if (step === 'ask_service_new' || step === 'ask_service_existing') {
      setUserData(u => ({ ...u, service: val }));
      setTimeout(() => { addBotMsg("Great! What's your name?"); setStep('ask_name'); }, 400);
    } else if (step === 'ask_name') {
      if (val.length < 2) { addBotMsg("Please enter a valid name (at least 2 characters)."); return; }
      setUserData(u => ({ ...u, name: val }));
      setTimeout(() => { addBotMsg("Got it! What's your email address?"); setStep('ask_email'); }, 400);
    } else if (step === 'ask_email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { addBotMsg("That doesn't look like a valid email. Please try again."); return; }
      setUserData(u => ({ ...u, email: val }));
      setTimeout(() => { addBotMsg("Thanks! What's your mobile number?"); setStep('ask_mobile'); }, 400);
    } else if (step === 'ask_mobile') {
      if (!/^\d{10}$/.test(val.replace(/[\s-]/g, ''))) { addBotMsg("Please enter a valid 10-digit mobile number."); return; }
      setUserData(u => ({ ...u, mobile: val }));
      setTimeout(() => { addBotMsg("What's your city/address?"); setStep('ask_address'); }, 400);
    } else if (step === 'ask_address') {
      setUserData(u => ({ ...u, address: val }));
      setTimeout(() => { addBotMsg("Briefly describe your requirement or question:"); setStep('ask_issue'); }, 400);
    } else if (step === 'ask_issue') {
      const issue = val;
      setUserData(u => ({ ...u, issue }));
      setStep('live_chat');
      setIsLive(true);
      const finalData = { ...userData, issue };
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/py/api'}/live/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        });
        const data = await res.json();
        if (data.chat_id) {
          setChatId(data.chat_id);
          initSocket(data.chat_id, finalData.name, finalData.type);
          setTimeout(() => addBotMsg("✅ You're now connected! An agent will join shortly. Feel free to type your messages below."), 300);
        } else {
          addBotMsg("Something went wrong starting the chat. Please try again.");
          setIsLive(false); setStep('welcome');
        }
      } catch {
        addBotMsg("Failed to connect. Please check your network and try again.");
        setIsLive(false); setStep('welcome');
      }
    } else if (step === 'live_chat') {
      if (!chatIdRef.current || !socketRef.current?.connected) {
        addBotMsg("Not connected. Please wait or refresh.");
        return;
      }
      socketRef.current.emit('user_message', { chat_id: chatIdRef.current, text: val });
    }
  };

  const handleSend = () => {
    const val = input.trim();
    if (!val) return;
    setInputError('');
    handleBotFlow(val);
    setInput('');
  };

  const handleButtonClick = (btn) => handleBotFlow(btn);

  useEffect(() => {
    if (!isMinimized && unreadCount > 0) setUnreadCount(0);
  }, [isMinimized]);

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[100] flex flex-col items-end gap-3">
      {!isMinimized && (
        <AnimatePresence>
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.85 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            style={{ animation: 'whebotPopup 0.32s ease-out' }}
            className="relative flex flex-col bg-[#0a0014] rounded-[24px] overflow-hidden w-[92vw] sm:w-[380px] h-[500px] sm:h-[520px] shadow-[0_8px_48px_rgba(90,60,200,0.45)] border border-white/10"
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#140030] to-[#1a0040]">
              <div className="flex items-center gap-3">
                <img src={LogosData.botLogo} alt="WheBot" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                    WheBot
                    {agentConnected && <span className="text-[10px] bg-green-500 px-1.5 py-0.5 rounded-full">Agent Connected</span>}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                    <span className="text-[11px] text-gray-400">Active now</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsMinimized(true)} className="text-gray-400 hover:text-white transition ml-2">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {(msg.sender === 'bot' || msg.sender === 'agent') && (
                    <img src={LogosData.botLogo} alt="WheBot" className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0 self-start" />
                  )}
                  <div className="flex flex-col gap-2 max-w-[78%]">
                    {msg.type === 'buttons' ? (
                      <div className="flex flex-col gap-2">
                        <div className="bg-[#1e1035] text-white text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm leading-relaxed">{msg.text}</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {msg.buttons?.map((btn) => (
                            <button key={btn} onClick={() => handleButtonClick(btn)}
                              className="text-xs px-3 py-1.5 rounded-full border border-[#5a3cff]/60 text-white/80 hover:bg-[#5a3cff]/30 hover:text-white transition">
                              {btn}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={`text-sm px-4 py-2.5 rounded-2xl leading-relaxed ${
                        msg.sender === 'user' ? 'bg-[#4b6bfd] text-white rounded-tr-sm' :
                        msg.sender === 'agent' ? 'bg-[#2d1a6e] text-white rounded-tl-sm border border-purple-500/40' :
                        'bg-[#1e1035] text-white rounded-tl-sm'
                      }`}>
                        {msg.text}
                        {msg.sender === 'agent' && <span className="block text-[10px] text-purple-300 mt-1">Agent</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/10 bg-[#0a0014]">
              {inputError && <p className="text-red-400 text-xs mb-2">{inputError}</p>}
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={step === 'live_chat' ? "Type a message..." : "Type your answer..."}
                  className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none" />
                <button onClick={handleSend} className="w-8 h-8 rounded-full bg-[#4b6bfd] flex items-center justify-center text-white hover:bg-[#3a5aef] transition">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Toggle button */}
      <button onClick={() => setIsMinimized(!isMinimized)}
        className="relative w-14 h-14 rounded-full shadow-[0_4px_24px_rgba(90,60,200,0.5)] bg-gradient-to-br from-[#4b6bfd] to-[#2E1A6D] flex items-center justify-center hover:scale-105 transition-transform">
        <img src={LogosData.botLogo} alt="WheBot" className="w-8 h-8 rounded-full object-cover" />
        {isMinimized && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
