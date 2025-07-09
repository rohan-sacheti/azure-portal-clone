import React, { useState, useEffect, useRef } from 'react';
import {
    makeStyles,
    shorthands,
    Title1,
    Card,
    CardHeader,
    Body1,
    Button,
    Input,
    Avatar,
    Table,
    TableHeader,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
    Badge,
} from '@fluentui/react-components';
import { SendRegular, StorageRegular, ServerRegular, DatabaseRegular, GlobeRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        ...shorthands.padding('20px'),
        gap: '20px',
    },
    resourceList: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minWidth: 0,
    },
    chatContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: 0,
        ...shorthands.border('1px', 'solid', '#e0e0e0'),
        ...shorthands.borderRadius('8px'),
        overflow: 'hidden',
    },
    chatHistory: {
        flexGrow: 1,
        ...shorthands.padding('10px'),
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('10px'),
    },
    chatInput: {
        display: 'flex',
        ...shorthands.gap('10px'),
        ...shorthands.padding('10px'),
        ...shorthands.borderTop('1px', 'solid', '#e0e0e0'),
    },
    message: {
        display: 'flex',
        ...shorthands.gap('10px'),
        alignItems: 'flex-start',
        maxWidth: '90%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    botMessage: {
        alignSelf: 'flex-start',
    },
    messageBubble: {
        ...shorthands.padding('8px', '12px'),
        ...shorthands.borderRadius('8px'),
        backgroundColor: '#f0f0f0',
        whiteSpace: 'pre-line',
        wordBreak: 'break-word',
    },
    userMessageBubble: {
        backgroundColor: '#0078d4',
        color: 'white',
    },
});

const resourceIcons = {
    "App Service": <GlobeRegular />,
    "Virtual Machine": <ServerRegular />,
    "Storage Account": <StorageRegular />,
    "SQL Database": <DatabaseRegular />,
};

type ResourceStatus = "Running" | "Stopped" | "Updating" | "Error";

interface Resource {
    id: string;
    name: string;
    type: keyof typeof resourceIcons;
    status: ResourceStatus;
    location: string;
}

interface ChatMessage {
    id: number;
    from: 'user' | 'bot';
    text: string;
}

const initialResources: Resource[] = [
    { id: 'prod-web-app', name: 'prod-web-app', type: 'App Service', status: 'Running', location: 'East US' },
    { id: 'dev-vm-01', name: 'dev-vm-01', type: 'Virtual Machine', status: 'Stopped', location: 'West Europe' },
    { id: 'main-storage-acc', name: 'main-storage-acc', type: 'Storage Account', status: 'Running', location: 'East US' },
    { id: 'user-db', name: 'user-db', type: 'SQL Database', status: 'Running', location: 'West Europe' },
];

const ResourceManagementPage: React.FC = () => {
    const styles = useStyles();
    const [resources, setResources] = useState<Resource[]>(initialResources);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, from: 'bot', text: "I can help you manage your resources. What would you like to do?" }
    ]);
    const [input, setInput] = useState('');
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage: ChatMessage = { id: Date.now(), from: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);

        const lowerInput = input.toLowerCase();
        const targetResource = resources.find(r => lowerInput.includes(r.name.toLowerCase()));
        
        setInput('');

        if (targetResource) {
            const originalStatus = targetResource.status;
            const updateResourceStatus = (id: string, status: ResourceStatus) => {
                setResources(prev => prev.map(r => r.id === id ? { ...r, status } : r));
            };

            const steps = [
                { delay: 500, text: `Understood. Starting operation on resource: **${targetResource.name}**.` },
                { delay: 1500, text: `Applying configuration changes...`, action: () => updateResourceStatus(targetResource.id, 'Updating') },
                { delay: 3500, text: `Validating changes and restarting services...` },
                { delay: 5000, text: `✅ Operation successful! **${targetResource.name}** has been updated.`, action: () => updateResourceStatus(targetResource.id, originalStatus) },
            ];

            let cumulativeDelay = 0;
            steps.forEach(step => {
                cumulativeDelay += step.delay;
                setTimeout(() => {
                    if (step.action) step.action();
                    setMessages(prev => [...prev, { id: Date.now() + cumulativeDelay, from: 'bot', text: step.text }]);
                }, cumulativeDelay);
            });

        } else {
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now(), from: 'bot', text: "Sorry, I couldn't find that resource. Please specify the resource by its name." }]);
            }, 1000);
        }
    };

    const getStatusBadge = (status: ResourceStatus) => {
        switch (status) {
            case 'Running': return <Badge color="success">{status}</Badge>;
            case 'Stopped': return <Badge color="danger">{status}</Badge>;
            case 'Updating': return <Badge color="warning">{status}</Badge>;
            case 'Error': return <Badge color="danger">{status}</Badge>;
            default: return <Badge color="brand">{status}</Badge>;
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.resourceList}>
                <Title1>Resource Management</Title1>
                <Card>
                    <CardHeader header={<Body1><b>Deployed Resources</b></Body1>} />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Name</TableHeaderCell>
                                <TableHeaderCell>Type</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                                <TableHeaderCell>Location</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resources.map(res => (
                                <TableRow key={res.id}>
                                    <TableCell>{resourceIcons[res.type]} {res.name}</TableCell>
                                    <TableCell>{res.type}</TableCell>
                                    <TableCell>{getStatusBadge(res.status)}</TableCell>
                                    <TableCell>{res.location}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
            <div className={styles.chatContainer}>
                <CardHeader header={<Body1><b>Resource Chat</b></Body1>} />
                <div className={styles.chatHistory} ref={chatHistoryRef}>
                    {messages.map(msg => (
                        <div key={msg.id} className={`${styles.message} ${msg.from === 'user' ? styles.userMessage : styles.botMessage}`}>
                            {msg.from === 'bot' && <Avatar name="Copilot" color="brand" />}
                            <div className={`${styles.messageBubble} ${msg.from === 'user' ? styles.userMessageBubble : ''}`}>
                                <Body1>{msg.text}</Body1>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.chatInput}>
                    <Input
                        value={input}
                        onChange={(_, data) => setInput(data.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="e.g., Restart prod-web-app"
                        style={{ width: '100%' }}
                    />
                    <Button icon={<SendRegular />} appearance="primary" onClick={handleSend} />
                </div>
            </div>
        </div>
    );
};

export default ResourceManagementPage;
