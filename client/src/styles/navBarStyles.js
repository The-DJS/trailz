import styled from 'styled-components';

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
  font-size: 25px;
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
  /* li:nth-child(odd) {
    margin: 0px 20px;
  } */
  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const Item = styled.li``;

export { Nav, LinkCss, Logo, Menu, Item };
