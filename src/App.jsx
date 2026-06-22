import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import BokehBackground from './components/BokehBackground';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdmissionForm from './pages/AdmissionForm';
import ApplicationStatus from './pages/ApplicationStatus';
import FacultyDashboard from './pages/FacultyDashboard';
import NotFound from './pages/NotFound';

// Protected Route Guard Component
const PrivateRoute = ({ children, role }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: '#00D4FF', borderRadius: '50%' }}></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if unauthorized
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Redirect role mismatch
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public Route Guard (prevent authenticated users accessing login/register)
const PublicRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return user.role === 'faculty' ? (
      <Navigate to="/faculty-dashboard" replace />
    ) : (
      <Navigate to="/student-dashboard" replace />
    );
  }

  return children;
};

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          {/* Animated glass layout background */}
          <BokehBackground />
          
          <Navbar />
          
          <main style={{ minHeight: 'calc(100vh - 80px)' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

              {/* Student Routes */}
              <Route
                path="/student-dashboard"
                element={
                  <PrivateRoute role="student">
                    <StudentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/apply"
                element={
                  <PrivateRoute role="student">
                    <AdmissionForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-application"
                element={
                  <PrivateRoute role="student">
                    <ApplicationStatus />
                  </PrivateRoute>
                }
              />

              {/* Faculty Routes */}
              <Route
                path="/faculty-dashboard"
                element={
                  <PrivateRoute role="faculty">
                    <FacultyDashboard />
                  </PrivateRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
