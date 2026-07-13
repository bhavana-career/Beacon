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
      className="glass-card w-full h-full p-6 lg:p-8 flex flex-col min-h-[300px]"
    >
      <h3 className="text-lg font-semibold text-executive-text mb-6 shrink-0 tracking-tight">Profit Margin</h3>
      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} opacity={0.6} />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} fontWeight={500} />
            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} fontWeight={500} tickFormatter={(value) => `$${new Intl.NumberFormat("en-US").format(value)}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', color: '#1C1C1C', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '12px' }}
              itemStyle={{ color: '#D4AF37', fontWeight: '600' }}
              formatter={(value) => [`$${new Intl.NumberFormat("en-US").format(value)}`, 'Profit']}
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#D4AF37" 
              strokeWidth={3}
              dot={{ fill: '#FFFFFF', stroke: '#D4AF37', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#c19f32' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
