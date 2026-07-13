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
    // EXECUTIVE LANDING PAGE
    // ----------------------------------------------------
    return (
      <div className="w-full flex flex-col items-center min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative bg-executive-bg">
        <div className="text-center w-full max-w-5xl mx-auto mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-executive-text tracking-tighter mb-8">
              BEACON
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold text-executive-text tracking-tight mb-6">
              From Spreadsheet to <span className="text-executive-gold">Strategy.</span>
            </h2>
            <p className="text-xl text-executive-textMuted mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Turn spreadsheets into executive-level business insights using AI.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => setShowDashboardEntry(true)}
              className="btn-lava flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto justify-center"
            >
              Upload Spreadsheet <ArrowRight className="w-5 h-5" />
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-12 gap-y-4 w-full max-w-7xl mx-auto mt-12 text-executive-text font-medium"
        >
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-executive-gold" /> AI Health Score</span>
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-executive-gold" /> Interactive Analytics</span>
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-executive-gold" /> Executive Insights</span>
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-executive-gold" /> AI Business Advisor</span>
        </motion.div>
      </div>
    );
  }

  if (!reportData && showDashboardEntry) {
    // ----------------------------------------------------
    // DASHBOARD ENTRY
    // ----------------------------------------------------
    return (
      <div className="w-full mx-auto min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-12 bg-executive-bg">
        <div className="w-full lg:w-1/3 flex flex-col xl:pl-8">
          <h2 className="text-xl font-bold text-executive-text mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-executive-gold" /> Recent Reports
          </h2>
          <div className="flex flex-col gap-3">
            {history.length === 0 ? (
              <p className="text-executive-textMuted bg-executive-surface p-6 rounded-xl font-medium border border-executive-border text-center">
                No past reports found.
              </p>
            ) : (
              <>
                {displayedHistory.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => loadPastReport(h.id)}
                    disabled={loadingHistoryId === h.id}
                    className="glass-card glass-card-hover p-4 flex items-center justify-between text-left group"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-executive-text truncate max-w-[200px]">{h.filename}</span>
                      <span className="text-xs text-executive-textMuted mt-1">ID: {h.id.substring(0, 8)}...</span>
                    </div>
                    {loadingHistoryId === h.id ? (
                      <Loader2 className="w-5 h-5 text-executive-text animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-executive-border group-hover:text-executive-gold transition-colors" />
                    )}
                  </button>
                ))}
                
                {history.length > 5 && (
                  <button 
                    onClick={() => setShowAllHistory(!showAllHistory)}
                    className="mt-2 text-sm font-semibold text-executive-gold hover:text-executive-goldHover transition-colors text-left"
                  >
                    {showAllHistory ? 'Show Less' : `View ${history.length - 5} More...`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col justify-center lg:pl-12 xl:pr-8">
           <UploadCard setReportId={setReportId} setReportData={setReportData} />
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
    <div className="w-full h-screen overflow-hidden p-6 lg:p-8 bg-executive-bg flex flex-col">
      
      {/* 1. BEACON Branding & Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 shrink-0"
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
            className="text-sm font-medium text-executive-gold hover:text-executive-goldHover transition-colors"
          >
            Upload New Dataset
          </button>
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        
        {/* Left Column (70%) - Narrative & Analytics */}
        <div className="w-full xl:w-[70%] flex flex-col gap-6 min-h-0 overflow-y-auto pr-2 pb-6 custom-scrollbar">
          
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
          className="w-full xl:w-[30%] h-full flex flex-col min-h-0"
        >
          <ChatBox reportId={reportId} />
        </motion.div>

      </div>
    </div>
  );
}
