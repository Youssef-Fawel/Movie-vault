import React from 'react';
import { Link } from 'react-router-dom';
import { FiFilm, FiGrid, FiShare2, FiArrowRight, FiPlay, FiStar, FiHeart } from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: <FiFilm className="w-8 h-8" />,
      title: "Track Movies",
      description: "Keep track of all your favorite movies in one place. Build your personal collection and never lose track of what you've watched.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FiGrid className="w-8 h-8" />,
      title: "Organize",
      description: "Organize your collection by genre, year, and more. Create custom lists and categories for perfect movie organization.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FiShare2 className="w-8 h-8" />,
      title: "Share",
      description: "Share your movie collection with friends. Connect with other movie enthusiasts and discover new favorites together.",
      color: "from-pink-500 to-pink-600"
    }
  ];

  const popularMovies = [
    {
      title: "Dune: Part Two",
      year: 2024,
      rating: "8.9",
      genre: "Sci-Fi"
    },
    {
      title: "Madame Web",
      year: 2024,
      rating: "8.5",
      genre: "Action"
    },
    {
      title: "Bob Marley: One Love",
      year: 2024,
      rating: "8.7",
      genre: "Biography"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="absolute inset-0 bg-[url('/public/grid.svg')] opacity-10"></div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75 animate-pulse"></div>
              <FiPlay className="relative w-16 h-16 text-white transform hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          
          <h1 className="text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight animate-fade-in hover:scale-105 transition-transform duration-300">
            Welcome to MovieVault
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed hover:text-white transition-colors duration-300">
            Your personal cinema collection manager. Track, organize, and share your favorite films.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group h-full transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl h-full"
                 style={{ background: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}>
              </div>
              <div className="relative bg-gray-800/50 backdrop-blur p-8 rounded-2xl shadow-xl group-hover:transform group-hover:scale-105 transition-all duration-300 border border-gray-700/50 h-full flex flex-col hover:shadow-2xl">
                <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-lg inline-block mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">{feature.title}</h3>
                <p className="text-gray-300 flex-grow group-hover:text-white transition-colors duration-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FiStar className="text-yellow-500 animate-pulse" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Trending Movies 2024
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularMovies.map((movie, index) => (
                <div key={index} className="bg-gray-800/50 p-6 rounded-xl group hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400">{movie.title}</h3>
                      <p className="text-gray-400 text-sm">{movie.year}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiStar className="text-yellow-500 group-hover:animate-spin" />
                      <span className="text-yellow-500">{movie.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">{movie.genre}</span>
                    <FiHeart className="w-5 h-5 text-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-y-8">
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 hover:rotate-1"
          >
            Get Started
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
