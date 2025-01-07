import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Visualization from './pages/Visualization';
import Prediction from './pages/Prediction';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </Router>
  )
}

export default App
