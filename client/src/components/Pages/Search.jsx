import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../../styles/search';

const Search = ({
  updateSearchResults,
  position,
  updatePosition,
  isSearchVisible,
  setShowSRAlert,
}) => {
  const [search, setSearch] = useState('');
  const handleSearch = () => {
    const { lat, lng } = position;
    axios
      .get(`/parks/searchResults/${lat}/${lng}/${search}`)
      .then(({ data: results }) => {
        console.log(results);
        if (results.mappedResults.length) {
          updateSearchResults(results.mappedResults);
        } else {
          setShowSRAlert(true);
        }
        // updatePosition(results.position);
        setSearch('');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {isSearchVisible ? (
        <SearchBar
          className="form-control"
          type="text"
          placeholder="Search Trails"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
