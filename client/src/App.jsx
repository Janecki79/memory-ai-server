import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CloudSettingsPage from './pages/CloudSettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cloud-settings" element={<CloudSettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
