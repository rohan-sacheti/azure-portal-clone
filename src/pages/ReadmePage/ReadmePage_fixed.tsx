import React from 'react';
import './ReadmePage.css';

const ReadmePage: React.FC = () => {
  return (
    <div className="readme-page-container">
      <div className="readme-header">
        <h1>User Stories</h1>
        <p>Key features and goals for the Azure Portal clone project.</p>
      </div>
      <div className="readme-content">
        <div className="user-story">
          <h2>User Story 1 – Copilot Home as the Default Landing</h2>
          <p>
            <strong>As a</strong> first-time Azure user exploring AI,
            <br />
            <strong>I want</strong> the portal to open into a conversational Copilot home page seeded with "Ask me to…" quick-prompt chips,
            <br />
            <strong>so that</strong> I can understand Azure's capabilities and launch common AI tasks without hunting through blades.
          </p>
          <p className="rationale">
            <strong>Rationale:</strong> A Copilot-first home trims the cognitive load of the classic dashboard and shortens time-to-first-value for new workloads.
          </p>
          <p>
            <strong>Functionality Demo:</strong> Go to `Home` tab from the sidebar, and click on the "Create a SQL DB Server" chip to see the agent simulation.
          </p>
        </div>

        <div className="user-story">
          <h2>User Story 2 – Dockable, Context-Aware Copilot Bar</h2>
          <p>
            <strong>As an</strong> active portal user switching between blades,
            <br />
            <strong>I want</strong> a persistent Copilot panel I can toggle with a shortcut and pin to any edge of the screen,
            <br />
            <strong>so that</strong> I can ask questions or run actions mid-task without losing my place.
          </p>
          <p className="rationale">
            <strong>Rationale:</strong> Reduces mode switching and makes natural-language help available at every step, increasing daily Copilot usage and task completion.
          </p>
          <p>
            <strong>Functionality Demo:</strong> Go to ANY tab from the sidebar, click on the robot copilot icon on the top right, and type in "Give me a break down of my resource usage and optimizations".
          </p>
        </div>

        <div className="user-story">
          <h2>User Story 3 – Natural-Language to ARM/Bicep with Diff Preview</h2>
          <p>
            <strong>As an</strong> ops engineer managing resources,
            <br />
            <strong>I want</strong> to type plain-English change requests like "Increase user-db storage to 10 GB",
            <br />
            <strong>so that</strong> Copilot generates the exact ARM/Bicep diff, shows me the preview, and applies it on confirmation.
          </p>
          <p className="rationale">
            <strong>Rationale:</strong> Marries conversational UX with infrastructure-as-code best practices, giving newcomers speed while preserving auditability and control for power users.
          </p>
          <p>
            <strong>Functionality Demo:</strong> Go to `Resource Management` tab from the sidebar, and type "increase user-db storage to 10 gb" in the chat to see the ARM diff preview.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadmePage;
