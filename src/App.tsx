import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CopilotHomePage from './pages/CopilotHomePage/CopilotHomePage';
import AgentWorkshopPage from './pages/AgentWorkshopPage/AgentWorkshopPage';
import ResourceManagementPage from './pages/ResourceManagementPage/ResourceManagementPage';
import ObservabilityPage from './pages/ObservabilityPage/ObservabilityPage';
import MarketplacePage from './pages/MarketplacePage/MarketplacePage';
import CostManagementPage from './pages/CostManagementPage/CostManagementPage';
import ReadmePage from './pages/ReadmePage/ReadmePage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CopilotHomePage />} />
          <Route path="/readme" element={<ReadmePage />} />
          <Route path="/azure-services" element={<HomePage />} />
          <Route path="/agent-workshop" element={<AgentWorkshopPage />} />
          <Route path="/resource-management" element={<ResourceManagementPage />} />
          <Route path="/observability" element={<ObservabilityPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/cost-management" element={<CostManagementPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
