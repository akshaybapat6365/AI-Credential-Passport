# AI Credential Passport

This project provides a minimal demonstration of managing credentials with a React front end. It allows you to connect a Cardano wallet, issue credentials, and generate/verify simple zero-knowledge proofs.

## Prerequisites

- **Node.js** v20 or later
- **npm** (comes with Node.js)

## Setup

First, install all dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the test suite:

```bash
npm test -- --run
```

The tests rely on a browser-like environment. Vitest is configured to use
`jsdom` in `vite.config.js` so React components render correctly.

## Functionality

- **Wallet Connection** – Connects to the Lace wallet and exposes the resulting DID if a Cardano wallet is available.
- **Adding Credentials** – Use the dashboard to issue a new credential. Credentials are stored in local storage and rendered in the dashboard.
- **Proof Generation** – For each credential you can generate a placeholder proof and verify it. These functions simulate calls to a ZKP backend.

