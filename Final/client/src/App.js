
import React from 'react';
import './Apph1.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar';
import Tour from './components/tour';
import ContactPage from './components/contactpage';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route element={<Tour />} path={"/tours"}></Route>
        <Route element={<ContactPage />} path={"/contacts"}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;