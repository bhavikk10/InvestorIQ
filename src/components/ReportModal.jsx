import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Loader2 } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatCurrency';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ReportModal = ({ project, isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      const timer = setTimeout(() => setIsGenerating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!project) return null;

  const budgetVariance = ((project.budgetUsed - project.budgetPlanned) / project.budgetPlanned) * 100;
  const chartData = [
    { name: 'Q1', planned: project.budgetPlanned / 4000000, actual: project.budgetUsed / 4000000 },
    { name: 'Q2', planned: project.budgetPlanned / 4000000, actual: project.budgetUsed / 4000000 },
    { name: 'Q3', planned: project.budgetPlanned / 4000000, actual: project.budgetUsed / 4000000 },
    { name: 'Q4', planned: project.budgetPlanned / 4000000, actual: project.budgetUsed / 4000000 },
  ].map(q => ({
    ...q,
    planned: q.planned / 100,
    actual: q.actual / 100,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {isGenerating ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="card p-12 text-center shadow-xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 mx-auto mb-4"
                >
                  <Loader2 className="w-12 h-12 text-accent-blue" />
                </motion.div>
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary mb-2">Generating Report...</h3>
                <p className="text-text-secondary dark:text-gray-300 text-sm">Please wait while we compile your investor report</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
            >
              <div className="card max-w-4xl w-full my-8 shadow-2xl p-0 custom-scrollbar">
                <div className="bg-accent-blue/5 dark:bg-gradient-accent/20 border-b border-gray-200 dark:border-white/[0.12] p-6 text-center">
                  <h1 className="text-2xl font-bold text-text-primary dark:text-gradient mb-1">InvestorIQ</h1>
                  <p className="text-text-secondary dark:text-gray-300 text-sm">Investor Report</p>
                  <div className="mt-4">
                    <h2 className="text-xl font-bold text-text-primary dark:text-text-primary">{project.name}</h2>
                    <p className="text-text-secondary dark:text-gray-300 text-sm mt-1">{project.investor}</p>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary mb-4 border-b border-gray-200 dark:border-white/[0.12] pb-2">Executive Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="card p-4 bg-gray-50 dark:bg-white/[0.04]">
                        <p className="text-xs text-text-secondary dark:text-gray-300 font-medium mb-2 uppercase tracking-wide">Budget Status</p>
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
                        <p className="text-xs text-text-secondary font-medium mb-2 uppercase tracking-wide">Progress</p>
                        <p className="text-xl font-bold text-text-primary">{project.progress}%</p>
                        <p className="text-xs text-text-muted dark:text-gray-400 mt-1">Project completion</p>
                      </div>
                      <div className="card p-4 bg-gray-50 dark:bg-white/[0.04]">
                        <p className="text-xs text-text-secondary font-medium mb-2 uppercase tracking-wide">Risk Level</p>
                        <p className={`text-xl font-bold ${
                          project.risk === 'Low' ? 'text-success' :
                          project.risk === 'Medium' ? 'text-warning' : 'text-danger'
                        }`}>
                          {project.risk}
                        </p>
                        <p className="text-xs text-text-muted dark:text-gray-400 mt-1">Overall project risk assessment</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-text-primary mb-4 border-b border-gray-200 pb-2">Financial Performance</h3>
                    <div className="card p-4">
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="name" stroke="#6B7280" tick={{ fill: '#6B7280' }} />
                          <YAxis stroke="#6B7280" tick={{ fill: '#6B7280' }} />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E5E7EB',
                              borderRadius: '6px',
                              color: '#111827'
                            }}
                          />
                          <Legend wrapperStyle={{ color: '#111827' }} />
                          <Line type="monotone" dataKey="planned" stroke="#3B82F6" strokeWidth={2} name="Planned (M)" />
                          <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} name="Actual (M)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-text-primary mb-4 border-b border-gray-200 pb-2">Key Insights</h3>
                    <div className="space-y-2">
                      <div className="card p-4 bg-gray-50 flex items-start gap-3">
                        <span className="text-lg">📈</span>
                        <div>
                          <p className="text-text-primary dark:text-text-primary font-semibold mb-1 text-sm">Performance Analysis</p>
                          <p className="text-text-secondary dark:text-gray-300 text-xs leading-relaxed">
                            The project is currently {project.progress}% complete with a {formatPercentage(project.roi)} ROI projection. 
                            Budget utilization stands at {((project.budgetUsed / project.budgetPlanned) * 100).toFixed(1)}%.
                          </p>
                        </div>
                      </div>
                      <div className="card p-4 bg-gray-50 flex items-start gap-3">
                        <span className="text-lg">⚠️</span>
                        <div>
                          <p className="text-text-primary font-semibold mb-1 text-sm">Risk Assessment</p>
                          <p className="text-text-secondary text-xs leading-relaxed">
                            Risk level: {project.risk}. Status: {project.status}. Timeline: {project.timelineMonths} months.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="bg-gray-50 dark:bg-gradient-accent/20 border-t border-gray-200 dark:border-white/[0.12] p-4 flex items-center justify-between">
                  <p className="text-text-muted dark:text-gray-400 text-xs">Generated by InvestorIQ • {new Date().toLocaleDateString()}</p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.print()}
                      className="accent-button flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-200 dark:border-white/[0.12] text-text-primary dark:text-text-primary font-medium rounded-md hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Close</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
