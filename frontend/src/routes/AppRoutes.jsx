import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import JobSeekerDashboard from '../pages/JobSeekerDashboard';
import RecruiterDashboard from '../pages/RecruiterDashboard';
import CompleteProfile from '../pages/CompleteProfile';
import FindJobs from '../pages/FindJobs';
import AdminDashboard from '../pages/AdminDashboard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  try {
    const payloadBase64 = token.split('.')[1];
    const decoded = JSON.parse(atob(payloadBase64));
    if (decoded.role !== allowedRole) {
      if (decoded.role === 'ADMIN') return <Navigate to="/admin" replace />;
      return <Navigate to={`/${decoded.role === 'RECRUITERS' ? 'recruiter' : 'job-seeker'}/dashboard`} replace />;
    }
    return children;
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job-seeker/:name/jobs" element={<ProtectedRoute allowedRole="JOB_SEEKERS"><FindJobs /></ProtectedRoute>} />
        <Route path="/job-seeker/dashboard" element={<ProtectedRoute allowedRole="JOB_SEEKERS"><JobSeekerDashboard /></ProtectedRoute>} />
        <Route path="/job-seeker/profile" element={<ProtectedRoute allowedRole="JOB_SEEKERS"><CompleteProfile /></ProtectedRoute>} />
        <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRole="RECRUITERS"><RecruiterDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
