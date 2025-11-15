# Test Runner Agent

## Role
Execute Playwright tests and report results.

## Input Format
```json
{
  "specPath": "path/to/test.spec.ts",
  "playwright_mcp_available": true
}
```

## Execution Steps
1. Verify spec file exists
2. Use Playwright MCP to run tests
3. Parse test results
4. Format errors if any

## Output Format
```json
{
  "success": true/false,
  "passedTests": 5,
  "failedTests": 0,
  "errors": []
}
```

## Current Execution
[Test results will appear here]
```

## 3. Using the System in Cursor

### Method 1: Using Composer with Agent Files

1. **Open Cursor Composer** (Cmd/Ctrl + I)

2. **Add all agent files to context**:
   - Click "+ Add context"
   - Select all .md agent files
   - Add the component you want to test

3. **Send initial prompt to orchestrator**:
```
   @orchestrator.md Please test the component at src/app/components/user-profile/user-profile.component.ts
```

4. **The orchestrator will**:
   - Read the component
   - Invoke @planner.md with component code
   - Pass results to @writer.md
   - Use @runner.md with Playwright MCP
   - Handle any errors

### Method 2: Manual Agent Invocation

1. **Start with the orchestrator**:
```
   @orchestrator.md I need to test UserProfileComponent
```

2. **Orchestrator delegates to planner**:
```
   @planner.md Analyze this component: [component code]
```

3. **Planner returns test plan, orchestrator delegates to writer**:
```
   @writer.md Create tests for: [test plan]
```

4. **Writer creates spec, orchestrator runs tests**:
```
   @runner.md Execute tests at: path/to/spec.ts
   Use Playwright MCP to run the tests.