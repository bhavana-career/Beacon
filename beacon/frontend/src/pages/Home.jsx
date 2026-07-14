import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Loader2, Check } from 'lucide-react';
import UploadCard from '../components/UploadCard';
import ExecutiveSummary from '../components/ExecutiveSummary';
import HealthCard from '../components/HealthCard';
import ProductGrowthList from '../components/ProductGrowthList';
import SalesChart from '../components/charts/SalesChart';
import ProfitChart from '../components/charts/ProfitChart';
import ChatBox from '../components/ChatBox';
import api from '../services/api';

export default function Home({ reportId, reportData, setReportId, setReportData }) {
  const [showDashboardEntry, setShowDashboardEntry] = useState(false);
  const [history, setHistory] = useState([]);
  const [loadingHistoryId, setLoadingHistoryId] = useState(null);
  const [showAllHistory, setShowAllHistory] = useState(false);

  useEffect(() => {
    api.get('/reports')
      .then(res => setHistory(res.data.reports.reverse()))
      .catch(err => console.error("Could not load history", err));
  }, [reportId]);

  const loadPastReport = async (id) => {
    setLoadingHistoryId(id);
    try {
      const res = await api.get(`/reports/${id}`);
      setReportId(res.data.report_id);
      setReportData(res.data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistoryId(null);
    }
  };
  
  const displayedHistory = showAllHistory ? history : history.slice(0, 5);

  if (!reportData && !showDashboardEntry) {
    // ----------------------------------------------------
    // CINEMATIC LANDING PAGE
    // ----------------------------------------------------
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-executive-bg relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-executive-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="text-center w-full max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-9xl font-black text-executive-text tracking-tighter mb-6">
              BEACON
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold text-executive-text tracking-tight mb-6">
              From Spreadsheet to <span className="text-gold-metallic">Strategy.</span>
            </h2>
            <p className="text-xl md:text-2xl text-executive-textMuted mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Turn spreadsheets into executive-level business intelligence using AI.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => setShowDashboardEntry(true)}
              className="btn-lava flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto justify-center group"
            >
              Upload Spreadsheet <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setShowDashboardEntry(true)}
              className="btn-secondary flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto justify-center"
            >
              Try Demo Dataset
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-12 w-full flex flex-wrap justify-center gap-x-12 gap-y-4 max-w-7xl mx-auto text-executive-textMuted font-medium text-sm md:text-base"
        >
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-executive-gold" /> AI Health Score</span>
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-executive-gold" /> Executive Insights</span>
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-executive-gold" /> Interactive Analytics</span>
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-executive-gold" /> AI Business Advisor</span>
        </motion.div>
      </div>
    );
  }

  if (!reportData && showDashboardEntry) {
    // ----------------------------------------------------
    // UPLOAD / ONBOARDING ENTRY
    // ----------------------------------------------------
    return (
      <div className="w-full h-screen px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-12 bg-executive-bg relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-executive-gold/5 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          
          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-executive-text tracking-tight mb-6">
                Connect your business data to Beacon AI.
              </h1>
              <p className="text-lg text-executive-textMuted mb-12">
                Securely upload your spreadsheets and instantly receive an executive dashboard, health score, and actionable insights.
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-executive-gold/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-executive-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-executive-text text-lg">Instant Analysis</h3>
                    <p className="text-executive-textMuted">Complex calculations performed in seconds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-executive-gold/10 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-executive-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-executive-text text-lg">Bank-Grade Security</h3>
                    <p className="text-executive-textMuted">Your data is processed ephemerally and never stored.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <UploadCard setReportId={setReportId} setReportData={setReportData} />
            
            {history.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
                <p className="text-sm font-semibold text-executive-textMuted uppercase tracking-wider mb-4">Recent Reports</p>
                <div className="flex flex-wrap gap-3">
                  {displayedHistory.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => loadPastReport(h.id)}
                      disabled={loadingHistoryId === h.id}
                      className="px-4 py-2 rounded-full border border-executive-border bg-white text-sm font-medium text-executive-text hover:border-executive-gold transition-colors flex items-center gap-2"
                    >
                      {loadingHistoryId === h.id ? <Loader2 className="w-4 h-4 animate-spin text-executive-gold" /> : <Clock className="w-4 h-4 text-executive-textMuted" />}
                      <span className="truncate max-w-[150px]">{h.filename}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // DASHBOARD LAYOUT (POST-UPLOAD)
  // ----------------------------------------------------
  
  const currentIndex = history.findIndex(h => h.id === reportId);
  const hasNext = currentIndex > 0; // newer report exists
  const hasPrev = currentIndex !== -1 && currentIndex < history.length - 1; // older report exists

  const goNext = () => { if (hasNext) loadPastReport(history[currentIndex - 1].id); };
  const goPrev = () => { if (hasPrev) loadPastReport(history[currentIndex + 1].id); };

  return (
    <div className="w-full h-screen overflow-hidden px-6 lg:px-10 py-6 bg-executive-bg flex flex-col relative">
      
      {/* 1. BEACON Branding & Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 shrink-0 w-full"
      >
        <h1 className="text-2xl font-black text-executive-text tracking-tighter">BEACON</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4">
            <button 
              onClick={goPrev}
              disabled={!hasPrev || loadingHistoryId !== null}
              className={`p-1.5 rounded-md border transition-colors ${hasPrev ? 'border-executive-border text-executive-text hover:bg-executive-surface hover:border-executive-gold' : 'border-transparent text-executive-textMuted/40 cursor-not-allowed'}`}
              title="Previous Report"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={goNext}
              disabled={!hasNext || loadingHistoryId !== null}
              className={`p-1.5 rounded-md border transition-colors ${hasNext ? 'border-executive-border text-executive-text hover:bg-executive-surface hover:border-executive-gold' : 'border-transparent text-executive-textMuted/40 cursor-not-allowed'}`}
              title="Next Report"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          
          <button 
            onClick={() => { setReportData(null); setReportId(null); setShowDashboardEntry(true); }}
            className="text-sm font-semibold text-gold-metallic hover:opacity-80 transition-opacity"
          >
            Upload New Dataset
          </button>
        </div>
      </motion.div>

      {/* Main Dashboard - Uses full width, scrolls internally */}
      <div className="flex flex-col xl:flex-row gap-6 flex-1 w-full min-h-0 overflow-hidden">
        
        {/* Left Column (70%) - Narrative & Analytics */}
        <div className="w-full xl:w-[70%] flex flex-col gap-6 overflow-y-auto pr-2 pb-6 custom-scrollbar">
          
          {/* 2. Executive Summary */}
          <div className="shrink-0">
            <ExecutiveSummary reportData={reportData} />
          </div>
          
          {/* 3. Health Score & 4. Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
            <div className="lg:col-span-1">
              <HealthCard reportData={reportData} />
            </div>
            <div className="lg:col-span-2">
              <SalesChart reportData={reportData} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shrink-0">
            <ProductGrowthList reportData={reportData} />
            <ProfitChart reportData={reportData} />
          </div>

        </div>

        {/* Right Column (30%) - 5. AI Assistant */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full xl:w-[30%] flex flex-col h-full overflow-hidden"
        >
          <ChatBox reportId={reportId} />
        </motion.div>

      </div>
    </div>
  );
}
