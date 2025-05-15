import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import MovieForm from '../components/MovieForm';
import { FiPlus, FiSearch, FiFilter, FiFilm, FiVideo, FiStar } from 'react-icons/fi';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
  const [selectedMovieReviews, setSelectedMovieReviews] = useState([]);
  const moviesPerPage = 6;

  const genres = ['all', ...new Set(movies.map(movie => movie.genre))];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/movies', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchMovieReviews = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/movies/${movieId}/reviews`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedMovieReviews(data);
        setShowReviews(true);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenre]);

  const handleAddMovie = async (movieData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(movieData)
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      throw error;
    }
  };

  const handleSubmit = async (movieData) => {
    const token = localStorage.getItem('token');
    try {
      if (selectedMovie) {
        const response = await fetch(`http://localhost:5000/api/movies/${selectedMovie._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(movieData)
        });

        if (response.ok) {
          fetchMovies();
          setShowForm(false);
          setSelectedMovie(null);
        }
      } else {
        const newMovie = await handleAddMovie(movieData);
        if (newMovie) {
          fetchMovies();
          setShowForm(false);
        }
      }
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const handleDelete = async (movieId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchMovies();
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

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
        fetchMovies();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const ReviewModal = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Reviews</h2>
          <button 
            onClick={() => setShowReviews(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        
        {selectedMovieReviews.length > 0 ? (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {selectedMovieReviews.map((review, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-200">{review.comment}</p>
                <p className="text-gray-400 text-sm mt-2">- {review.user.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No reviews yet</p>
        )}
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur"></div>
        <FiVideo className="relative w-20 h-20 text-white mb-8" />
      </div>
      <h3 className="text-3xl font-bold text-white mb-4 text-center">
        Your Movie Collection Awaits
      </h3>
      <p className="text-gray-300 text-center mb-8 max-w-md text-lg">
        Start building your personal movie collection and keep track of all your favorite films in one place.
      </p>
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple
-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1"
      >
        <FiPlus className="w-6 h-6" />
        Add Your First Movie
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <FiFilm className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              My Movie Collection
            </h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
          >
            <FiPlus className="w-5 h-5" />
            Add Movie
          </button>
        </div>

        <div className="mb-12 flex flex-col md:flex-row gap-6 bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your movie collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/90 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            />
          </div>
          <div className="w-full md:w-64">
            <div className="relative">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/90 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 appearance-none"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {movies.length === 0 ? (
          <div className="bg-gray-800/50 rounded-xl backdrop-blur-sm shadow-xl">
            <EmptyState />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentMovies.map(movie => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onEdit={(movie) => {
                    setSelectedMovie(movie);
                    setShowForm(true);
                  }}
                  onDelete={handleDelete}
                  onToggleFavorite={() => handleToggleFavorite(movie._id)}
                  isFavorite={movie.isFavorite}
                  onShowReviews={() => fetchMovieReviews(movie._id)}
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

        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl">
              <MovieForm
                movie={selectedMovie}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedMovie(null);
                }}
              />
            </div>
          </div>
        )}

        {showReviews && <ReviewModal />}
      </div>
    </div>
  );
};

export default Dashboard;
