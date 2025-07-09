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
            id: 1, 
            from: 'bot', 
            text: "Hello! I'm your Azure Copilot assistant. I can help you with resource management, troubleshooting, best practices, and answering questions about Azure services. What can I help you with today?", 
            avatar: <Avatar name="Copilot" badge={{ status: 'available' }} color="colorful" />,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (input.trim() === '') return;
        
        const userMessage: Message = {
            id: Date.now(),
            from: 'user',
            text: input,
            avatar: <Avatar name="You" color="brand" />,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        const userQuery = input.toLowerCase();
        setInput('');
        setIsTyping(true);
        
        // Initial response - agent spinning up
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                from: 'bot',
                text: "🤖 Initializing Azure Agent... I'm analyzing your request and spinning up the appropriate services.",
                avatar: <Avatar name="Copilot" badge={{ status: 'busy' }} color="colorful" />,
                timestamp: new Date()
            }]);
            
            setIsTyping(true);
            
            // Progress update 1
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, {
                    id: Date.now() + 2,
                    from: 'bot',
                    text: "⚡ Agent status: Connected to Azure Resource Manager\n📊 Scanning your subscription and resources...",
                    avatar: <Avatar name="Copilot" badge={{ status: 'busy' }} color="colorful" />,
                    timestamp: new Date()
                }]);
                
                setIsTyping(true);
                
                // Progress update 2
                setTimeout(() => {
                    setIsTyping(false);
                    
                    let taskSpecificResponse = "";
                    if (userQuery.includes('vm') || userQuery.includes('virtual machine')) {
                        taskSpecificResponse = "🖥️ Analyzing virtual machine configurations and recommendations...";
                    } else if (userQuery.includes('storage') || userQuery.includes('blob')) {
                        taskSpecificResponse = "💾 Evaluating storage account settings and optimization opportunities...";
                    } else if (userQuery.includes('cost') || userQuery.includes('billing')) {
                        taskSpecificResponse = "💰 Analyzing cost patterns and identifying optimization opportunities...";
                    } else if (userQuery.includes('security') || userQuery.includes('compliance')) {
                        taskSpecificResponse = "🔒 Running security compliance checks and vulnerability assessments...";
                    } else if (userQuery.includes('network') || userQuery.includes('vnet')) {
                        taskSpecificResponse = "🌐 Mapping network topology and analyzing connectivity patterns...";
                    } else {
                        taskSpecificResponse = "🔍 Processing your request and gathering relevant Azure insights...";
                    }
                    
                    setMessages(prev => [...prev, {
                        id: Date.now() + 3,
                        from: 'bot',
                        text: taskSpecificResponse,
                        avatar: <Avatar name="Copilot" badge={{ status: 'busy' }} color="colorful" />,
                        timestamp: new Date()
                    }]);
                    
                    setIsTyping(true);
                    
                    // Final response
                    setTimeout(() => {
                        setIsTyping(false);
                        setMessages(prev => [...prev, {
                            id: Date.now() + 4,
                            from: 'bot',
                            text: "✅ Analysis complete! I've gathered comprehensive insights about your request.\n\n🔔 I'll ping you with detailed recommendations and actionable steps in just a moment. You can continue working while I prepare the full report.\n\n💡 In the meantime, feel free to ask me anything else!",
                            avatar: <Avatar name="Copilot" badge={{ status: 'available' }} color="colorful" />,
                            timestamp: new Date()
                        }]);
                        
                        // Simulate the "ping back" after task completion
                        setTimeout(() => {
                            setMessages(prev => [...prev, {
                                id: Date.now() + 5,
                                from: 'bot',
                                text: "🎯 **Task Complete!** I've finished analyzing your request.\n\nHere's what I found:\n• 3 optimization opportunities identified\n• 2 best practice recommendations\n• 1 potential cost savings area\n\nWould you like me to walk you through these findings, or would you prefer a detailed summary?",
                                avatar: <Avatar name="Copilot" badge={{ status: 'available' }} color="colorful" />,
                                timestamp: new Date()
                            }]);
                        }, 8000); // Ping back after 8 seconds
                        
                    }, 2000);
                }, 1500);
            }, 1200);
        }, 800);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

  return (
    <div className="copilot-bar">
        <div className="copilot-header">
            <Persona 
                name="Azure Copilot"
                secondaryText="Online • Ready to help"
                avatar={{
                    name: "Copilot",
                    badge: { status: 'available' },
                    color: 'colorful'
                }}
                size="large"
            />
        </div>
        <div className="copilot-chat-history" ref={chatHistoryRef}>
            {messages.map(msg => (
                <div key={msg.id} className={`chat-message ${msg.from}`}>
                    <div className="chat-avatar">{msg.avatar}</div>
                    <div className="chat-bubble">
                        <Text>{msg.text}</Text>
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className="chat-message bot">
                    <div className="chat-avatar">
                        <Avatar name="Copilot" badge={{ status: 'available' }} color="colorful" />
                    </div>
                    <div className="chat-bubble">
                        <Text>
                            <span className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </Text>
                    </div>
                </div>
            )}
        </div>
        <div className="copilot-input-area">
            <Input
                value={input}
                onChange={(_, data) => setInput(data.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about Azure..."
                className="copilot-input"
                contentAfter={
                    <Button 
                        icon={<SendRegular />} 
                        appearance="subtle" 
                        onClick={handleSend}
                        disabled={input.trim() === ''}
                    />
                }
            />
        </div>
    </div>
  );
};

export default CopilotBar;
