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
      transition={{ delay: 0.1 }}
      className="glass-card w-full h-full p-8 flex flex-col items-center justify-center text-center min-h-[300px]"
    >
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-executive-gold" />
        <h3 className="text-lg font-bold text-executive-text tracking-tight">Business Health</h3>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center shrink-0 mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" className="stroke-executive-border" strokeWidth="4" />
          <motion.circle 
            cx="50" cy="50" r="44" fill="none" 
            className={scoreColor} 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray={276}
            initial={{ strokeDashoffset: 276 }}
            animate={{ strokeDashoffset: 276 - (276 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-black text-executive-text tracking-tighter">
            <AnimatedNumber value={score} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
