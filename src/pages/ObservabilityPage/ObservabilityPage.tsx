import React from 'react';
import {
    makeStyles,
    shorthands,
    Title1,
    Card,
    CardHeader,
    Body1,
    Input,
    Button,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridBody,
    DataGridRow,
    DataGridCell,
    TableColumnDefinition,
    createTableColumn,
} from '@fluentui/react-components';
import { SearchRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('20px'),
        ...shorthands.padding('20px'),
    },
});

type LogEntry = {
    timestamp: string;
    level: string;
    message: string;
};

const columns: TableColumnDefinition<LogEntry>[] = [
    createTableColumn<LogEntry>({
        columnId: 'timestamp',
        compare: (a, b) => a.timestamp.localeCompare(b.timestamp),
        renderHeaderCell: () => 'Timestamp',
        renderCell: (item) => item.timestamp,
    }),
    createTableColumn<LogEntry>({
        columnId: 'level',
        compare: (a, b) => a.level.localeCompare(b.level),
        renderHeaderCell: () => 'Level',
        renderCell: (item) => item.level,
    }),
    createTableColumn<LogEntry>({
        columnId: 'message',
        compare: (a, b) => a.message.localeCompare(b.message),
        renderHeaderCell: () => 'Message',
        renderCell: (item) => item.message,
    }),
];

const items: LogEntry[] = [
    { timestamp: '2025-07-09T10:30:00Z', level: 'Error', message: 'Agent failed to connect to vector store' },
    { timestamp: '2025-07-09T10:29:00Z', level: 'Info', message: 'Agent started' },
];

const ObservabilityPage: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Title1>Observability</Title1>
            <Card>
                <CardHeader header={<Body1><b>Chat-Based Log Digests</b></Body1>} />
                <Input
                    placeholder="Why did my agent fail yesterday?"
                    contentAfter={<Button icon={<SearchRegular />} />}
                />
            </Card>
            <Card>
                <CardHeader header={<Body1><b>Live Traffic Playground</b></Body1>} />
                <DataGrid items={items} columns={columns}>
                    <DataGridHeader>
                        <DataGridRow>
                            {( {renderHeaderCell} ) => (
                                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                            )}
                        </DataGridRow>
                    </DataGridHeader>
                    <DataGridBody<LogEntry>>
                        {({ item, rowId }) => (
                            <DataGridRow<LogEntry> key={rowId}>
                                {( {renderCell} ) => (
                                    <DataGridCell>{renderCell(item)}</DataGridCell>
                                )}
                            </DataGridRow>
                        )}
                    </DataGridBody>
                </DataGrid>
            </Card>
        </div>
    );
};

export default ObservabilityPage;
