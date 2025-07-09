import React from 'react';
import {
    makeStyles,
    shorthands,
    Title2,
    Card,
    Body1,
    Subtitle2,
} from '@fluentui/react-components';
import {
    AppFolderRegular,
    DesktopRegular,
    StorageRegular,
    DatabaseRegular,
    BotRegular,
    SearchRegular,
    ChartMultipleRegular,
    ShieldKeyholeRegular,
    WalletRegular,
    PeopleRegular,
    HistoryRegular,
    StarRegular,
    DocumentRegular,
    BoxRegular,
    AppsListDetailRegular,
    CodeRegular,
    LightbulbRegular,
    HeartPulseRegular,
    BookRegular,
    HatGraduationRegular,
    HeadsetRegular,
    Group24Regular,
} from '@fluentui/react-icons';
import './HomePage.css';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('20px'),
        ...shorthands.padding('20px'),
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        ...shorthands.gap('20px'),
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('15px'),
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...shorthands.padding('20px'),
        ...shorthands.gap('10px'),
        textAlign: 'center',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#f4f4f4',
        }
    },
    icon: {
        fontSize: '32px',
    }
});

const services = [
    { name: 'App Services', icon: <AppFolderRegular /> },
    { name: 'Virtual machines', icon: <DesktopRegular /> },
    { name: 'Virtual Machine Scale Sets', icon: <Group24Regular /> },
    { name: 'Storage accounts', icon: <StorageRegular /> },
    { name: 'Azure Cosmos DB', icon: <DatabaseRegular /> },
    { name: 'SQL databases', icon: <DatabaseRegular /> },
    { name: 'Azure OpenAI', icon: <BotRegular /> },
    { name: 'Azure AI Search', icon: <SearchRegular /> },
    { name: 'Monitor', icon: <ChartMultipleRegular /> },
    { name: 'Microsoft Entra ID', icon: <PeopleRegular /> },
    { name: 'Cost Management', icon: <WalletRegular /> },
    { name: 'Security Center', icon: <ShieldKeyholeRegular /> },
];

const resources = [
    { name: 'Recent', icon: <HistoryRegular /> },
    { name: 'Favorites', icon: <StarRegular /> },
];

const navigate = [
    { name: 'Subscriptions', icon: <DocumentRegular /> },
    { name: 'Resource groups', icon: <BoxRegular /> },
    { name: 'All resources', icon: <AppsListDetailRegular /> },
];

const tools = [
    { name: 'Azure CLI', icon: <CodeRegular /> },
    { name: 'Advisor', icon: <LightbulbRegular /> },
    { name: 'Service Health', icon: <HeartPulseRegular /> },
];

const usefulLinks = [
    { name: 'Documentation', icon: <BookRegular /> },
    { name: 'Microsoft Learn', icon: <HatGraduationRegular /> },
    { name: 'Support', icon: <HeadsetRegular /> },
];

interface CategoryProps {
    title: string;
    items: { name: string; icon: React.ReactNode }[];
    styles: ReturnType<typeof useStyles>;
}

const CategorySection: React.FC<CategoryProps> = ({ title, items, styles }) => (
    <div className={styles.section}>
        <Subtitle2>{title}</Subtitle2>
        <div className={styles.grid}>
            {items.map((item) => (
                <Card key={item.name} className={styles.card}>
                    <div className={styles.icon}>{item.icon}</div>
                    <Body1>{item.name}</Body1>
                </Card>
            ))}
        </div>
    </div>
);

const HomePage: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <div className={styles.section}>
                <Title2>Azure services</Title2>
                <div className={styles.grid}>
                    {services.map((service) => (
                        <Card key={service.name} className={styles.card}>
                            <div className={styles.icon}>{service.icon}</div>
                            <Body1>{service.name}</Body1>
                        </Card>
                    ))}
                </div>
            </div>

            <CategorySection title="Resources" items={resources} styles={styles} />
            <CategorySection title="Navigate" items={navigate} styles={styles} />
            <CategorySection title="Tools" items={tools} styles={styles} />
            <CategorySection title="Useful Links" items={usefulLinks} styles={styles} />
        </div>
    );
};

export de