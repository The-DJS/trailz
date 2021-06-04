import React, { useState } from 'react';
import SearchBar from '../styles/search';
import axios from 'axios';

const Search = ({ updateSearchResults, position, updatePosition, isSearchVisible }) => {
  const [search, setSearch] = useState('');
  const handleSearch = () => {
    const { lat, lng } = position;
    axios
      .get(`/parks/searchResults/${lat}/${lng}/${search}`)
      .then(({ data: results }) => {
        updateSearchResults(results.mappedResults);
        // updatePosition(results.position);
        setSearch('');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {isSearchVisible
        ? (
          <SearchBar
            className="form-control"
            type="text"
            placeholder="Search Trails"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        )
        : <></>}
    </div>
  );
};

export default Search;
