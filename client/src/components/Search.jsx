import React, { useState } from 'react';
import Map from './Map.jsx';

const Search = ({ searchResults }) => {
  // this is basically like a axios request but we are referencing the backend
  const [search, setSearch] = useState('');
  console.log('in search', searchResults);
  return (
    <div>
      <div>
        <h3 className="title">Search</h3>
        <input
          type="text"
          placeholder="Search Trails"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
