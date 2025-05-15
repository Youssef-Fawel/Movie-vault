import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { FiEye } from 'react-icons/fi';

const predefinedGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
  "Concert Film/Documentary",
  "Biographical Drama"
];

const MovieForm = ({ movie, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: movie?.title || '',
    genre: movie?.genre || '',
    year: movie?.year || '',
    poster: movie?.poster || '',
    description: movie?.description || '',
    rating: movie?.rating || 0
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{formData.title}</h2>
          <button
            onClick={() => setShowPreview(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={formData.poster}
            alt={formData.title}
            className="w-full rounded-lg object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x600?text=Movie+Poster';
            }}
          />
          <div className="space-y-4">
            <p className="text-gray-300">{formData.description}</p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-400">Genre:</span>
              <span className="text-gray-300">{formData.genre}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-400">Year:</span>
              <span className="text-gray-300">{formData.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-400">Rating:</span>
              <span className="text-gray-300">{formData.rating}/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            variant="filled"
            className="bg-gray-700"
            sx={{
              input: { color: 'white' },
              label: { color: 'gray' }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Select Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            variant="filled"
            className="bg-gray-700"
            sx={{
              select: { color: 'white' },
              label: { color: 'gray' },
              '& .MuiSelect-select': { color: 'white' },
              '& .MuiSelect-icon': { color: 'white' },
              '& .MuiInputLabel-root': {
                transform: 'translate(12px, 6px) scale(1)'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(12px, -16px) scale(0.75)'
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                transform: 'translate(12px, -16px) scale(0.75)'
              }
            }}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Choose a genre</option>
            {predefinedGenres.map((genre) => (
              <option key={genre} value={genre} style={{backgroundColor: '#1f2937', color: 'white'}}>
                {genre}
              </option>
            ))}
            <option value="custom" style={{backgroundColor: '#1f2937', color: 'white'}}>Add New Genre</option>
          </TextField>
          
          {formData.genre === 'custom' && (
            <TextField
              fullWidth
              label="Enter Custom Genre"
              name="genre"
              value={formData.genre === 'custom' ? '' : formData.genre}
              onChange={handleChange}
              required
              variant="filled"
              className="bg-gray-700 mt-4"
              sx={{
                input: { color: 'white' },
                label: { color: 'gray' }
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
            variant="filled"
            className="bg-gray-700"
            sx={{
              input: { color: 'white' },
              label: { color: 'gray' }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            value={formData.rating}
            onChange={handleChange}
            variant="filled"
            className="bg-gray-700"
            sx={{
              input: { color: 'white' },
              label: { color: 'gray' }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Poster URL"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            required
            variant="filled"
            className="bg-gray-700"
            sx={{
              input: { color: 'white' },
              label: { color: 'gray' }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            variant="filled"
            className="bg-gray-700"
            sx={{
              textarea: { color: 'white' },
              label: { color: 'gray' }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="flex justify-between gap-4">
            <Button
              onClick={() => setShowPreview(true)}
              variant="outlined"
              startIcon={<FiEye />}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'gray',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Preview
            </Button>
            <div className="flex gap-4">
              <Button
                onClick={onCancel}
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'gray',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {movie ? 'Update Movie' : 'Add Movie'}
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      {showPreview && <PreviewModal />}
    </form>
  );
};

export default MovieForm;
