import React from 'react';
import {
    makeStyles,
    shorthands,
    Title1,
    Card,
    CardHeader,
    Body1,
    Button,
    Input,
    Badge,
} from '@fluentui/react-components';
import { SearchRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('20px'),
        ...shorthands.padding('20px'),
    },
    marketplaceItems: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        ...shorthands.gap('20px'),
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
});

const MarketplacePage: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Title1>Marketplace</Title1>
            <Input
                placeholder="Search marketplace"
                contentAfter={<Button icon={<SearchRegular />} />}
            />
            <div className={styles.marketplaceItems}>
                <Card className={styles.card}>
                    <CardHeader header={<Body1><b>LangChain Components</b></Body1>} />
                    <Badge color="success">Copilot-Ready</Badge>
                </Card>
                <Card className={styles.card}>
                    <CardHeader header={<Body1><b>Retrieval Plugins</b></Body1>} />
                    <Badge color="success">Copilot-Ready</Badge>
                </Card>
                <Card className={styles.card}>
                    <CardHeader header={<Body1><b>Custom Connectors</b></Body1>} />
                </Card>
            </div>
            <Button appearance="primary">Upload Plugin</Button>
        </div>
    );
};

export default MarketplacePage;
