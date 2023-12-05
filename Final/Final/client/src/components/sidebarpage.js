import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import your CSS file for styling

function Sidebar({ isOpen, toggleSidebar }) {
  const handleLinkClick = () => {
    // 在點擊 Link 時收起 Sidebar
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* 用戶帳號圖片 */}

      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>

      <ul >
        <li onClick={handleLinkClick} className="sidebounder"><Link to="/" className="element-link">⟰ Home</Link></li>
        <li onClick={handleLinkClick} className="sidebounder"><Link to="/tours" className="element-link">Tour</Link></li>
        <li onClick={handleLinkClick} className="sidebounder"><Link to="/contacts" className="element-link">Contact Person</Link></li>
        <li onClick={handleLinkClick} className="sidebounder"><Link to="/travelers" className="element-link">Traveler</Link></li>
      </ul>
    </div>
    


  );
}

export default Sidebar;
