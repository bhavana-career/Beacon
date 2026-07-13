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
      transition={{ duration: 0.5 }}
      className="glass-card w-full p-6 lg:p-8 flex flex-col gap-6"
    >
      <div className="flex items-center justify-between border-b border-executive-border pb-4">
        <h2 className="text-xl font-bold text-executive-text tracking-tight flex items-center gap-2">
          <Target className="w-5 h-5 text-executive-gold" />
          Executive Briefing
        </h2>
        <span className="text-sm font-semibold px-3 py-1 bg-executive-surface rounded-full text-executive-text border border-executive-border">
          Status: {status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Sales Growth */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-executive-textMuted uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-executive-gold" /> Sales Growth
          </span>
          <span className={`text-2xl font-bold ${isPositiveGrowth ? 'text-green-700' : 'text-red-700'}`}>
            {salesGrowth}
          </span>
          <span className="text-xs text-executive-textMuted mt-1">vs. Period Start</span>
        </div>

        {/* Best Product */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-executive-textMuted uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-executive-gold" /> Top Performer
          </span>
          <span className="text-lg font-semibold text-executive-text truncate">
            {best_product || 'N/A'}
          </span>
          <span className="text-xs text-executive-textMuted mt-1">Highest Revenue Driver</span>
        </div>

        {/* Biggest Risk */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-executive-textMuted uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Key Risk Factor
          </span>
          <span className="text-sm font-medium text-executive-text leading-tight">
            {biggestRisk}
          </span>
        </div>

        {/* AI Recommendation */}
        <div className="flex flex-col bg-executive-surface/50 p-4 rounded-xl border border-executive-border/50">
          <span className="text-xs font-semibold text-executive-textMuted uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-executive-gold" /> Priority Action
          </span>
          <span className="text-sm font-medium text-executive-text leading-tight line-clamp-3">
            {recommendation}
          </span>
        </div>

      </div>
    </motion.div>
  );
}
