import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiArrowLeft, FiLoader, FiFilm } from 'react-icons/fi';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;
  const navigate = useNavigate();

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = favorites.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(favorites.length / moviesPerPage);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/movies/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (movieId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${movieId}/favorite`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchFavorites();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-xl">
          <FiLoader className="w-6 h-6 animate-spin text-blue-500" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Loading your favorites...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <FiHeart className="w-8 h-8 text-red-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-500">
              My Favorite Movies
            </h1>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <FiFilm className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-xl text-gray-400 mb-6">No favorite movies yet.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2"
            >
              <FiFilm className="w-5 h-5" />
              Browse Movies
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentMovies.map(movie => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onToggleFavorite={() => handleToggleFavorite(movie._id)}
                  isFavorite={true}
                  showActions={false}
                />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2 bg-gray-800/50 p-2 rounded-lg backdrop-blur-sm">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-700 disabled:opacity-50 transition-colors duration-300"
                  >
                    Previous
                  </button>
                  <div className="px-4 py-2 rounded-md bg-blue-500/10 text-blue-400">
                    Page {currentPage} of {totalPages}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-700 disabled:opacity-50 transition-colors duration-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
