import React, { useState } from 'react';

const Search = () => {
  // this is basically like a axios request but we are referencing the backend
  const [search, setSearch] = useState('');

  return (
    <div>
      <h3 className="title">Search</h3>
      <input
        type="text"
        placeholder="Search Trails"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

  );
};

export default Search;
