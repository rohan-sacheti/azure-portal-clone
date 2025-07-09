import React, { useState } from 'react';
import {
    makeStyles,
    shorthands,
    Title1,
    Body1,
    Button,
    Field,
    Input,
    Dropdown,
    Option,
    Checkbox,
    ProgressBar,
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Subtitle2,
} from '@fluentui/react-components';
import { BuildingRegular, BrainCircuitRegular, WrenchRegular, CheckmarkRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('20px'),
        ...shorthands.padding('20px'),
        maxWidth: '800px',
        margin: '0 auto',
    },
    wizardContainer: {
        ...shorthands.border('1px', 'solid', '#e0e0e0'),
        ...shorthands.borderRadius('8px'),
        ...shorthands.padding('24px'),
    },
    stepContent: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('20px'),
        marginTop: '20px',
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
    },
    progressBar: {
        marginBottom: '20px',
    },
    summarySection: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('10px'),
    }
});

const steps = [
    { title: 'Basics', icon: <BuildingRegular /> },
    { title: 'Model Configuration', icon: <BrainCircuitRegular /> },
    { title: 'Skills & Tools', icon: <WrenchRegular /> },
    { title: 'Review + Create', icon: <CheckmarkRegular /> },
];

const AgentWorkshopPage: React.FC = () => {
    const styles = useStyles();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        agentName: 'MyNewAgent',
        subscription: 'Free Trial',
        region: 'east-us',
        modelFamily: 'gpt-4',
        modelDeployment: 'gpt-4-1106-preview',
        useGraphRag: true,
        useWebSearch: true,
        useCodeInterpreter: false,
    });

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: // Basics
                return (
                    <div className={styles.stepContent}>
                        <Field label="Agent Name" required>
                            <Input value={formData.agentName} />
                        </Field>
                        <Field label="Subscription" required>
                            <Dropdown value={formData.subscription}>
                                <Option value="free-trial">Free Trial</Option>
                                <Option value="pay-as-you-go">Pay-As-You-Go</Option>
                            </Dropdown>
                        </Field>
                        <Field label="Region" required>
                            <Dropdown value={formData.region}>
                                <Option value="east-us">East US</Option>
                                <Option value="west-us">West US</Option>
                                <Option value="west-europe">West Europe</Option>
                            </Dropdown>
                        </Field>
                    </div>
                );
            case 1: // Model Configuration
                return (
                    <div className={styles.stepContent}>
                        <Field label="Model Family" required>
                            <Dropdown value={formData.modelFamily}>
                                <Option value="gpt-4">GPT-4</Option>
                                <Option value="gpt-3.5">GPT-3.5</Option>
                            </Dropdown>
                        </Field>
                        <Field label="Model Deployment" required>
                            <Dropdown value={formData.modelDeployment}>
                                <Option value="gpt-4-1106-preview">gpt-4-1106-preview</Option>
                                <Option value="gpt-4-vision-preview">gpt-4-vision-preview</Option>
                            </Dropdown>
                        </Field>
                    </div>
                );
            case 2: // Skills & Tools
                return (
                    <div className={styles.stepContent}>
                        <Accordion collapsible>
                            <AccordionItem value="1">
                                <AccordionHeader><Subtitle2>Built-in Tools</Subtitle2></AccordionHeader>
                                <AccordionPanel>
                                    <Field>
                                        <Checkbox checked={formData.useGraphRag} label="Graph RAG" />
                                    </Field>
                                    <Field>
                                        <Checkbox checked={formData.useWebSearch} label="Web Search" />
                                    </Field>
                                    <Field>
                                        <Checkbox checked={formData.useCodeInterpreter} label="Code Interpreter" />
                                    </Field>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem value="2">
                                <AccordionHeader><Subtitle2>Custom Tools</Subtitle2></AccordionHeader>
                                <AccordionPanel>
                                    <Button>Attach Function</Button>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                );
            case 3: // Review + Create
                return (
                    <div className={styles.summarySection}>
                        <Title1>Review your configuration</Title1>
                        <Body1><strong>Agent Name:</strong> {formData.agentName}</Body1>
                        <Body1><strong>Subscription:</strong> {formData.subscription}</Body1>
                        <Body1><strong>Region:</strong> {formData.region}</Body1>
                        <Body1><strong>Model:</strong> {formData.modelDeployment}</Body1>
                        <Body1><strong>Skills:</strong></Body1>
                        <ul>
                            {formData.useGraphRag && <li>Graph RAG</li>}
                            {formData.useWebSearch && <li>Web Search</li>}
                            {formData.useCodeInterpreter && <li>Code Interpreter</li>}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.root}>
            <Title1>Create AI Agent Workspace</Title1>
            <div className={styles.wizardContainer}>
                <Subtitle2>{`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].title}`}</Subtitle2>
                <ProgressBar value={currentStep / (steps.length - 1)} className={styles.progressBar} />
                
                {renderStepContent()}

                <div className={styles.navigation}>
                    <Button onClick={handleBack} disabled={currentStep === 0}>Back</Button>
                    {currentStep < steps.length - 1 ? (
                        <Button appearance="primary" onClick={handleNext}>Next</Button>
                    ) : (
                        <Button appearance="primary" onClick={() => alert('Deployment started!')}>Create</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AgentWorkshopPage;
