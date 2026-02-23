import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Counselors } from './pages/Counselors';
import { JobBoard } from './pages/JobBoard';
import { LoginPage } from './pages/LoginPage';
import { CareerPathViz } from './components/CareerPathViz';

// Placeholder for missing pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">{title}</h1>
      <p className="text-zinc-500">This feature is coming soon in the next update.</p>
    </div>
  </div>
);

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <div className="space-y-8">
              <Dashboard />
              <div className="max-w-7xl mx-auto px-4 pb-12">
                <CareerPathViz />
              </div>
            </div>
          } />
          <Route path="/counselors" element={<Counselors />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/resources" element={<Placeholder title="Resource Library" />} />
          <Route path="/forum" element={<Placeholder title="Community Forum" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="bg-white border-t border-zinc-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} CareerPath AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
