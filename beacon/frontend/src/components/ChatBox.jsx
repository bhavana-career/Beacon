import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Loader2, AlertCircle, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

export default function ChatBox({ reportId }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Good day. I am Beacon, your AI Business Advisor. I have analyzed your dataset. What strategic insights are you looking for today?' }
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleAsk = async () => {
    if (!question.trim() || !reportId) return;

    const userMessage = { role: 'user', content: question.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/chat', {
        report_id: reportId,
        question: userMessage.content
      });
      
      setMessages((prev) => [...prev, { role: 'assistant', content: response.data.answer }]);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during communication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  if (!reportId) return null;

  return (
    <div className="glass-card flex flex-col h-full relative overflow-hidden bg-executive-card">
      
      {/* Header */}
      <div className="flex items-center gap-4 p-5 border-b border-black/[0.04] bg-executive-card z-10 shrink-0 shadow-sm relative">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gold-metallic opacity-20"></div>
        <div className="w-10 h-10 rounded-xl bg-executive-surface border border-black/[0.06] flex items-center justify-center shadow-sm">
          <Sparkles className="w-5 h-5 text-gold-metallic" />
        </div>
        <div>
          <h2 className="text-base font-bold text-executive-text tracking-tight">Beacon AI</h2>
          <p className="text-xs font-semibold text-gold-metallic uppercase tracking-widest mt-0.5">Business Advisor</p>
        </div>
      </div>

      {/* Chat History Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scroll-smooth min-h-0 bg-executive-bg/50">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-4 max-w-[95%] w-full ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`shrink-0 w-8 h-8 flex items-center justify-center mt-1 rounded-xl shadow-sm border ${msg.role === 'user' ? 'bg-executive-text border-executive-text' : 'bg-white border-black/[0.06]'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-gold-metallic" />}
              </div>

              {/* Bubble */}
              <div className={`px-5 py-4 rounded-2xl text-sm leading-relaxed overflow-hidden break-words shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-executive-text border border-executive-text text-white rounded-tr-sm font-medium' 
                  : 'bg-white border border-black/[0.04] text-executive-text rounded-tl-sm prose max-w-none prose-p:leading-7 prose-p:mb-4 prose-headings:text-executive-text prose-headings:font-bold prose-headings:mb-3 prose-headings:mt-6 first:prose-headings:mt-0 prose-li:mb-1 prose-ul:mb-4 prose-ol:mb-4 prose-a:text-gold-metallic prose-strong:text-executive-text'
              }`}>
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <div className="overflow-x-auto w-full max-w-[100%] [&>table]:w-full">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4 max-w-[90%]"
          >
            <div className="shrink-0 w-8 h-8 rounded-xl bg-white border border-black/[0.06] shadow-sm flex items-center justify-center mt-1">
              <Sparkles className="w-4 h-4 text-gold-metallic" />
            </div>
            <div className="px-5 py-4 rounded-2xl bg-white border border-black/[0.04] shadow-sm text-executive-text rounded-tl-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold-metallic rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-gold-metallic rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-gold-metallic rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-800 mx-auto max-w-xs text-center shadow-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
            <p className="text-xs font-medium leading-relaxed">{error}</p>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-5 bg-executive-card shrink-0 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] border-t border-black/[0.04]">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Beacon a question..."
            className="w-full bg-executive-surface border border-black/[0.06] shadow-inner rounded-xl py-4 pl-5 pr-14 text-sm text-executive-text placeholder-executive-textMuted focus:outline-none focus:border-gold-metallic focus:ring-1 focus:ring-gold-metallic resize-none h-[56px] overflow-hidden leading-relaxed font-medium transition-all"
            disabled={loading}
            rows={1}
          />
          <button
            onClick={handleAsk}
            disabled={!question.trim() || loading}
            className={`absolute right-2 top-2 p-2.5 rounded-lg transition-all duration-200 ${
              question.trim() && !loading 
                ? 'bg-gold-metallic text-white hover:scale-105 shadow-sm' 
                : 'bg-white text-executive-textMuted/50 cursor-not-allowed border border-black/[0.06]'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-center font-bold text-executive-textMuted mt-3 uppercase tracking-widest opacity-60">
          Beacon may produce inaccurate information. Verify before strategic decisions.
        </p>
      </div>

    </div>
  );
}
