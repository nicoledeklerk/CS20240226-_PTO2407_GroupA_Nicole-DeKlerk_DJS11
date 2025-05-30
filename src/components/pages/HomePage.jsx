import React, { useEffect, useState } from 'react';
import ShowCard from '../show/ShowCard'; // includes preview image rendering //
import GENRE_MAP from '../../data/genreMap';
import ResetProgressButton from '../store/ResetProgressButton';
import './HomePage.css'; 

export default function HomePage() {
  // State for storing shows, loading state & potential error state //
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filtering available genres and sorting //
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [availableGenres, setAvailableGenres] = useState([]);
  const [sortMethod, setSortMethod] = useState("title-asc"); // Default sorting method is title A-Z //

  // Fetch show data from API //
  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch shows');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched shows:', data);
        const sortedTitles = data.sort((a, b) => a.title.localeCompare(b.title));  // Default alphabetical sorting of titles //
        setShows(sortedTitles);
        extractGenres(sortedTitles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const extractGenres = (shows) => {
    const genreSet = new Set();
    shows.forEach((show) => {
    show.genres?.forEach((genreId) => {
      const genreName = GENRE_MAP[genreId];
      if (genreName) genreSet.add(genreName);
    });
  });
  setAvailableGenres(["All", ...Array.from(genreSet).sort()]);
};

  const filteredShows =
    selectedGenre === "All"
      ? shows
      : shows.filter((show) => show.genres?.some((genreId) => GENRE_MAP[genreId] === selectedGenre)
      );

  const sortedFilteredShows = [...filteredShows].sort((a, b) => {
    switch (sortMethod) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "date-newest":
        return new Date(b.updated) - new Date(a.updated);
      case "date-oldest":
        return new Date(a.updated) - new Date(b.updated);
      default:
        return 0;
    }
  });

  if (loading) return <p>Loading shows...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="homepage-container">
      <div className="filter-bar">
        <label htmlFor="genre">Filter by Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      {/* Sorting dropdown */}
        <label htmlFor="sort" style={{ marginLeft: '1rem' }}>Sort by:</label>
        <select
          id="sort"
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="date-newest">Most Recent</option>
          <option value="date-oldest">Oldest</option>
        </select>
        <ResetProgressButton onReset={() => window.location.reload()}/>
      </div>

      <div className="homepage-grid">
        {sortedFilteredShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}