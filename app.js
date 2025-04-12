import { app } from './src/core/index.js';
import { injectHTML } from './src/helpers/inject.js';
import './components/navbar.js';

// Button component
app.component('my-button', {
  template: ({ label = 'Click me' }) => `
    <button @click="handleClick">${label}</button>
  `,
  
  handlers: {
    handleClick: (e) => {
      console.log('Button clicked');
      alert('Button was clicked!');
    }
  }
});

// Main layout
app.component('app-layout', {
  template: () => `
    <div data-component="app-layout">
      <navbar />
      <main>
        <h1>Kaya App with Clean @event Syntax</h1>
        <my-button label="Press Me" />
      </main>
    </div>
  `,
  
  handlers: {
    // Layout-level handlers can go here
  }
});

injectHTML(document.getElementById('root'), app.render('app-layout'));