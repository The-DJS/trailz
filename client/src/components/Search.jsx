import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ updateSearchResults, position, updatePosition }) => {
  const [search, setSearch] = useState('');
  const handleClick = () => {
    const { lat, lng } = position;
    axios
      .get(`/parks/searchResults/${lat}/${lng}/${search}`)
      .then(({ data: results }) => {
        console.log(results);
        updateSearchResults(results.mappedResults);
        updatePosition(results.position);
        setSearch('');
      })
      .catch((err) => console.log(err));
  };
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
        <button type="button" onClick={handleClick}>
          Search Parks
        </button>
      </div>
    </div>
  );
};

export default Search;
