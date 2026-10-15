import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const brandName = query.trim().toLowerCase();
    if (!brandName) return;

    console.log('Searching for brand:', brandName);

    try {
      // Fetch brand data from live backend
      const brandRes = await fetch(`https://backend-vfd9.onrender.com/api/brand/${brandName}`);
      if (!brandRes.ok) {
        console.error('Brand fetch failed:', brandRes.status);
        onSearch({ error: 'Brand not found' });
        return;
      }
      const brandData = await brandRes.json();

      // Fetch ethical alternatives from live backend
      const altRes = await fetch(`https://backend-vfd9.onrender.com/api/ethical-alternatives/${brandName}`);
      const altData = altRes.ok ? await altRes.json() : { ethical_alternatives: [] };

      // Pass both to parent or it will crash
      onSearch({ ...brandData, ethicalAlternatives: altData.ethical_alternatives });

    } catch (error) {
      console.error('Fetch failed:', error);
      onSearch({ error: 'Failed to fetch data. Check your backend.' });
    }
  };

  return (
    <form className='search-bar' onSubmit={handleSearch}>
      <input
        type='text'
        placeholder='Search for a brand...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type='submit'>Search</button>
    </form>
  );
};

export default SearchBar;



