import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCartIcon, SearchIcon, UserIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogIn, setLogin] = useState(false);
  const [cartCount] = useState(3);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLogin = () => {
    setLogin(!isLogIn);
  };

  const handleLogout = () => {
    // ลบข้อมูล user ออกจาก session/local storage
    sessionStorage.removeItem("user"); 
    // ถ้าคุณใช้ useState เก็บ login state ใน App.js ก็ต้องส่ง setIsLoggedIn มาด้วยนะ
    // setIsLoggedIn(false);  

    navigate("/login"); // พากลับไปหน้า login
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">HR</span>
            </div>
            <span className="text-2xl font-bold text-blue-500 group-hover:text-viridian-700 transition-colors">
              HR Management System
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-500 transition-colors font-medium ${
                  isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                }`
              }
            >
              จัดการข้อมูลพนักงาน
            </NavLink>
            <NavLink 
              to="/leave" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-500 transition-colors font-medium ${
                  isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                }`
              }
            >
              คำขอลา/หยุด
            </NavLink>
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-500 transition-colors font-medium ${
                  isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                }`
              }
            >
              ปฏิทินบริษัท
            </NavLink>

            <NavLink 
              to="/report" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-500 transition-colors font-medium ${
                  isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                }`
              }
            >
              รายงาน
            </NavLink>
            
            <NavLink 
              to="/contract" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-500 transition-colors font-medium ${
                  isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                }`
              }
            >
              สัญญาจ้าง
            </NavLink>
            
            <NavLink 
              to="/tax" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-500 transition-colors font-medium ${
                  isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                }`
              }
            >
              ภาษี
            </NavLink>
            
            <NavLink 
              to="/adduser" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-500 transition-colors font-medium ${
                  isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                }`
              }
            >
              จัดการบัญชีผู้ใช้
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-8 py-3 bg-red-300 
                text-white font-semibold rounded-lg hover:bg-red-400 
                transform hover:scale-105 transition-all duration-200"
            >
              ออกจากระบบ
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 border-t">
            <NavLink 
              to="/" 
              className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              หน้าแรก
            </NavLink>
            <NavLink 
              to="/books" 
              className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              หนังสือ
            </NavLink>
            <NavLink 
              to="/categories" 
              className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              หมวดหมู่
            </NavLink>
            <NavLink 
              to="/about" 
              className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              เกี่ยวกับเรา
            </NavLink>
            <NavLink 
              to="/contact" 
              className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ติดต่อ
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;