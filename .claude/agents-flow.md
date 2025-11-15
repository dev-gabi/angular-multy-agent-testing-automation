┌─────────────────────────────────────────────────────────┐
│                  Orchestrator Agent                      │
│                 (orchestrator.md)                        │
│  - Connects to Playwright MCP                           │
│  - Delegates tasks to specialized agents                │
│  - Manages workflow and error handling                  │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Test Planner │  │ Test Writer  │  │ Test Runner  │
│   Agent      │  │    Agent     │  │    Agent     │
│ (planner.md) │  │ (writer.md)  │  │ (runner.md)  │
└──────────────┘  └──────────────┘  └──────────────┘