import React, { useState } from 'react';
import SearchBar from '../styles/search';
import axios from 'axios';

const Search = ({ updateSearchResults, position, updatePosition }) => {
  const [search, setSearch] = useState('');
  const handleClick = () => {
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <h3 className="title">Search</h3> */}
        <SearchBar
          type="text"
          placeholder="Search Trails"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <br />
        {/* <button type="button" onClick={handleClick}>
          Search Parks
        </button> */}
      </div>
    </div>
  );
};

export default Search;
