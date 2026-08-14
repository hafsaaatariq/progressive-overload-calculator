# NextRep Project Reference

> **Source of truth:** This document defines the agreed product scope and behavior. If an implementation idea conflicts with it, follow this document unless the decision is explicitly changed here first.

## Product goal

NextRep helps someone who strength trains turn their last performance into one clear target for their next session in under 10 seconds.

The product runs locally in a browser using only HTML, CSS, and JavaScript. It requires no API, backend, framework, external library, account, or internet connection.

## Core interaction

Enter the weight and reps from your last session plus your target rep range, then receive one clear weight-and-reps target for your next session.

## Core inputs and output

Inputs:

- Last weight
- Reps completed
- Target rep-range minimum
- Target rep-range maximum

Output:

- One recommended weight-and-reps target
- One short explanation of why it was recommended

## Calculation rules

- **Below the target range:** retry or reduce the weight. The final choice between these two behaviors is still an open product decision and must be resolved before calculation logic is implemented.
- **Within the range but below its maximum:** keep the same weight and add one rep.
- **At or above the range maximum:** increase the weight and return to the range minimum.

The first version must handle these three cases clearly. It should not attempt to account for fatigue, technique, perceived effort, recovery, or individualized programming.

## Definition of a successful core

The core idea is proven when a user can:

1. Enter their previous performance.
2. Request a recommendation.
3. Understand the next target and its reason in under 10 seconds.

All three calculation cases should work before visual polish or optional features are added.

## Optional features, in priority order

1. Adjustable weight increment
2. Kilograms/pounds selection
3. Clearer recommendation explanations
4. Input validation and edge-case handling
5. Remember the latest entry with browser local storage
6. Exercise name
7. Small session history
8. Plate calculator

Optional features are added only after the core interaction works reliably.

## Explicitly out of scope

- APIs, remote data, or required internet access
- Backend services or databases
- Frameworks or external libraries
- Accounts or authentication
- Full workout creation or programming
- Multiple-set analysis
- Charts and analytics
- Fatigue or readiness scoring
- Technique assessment
- AI-generated training advice
- Social or community features

## Project structure

```text
nextrep/
|-- index.html   # Page structure and content
|-- style.css    # Presentation and layout
|-- script.js    # Calculation and result rendering
`-- PROJECT.md   # Product source of truth
```
