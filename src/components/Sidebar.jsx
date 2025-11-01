import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatCurrency';

const Sidebar = ({ projects, selectedProject, onProjectSelect, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('All');
  const [filterRegion, setFilterRegion] = useState('All');

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

  const getProgressColor = (risk) => {
    if (risk === 'Low') return 'bg-success';
    if (risk === 'Medium') return 'bg-warning';
    return 'bg-danger';
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'All' || project.risk === filterRisk;
    const matchesRegion = filterRegion === 'All' || project.region === filterRegion;
    return matchesSearch && matchesRisk && matchesRegion;
  });

  const regions = [...new Set(projects.map(p => p.region))];
  const risks = ['Low', 'Medium', 'High'];

  return (
    <div className="w-80 h-full bg-white dark:bg-white/[0.04] dark:backdrop-blur-[12px] border-r border-gray-200 dark:border-white/[0.08] p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-text-primary dark:text-text-primary uppercase tracking-wide">Projects</h2>
        
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

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <select
              value={filterRisk}
              onChange={(e) => {
                setFilterRisk(e.target.value);
                onFilterChange({ risk: e.target.value, region: filterRegion });
              }}
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
            onChange={(e) => {
              setFilterRegion(e.target.value);
              onFilterChange({ risk: filterRisk, region: e.target.value });
            }}
            className="input-field flex-1 appearance-none cursor-pointer"
          >
            <option value="All">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.02, duration: 0.2 }}
              onClick={() => onProjectSelect(project)}
              className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedProject?.id === project.id
                  ? 'bg-accent-blue/5 dark:bg-gradient-accent/20 border-l-2 border-l-accent-blue dark:border-l-gradient-start'
                  : 'bg-gray-50 dark:bg-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.06] border border-transparent hover:border-gray-200 dark:hover:border-white/[0.12]'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-text-primary dark:text-text-primary text-sm group-hover:text-accent-blue dark:group-hover:text-gold transition-colors">
                  {project.name}
                </h3>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getRiskColor(project.risk)}`}>
                  {project.risk}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-secondary dark:text-gray-300 mb-2">
                <span className="font-medium">{formatPercentage(project.roi)} ROI</span>
                <span className={`font-medium ${getStatusColor(project.status)}`}>{project.status}</span>
              </div>

              <div className="w-full bg-gray-200 dark:bg-white/[0.06] rounded-full h-1.5 mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
                  className={`h-full rounded-full ${getProgressColor(project.risk)}`}
                />
              </div>
              
              <div className="text-xs text-text-muted dark:text-gray-400">
                {project.progress}% • {formatCurrency(project.budgetUsed)} / {formatCurrency(project.budgetPlanned)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;
