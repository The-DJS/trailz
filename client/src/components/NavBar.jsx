import React, { } from 'react';
import styled from 'styled-components';
import { Route, Switch, Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import Search from './Search.jsx';
import FavoriteTrails from './FavoriteTrails.jsx';
import Home from './HomeScreen.jsx';
import Map from './Map.jsx'

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

const Navbar = () => (
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
            <LinkCss as={Link} to="/map">
              Map
            </LinkCss>
          </Item>
          <Item>
            <LinkCss as={Link} to="/search">
              Search
            </LinkCss>
          </Item>
          <Item>
            <LinkCss as={Link} to="/favorite">
              Favorite Trails
            </LinkCss>
          </Item>
        </Menu>
      </Nav>
    </div>
    <div>
      <Switch>
        <Route exact path="/search" component={Search} />
        <Route exact path="/favorite" component={FavoriteTrails} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  </div>
);

export default Navbar;
