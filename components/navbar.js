import { app } from '../src/core/index.js'; 

const Navbar = (props) => `
  <nav>
    <a href="#">${props.homeLabel || 'Home'}</a> |
    <a href="#">${props.aboutLabel || 'About'}</a>
    ${props.links ? `| <a href="#">${props.links}</a>` : ''}
  </nav>
`;

app.component('navbar', Navbar); 

export default Navbar;