import React, { useState } from 'react';
import { 
    makeStyles, 
    shorthands, 
    Title1, 
    Input, 
    Button, 
    Card, 
    CardHeader, 
    Body1, 
    Avatar 
} from '@fluentui/react-components';
import { SendRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('20px'),
        ...shorthands.padding('20px'),
        height: 'calc(100vh - 120px)', // Adjust based on header/copilot bar height
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        ...shorthands.border('1px', 'solid', '#ccc'),
        ...shorthands.borderRadius('8px'),
        ...shorthands.padding('20px'),
    },
    messageArea: {
        flexGrow: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('10px'),
    },
    inputArea: {
        display: 'flex',
        ...shorthands.gap('10px'),
        marginTop: '20px',
    },
    promptStarters: {
        display: 'flex',
        flexWrap: 'wrap',
        ...shorthands.gap('10px'),
        marginBottom: '20px',
    },
    message: {
        display: 'flex',
        ...shorthands.gap('10px'),
        alignItems: 'center',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    copilotMessage: {
        justifyContent: 'flex-start',
    },
    messageContent: {
        ...shorthands.padding('10px'),
        ...shorthands.borderRadius('8px'),
        backgroundColor: '#f5f5f5',
    }
});

interface IMessage {
    text: string;
    sender: 'user' | 'copilot';
    timestamp?: Date;
}

const CopilotHomePage: React.FC = () => {
    const styles = useStyles();
    const [messages, setMessages] = useState<IMessage[]>([
        { sender: 'copilot', text: "Welcome to Azure, Rohan. How can I help you today?", timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const promptStarters = [
        "Deploy a new web app",
        "Show me my monthly spending", 
        "Create a SQL DB server",
        "What are the latest AI services?",
    ];

    const handleSend = () => {
        if (inputValue.trim()) {
            const userMessage = { sender: 'user' as const, text: inputValue.trim(), timestamp: new Date() };
            setMessages(prev => [...prev, userMessage]);
            
            const userQuery = inputValue.toLowerCase();
            const currentInput = inputValue.trim();
            setInputValue('');
            setIsProcessing(true);

            // SQL DB Server creation simulation
            if (userQuery.includes('sql') && (userQuery.includes('db') || userQuery.includes('database') || userQuery.includes('server'))) {
                const steps = [
                    { delay: 1000, text: "🤖 Understood! I'll help you create a SQL Database server. Let me start the provisioning process..." },
                    { delay: 2500, text: "⚙️ **Step 1/4: Creating Virtual Machine**\nProvisioning a Standard_D4s_v3 VM in East US region with 16 GB RAM and 4 vCPUs..." },
                    { delay: 4000, text: "💾 **Step 2/4: Configuring Storage**\nAttaching a 1 TB Premium SSD for optimal database performance and creating backup storage..." },
                    { delay: 5500, text: "🗄️ **Step 3/4: Installing SQL Server**\nDeploying SQL Server 2022 Enterprise Edition with high availability configuration..." },
                    { delay: 7000, text: "🔐 **Step 4/4: Configuring Security & Network**\nSetting up firewall rules, SSL certificates, and Azure Active Directory integration..." },
                    { delay: 8500, text: "✅ **SQL Database Server Ready!**\n\n🎯 **Configuration Summary:**\n• Server Name: sqlserver-eastus-prod-01\n• Location: East US\n• VM Size: Standard_D4s_v3 (4 vCPUs, 16 GB RAM)\n• Storage: 1 TB Premium SSD\n• SQL Server: 2022 Enterprise Edition\n• Resource Group: rg-database-prod\n\n🔗 Connection string and credentials have been securely stored in Azure Key Vault.\n\nYour SQL Database server is now ready to accept connections!" }
                ];

                let cumulativeDelay = 0;
                steps.forEach((step, index) => {
                    cumulativeDelay += step.delay;
                    setTimeout(() => {
                        setMessages(prev => [...prev, {
                            sender: 'copilot',
                            text: step.text,
                            timestamp: new Date()
                        }]);
                        
                        if (index === steps.length - 1) {
                            setIsProcessing(false);
                        }
                    }, cumulativeDelay);
                });
            } else {
                // Generic response for other queries
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        sender: 'copilot',
                        text: `I understand you want to "${currentInput}". I'm working on that request and will provide you with detailed guidance shortly.`,
                        timestamp: new Date()
                    }]);
                    setIsProcessing(false);
                }, 1500);
            }
        }
    };

    const handlePromptClick = (prompt: string) => {
        setInputValue(prompt);
    };

    return (
        <div className={styles.root}>
            <Title1>Copilot</Title1>
            <div className={styles.chatContainer}>
                <div className={styles.messageArea}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.copilotMessage}`}>
                            {msg.sender === 'copilot' && <Avatar name="Copilot" color="brand" />}
                            <div className={styles.messageContent}>
                                <Body1 style={{ whiteSpace: 'pre-line' }}>{msg.text}</Body1>
                            </div>
                            {msg.sender === 'user' && <Avatar name="Rohan" color="colorful" />}
                        </div>
                    ))}
                    {isProcessing && (
                        <div className={`${styles.message} ${styles.copilotMessage}`}>
                            <Avatar name="Copilot" color="brand" />
                            <div className={styles.messageContent}>
                                <Body1>🤖 Processing your request...</Body1>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.promptStarters}>
                    {promptStarters.map((prompt, index) => (
                        <Button key={index} appearance="outline" onClick={() => handlePromptClick(prompt)}>
                            {prompt}
                        </Button>
                    ))}
                </div>
                <div className={styles.inputArea}>
                    <Input 
                        value={inputValue}
                        onChange={(_, data) => setInputValue(data.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything about Azure..."
                        style={{ width: '100%' }} 
                    />
                    <Button 
                        icon={<SendRegular />} 
                        appearance="primary" 
                        onClick={handleSend}
                        disabled={isProcessing || !inputValue.trim()}
                    >
                        {isProcessing ? 'Processing...' : 'Send'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CopilotHomePage;
