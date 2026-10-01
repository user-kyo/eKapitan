import React, { useState, useRef, useEffect } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Info, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  source?: 'gemini-ai' | 'knowledge-base';
}

export const AICitizenAssistant: React.FC = () => {
  const { setActiveTab, largeTextMode } = useBarangay();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Mabuhay! Ako si **Ka-Barangay AI**, ang inyong digital citizen information assistant sa Barangay 4A, San Pablo City.\n\nAno po ang maaari kong maitulong tungkol sa mga dokumento (Clearance, Residency, Indigency), requirements, bayarin, o schedule ng barangay hall?",
      time: 'Just now',
      source: 'knowledge-base'
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'What do I need for a barangay clearance?',
    'How can I request a certificate of residency?',
    'Is the certificate of indigency free?',
    'How do I report a noise complaint or incident?',
    'What are the barangay office hours and hotlines?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          chatHistory: messages.map(m => ({ role: m.sender, content: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('API failed');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn('Network call error in AI Assistant, utilizing internal knowledge base fallback');
      // Graceful fallback
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: "📄 **Gabay sa Serbisyo ng Barangay 4A:**\n\n• **Barangay Clearance:** ₱50.00 (Libre para sa First-Time Jobseekers RA 11261). Dalhin ang Cedula at Valid ID.\n• **Certificate of Residency:** ₱30.00. Dalhin ang billing o patunay ng tirahan sa barangay.\n• **Certificate of Indigency:** 100% LIBRE (₱0.00). Para sa medical/financial aid sa DSWD o Malasakit.\n• **Opisina:** Lunes hanggang Biyernes, 8:00 AM - 5:00 PM. Hotline: (02) 8642-1111.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'knowledge-base'
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 sm:space-y-8 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Header Banner with Civic AI Disclaimer */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-700/20 shrink-0">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-slate-900 font-heading tracking-tight">Ka-Barangay AI Citizen Guide</h2>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                Official
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Friendly civic assistant for Barangay 4A services, requirements, and office schedules.
            </p>
          </div>
        </div>

        {/* Informational Authority Disclaimer */}
        <div className="bg-amber-50 text-amber-900 text-xs p-3.5 rounded-xl border border-amber-200 flex items-start gap-2.5 max-w-sm relative z-10 shadow-sm">
          <Info className="w-5 h-5 text-amber-700 shrink-0" />
          <span className="leading-relaxed">
            <strong>Informational Only:</strong> Does not issue official clearances, legal rulings, or formal decisions.
          </span>
        </div>
      </div>

      {/* Main Conversational Container */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm flex flex-col h-[600px] sm:h-[650px] overflow-hidden relative">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                    isUser ? 'bg-slate-800 text-white' : 'bg-emerald-600 text-white shadow-md'
                  }`}
                >
                  {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-amber-300" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[75%] space-y-1.5`}>
                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-sm sm:text-base leading-relaxed whitespace-pre-line shadow-sm ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-tr-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className={`flex items-center gap-2 px-1 text-[10px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.time}</span>
                    {!isUser && msg.source && (
                      <span className="text-emerald-700 font-medium">
                        • {msg.source === 'gemini-ai' ? 'Powered by Gemini AI' : 'Verified Barangay Knowledge'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-300 animate-spin" />
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Ka-Barangay AI is checking barangay service records...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="px-4 sm:px-6 py-3 bg-white border-t border-slate-100 flex items-center gap-3 overflow-x-auto scrollbar-none shadow-sm z-10 relative">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs sm:text-sm bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 border border-slate-200 hover:border-emerald-300 cursor-pointer shadow-sm hover:shadow-md"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-6 bg-white border-t border-slate-200 z-10 relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask a question in English, Tagalog, or Taglish (e.g., Magkano ang barangay clearance?)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base focus:bg-white focus:outline-emerald-600 focus:ring-4 focus:ring-emerald-500/10 transition-all disabled:opacity-50 shadow-inner"
              id="ai-assistant-input"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3.5 sm:px-6 sm:py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg disabled:shadow-none cursor-pointer flex items-center gap-2 shrink-0"
              id="ai-assistant-send-btn"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send Query</span>
            </button>
          </form>
        </div>
      </div>

      {/* Direct Shortcuts to Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <button
          onClick={() => setActiveTab('request_wizard')}
          className="p-4 sm:p-5 bg-white hover:bg-emerald-50 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 text-left flex items-center gap-4 cursor-pointer shadow-sm hover:shadow-md group"
        >
          <div className="p-2.5 bg-emerald-100/50 group-hover:bg-emerald-200/50 rounded-xl transition-colors">
            <FileText className="w-6 h-6 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">Ready to Apply?</p>
            <p className="text-xs text-slate-500 mt-0.5">Open Document Request Wizard</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('complaints')}
          className="p-4 sm:p-5 bg-white hover:bg-amber-50 rounded-2xl border border-slate-200 hover:border-amber-300 transition-all duration-300 text-left flex items-center gap-4 cursor-pointer shadow-sm hover:shadow-md group"
        >
          <div className="p-2.5 bg-amber-100/50 group-hover:bg-amber-200/50 rounded-xl transition-colors">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">Report an Incident</p>
            <p className="text-xs text-slate-500 mt-0.5">File community blotter or concern</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className="p-4 sm:p-5 bg-white hover:bg-purple-50 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all duration-300 text-left flex items-center gap-4 cursor-pointer shadow-sm hover:shadow-md group"
        >
          <div className="p-2.5 bg-purple-100/50 group-hover:bg-purple-200/50 rounded-xl transition-colors">
            <Clock className="w-6 h-6 text-purple-600 shrink-0 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 group-hover:text-purple-800 transition-colors">Book Counter Visit</p>
            <p className="text-xs text-slate-500 mt-0.5">Reserve appointment schedule</p>
          </div>
        </button>
      </div>
    </div>
  );
};
