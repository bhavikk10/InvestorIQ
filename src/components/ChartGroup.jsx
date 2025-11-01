import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';

const ChartGroup = ({ projects, selectedProject }) => {
  const chartData = useMemo(() => {
    return projects.map(p => ({
      name: p.name.length > 12 ? p.name.substring(0, 12) + '...' : p.name,
      fullName: p.name,
      planned: p.budgetPlanned / 1000000,
      actual: p.budgetUsed / 1000000,
      roi: (p.roi * 100).toFixed(1),
    }));
  }, [projects]);

  const riskData = useMemo(() => {
    const riskCounts = projects.reduce((acc, p) => {
      acc[p.risk] = (acc[p.risk] || 0) + 1;
      return acc;
    }, {});
    
    return [
      { name: 'Low', value: riskCounts.Low || 0, color: '#10B981' },
      { name: 'Medium', value: riskCounts.Medium || 0, color: '#F59E0B' },
      { name: 'High', value: riskCounts.High || 0, color: '#EF4444' },
    ];
  }, [projects]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="card p-3 shadow-lg border border-gray-200">
          <p className="text-text-primary font-semibold mb-2 text-sm">
            {payload[0].payload.fullName || payload[0].name}
          </p>
            {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: {entry.name === 'ROI' ? `${entry.value}%` : `$${entry.value}M`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="card p-5"
      >
        <h3 className="section-title">Budget vs Actual Spend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-white/[0.08]" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280" 
              fontSize={12} 
              tick={{ fill: '#6B7280' }}
              className="dark:stroke-gray-400"
            />
            <YAxis 
              stroke="#6B7280" 
              fontSize={12}
              tick={{ fill: '#6B7280' }}
              className="dark:stroke-gray-400"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#111827' }}
              iconType="line"
              className="dark:text-gray-300"
            />
            <Line
              type="monotone"
              dataKey="planned"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Planned Budget (M)"
              dot={{ fill: '#3B82F6', r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#10B981"
              strokeWidth={2}
              name="Actual Spend (M)"
              dot={{ fill: '#10B981', r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="card p-5"
      >
        <h3 className="section-title">ROI Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-white/[0.08]" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280" 
              fontSize={12}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              stroke="#6B7280" 
              fontSize={12}
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#111827' }} className="dark:text-gray-300" />
            <Bar dataKey="roi" name="ROI (%)" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => {
                const roiValue = parseFloat(entry.roi);
                const color = roiValue > 20 ? '#10B981' : roiValue > 15 ? '#F59E0B' : '#EF4444';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="card p-5 col-span-2"
      >
        <h3 className="section-title">Project Distribution by Risk Level</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={riskData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              stroke="#FFFFFF"
              strokeWidth={2}
            >
              {riskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                color: '#111827'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ChartGroup;
