import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CopilotBar from '../CopilotBar/CopilotBar';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCopilotOpen, setIsCopilotOpen] = useState(true);

  const toggleCopilot = () => {
    setIsCopilotOpen(!isCopilotOpen);
  };

  return (
    <div className="layout">
      <Header onToggleCopilot={toggleCopilot} />
      <div className="main-content">
        <Sidebar />
        <main className={`content ${isCopilotOpen ? 'copilot-open' : ''}`}>
          {children}
        </main>
        <div className={`copilot-container ${isCopilotOpen ? 'open' : ''}`}>
          <CopilotBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
