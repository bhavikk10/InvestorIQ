import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import KPICards from '../components/KPICards';
import ChartGroup from '../components/ChartGroup';
import InsightsPanel from '../components/InsightsPanel';
import ProjectModal from '../components/ProjectModal';
import ReportModal from '../components/ReportModal';
import projectsData from '../data/projects.json';
import insightsData from '../data/insights.json';

const Dashboard = () => {
  const [projects, setProjects] = useState(projectsData);
  const [insights, setInsights] = useState(insightsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportProject, setReportProject] = useState(null);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleGenerateReport = (project) => {
    if (project) {
      setReportProject(project);
    } else {
      setReportProject(selectedProject || projects[0]);
    }
    setIsReportModalOpen(true);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...projectsData];
    
    if (filters.risk !== 'All') {
      filtered = filtered.filter(p => p.risk === filters.risk);
    }
    
    if (filters.region !== 'All') {
      filtered = filtered.filter(p => p.region === filters.region);
    }
    
    setProjects(filtered);
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-transparent">
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar
          projects={projects}
          selectedProject={selectedProject}
          onProjectSelect={handleProjectSelect}
          onFilterChange={handleFilterChange}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <KPICards projects={projects} />
              <ChartGroup projects={projects} selectedProject={selectedProject} />
            </motion.div>
          </main>
        </div>

        <div className="w-80 p-6">
          <InsightsPanel
            insights={insights}
            onGenerateReport={() => handleGenerateReport(null)}
          />
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onGenerateReport={handleGenerateReport}
      />

      <ReportModal
        project={reportProject}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;

