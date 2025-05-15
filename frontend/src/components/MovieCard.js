import React, { useState } from 'react';
import { FiHeart, FiEdit2, FiTrash2, FiStar, FiEye } from 'react-icons/fi';

const MovieCard = ({ movie, onEdit, onDelete, onToggleFavorite, isFavorite, showActions = true }) => {
  const [showDetails, setShowDetails] = useState(false);
  const defaultImage = 'https://via.placeholder.com/400x600?text=Movie+Poster';

  return (
    <>
      <div className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-gray-700/50 hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
        <div className="relative group">
          <img 
            src={movie.imageUrl || movie.poster || defaultImage} 
            alt={movie.title} 
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white">{movie.title}</h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{movie.description}</p>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FiStar className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Movie Rating: {movie.rating || 'No rating yet'}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                {movie.genre}
              </span>
              {movie.year && (
                <span className="text-sm text-gray-500">
                  {movie.year}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {showActions && (
                <>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                    title="View details"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onEdit(movie)}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    title="Edit movie"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(movie._id)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-300"
                    title="Delete movie"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </>
              )}
              <button
                onClick={() => onToggleFavorite(movie._id)}
                className="text-red-400 hover:text-red-300 transition-colors duration-300"
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <FiHeart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img 
                src={movie.imageUrl || movie.poster || defaultImage} 
                alt={movie.title}
                className="w-full rounded-lg object-cover"
              />
              <div className="space-y-4">
                <p className="text-gray-300">{movie.description}</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-400">Genre:</span>
                  <span className="text-gray-300">{movie.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-400">Year:</span>
                  <span className="text-gray-300">{movie.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-400">Rating:</span>
                  <span className="text-gray-300">{movie.rating || 'No rating yet'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
