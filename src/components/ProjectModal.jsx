import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatCurrency';

const ProjectModal = ({ project, isOpen, onClose, onGenerateReport }) => {
  if (!project) return null;

  const budgetVariance = ((project.budgetUsed - project.budgetPlanned) / project.budgetPlanned) * 100;
  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-success border-success bg-success/5';
    if (risk === 'Medium') return 'text-warning border-warning bg-warning/5';
    return 'text-danger border-danger bg-danger/5';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl p-6 custom-scrollbar">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary mb-1">{project.name}</h2>
                  <p className="text-text-secondary dark:text-gray-300 text-sm">Investor: {project.investor}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-text-muted dark:text-gray-400 hover:text-text-primary dark:hover:text-text-primary transition-colors p-1 hover:bg-gray-100 dark:hover:bg-white/[0.06] rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="card p-4 bg-gray-50 dark:bg-white/[0.04]">
                  <p className="text-xs text-text-secondary dark:text-gray-300 font-medium mb-2 uppercase tracking-wide">Budget Variance</p>
                  <p className={`text-xl font-bold ${budgetVariance > 0 ? 'text-danger' : 'text-success'}`}>
                    {budgetVariance > 0 ? '+' : ''}{budgetVariance.toFixed(2)}%
                  </p>
                  <p className="text-xs text-text-muted dark:text-gray-400 mt-1">
                    {formatCurrency(project.budgetUsed)} / {formatCurrency(project.budgetPlanned)}
                  </p>
                </div>

                <div className="card p-4 bg-gray-50 dark:bg-white/[0.04]">
                  <p className="text-xs text-text-secondary font-medium mb-2 uppercase tracking-wide">ROI</p>
                  <p className="text-xl font-bold text-success">{formatPercentage(project.roi)}</p>
                  <p className="text-xs text-text-muted dark:text-gray-400 mt-1">Expected return on investment</p>
                </div>

                <div className="card p-4 bg-gray-50 dark:bg-white/[0.04]">
                  <p className="text-xs text-text-secondary font-medium mb-2 uppercase tracking-wide">Timeline Status</p>
                  <p className={`text-xl font-bold ${
                    project.status === 'On Track' ? 'text-success' :
                    project.status === 'Delayed' ? 'text-warning' : 'text-danger'
                  }`}>
                    {project.status}
                  </p>
                  <p className="text-xs text-text-muted dark:text-gray-400 mt-1">{project.timelineMonths} months duration</p>
                </div>

                <div className="card p-4 bg-gray-50 dark:bg-white/[0.04]">
                  <p className="text-xs text-text-secondary font-medium mb-2 uppercase tracking-wide">Risk Level</p>
                  <p className={`text-lg font-bold px-3 py-1 rounded border inline-block ${getRiskColor(project.risk)}`}>
                    {project.risk}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-text-secondary dark:text-gray-300 font-medium">Progress</p>
                  <p className="text-sm font-semibold text-text-primary dark:text-text-primary">{project.progress}%</p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-white/[0.06] rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-accent-blue dark:bg-gradient-accent"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    onGenerateReport(project);
                    onClose();
                  }}
                  className="accent-button flex-1 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Investor Report</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-200 dark:border-white/[0.12] text-text-primary dark:text-text-primary font-medium rounded-md hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
