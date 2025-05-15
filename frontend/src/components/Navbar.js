import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiGrid, FiHeart, FiUser, FiLogOut, FiBell, FiX } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username') || 'User';
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [notificationCount] = useState(1);

  const menuItems = [
    { icon: <FiGrid className="w-4 h-4" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FiUser className="w-4 h-4" />, label: 'Profile', path: '/profile' },
    { icon: <FiHeart className="w-4 h-4" />, label: 'My Favorites', path: '/favorites' }
  ];

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  useEffect(() => {
    if (isProfileOpen) {
      const timer = setTimeout(() => {
        setIsProfileOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isProfileOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm text-white py-4 sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <FiHome className="w-6 h-6 text-blue-500" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            MovieVault
          </span>
        </Link>

        {token ? (
          <div className="flex items-center gap-6">
            <div className="relative">
              {showNotification && (
                <div className="absolute -top-4 right-0 bg-gray-800/95 backdrop-blur-sm px-6 py-3 rounded-xl shadow-xl text-sm min-w-[250px] border border-gray-700/50">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-medium">Welcome back, {username} 😊</span>
                    </div>
                    <button
                      onClick={() => setShowNotification(false)}
                      className="hover:bg-gray-700/50 rounded-full p-1 transition-colors duration-200"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setShowNotification(!showNotification)}
                className="text-gray-300 hover:text-white relative transition-colors duration-200"
              >
                <FiBell className="w-6 h-6" />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${username}&background=random`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full ring-2 ring-blue-500"
                />
                <span className="font-medium">{username}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-xl py-2 border border-gray-700/50">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  <hr className="my-2 border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
