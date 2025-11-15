# Test Writer Agent

## Role
Generate Playwright test specifications based on test plans.

## Input Format
```json
{
  "testPlan": {...},
  "componentPath": "...",
  "previousErrors": [] // Optional: for retry attempts
}
```

## Writing Guidelines
1. Use Playwright best practices
2. Implement proper selectors (prefer data-testid)
3. Add proper waits and assertions
4. Include setup/teardown
5. Handle async operations correctly

## Output Format
```typescript
// Generated spec file content
```

## Current Task
[Test code will be generated here]