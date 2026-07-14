import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function ProfitChart({ reportData }) {
  if (!reportData || !reportData.profit_by_month) return null;

  const chartData = Object.keys(reportData.profit_by_month).map(month => ({
    month,
    profit: reportData.profit_by_month[month]
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card w-full h-full p-8 flex flex-col min-h-[300px]"
    >
      <h3 className="text-xl font-bold text-executive-text mb-8 shrink-0 tracking-tight">Profit Margin</h3>
      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#000000" vertical={false} opacity={0.04} />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} fontWeight={600} tickMargin={12} />
            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} fontWeight={600} tickFormatter={(value) => `$${new Intl.NumberFormat("en-US", { notation: "compact" }).format(value)}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.06)', color: '#1C1C1C', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)', padding: '16px', fontWeight: '500' }}
              itemStyle={{ color: '#C9A227', fontWeight: '700' }}
              formatter={(value) => [`$${new Intl.NumberFormat("en-US").format(value)}`, 'Profit']}
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#C9A227" 
              strokeWidth={4}
              dot={{ fill: '#FFFFFF', stroke: '#C9A227', strokeWidth: 3, r: 5 }}
              activeDot={{ r: 8, strokeWidth: 0, fill: '#D4AF37' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
