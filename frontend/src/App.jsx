import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from "@/components/theme-provider"
import { queryClient } from './services/utils';

import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Visualization from './pages/visualization';
import Prediction from './pages/Prediction';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="/visualization" element={<Visualization />} />
              <Route path="/prediction" element={<Prediction />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
