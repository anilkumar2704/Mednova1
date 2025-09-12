import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import BookingService from './components/BookingService';
import HealthRecords from './components/HealthRecords';
import Medicine from './components/Medicine';
import FirstAidKit from './components/FirstAidKit';
import EmergencyService from './components/EmergencyService';
import AiChat from './components/AiChat';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Login from './components/login';

// 🔒 Simple fake auth (replace with real context or backend later)
const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <Header />}
      <div className="flex">
        {!isLoginPage && <Sidebar />}
        <main className={`${!isLoginPage ? "flex-1 ml-64 pt-16" : "flex-1"}`}>
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/map"
                element={isAuthenticated() ? <MapView /> : <Navigate to="/login" />}
              />
              <Route
                path="/booking"
                element={isAuthenticated() ? <BookingService /> : <Navigate to="/login" />}
              />
              <Route
                path="/health-records"
                element={isAuthenticated() ? <HealthRecords /> : <Navigate to="/login" />}
              />
              <Route
                path="/medicine"
                element={isAuthenticated() ? <Medicine /> : <Navigate to="/login" />}
              />
              <Route
                path="/first-aid"
                element={isAuthenticated() ? <FirstAidKit /> : <Navigate to="/login" />}
              />
              <Route
                path="/emergency"
                element={isAuthenticated() ? <EmergencyService /> : <Navigate to="/login" />}
              />
              <Route
                path="/chat"
                element={isAuthenticated() ? <AiChat /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile"
                element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/settings"
                element={isAuthenticated() ? <Settings /> : <Navigate to="/login" />}
              />
            </Routes>
          </Layout>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
