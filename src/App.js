import React from 'react';
import home from './Images/home.jpg';
import './App.css';
import  GoogleForm from './Google'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src ={home} className= "App-logo"></img>
       <label className="App-label">Welcome to Airtel -Labs</label>
          <div className="App-Google">
          <GoogleForm></GoogleForm>
          </div>
         
      </header>
    </div>
  );
}

export default App;
