import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Location from './Component/Locations/Location';
import Login from './Component/Login/Login';
import SignUp from './Component/SignUp/Signup';
import reportWebVitals from './reportWebVitals';
import Navigation from './Component/navigation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
