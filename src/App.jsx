import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { PreferencesProvider } from './context/PreferencesContext';
import { ToastProvider } from './context/ToastContext';

// Layout Components
import BreakingNewsBar from './components/layout/BreakingNewsBar';
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import BookmarksPage from './pages/BookmarksPage';
import PreferencesPage from './pages/PreferencesPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-zinc-900 dark:bg-[#090D14] dark:text-zinc-100 transition-colors duration-200">
      <ScrollToTop />
      
      {/* 1. Top Announcement / Breaking News Bar */}
      <BreakingNewsBar />

      {/* 2. Sticky Navbar with Masthead & Category Links */}
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* 3. Main Content Router */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* 4. Editorial Footer with Newsletter */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BookmarkProvider>
          <PreferencesProvider>
            <Router>
              <MainLayout />
            </Router>
          </PreferencesProvider>
        </BookmarkProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
