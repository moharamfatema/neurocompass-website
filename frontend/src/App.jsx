import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from "@/components/theme-provider"

import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Visualization from './pages/Visualization';
import Prediction from './pages/Prediction';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/prediction" element={<Prediction />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
