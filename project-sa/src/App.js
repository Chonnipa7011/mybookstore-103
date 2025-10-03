import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate  ,useLocation } from 'react-router-dom';
import { useState } from "react";

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import LoginScreen  from './components/LoginScreen';

// Pages
import Employee from './pages/Employee';
import LeaveRest from './pages/LeaveRest';
import Calendar from './pages/Calendar';
import UserManage from './pages/UserManage';
import Report from './pages/Report';
//import Contract from './pages/ContractPage';
import ContractPageTest from "./pages/ContractPage/ContractPageTest";

import Tax from './pages/TaxPage';

//Login Protect
import ProtectedRoute from "./components/ProtectRoute";

function AppLayout({ setIsLoggedIn }) {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login"; // ซ่อน nav+footer ถ้าอยู่หน้า login

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarFooter && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <main className="flex-grow bg-gray-50">
        <Routes>
          <Route path="/login" element={<LoginScreen setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={<ProtectedRoute><Employee /></ProtectedRoute>} />
          <Route path="/leave" element={<ProtectedRoute><LeaveRest /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
          <Route path="/contract" element={<ProtectedRoute><ContractPageTest /></ProtectedRoute>} />
          <Route path="/tax" element={<ProtectedRoute><Tax /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><UserManage /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <AppLayout setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}
