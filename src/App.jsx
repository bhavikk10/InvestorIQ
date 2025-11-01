import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar user={{ name: 'Demo User' }} />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Navbar user={{ name: 'Demo User' }} />
              <Projects />
            </>
          }
        />
        <Route
          path="/analytics"
          element={
            <>
              <Navbar user={{ name: 'Demo User' }} />
              <Analytics />
            </>
          }
        />
        <Route
          path="/reports"
          element={
            <>
              <Navbar user={{ name: 'Demo User' }} />
              <Reports />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Navbar user={{ name: 'Demo User' }} />
              <Settings />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
