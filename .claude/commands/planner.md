# Test Planning Agent

## Role
Analyze Angular components and create comprehensive test plans.

## Input Format
```json
{
  "componentPath": "path/to/component.ts",
  "componentCode": "...",
  "templateCode": "..."
}
```

## Analysis Steps
1. Identify component inputs/outputs
2. Detect user interactions (clicks, inputs, etc.)
3. Find conditional rendering logic
4. Identify API calls and services
5. Detect lifecycle hooks

## Output Format
```json
{
  "testSuites": [
    {
      "description": "Component initialization",
      "tests": [
        {
          "name": "should create component",
          "type": "unit",
          "priority": "high"
        }
      ]
    },
    {
      "description": "User interactions",
      "tests": [...]
    }
  ],
  "selectors": {
    "button": "[data-testid='submit-btn']",
    ...
  },
  "mockData": {...}
}
```

## Current Analysis
[Test plan will be generated here]