import { app } from '../src/core/index.js'; 

const Home = (props) => `
    <div>
        <h1>Welcome to Kaya UI</h1>
        <p>This is the home page of the application.</p>
        <button onclick="${props.alert}">Click Me</button>
    </div>
`;

app.component('home', Home); 

export default Home;