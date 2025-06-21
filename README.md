# AI Credential Passport

This repository contains a small example application for managing credentials.

The **Vite app** is located in the project root (`src/`, `vite.config.js`). It lets you connect a Cardano wallet, issue credentials and verify simple zero-knowledge proofs.

## Prerequisites

- **Node.js** v20 or later
- **npm** (comes with Node.js)

## Running the Vite App

Install dependencies and start the dev server from the repository root:

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Run the test suite:

```bash
npm test
```

### Configuration

The expected Cardano network ID can be configured using the
`VITE_EXPECTED_NETWORK_ID` environment variable. If not provided it defaults
to `0` (pre-production).

## Linting

Use ESLint to verify code style:

```bash
npm run lint
```

## Functionality

- **Wallet Connection** – Connects to the Lace wallet and exposes the resulting DID if a Cardano wallet is available.
- **Adding Credentials** – Use the dashboard to issue a new credential. Credentials are stored in local storage and rendered in the dashboard.
- **Proof Generation** – For each credential you can generate a placeholder proof and verify it. These functions simulate calls to a ZKP backend.

