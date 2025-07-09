import React from 'react';
import {
    makeStyles,
    shorthands,
    Title1,
    Card,
    CardHeader,
    Body1,
    Button,
    Textarea,
    Field,
    Toolbar,
    ToolbarButton,
    Tooltip,
} from '@fluentui/react-components';
import { PlayRegular, CodeRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('20px'),
        ...shorthands.padding('20px'),
    },
    editor: {
        height: '200px',
    }
});

const ResourceManagementPage: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Title1>Resource Management</Title1>
            <Card>
                <CardHeader header={<Body1><b>Natural Language to ARM</b></Body1>} />
                <Field label="Describe the changes you want to make:">
                    <Textarea
                        className={styles.editor}
                        placeholder="e.g., Add 10 GB storage to my dev DB"
                    />
                </Field>
                <Toolbar>
                    <Tooltip content="Execute" relationship="label">
                        <ToolbarButton icon={<PlayRegular />} />
                    </Tooltip>
                    <Tooltip content="Show ARM/Bicep" relationship="label">
                        <ToolbarButton icon={<CodeRegular />} />
                    </Tooltip>
                </Toolbar>
            </Card>
        </div>
    );
};

export default ResourceManagementPage;
