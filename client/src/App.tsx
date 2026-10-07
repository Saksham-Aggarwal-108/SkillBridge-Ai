import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { CareerMatchesPage } from './pages/CareerMatchesPage';
import { RoleDetailPage } from './pages/RoleDetailPage';
import { SkillGapsPage } from './pages/SkillGapsPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { AICoachPage } from './pages/AICoachPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { EmployerPage } from './pages/EmployerPage';
import { UniversityPage } from './pages/UniversityPage';
import { SkillsExplorerPage } from './pages/SkillsExplorerPage';
import { PresentationPage } from './pages/PresentationPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AboutPage } from './pages/AboutPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={
        <div className="min-h-screen bg-[#070b14] text-slate-100">
          <Navbar />
          <LandingPage />
        </div>
      } />

      {/* Auth */}
      <Route path="/login" element={<AuthPage isRegister={false} />} />
      <Route path="/register" element={<AuthPage isRegister={true} />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/presentation" element={<PresentationPage />} />

      {/* Dashboard Routes with Sidebar Layout */}
      <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
      <Route path="/resume-analyzer" element={<DashboardLayout><ResumeAnalyzerPage /></DashboardLayout>} />
      <Route path="/career-matches" element={<DashboardLayout><CareerMatchesPage /></DashboardLayout>} />
      <Route path="/career-matches/:roleId" element={<DashboardLayout><RoleDetailPage /></DashboardLayout>} />
      <Route path="/skill-gaps" element={<DashboardLayout><SkillGapsPage /></DashboardLayout>} />
      <Route path="/roadmap" element={<DashboardLayout><RoadmapPage /></DashboardLayout>} />
      <Route path="/coach" element={<DashboardLayout><AICoachPage /></DashboardLayout>} />
      <Route path="/opportunities" element={<DashboardLayout><OpportunitiesPage /></DashboardLayout>} />
      <Route path="/employer" element={<DashboardLayout><EmployerPage /></DashboardLayout>} />
      <Route path="/university" element={<DashboardLayout><UniversityPage /></DashboardLayout>} />
      <Route path="/skills" element={<DashboardLayout><SkillsExplorerPage /></DashboardLayout>} />
      <Route path="/architecture" element={<DashboardLayout><ArchitecturePage /></DashboardLayout>} />
      <Route path="/about" element={<DashboardLayout><AboutPage /></DashboardLayout>} />
      <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
      <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />

      {/* Fallback Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
