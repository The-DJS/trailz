/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Link } from 'react-router-dom';
// import GoogleButton from 'react-google-button';
import Search from './Search.jsx';
// import FavoriteTrails from './FavoriteTrails.jsx';
import Home from './HomeScreen.jsx';
import Map from './Map.jsx';
import Events from './Events.jsx';

const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background: #7a8b94;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`;

const LinkCss = styled.a`
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;
const Logo = styled.h1`
  font-size: 30px;
  color: white;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  li:nth-child(odd) {
    margin: 0px 20px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Item = styled.li``;

const Navbar = ({
  searchResults,
  loginUser,
  favorites,
  addFavorite,
  removeFavorite,
  updateSearchResults,
  position,
  updatePosition,
  logoutUser,
  user,
}) => (
  <div>
    <div>
      <Nav>
        <Logo as={Link} to="/" style={{ fontsize: '40px' }}>
          TRAILZ
        </Logo>
        <Menu>
          <Item>
            <LinkCss as={Link} to="/">
              Home
            </LinkCss>
          </Item>
          <Item>
            <LinkCss as={Link} to="/search">
              Search
            </LinkCss>
          </Item>
          <Item>
            { user && (
              <LinkCss as={Link} to="/favorite">
                Favorite Trails
              </LinkCss>
            )}
          </Item>
        </Menu>
      </Nav>
    </div>
    <div>
      <Switch>
        <Route exact path="/search">
          <>
            <Search
              updateSearchResults={updateSearchResults}
              position={position}
              updatePosition={updatePosition}
            />
            <Map
              results={searchResults}
              addFavorite={addFavorite}
              position={position}
            />
          </>
        </Route>
        <Route exact path="/favorite">
          <>
            <h2>Favorite Trails</h2>
            <Map
              results={favorites}
              removeFavorite={removeFavorite}
              position={position}
            />
          </>
        </Route>
        <Route exact path="/">
          <Home loginUser={loginUser} logoutUser={logoutUser} />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Navbar;
