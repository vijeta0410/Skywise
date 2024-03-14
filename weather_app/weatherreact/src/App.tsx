// App.tsx
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Destinations from './components/Destinations';
import SpotDetails from './components/SpotDetails';
import ClimateList from './components/ClimateList';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import PlannedTripsPage from './components/PlannedTripsPage';
import Login from './components/LoginComponent';

const App = () => {
  return (

    
    <Router>
      <Routes>
        <Route path="/climatelist" element={<ClimateList />} />
        <Route path="/destinations/:climateId" element={<Destinations />} />
        <Route path="/spots/:destinationId" element={<SpotDetails />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/" element = {<LandingPage />} />
        <Route path="/plannedtripspage" element={<PlannedTripsPage />} />
        {/* <Route path="/Login" element={<Login/>}/> */}
       
        
      </Routes>
    </Router>




  );
};

export default App;