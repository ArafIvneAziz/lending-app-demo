import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
/*
In this file, we're importing React and ReactDOM for rendering the application. We're also importing the BrowserRouter from 'react-router-dom' which we wrap around our App component so we can use routing throughout our application.

We import the App component, which will contain our other components and the routing logic.

Lastly, we're importing an index.css file for global styles, which you might replace with your CSS or CSS-in-JS library of choice.

The application is then rendered into a div with an id of root, which would be found in your public/index.html file.
*/