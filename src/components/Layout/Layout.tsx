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
      <Header onToggleCopilot={toggleCopilot}/>
    