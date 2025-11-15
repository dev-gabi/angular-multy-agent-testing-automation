# MultyAgentTesting
    Goal:
        create and run tests for components automatically using playwright mcp

# Install Claude Code CLI
    npm install -g @anthropic-ai/claude-code

#Install playwright 
     npm install --save-dev @playwright/test    

# Verify installation
    claude --version

#init claude
    claude initcl

option 1:
#Claude code usage
    in the terminal:

    # Start Claude Code
    claude

    # Run the test orchestrator
    /orchestrator Test src/app/components/login/login.component.ts

option 2:

# Run Playwright manually
npx playwright test src/app/components/login/login.component.spec.ts --headed

# This helps verify the generated tests work correctly

