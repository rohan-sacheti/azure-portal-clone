# Azure Portal Clone

A modern Azure Portal clone built with React, TypeScript, Vite, and Fluent UI. This project features a Copilot/AI-focused experience with a persistent chat sidebar and comprehensive Azure services interface.

## Features

- 🚀 **Modern Tech Stack**: React 18, TypeScript, Vite for fast development
- 🎨 **Fluent UI Design**: Microsoft's official design system for Azure-consistent UI
- 🤖 **AI Copilot Integration**: Persistent chat sidebar with intelligent Azure assistance
- 📱 **Responsive Design**: Works across desktop and mobile devices
- 🧩 **Modular Architecture**: Clean, extensible codebase with component-based structure
- 🔧 **Azure Services**: Comprehensive Azure services catalog and navigation

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Fluent UI React Components
- **Styling**: CSS with Fluent UI tokens
- **Icons**: Fluent UI React Icons
- **Routing**: React Router DOM

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx          # Main navigation header
│   │   ├── Sidebar.tsx         # Left navigation sidebar
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   └── AzureLogo.tsx       # Azure logo component
│   └── CopilotBar/
│       ├── CopilotBar.tsx      # AI chat sidebar
│       └── CopilotBar.css      # Chat styling
├── pages/
│   ├── HomePage/               # Azure Services main page
│   ├── CopilotHomePage/        # AI-focused landing page
│   ├── AgentWorkshopPage/      # Agent development tools
│   ├── ResourceManagementPage/ # Resource management
│   ├── ObservabilityPage/      # Monitoring and observability
│   ├── MarketplacePage/        # Azure Marketplace
│   └── CostManagementPage/     # Cost analysis and optimization
├── App.tsx                     # Main app component with routing
└── main.tsx                    # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rohan-sacheti/azure-portal-clone.git
cd azure-portal-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Features Overview

### AI Copilot Assistant
- **Interactive Chat**: Real-time conversation with Azure AI assistant
- **Task Automation**: Automated agent workflows with progress tracking
- **Contextual Help**: Azure-specific assistance and recommendations
- **Modern UI**: Beautiful chat bubbles with typing indicators and avatars

### Azure Services Catalog
- **Comprehensive Services**: All major Azure services organized by category
- **Quick Access**: Favorites, recent items, and search functionality
- **Visual Design**: Card-based layout with service icons
- **Categories**: Services, Resources, Navigation, Tools, and Useful Links

### Navigation & Layout
- **Responsive Header**: Search, user profile, and Copilot toggle
- **Collapsible Sidebar**: Main navigation with Azure service categories
- **Persistent Chat**: Always-available AI assistant
- **Modern Design**: Azure-consistent styling and interactions

## Development

### Adding New Pages
1. Create a new folder in `src/pages/`
2. Add your component with TypeScript
3. Update routing in `App.tsx`
4. Add navigation link in `Sidebar.tsx`

### Customizing the Copilot
The AI assistant behavior can be customized in `CopilotBar.tsx`:
- Modify response logic in the `handleSend` function
- Add new conversation flows
- Integrate with real AI services
- Customize the UI and animations

### Styling
- Use Fluent UI tokens for consistent theming
- Follow the existing CSS structure in component folders
- Leverage Fluent UI's `makeStyles` for component styling

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Microsoft Fluent UI team for the excellent design system
- Azure team for inspiration and design patterns
- React and Vite communities for amazing developer tools

---

Built with ❤️ by [Rohan Sacheti](https://github.com/rohan-sacheti)
