import React from 'react';
import { Tree, TreeItem, TreeItemLayout, Button, Menu, MenuList, MenuItem, MenuTrigger, MenuPopover } from '@fluentui/react-components';
import { HomeRegular, BotRegular, WrenchRegular, BoxRegular, ChartMultipleRegular, ShoppingBagRegular, AddRegular, StarRegular, ServiceBellRegular, DocumentRegular } from '@fluentui/react-icons';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  {
    name: 'README',
    url: '/readme',
    icon: <DocumentRegular />,
    key: 'readme',
  },
  {
    name: 'Home',
    url: '/',
    icon: <HomeRegular />,
    key: 'copilot-home',
  },
  {
    name: 'Azure Services',
    url: '/azure-services',
    icon: <BotRegular />,
    key: 'azure-services',
  },
  {
    name: 'Agent Workshop',
    url: '/agent-workshop',
    icon: <WrenchRegular />,
    key: 'agent-workshop',
  },
  {
    name: 'Resource Management',
    url: '/resource-management',
    icon: <BoxRegular />,
    key: 'resource-management',
  },
  {
    name: 'Observability',
    url: '/observability',
    icon: <ChartMultipleRegular />,
    key: 'observability',
  },
  {
    name: 'Marketplace',
    url: '/marketplace',
    icon: <ShoppingBagRegular />,
    key: 'marketplace',
  },
  {
    name: 'Cost Management',
    url: '/cost-management',
    icon: <ServiceBellRegular />,
    key: 'cost-management',
  }
];

const createMenuItems = [
    { name: 'Virtual Machine', key: 'vm' },
    { name: 'Storage Account', key: 'storage' },
    { name: 'Web App', key: 'webapp' },
    { name: 'Database', key: 'db' },
    { name: 'Function App', key: 'functionapp' },
];

const favoriteItems = [
    { name: 'My-VM-01', key: 'fav-vm' },
    { name: 'Production-DB', key: 'fav-db' },
    { name: 'Staging-Web-App', key: 'fav-webapp' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
        <div className="create-button-container">
            <Menu>
                <MenuTrigger>
                    <Button icon={<AddRegular />} appearance="primary">Create a resource</Button>
                </MenuTrigger>
                <MenuPopover>
                    <MenuList>
                        {createMenuItems.map(item => (
                            <MenuItem key={item.key}>{item.name}</MenuItem>
                        ))}
                    </MenuList>
                </MenuPopover>
            </Menu>
        </div>
      <Tree aria-label="Sidebar Navigation">
        {navItems.map(item => (
          <TreeItem itemType="leaf" key={item.key}>
            <NavLink to={item.url} className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
              <TreeItemLayout iconBefore={item.icon}>{item.name}</TreeItemLayout>
            </NavLink>
          </TreeItem>
        ))}
      </Tree>
      <div className="sidebar-favorites">
        <Tree aria-label="Favorites">
            <TreeItem itemType='branch'>
                <TreeItemLayout iconBefore={<StarRegular />}>Favorites</TreeItemLayout>
                <Tree>
                    {favoriteItems.map(item => (
                        <TreeItem itemType='leaf' key={item.key}>
                            <TreeItemLayout>{item.name}</TreeItemLayout>
                        </TreeItem>
                    ))}
                </Tree>
            </TreeItem>
        </Tree>
      </div>
    </div>
  );
};

export default Sidebar;
