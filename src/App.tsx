import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { BottomTabBar } from './components/BottomTabBar';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ParaPage } from './pages/ParaPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { ResultsPage } from './pages/ResultsPage';
import { CoveragePage } from './pages/CoveragePage';
import { ParaSummary, GlossaryItem, UserProgress } from './types';
import { getParasIndex, getGlobalGlossary } from './services/contentService';
import { getProgress } from './services/progressService';

const AppContent: React.FC = () => {
  const [paras, setParas] = useState<ParaSummary[]>([]);
  const [glossary, setGlossary] = useState<GlossaryItem[]>([]);
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    getParasIndex().then(setParas);
    getGlobalGlossary().then(setGlossary);
    setProgress(getProgress());
  }, [location.pathname]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isParaRoute = location.pathname.startsWith('/para');

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text antialiased transition-colors duration-200">
      {/* Top Bar */}
      <TopBar
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
      />

      {/* Main App Container with Optional Left Sidebar */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar (visible on Para pages or can be toggled) */}
        {isParaRoute && (
          <Sidebar
            paras={paras}
            progress={progress}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex shrink-0 min-h-[calc(100vh-3.5rem)] sticky top-14"
          />
        )}

        {/* Mobile Sidebar / Drawer (Slide in overlay) */}
        {isMobileSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <div
              className="w-4/5 max-w-sm h-full bg-surface shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar
                paras={paras}
                progress={progress}
                isCollapsed={false}
                onToggleCollapse={() => setIsMobileSidebarOpen(false)}
                onItemClick={() => setIsMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Page Content Viewport */}
        <div className="flex-1 min-w-0 pb-16 md:pb-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/para/:paraId" element={<ParaPage />} />
            <Route path="/para/:paraId/:tabId" element={<ParaPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/coverage" element={<CoveragePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        paras={paras}
        glossary={glossary}
      />

      {/* Mobile Bottom Tab Bar */}
      <BottomTabBar
        onOpenMundarija={() => setIsMobileSidebarOpen(true)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
