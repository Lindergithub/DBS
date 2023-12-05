
import React, { useState } from 'react';
import './App.css';
import './AppContact.css';
import './AppTour.css';
import './AppTraveler.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebarpage';
import TourPage from './components/tourpage';
import ContactPage from './components/contactpage';
import TravelerPage from './components/travelerpage';

function App() {
  // 使用狀態追蹤 Sidebar 是否應該顯示
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 切換 Sidebar 顯示狀態的函數
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      {/* 將 Sidebar 作為一個按鈕傳遞 toggleSidebar 函數 */}
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰ 
      </button>

      {/* 將 Sidebar 作為一個按鈕傳遞 toggleSidebar 函數 */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Routes>
        <Route element={<TourPage />} path="/tours"></Route>
        <Route element={<ContactPage />} path="/contacts"></Route>
        <Route element={<TravelerPage />} path="/travelers"></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;