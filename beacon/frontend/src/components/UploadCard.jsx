import { useState } from 'react';
import { UploadCloud, File, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

export default function UploadCard({ setReportId, setReportData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
      setSuccess(false);
    }
  };

  const processingSteps = [
    "Uploading Spreadsheet...",
    "Reading Business Data...",
    "Analyzing Performance...",
    "Calculating Health Score...",
    "Building Executive Dashboard...",
    "Consulting Beacon AI..."
  ];
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setSuccess(false);
    setCurrentStepIndex(0);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Start the mock processing sequence
      const stepInterval = setInterval(() => {
        setCurrentStepIndex((prev) => (prev < processingSteps.length - 1 ? prev + 1 : prev));
      }, 700);

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Ensure we go through enough of the sequence to look good (minimum 4.2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 4500));
      clearInterval(stepInterval);
      
      setSuccess(true);
      
      // Small pause on the success checkmark before navigating
      setTimeout(() => {
        setReportId(response.data.report_id);
        setReportData(response.data.analysis);
      }, 800);
      
    } catch (err) {
      setError(err.response?.data?.detail || "We couldn't process this file. Please ensure it is a valid CSV or Excel format and try again.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card w-full max-w-2xl p-8 relative overflow-hidden bg-executive-card"
    >
      <h2 className="text-xl font-semibold text-executive-text mb-6 relative z-10 text-center tracking-tight">Upload Dataset</h2>
      
      <div 
        className={`relative z-10 border border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all duration-300 ${isHovered ? 'border-executive-gold bg-executive-gold/5' : 'border-executive-border bg-executive-surface'} ${selectedFile ? 'border-executive-gold/40' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div 
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-executive-text"
            >
              <CheckCircle2 className="w-16 h-16 mb-4 text-green-600" />
              <p className="font-semibold text-lg">Analysis Complete</p>
            </motion.div>
          ) : (
            <motion.div 
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center w-full"
            >
              <motion.div animate={{ y: isHovered ? -4 : 0 }} transition={{ duration: 0.2 }}>
                <UploadCloud className={`w-14 h-14 mb-4 transition-colors ${isHovered ? 'text-executive-gold' : 'text-executive-border'}`} />
              </motion.div>
              
              <p className="text-executive-text mb-2 font-semibold text-lg">Drop your spreadsheet here</p>
              <p className="text-sm text-executive-textMuted mb-8 font-medium">.csv, .xlsx, or .xls files supported</p>
              
              <label className="btn-secondary cursor-pointer inline-flex items-center gap-2 group">
                <File className="w-4 h-4 text-executive-textMuted group-hover:text-executive-gold transition-colors" />
                <span>Browse Files</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={handleFileChange}
                />
              </label>
              
              {selectedFile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-3 text-sm text-executive-text bg-white border border-executive-border px-4 py-3 rounded-lg w-full max-w-md justify-center shadow-sm"
                >
                  <File className="w-4 h-4 text-executive-gold" />
                  <span className="truncate font-medium">{selectedFile.name}</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-800 relative z-10"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!success && (
        <div className="mt-8 flex justify-center relative z-10">
          <button 
            onClick={handleUpload} 
            disabled={!selectedFile || loading}
            className={`btn-lava w-full max-w-md h-14 flex items-center justify-center gap-3 text-lg font-semibold ${(!selectedFile || loading) ? 'opacity-70 cursor-not-allowed hover:-translate-y-0 hover:shadow-none' : ''}`}
          >
            {loading ? (
              <motion.div 
                key={processingSteps[currentStepIndex]}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                {processingSteps[currentStepIndex]}
              </motion.div>
            ) : (
              'Upload and Analyze'
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
}
