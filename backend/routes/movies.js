const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');

// Get all movies for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user.userId })
      .sort({ createdAt: -1 });
    
    const moviesWithFavoriteStatus = movies.map(movie => ({
      ...movie.toObject(),
      isFavorite: movie.favorites?.includes(req.user.userId) || false
    }));
    
    res.json(moviesWithFavoriteStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new movie
router.post('/', auth, async (req, res) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      user: req.user.userId,
      favorites: []
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update movie
router.put('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    
    const movieWithFavoriteStatus = {
      ...movie.toObject(),
      isFavorite: movie.favorites?.includes(req.user.userId) || false
    };
    
    res.json(movieWithFavoriteStatus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete movie
router.delete('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Toggle favorite status
router.post('/:id/favorite', auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    console.log('Movie before update:', movie);
    console.log('User ID attempting to favorite:', req.user.userId);

    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    const favoriteIndex = movie.favorites?.indexOf(req.user.userId) ?? -1;
    
    if (favoriteIndex === -1) {
      movie.favorites = [...(movie.favorites || []), req.user.userId];
    } else {
      movie.favorites = movie.favorites.filter(id => id.toString() !== req.user.userId.toString());
    }
    
    await movie.save();
    console.log('Movie after update:', movie);

    const updatedMovie = {
      ...movie.toObject(),
      isFavorite: favoriteIndex === -1
    };
    
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get user's favorite movies
router.get('/favorites', auth, async (req, res) => {
  try {
    const movies = await Movie.find({
      favorites: req.user.userId
    }).sort({ createdAt: -1 });
    
    const moviesWithFavoriteStatus = movies.map(movie => ({
      ...movie.toObject(),
      isFavorite: true
    }));
    
    res.json(moviesWithFavoriteStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// In the stats endpoint
router.get('/stats', auth, async (req, res) => {
  try {
    // Log the user ID first
    console.log('Current user ID:', req.user.userId);

    // Find all movies by this user
    const userMovies = await Movie.find({ user: req.user.userId });
    console.log('User movies:', userMovies.length);

    // Find all movies where user is in favorites
    const userFavorites = await Movie.find({ 
      favorites: req.user.userId 
    });
    console.log('User favorites:', userFavorites.length);

    const moviesCount = userMovies.length;
    const favoritesCount = userFavorites.length;

    console.log('Final counts:', { moviesCount, favoritesCount });

    res.json({
      moviesCount,
      favoritesCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






module.exports = router;
