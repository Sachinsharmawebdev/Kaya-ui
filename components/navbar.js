import { app } from '../src/core/index.js';

const Navbar = {
  template: ({ $emit }) => `
    <nav data-component="navbar">
      <a href="#" @click="handleHomeClick">Home</a> |
      <a href="#" @click="handleAboutClick">About</a>
      <a href="#" @click="handleContactClick">Contact</a>
    </nav>
  `,
  
  handlers: {
    handleHomeClick: (e) => {
      e.preventDefault();
      console.log('Home clicked');
      // Navigation logic here
    },
    
    handleAboutClick: (e) => {
      e.preventDefault();
      console.log('About clicked');
    },
    
    handleContactClick: (e) => {
      e.preventDefault();
      console.log('Contact clicked');
    }
  }
};

app.component('navbar', Navbar);
export default Navbar;