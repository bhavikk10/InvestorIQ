import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Building2, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatCurrency';

const KPICards = ({ projects }) => {
  const totalBudgetPlanned = projects.reduce((sum, p) => sum + p.budgetPlanned, 0);
  const totalBudgetUsed = projects.reduce((sum, p) => sum + p.budgetUsed, 0);
  const budgetUtilization = (totalBudgetUsed / totalBudgetPlanned) * 100;
  const avgROI = projects.reduce((sum, p) => sum + p.roi, 0) / projects.length;
  const activeProjects = projects.length;
  const highRiskCount = projects.filter(p => p.risk === 'High').length;
  const mediumRiskCount = projects.filter(p => p.risk === 'Medium').length;
  const overallRisk = highRiskCount > 2 ? 'High' : highRiskCount > 0 ? 'Medium' : 'Low';

  const kpis = [
    {
      label: 'Budget Utilization',
      value: `${budgetUtilization.toFixed(1)}%`,
      subtitle: `${formatCurrency(totalBudgetUsed)} / ${formatCurrency(totalBudgetPlanned)}`,
      icon: DollarSign,
      color: 'text-accent-blue',
      bgColor: 'bg-accent-blue/5',
      trend: budgetUtilization > 90 ? 'warning' : 'success',
    },
    {
      label: 'Average ROI',
      value: formatPercentage(avgROI),
      subtitle: 'Across all projects',
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/5',
      trend: 'success',
    },
    {
      label: 'Active Projects',
      value: activeProjects.toString(),
      subtitle: 'In portfolio',
      icon: Building2,
      color: 'text-accent-purple',
      bgColor: 'bg-accent-purple/5',
      trend: 'neutral',
    },
    {
      label: 'Overall Risk',
      value: overallRisk,
      subtitle: `${highRiskCount} high, ${mediumRiskCount} medium`,
      icon: AlertTriangle,
      color: overallRisk === 'High' ? 'text-danger' : 
             overallRisk === 'Medium' ? 'text-warning' : 
             'text-success',
      bgColor: overallRisk === 'High' ? 'bg-danger/5' : 
               overallRisk === 'Medium' ? 'bg-warning/5' : 
               'bg-success/5',
      trend: overallRisk === 'High' ? 'danger' : overallRisk === 'Medium' ? 'warning' : 'success',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, index) => {
        const IconComponent = kpi.icon;
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="card p-5 card-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                <IconComponent className={`w-5 h-5 ${kpi.color}`} />
              </div>
              {kpi.trend === 'success' && (
                <span className="text-success dark:text-success text-xs font-medium">+4.2% ↑</span>
              )}
              {kpi.trend === 'warning' && (
                <span className="text-warning dark:text-warning text-xs font-medium">+8.3% ↑</span>
              )}
              {kpi.trend === 'danger' && (
                <span className="text-danger dark:text-danger text-xs font-medium">-2.1% ↓</span>
              )}
            </div>
            <h3 className="kpi-value mb-1">{kpi.value}</h3>
            <p className="text-sm text-text-secondary dark:text-gray-300 font-medium mb-1">{kpi.label}</p>
            <p className="text-xs text-text-muted dark:text-gray-400">{kpi.subtitle}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default KPICards;
