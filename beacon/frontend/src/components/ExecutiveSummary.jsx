import { motion } from 'framer-motion';
import { Target, AlertTriangle, TrendingUp, Award, Sparkles } from 'lucide-react';

export default function ExecutiveSummary({ reportData }) {
  if (!reportData) return null;

  const { status, best_product, worst_product, insights, sales_by_month } = reportData;

  // Calculate a basic sales growth metric (last month vs first month)
  const months = Object.keys(sales_by_month || {});
  let salesGrowth = 'N/A';
  let isPositiveGrowth = true;
  if (months.length >= 2) {
    const firstMonthSales = sales_by_month[months[0]];
    const lastMonthSales = sales_by_month[months[months.length - 1]];
    if (firstMonthSales > 0) {
      const growth = ((lastMonthSales - firstMonthSales) / firstMonthSales) * 100;
      isPositiveGrowth = growth >= 0;
      salesGrowth = `${isPositiveGrowth ? '+' : ''}${Math.round(growth)}%`;
    }
  }

  // Derive "Biggest Risk"
  const biggestRisk = worst_product ? `${worst_product} underperformance` : 'No immediate critical risks identified.';
  const recommendation = insights && insights.length > 0 ? insights[0] : 'Monitor current trends and maintain operational efficiency.';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-card w-full p-8 lg:p-10 flex flex-col gap-8 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/[0.04] pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-black text-executive-text tracking-tight flex items-center gap-3">
            <Target className="w-8 h-8 text-gold-metallic" />
            Executive Briefing
          </h2>
          <p className="text-executive-textMuted mt-1 font-medium">Strategic overview of your current business dataset.</p>
        </div>
        <span className="text-sm font-bold px-4 py-2 bg-executive-surface rounded-full text-executive-text border border-black/[0.06] shadow-sm flex items-center gap-2 w-max">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Status: {status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Sales Growth */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-executive-textMuted uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gold-metallic" /> Sales Growth
          </span>
          <span className={`text-4xl font-black tracking-tighter ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
            {salesGrowth}
          </span>
          <span className="text-sm font-medium text-executive-textMuted">vs. Period Start</span>
        </div>

        {/* Best Product */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-executive-textMuted uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-gold-metallic" /> Top Performer
          </span>
          <span className="text-2xl font-bold text-executive-text truncate mt-1">
            {best_product || 'N/A'}
          </span>
          <span className="text-sm font-medium text-executive-textMuted">Highest Revenue Driver</span>
        </div>

        {/* Biggest Risk */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-executive-textMuted uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" /> Key Risk Factor
          </span>
          <span className="text-lg font-semibold text-executive-text leading-tight mt-1">
            {biggestRisk}
          </span>
        </div>

      </div>

      {/* AI Recommendation Centerpiece */}
      <div className="mt-4 flex flex-col bg-gradient-to-br from-executive-surface to-white p-6 rounded-2xl border border-gold-metallic shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-metallic opacity-[0.03] rounded-bl-full pointer-events-none"></div>
        <span className="text-sm font-bold text-gold-metallic uppercase tracking-widest mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Priority Strategic Action
        </span>
        <span className="text-lg font-medium text-executive-text leading-relaxed">
          {recommendation}
        </span>
      </div>

    </motion.div>
  );
}
