import React from 'react';

//import styleApp from './App.module.css';
import './App.scss'
import { Header } from './Components/Header/Header';
import { Home } from './Pages/Home';
import { Card } from './Pages/Card'; 
import { FullShawermas } from './Pages/FullShawermas';

import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="container">
      <Header />
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/shawerma/:id" element={<FullShawermas />}/>
      <Route path='/card' element={<Card />}/>
      </Routes>
    </div>
    
  );
}



export default App;
