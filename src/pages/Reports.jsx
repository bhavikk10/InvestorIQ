import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, Filter } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import projectsData from '../data/projects.json';
import ReportModal from '../components/ReportModal';

const Reports = () => {
  const [projects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const reports = projects.map((project, index) => ({
    id: index + 1,
    projectId: project.id,
    projectName: project.name,
    investor: project.investor,
    generatedDate: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
    type: 'Quarterly Report',
    status: 'Completed',
  }));

  const handleViewReport = (report) => {
    const project = projects.find(p => p.id === report.projectId);
    if (project) {
      setSelectedProject(project);
      setIsReportModalOpen(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-light dark:bg-transparent">
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary mb-1">Reports</h1>
            <p className="text-text-secondary dark:text-gray-300 text-sm">Generated investor reports and analytics</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 border border-gray-200 dark:border-white/[0.12] text-text-primary dark:text-text-primary font-medium rounded-md hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="accent-button flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Report
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-success/5 flex items-center justify-center">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-text-secondary dark:text-gray-300">Total Reports</p>
                <p className="text-xl font-bold text-text-primary dark:text-text-primary">{reports.length}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/5 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent-blue" />
              </div>
              <div>
                <p className="text-xs text-text-secondary dark:text-gray-300">This Month</p>
                <p className="text-xl font-bold text-text-primary dark:text-text-primary">{reports.filter((_, i) => i < 3).length}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/5 flex items-center justify-center">
                <Download className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <p className="text-xs text-text-secondary dark:text-gray-300">Downloads</p>
                <p className="text-xl font-bold text-text-primary dark:text-text-primary">24</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card p-6 card-hover"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-accent-blue/10 dark:bg-gradient-accent/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent-blue dark:text-gradient-start" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary">
                        {report.projectName}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success border border-success/20">
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary dark:text-gray-300 mb-2">
                      {report.investor} • {report.type}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-muted dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Generated {report.generatedDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewReport(report)}
                    className="px-4 py-2 border border-gray-200 dark:border-white/[0.12] text-text-primary dark:text-text-primary font-medium rounded-md hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border border-gray-200 dark:border-white/[0.12] text-text-primary dark:text-text-primary font-medium rounded-md hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ReportModal
        project={selectedProject}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default Reports;

