import React, { useState, useEffect, useRef } from 'react';
import {
    makeStyles,
    shorthands,
    Title1,
    Title3,
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
    diffContainer: {
        ...shorthands.margin('10px', '0'),
        ...shorthands.padding('12px', '15px'),
        ...shorthands.borderRadius('6px'),
        backgroundColor: '#1e1e1e', // VS Code dark theme color
        color: '#d4d4d4',
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: '13px',
        lineHeight: '1.5',
        overflowX: 'auto',
    },
    diffTitle: {
        color: '#569cd6',
        fontWeight: 'bold',
    },
    diffLine: {
        display: 'block',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    diffRemove: {
        color: '#ce9178',
        backgroundColor: 'rgba(206, 145, 120, 0.1)',
        display: 'block',
    },
    diffAdd: {
        color: '#b5cea8',
        backgroundColor: 'rgba(181, 206, 168, 0.1)',
        display: 'block',
    },
    actionButtons: {
        display: 'flex',
        ...shorthands.gap('10px'),
        ...shorthands.margin('10px', '0', '0', '0'),
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
    details?: Record<string, string>;
}

interface ChatMessage {
    id: number;
    from: 'user' | 'bot';
    text: string;
    type?: 'text' | 'diff';
    diff?: {
        resource: string;
        property: string;
        oldValue: string;
        newValue: string;
    };
    actions?: Array<{
        text: string;
        handler: () => void;
        appearance?: "primary" | "outline";
    }>;
}

const initialResources: Resource[] = [
    { id: 'prod-web-app', name: 'prod-web-app', type: 'App Service', status: 'Running', location: 'East US' },
    { id: 'dev-vm-01', name: 'dev-vm-01', type: 'Virtual Machine', status: 'Stopped', location: 'West Europe' },
    { id: 'main-storage-acc', name: 'main-storage-acc', type: 'Storage Account', status: 'Running', location: 'East US' },
    { id: 'user-db', name: 'user-db', type: 'SQL Database', status: 'Running', location: 'West Europe', details: { storage: '2 GB' } },
];

const ResourceManagementPage: React.FC = () => {
    const styles = useStyles();
    const [resources, setResources] = useState<Resource[]>(initialResources);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, from: 'bot', text: "I can help you manage your resources. Try asking me to 'Increase user-db storage to 10 GB'." }
    ]);
    const [input, setInput] = useState('');
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    const handleApplyChange = (resourceId: string, newValue: string) => {
        setMessages(prev => prev.filter(m => m.type !== 'diff'));

        const resourceName = resources.find(r => r.id === resourceId)?.name || resourceId;

        const steps = [
            { delay: 500, text: `✅ Confirmation received. Applying changes to **${resourceName}**.` },
            { delay: 1500, text: `Generating and deploying ARM template...` },
            { delay: 3500, text: `Validating deployment...` },
            { delay: 5000, text: `✅ Success! Storage for **${resourceName}** has been updated to **${newValue}**.`, action: () => {
                setResources(prev => prev.map(r => r.id === resourceId ? { ...r, details: { ...r.details, storage: newValue } } : r));
            }},
        ];

        let cumulativeDelay = 0;
        steps.forEach(step => {
            cumulativeDelay += step.delay;
            setTimeout(() => {
                if (step.action) step.action();
                setMessages(prev => [...prev, { id: Date.now() + cumulativeDelay, from: 'bot', text: step.text }]);
            }, cumulativeDelay);
        });
    };

    const handleCancelChange = () => {
        setMessages(prev => prev.filter(m => m.type !== 'diff'));
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now(), from: 'bot', text: "Understood. The operation has been cancelled." }]);
        }, 500);
    };

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage: ChatMessage = { id: Date.now(), from: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        const lowerInput = input.toLowerCase();
        const storageRegex = /increase(?: storage for| my)? ([\w-]+(?:-db)?) storage to ([\d]+ ?gb)/i;
        const match = lowerInput.match(storageRegex);

        if (match) {
            const resourceName = match[1]; // Use the captured resource name
            const newSize = match[2].toUpperCase();
            const resource = resources.find(r => r.name.toLowerCase() === resourceName.toLowerCase());

            if (!resource) {
                setTimeout(() => {
                    setMessages(prev => [...prev, { id: Date.now(), from: 'bot', text: `Sorry, I couldn't find the resource named "${resourceName}". Please check the name and try again.` }]);
                }, 1000);
                return;
            }

            const oldSize = resource?.details?.storage || 'N/A';

            const diffMessage: ChatMessage = {
                id: Date.now() + 1,
                from: 'bot',
                text: `I've generated an ARM template to update the storage for **${resource.name}**. Please review the diff and confirm.`,
                type: 'diff',
                diff: {
                    resource: resource.name,
                    property: 'properties.storageProfile.dataDisks[0].diskSizeGB',
                    oldValue: oldSize,
                    newValue: newSize,
                },
                actions: [
                    { text: 'Apply Change', handler: () => handleApplyChange(resource.id, newSize), appearance: 'primary' },
                    { text: 'Cancel', handler: handleCancelChange, appearance: 'outline' },
                ]
            };
            
            setTimeout(() => {
                setMessages(prev => [...prev, diffMessage]);
            }, 1500);

        } else {
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now(), from: 'bot', text: "Sorry, I can only process requests to increase database storage right now (e.g., 'increase user-db storage to 10gb')." }]);
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
                                <TableHeaderCell>Details</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resources.map(res => (
                                <TableRow key={res.id}>
                                    <TableCell>{resourceIcons[res.type]} {res.name}</TableCell>
                                    <TableCell>{res.type}</TableCell>
                                    <TableCell>{getStatusBadge(res.status)}</TableCell>
                                    <TableCell>{res.location}</TableCell>
                                    <TableCell>{res.details?.storage ? `Storage: ${res.details.storage}` : ''}</TableCell>
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
                                {msg.type === 'diff' && msg.diff && (
                                    <div className={styles.diffContainer}>
                                        <Title3 className={styles.diffTitle}>ARM Template Diff</Title3>
                                        <pre style={{ margin: 0, padding: 0 }}>
                                            <code>
                                                <span className={styles.diffLine}>  "resource": "{msg.diff.resource}",</span>
                                                <span className={styles.diffLine}>  "properties": {"{"}</span>
                                                <span className={styles.diffRemove}>-   "{msg.diff.property}": "{msg.diff.oldValue}"</span>
                                                <span className={styles.diffAdd}>+   "{msg.diff.property}": "{msg.diff.newValue}"</span>
                                                <span className={styles.diffLine}>  {"}"}</span>
                                            </code>
                                        </pre>
                                    </div>
                                )}
                                {msg.actions && (
                                    <div className={styles.actionButtons}>
                                        {msg.actions.map(action => (
                                            <Button key={action.text} onClick={action.handler} appearance={action.appearance}>{action.text}</Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.chatInput}>
                    <Input
                        value={input}
                        onChange={(_, data) => setInput(data.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="e.g., Increase user-db storage to 10 GB"
                        style={{ width: '100%' }}
                    />
                    <Button icon={<SendRegular />} appearance="primary" onClick={handleSend} />
                </div>
            </div>
        </div>
    );
};

export default ResourceManagementPage;
