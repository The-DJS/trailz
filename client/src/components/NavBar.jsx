/* eslint-disable import/extensions */
import React from 'react';
import { Nav, LinkCss, Logo, Menu, Item } from '../styles/navBarStyles';
import { Route, Switch, Link } from 'react-router-dom';
// import GoogleButton from 'react-google-button';
import Search from './Search.jsx';
// import FavoriteTrails from './FavoriteTrails.jsx';
import Home from './HomeScreen.jsx';
import Map from './Map.jsx';
import Login from './Login.jsx';

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
  events,
  // attending,
  register,
  unregister,
  addEvent,
  removeEvent,
  // created,
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
              <Login
                loginUser={loginUser}
                logoutUser={logoutUser}
                user={user}
              />
            </LinkCss>
          </Item>
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
            {user && (
              <LinkCss as={Link} to="/favorite">
                Favorite Trails
              </LinkCss>
            )}
          </Item>
          <Item>
            <LinkCss as={Link} to="/events">
              Events
            </LinkCss>
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
              register={register}
              unregister={unregister}
              addEvent={addEvent}
              removeEvent={removeEvent}
            />
          </>
        </Route>
        <Route exact path="/favorite">
          <>
            <Map
              results={favorites}
              removeFavorite={removeFavorite}
              position={position}
              register={register}
              unregister={unregister}
              addEvent={addEvent}
              removeEvent={removeEvent}
            />
          </>
        </Route>
        <Route exact path="/events">
          <>
            <Map
              results={events}
              position={position}
              register={register}
              unregister={unregister}
              addEvent={addEvent}
              removeEvent={removeEvent}
              events={events}
              user={user}
              // attending={attending}
              // created={created}
            />
          </>
        </Route>
        <Route exact path="/">
          <Home loginUser={loginUser} logoutUser={logoutUser} user={user} />
        </Route>
      </Switch>
    </div>
  </div>
);

/// logout button is funcitonal now
export default Navbar;
