import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';

const InsightsPanel = ({ insights, onGenerateReport }) => {
  const getInsightColor = (type) => {
    if (type === 'positive') return 'border-success/30 bg-success/5';
    if (type === 'warning') return 'border-warning/30 bg-warning/5';
    return 'border-danger/30 bg-danger/5';
  };

  const getIconColor = (type) => {
    if (type === 'positive') return 'text-success';
    if (type === 'warning') return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="h-full flex flex-col card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent-blue dark:text-gradient-start" />
        <h2 className="section-title dark:text-text-primary mb-0">AI Insights</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 custom-scrollbar">
        <AnimatePresence>
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className={`p-3 rounded-lg border ${getInsightColor(insight.type)} hover:shadow-sm transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start gap-2">
                <span className={`text-lg ${getIconColor(insight.type)}`}>
                  {insight.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-text-primary dark:text-text-primary mb-1">{insight.title}</h4>
                  <p className="text-xs text-text-secondary dark:text-gray-300 mb-1.5 leading-relaxed">{insight.description}</p>
                  <span className="text-xs text-text-muted dark:text-gray-400">Generated {insight.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onGenerateReport}
        className="accent-button w-full flex items-center justify-center gap-2"
      >
        <FileText className="w-4 h-4" />
        <span>Generate Investor Report</span>
      </motion.button>
    </div>
  );
};

export default InsightsPanel;
