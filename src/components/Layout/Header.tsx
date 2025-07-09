import React from 'react';
import {
  makeStyles,
  shorthands,
  Button,
  Avatar,
  Input,
} from '@fluentui/react-components';
import { SearchRegular, SettingsRegular, QuestionCircleRegular, BotRegular } from '@fluentui/react-icons';
import './Header.css';
import { AzureLogo } from './AzureLogo';

const useHeaderStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('0', '20px'),
    height: '50px',
    backgroundColor: '#0078d4',
    color: 'white',
  },
  logo: {
    fontWeight: '600',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  search: {
    width: '500px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('10px'),
  },
});

interface HeaderProps {
  onToggleCopilot: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleCopilot }) => {
  const styles = useHeaderStyles();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <AzureLogo />
        <span>Microsoft Azure</span>
      </div>
      <div className={styles.search}>
        <Input
          placeholder="Search resources, services, and docs"
          contentAfter={<Button icon={<SearchRegular />} appearance="transparent" />}
        />
      </div>
      <div className={styles.actions}>
        <Button icon={<BotRegular />} appearance="transparent" onClick={onToggleCopilot}>
          Copilot
        </Button>
        <Button icon={<SettingsRegular />} appearance="transparent" />
        <Button icon={<QuestionCircleRegular />} appearance="transparent" />
        <Avatar name="Rohan Sacheti" size={32} />
      </div>
    </header>
  );
};

export default Header;
