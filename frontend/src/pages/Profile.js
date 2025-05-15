import React, { useState, useEffect } from 'react';
import { FiFilm, FiHeart, FiMail, FiUser, FiCalendar, FiAward, FiTrendingUp } from 'react-icons/fi';

const Profile = () => {
  const [user] = useState({
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email')
  });
 
  const [stats, setStats] = useState({ moviesCount: 0, favoritesCount: 0 });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const statsResponse = await fetch('http://localhost:5000/api/movies/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const statsData = await statsResponse.json();
        setStats({
          moviesCount: statsData.moviesCount || 0,
          favoritesCount: statsData.favoritesCount || 0
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const userLevel = stats.moviesCount > 10 ? 'Movie Expert' : 'Movie Enthusiast';
  const progressPercentage = Math.min((stats.moviesCount / 30) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-800/60 rounded-2xl shadow-2xl p-8 backdrop-blur-lg border border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <img
                src={`https://ui-avatars.com/api/?name=${user.username}&size=128&background=random`}
                alt="Profile"
                className="relative w-36 h-36 rounded-full ring-4 ring-gray-800 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {user.username}
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <p className="text-blue-400 font-medium">Active Movie Enthusiast</p>
                </div>
                <div className="flex items-center gap-2">
                  <FiAward className="w-4 h-4 text-yellow-500" />
                  <p className="text-yellow-500">{userLevel}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border-t border-gray-700/50 pt-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <FiUser className="w-6 h-6 text-blue-400" />
                Profile Information
              </h2>
              <div className="space-y-6 bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50">
                <div>
                  <label className="text-gray-400 block mb-2 flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    Username
                  </label>
                  <div className="text-lg font-medium bg-gray-800/50 p-3 rounded-lg">{user.username}</div>
                </div>
                <div>
                  <label className="text-gray-400 block mb-2 flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Email
                  </label>
                  <div className="text-lg font-medium bg-gray-800/50 p-3 rounded-lg">{user.email}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700/50 pt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-2xl font-semibold">Activity Statistics</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <FiTrendingUp className="w-5 h-5" />
                      <span className="text-sm">Level Progress</span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                </div>
              </div>
             
              <div className="relative mb-6">
                <div className="bg-gray-700/30 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500/90 to-blue-600/90 p-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <FiFilm className="w-6 h-6" />
                    <div className="text-3xl font-bold">{stats.moviesCount}</div>
                  </div>
                  <div className="text-gray-100">Movies Added</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/90 to-purple-600/90 p-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <FiHeart className="w-6 h-6" />
                    <div className="text-3xl font-bold">{stats.favoritesCount}</div>
                  </div>
                  <div className="text-gray-100">Favorites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
