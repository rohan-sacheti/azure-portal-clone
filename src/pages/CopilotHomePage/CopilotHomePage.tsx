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
}

const CopilotHomePage: React.FC = () => {
    const styles = useStyles();
    const [messages, setMessages] = useState<IMessage[]>([
        { sender: 'copilot', text: "Welcome to Azure, Rohan. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState('');

    const promptStarters = [
        "Deploy a new web app",
        "Show me my monthly spending",
        "Create a virtual machine",
        "What are the latest AI services?",
    ];

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { sender: 'user', text: inputValue.trim() }]);
            // In a real app, you'd get a response from the backend here.
            // For this demo, we'll just clear the input.
            setInputValue('');
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
                                <Body1>{msg.text}</Body1>
                            </div>
                            {msg.sender === 'user' && <Avatar name="Rohan" color="colorful" />}
                        </div>
                    ))}
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
                    <Button icon={<SendRegular />} appearance="primary" onClick={handleSend}>Send</Button>
                </div>
            </div>
        </div>
    );
};

export default CopilotHomePage;
