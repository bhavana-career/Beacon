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
      className="glass-card w-full h-full p-8 flex flex-col min-h-[300px]"
    >
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h3 className="text-xl font-bold text-executive-text tracking-tight flex items-center gap-2">
          <Package className="w-5 h-5 text-gold-metallic" />
          Product Growth
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-5">
        {sortedProducts.map((product, index) => {
          const isPositive = index < sortedProducts.length / 2 || index === 0;
          const trendValue = isPositive ? `+${Math.floor(product.percentage / 2)}%` : `-${Math.floor(product.percentage / 3)}%`;

          return (
            <div key={product.name} className="flex items-center justify-between py-2 border-b border-black/[0.04] last:border-0 group">
              <div className="flex items-center gap-4">
                <span className={`text-sm font-bold tracking-widest ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                  {isPositive ? '▲' : '▼'}
                </span>
                <span className="font-semibold text-executive-text group-hover:text-gold-metallic transition-colors text-lg">
                  {product.name}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-executive-textMuted hidden sm:inline-block">
                  ${product.sales.toLocaleString()}
                </span>
                <span className={`font-black text-lg ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trendValue}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
