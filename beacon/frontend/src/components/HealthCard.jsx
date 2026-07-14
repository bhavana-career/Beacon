import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function AnimatedNumber({ value, formatter = (v) => Math.round(v) }) {
  const [displayValue, setDisplayValue] = useState(value);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => formatter(latest));

  useEffect(() => {
    if (typeof value !== 'number') return;
    const controls = animate(motionValue, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [value, motionValue]);

  useEffect(() => {
    return rounded.onChange((v) => setDisplayValue(v));
  }, [rounded]);

  return <>{typeof value === 'number' ? displayValue : value}</>;
}

export default function HealthCard({ reportData }) {
  if (!reportData) return null;

  const { health_score: score } = reportData;

  const scoreColor = score >= 80 ? 'stroke-green-600' : score >= 50 ? 'stroke-executive-gold' : 'stroke-red-600';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
      className="glass-card w-full h-full p-8 flex flex-col items-center justify-center text-center min-h-[300px] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-metallic opacity-[0.02] rounded-bl-full pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-8">
        <Activity className="w-5 h-5 text-gold-metallic" />
        <h3 className="text-xl font-bold text-executive-text tracking-tight">Business Health</h3>
      </div>

      <div className="relative w-56 h-56 flex items-center justify-center shrink-0 mb-4">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-md" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A227" />
              <stop offset="50%" stopColor="#F6E27A" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill="none" className="stroke-black/[0.04]" strokeWidth="6" />
          <motion.circle 
            cx="50" cy="50" r="44" fill="none" 
            stroke={score >= 80 ? 'url(#greenGradient)' : score >= 50 ? 'url(#goldGradient)' : 'url(#redGradient)'}
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray={276}
            initial={{ strokeDashoffset: 276 }}
            animate={{ strokeDashoffset: 276 - (276 * score) / 100 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-7xl font-black tracking-tighter text-executive-text">
            <AnimatedNumber value={score} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
