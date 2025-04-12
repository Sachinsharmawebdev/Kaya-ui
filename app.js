import { app } from './src/core/index.js';
import { injectHTML } from './src/helpers/inject.js';
import './components/navbar.js'; 

app.component('layout', () => `
  <navbar homeLabel="Main" aboutLabel="Info" links="Contact" />
  <main><h1>This is the new Kaya App with component structure</h1></main>
`);

injectHTML(document.getElementById('root'), app.render('layout'));