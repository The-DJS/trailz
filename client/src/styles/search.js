import styled from 'styled-components';

const SearchBar = styled.input`
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  -o-transition: all 0.30s ease-in-out;
  top: 10vh;
  width: 60vw;
  z-index: 10;
  position: absolute;
  color: Black;
  font-weight: bolder;
  background: rgba(122, 139, 148, 0.75);
  padding: 0.5rem;
  border: 2px solid ForestGreen;
  border-radius: 1rem;
  &:focus {
    color: Snow;
    box-shadow: 4px solid ForestGreen;
    outline: none;
    background: rgba(122, 139, 148, 1);
    border-color: ForestGreen;
    box-shadow: 0 0 1rem ForestGreen;
  }
`;

export default SearchBar;
