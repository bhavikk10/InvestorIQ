import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Download, Eye } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatCurrency';
import projectsData from '../data/projects.json';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [projects] = useState(projectsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('All');
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-success border-success bg-success/5';
    if (risk === 'Medium') return 'text-warning border-warning bg-warning/5';
    return 'text-danger border-danger bg-danger/5';
  };

  const getStatusColor = (status) => {
    if (status === 'On Track') return 'text-success';
    if (status === 'Delayed') return 'text-warning';
    return 'text-danger';
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'All' || project.risk === filterRisk;
    const matchesRegion = filterRegion === 'All' || project.region === filterRegion;
    const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
    return matchesSearch && matchesRisk && matchesRegion && matchesStatus;
  });

  const regions = [...new Set(projects.map(p => p.region))];
  const risks = ['Low', 'Medium', 'High'];
  const statuses = ['On Track', 'Delayed', 'At Risk'];

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-light dark:bg-transparent">
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary mb-1">Projects</h1>
            <p className="text-text-secondary dark:text-gray-300 text-sm">Manage and monitor all real estate projects</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="accent-button flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </motion.button>
        </div>

        <div className="card p-4 mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-9"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="input-field pl-9 appearance-none cursor-pointer"
              >
                <option value="All">All Risks</option>
                {risks.map(risk => (
                  <option key={risk} value={risk}>{risk}</option>
                ))}
              </select>
            </div>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="input-field appearance-none cursor-pointer"
            >
              <option value="All">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary">
                      {project.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(project.risk)}`}>
                      {project.risk}
                    </span>
                    <span className={`text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary dark:text-gray-300 mb-2">
                    {project.investor} • {project.region}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewProject(project)}
                    className="px-3 py-1.5 border border-gray-200 dark:border-white/[0.12] text-text-primary dark:text-text-primary font-medium rounded-md hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 border border-gray-200 dark:border-white/[0.12] text-text-primary dark:text-text-primary font-medium rounded-md hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-text-secondary dark:text-gray-300 font-medium mb-1">Budget</p>
                  <p className="text-sm font-semibold text-text-primary dark:text-text-primary">
                    {formatCurrency(project.budgetUsed)} / {formatCurrency(project.budgetPlanned)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary dark:text-gray-300 font-medium mb-1">ROI</p>
                  <p className="text-sm font-semibold text-success">{formatPercentage(project.roi)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary dark:text-gray-300 font-medium mb-1">Progress</p>
                  <p className="text-sm font-semibold text-text-primary dark:text-text-primary">{project.progress}%</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary dark:text-gray-300 font-medium mb-1">Timeline</p>
                  <p className="text-sm font-semibold text-text-primary dark:text-text-primary">{project.timelineMonths} months</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-white/[0.06] rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    project.risk === 'Low' ? 'bg-success' :
                    project.risk === 'Medium' ? 'bg-warning' : 'bg-danger'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerateReport={() => {}}
      />
    </div>
  );
};

export default Projects;

