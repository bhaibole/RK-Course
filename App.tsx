import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Editor } from './pages/Editor';
import { Templates } from './pages/Templates';
import { Admin } from './pages/Admin';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-dark text-slate-50 font-sans">
    {children}
    <Navbar />
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/templates" element={<Layout><Templates /></Layout>} />
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
          <Route path="/tutorials" element={<Layout><div className="p-8 text-center text-slate-500">Tutorials coming soon...</div></Layout>} />
          <Route path="/profile" element={<Layout><div className="p-8 text-center text-slate-500">Profile coming soon...</div></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;