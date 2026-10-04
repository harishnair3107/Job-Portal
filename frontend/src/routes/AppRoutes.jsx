import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import JobSeekerDashboard from '../pages/JobSeekerDashboard';
import RecruiterDashboard from '../pages/RecruiterDashboard';
import CompleteProfile from '../pages/CompleteProfile';
import FindJobs from '../pages/FindJobs';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job-seeker/:name/jobs" element={<FindJobs />} />
        <Route path="/job-seeker/dashboard" element={<JobSeekerDashboard />} />
        <Route path="/job-seeker/profile" element={<CompleteProfile />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
