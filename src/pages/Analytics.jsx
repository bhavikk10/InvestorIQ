import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatCurrency, formatPercentage } from '../utils/formatCurrency';
import projectsData from '../data/projects.json';

const Analytics = () => {
  const projects = projectsData;

  const monthlyData = useMemo(() => {
    return [
      { month: 'Jan', revenue: 45, expenses: 38, profit: 7 },
      { month: 'Feb', revenue: 52, expenses: 42, profit: 10 },
      { month: 'Mar', revenue: 48, expenses: 40, profit: 8 },
      { month: 'Apr', revenue: 61, expenses: 48, profit: 13 },
      { month: 'May', revenue: 55, expenses: 45, profit: 10 },
      { month: 'Jun', revenue: 67, expenses: 52, profit: 15 },
    ];
  }, []);

  const projectPerformance = useMemo(() => {
    return projects.map(p => ({
      name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
      fullName: p.name,
      roi: (p.roi * 100).toFixed(1),
      budget: p.budgetPlanned / 1000000,
    }));
  }, [projects]);

  const trendMetrics = [
    {
      label: 'Total Revenue',
      value: formatCurrency(projects.reduce((sum, p) => sum + p.budgetPlanned, 0)),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-success',
    },
    {
      label: 'Average ROI',
      value: formatPercentage(projects.reduce((sum, p) => sum + p.roi, 0) / projects.length),
      change: '+3.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-success',
    },
    {
      label: 'Active Projects',
      value: projects.length.toString(),
      change: '+2',
      trend: 'up',
      icon: BarChart3,
      color: 'text-accent-blue',
    },
    {
      label: 'Risk Projects',
      value: projects.filter(p => p.risk === 'High').length.toString(),
      change: '-1',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-danger',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-light dark:bg-transparent">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary mb-1">Analytics</h1>
          <p className="text-text-secondary dark:text-gray-300 text-sm">Comprehensive financial and performance analytics</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {trendMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-5 card-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    metric.color === 'text-success' ? 'bg-success/5' :
                    metric.color === 'text-danger' ? 'bg-danger/5' :
                    metric.color === 'text-accent-blue' ? 'bg-accent-blue/5' : 'bg-warning/5'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary dark:text-white dark:[text-shadow:0_0_8px_rgba(255,255,255,0.2)] mb-1">{metric.value}</h3>
                <p className="text-sm text-text-secondary dark:text-gray-300 font-medium">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="section-title">Revenue vs Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tick={{ fill: '#6B7280' }} />
                <YAxis stroke="#6B7280" fontSize={12} tick={{ fill: '#6B7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    color: '#111827'
                  }}
                />
                <Legend wrapperStyle={{ color: '#111827' }} />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Revenue (M)" />
                <Area type="monotone" dataKey="expenses" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Expenses (M)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="section-title">Profit Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tick={{ fill: '#6B7280' }} />
                <YAxis stroke="#6B7280" fontSize={12} tick={{ fill: '#6B7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    color: '#111827'
                  }}
                />
                <Legend wrapperStyle={{ color: '#111827' }} />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} name="Profit (M)" dot={{ fill: '#10B981', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-6"
        >
          <h3 className="section-title">Project ROI Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectPerformance} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tick={{ fill: '#6B7280' }} />
              <YAxis stroke="#6B7280" fontSize={12} tick={{ fill: '#6B7280' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  color: '#111827'
                }}
              />
              <Legend wrapperStyle={{ color: '#111827' }} />
              <Bar dataKey="roi" name="ROI (%)" radius={[6, 6, 0, 0]}>
                {projectPerformance.map((entry, index) => {
                  const roiValue = parseFloat(entry.roi);
                  const color = roiValue > 20 ? '#10B981' : roiValue > 15 ? '#F59E0B' : '#EF4444';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;

