import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Text, Avatar, Persona } from '@fluentui/react-components';
import { SendRegular } from '@fluentui/react-icons';
import './CopilotBar.css';

interface Message {
    id: number;
    from: 'user' | 'bot';
    text: string;
    avatar: React.ReactNode;
    timestamp: Date;
}

const CopilotBar: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { 
   