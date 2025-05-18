import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import OnboardingLayout from './layouts/OnboardingLayout';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Campaigns from './pages/dashboard/Campaigns';
import Leads from './pages/dashboard/Leads';
import Templates from './pages/dashboard/Templates';
import Settings from './pages/dashboard/Settings';
import GmailIntegration from './pages/onboarding/GmailIntegration';
import LeadImport from './pages/onboarding/LeadImport';
import CampaignCreation from './pages/onboarding/CampaignCreation';
import LaunchDashboard from './pages/onboarding/LaunchDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Check authentication status - this would normally connect to your auth provider
  useEffect(() => {
    const checkAuth = async () => {
      // This is just a mock function - in a real app, you'd verify token validity
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        
        // Check if onboarding is complete
        const onboardingStatus = localStorage.getItem('onboardingComplete');
        if (onboardingStatus === 'true') {
          setOnboardingComplete(true);
        } else {
          const step = localStorage.getItem('onboardingStep');
          setOnboardingStep(step ? parseInt(step) : 0);
        }
      }
    };
    
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const updateOnboardingStep = (step: number) => {
    setOnboardingStep(step);
    localStorage.setItem('onboardingStep', step.toString());
    
    if (step >= 4) {
      setOnboardingComplete(true);
      localStorage.setItem('onboardingComplete', 'true');
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={
              isAuthenticated ? 
                <Navigate to={onboardingComplete ? "/dashboard" : "/onboarding/gmail-integration"} /> : 
                <Login setIsAuthenticated={setIsAuthenticated} />
            } />
            <Route path="/signup" element={
              isAuthenticated ? 
                <Navigate to={onboardingComplete ? "/dashboard" : "/onboarding/gmail-integration"} /> : 
                <SignUp setIsAuthenticated={setIsAuthenticated} />
            } />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          
          {/* Onboarding Routes */}
          <Route element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirectPath="/login">
              <OnboardingLayout currentStep={onboardingStep} />
            </ProtectedRoute>
          }>
            <Route path="/onboarding/gmail-integration" element={
              <GmailIntegration 
                updateStep={() => updateOnboardingStep(1)} 
              />
            } />
            <Route path="/onboarding/lead-import" element={
              <LeadImport 
                updateStep={() => updateOnboardingStep(2)} 
              />
            } />
            <Route path="/onboarding/campaign-creation" element={
              <CampaignCreation 
                updateStep={() => updateOnboardingStep(3)} 
              />
            } />
            <Route path="/onboarding/launch-dashboard" element={
              <LaunchDashboard 
                updateStep={() => updateOnboardingStep(4)} 
              />
            } />
          </Route>
          
          {/* Dashboard Routes */}
          <Route element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirectPath="/login">
              <DashboardLayout onLogout={handleLogout} />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Redirect root to login or dashboard based on auth */}
          <Route path="/" element={
            isAuthenticated ? 
              <Navigate to={onboardingComplete ? "/dashboard" : "/onboarding/gmail-integration"} /> : 
              <Navigate to="/login" />
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;