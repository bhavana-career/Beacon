import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function SalesChart({ reportData }) {
  if (!reportData || !reportData.sales_by_month) return null;

  const chartData = Object.keys(reportData.sales_by_month).map(month => ({
    month,
    sales: reportData.sales_by_month[month]
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card w-full h-full p-8 flex flex-col min-h-[300px]"
    >
      <h3 className="text-xl font-bold text-executive-text mb-8 shrink-0 tracking-tight">Sales Trend</h3>
      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#000000" vertical={false} opacity={0.04} />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} fontWeight={600} tickMargin={12} />
            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} fontWeight={600} tickFormatter={(value) => `$${new Intl.NumberFormat("en-US", { notation: "compact" }).format(value)}`} />
            <Tooltip 
              cursor={{ fill: '#000000', opacity: 0.02 }} 
              contentStyle={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.06)', color: '#1C1C1C', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)', padding: '16px', fontWeight: '500' }}
              itemStyle={{ color: '#C9A227', fontWeight: '700' }}
              formatter={(value) => [`$${new Intl.NumberFormat("en-US").format(value)}`, 'Sales']}
            />
            <Bar dataKey="sales" fill="#C9A227" radius={[6, 6, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
