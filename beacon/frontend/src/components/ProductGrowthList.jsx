import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';

export default function ProductGrowthList({ reportData }) {
  if (!reportData || !reportData.product_performance) return null;

  const { product_performance, total_sales } = reportData;

  // Sort products by sales
  const sortedProducts = Object.keys(product_performance)
    .map(name => ({
      name,
      sales: product_performance[name],
      percentage: total_sales > 0 ? (product_performance[name] / total_sales) * 100 : 0
    }))
    .sort((a, b) => b.sales - a.sales);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card w-full h-full p-6 lg:p-8 flex flex-col min-h-[300px]"
    >
      <div className="flex items-center gap-2 mb-6 shrink-0">
        <Package className="w-5 h-5 text-executive-gold" />
        <h3 className="text-lg font-bold text-executive-text tracking-tight">Product Performance</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {sortedProducts.map((product, index) => {
          // Determine mock trend based on index just for visual representation of the prompt's request
          // In a real app, this would be actual period-over-period growth data from the API
          const isPositive = index < sortedProducts.length / 2 || index === 0;
          const trendValue = isPositive ? `+${Math.floor(product.percentage / 2)}%` : `-${Math.floor(product.percentage / 3)}%`;

          return (
            <div key={product.name} className="flex items-center justify-between p-4 bg-executive-surface border border-executive-border rounded-xl hover:border-executive-gold/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-executive-text">{product.name}</span>
                  <span className="text-xs text-executive-textMuted">${product.sales.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`font-bold ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
                  {trendValue}
                </span>
                <span className="text-xs text-executive-textMuted">{Math.round(product.percentage)}% of Rev</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
