/* eslint-disable import/extensions */
import React from 'react';
import { Nav, LinkCss, Logo, Menu, Item } from '../../styles/navBarStyles';
import { Route, Switch, Link } from 'react-router-dom';
// import { Nav, LinkCss, Logo, Menu, Item } from '../styles/navBarStyles';
// import GoogleButton from 'react-google-button';
import Search from '../Pages/Search.jsx';
// import FavoriteTrails from './FavoriteTrails.jsx';
import Home from '../Pages/HomeScreen.jsx';
import Map from '../Pages/Map.jsx';
import Login from '../Pages/Login.jsx';

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
  register,
  unregister,
  addEvent,
  removeEvent,
  showAlert,
  setShowAlert,
}) => (
  <div>
    <div>
      <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">
            <Logo as={Link} to="/" style={{ fontsize: '40px' }}>
              TRAILZ
            </Logo>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Menu className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Item className="nav-item">
                <LinkCss as={Link} to="/" className="nav-link">
                  Home
                </LinkCss>
              </Item>
              {user && (
                <>
                  <Item className="nav-item">
                    <LinkCss as={Link} to="/search" className="nav-link">
                      Search
                    </LinkCss>
                  </Item>
                  <Item className="nav-item">
                    <LinkCss as={Link} to="/favorite" className="nav-link">
                      Favorite Trails
                    </LinkCss>
                  </Item>
                  <Item className="nav-item">
                    <LinkCss as={Link} to="/events" className="nav-link">
                      Events
                    </LinkCss>
                  </Item>
                </>
              )}
              <Item className="nav-item">
                <LinkCss as={Link} to="/" className="nav-link">
                  <Login
                    loginUser={loginUser}
                    logoutUser={logoutUser}
                    user={user}
                  />
                </LinkCss>
              </Item>
            </Menu>
          </div>
        </div>
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
            {showAlert && (
              <div
                class="alert alert-danger"
                role="alert"
                onClick={() => setShowAlert(false)}
                style={{ margin: 0 }}
              >
                This event no longer exists.
              </div>
            )}
            <Map
              results={events}
              position={position}
              register={register}
              unregister={unregister}
              addEvent={addEvent}
              removeEvent={removeEvent}
              events={events}
              user={user}
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
