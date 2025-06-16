# AI Credential Passport

This repository contains two small example applications for managing credentials:

- **Vite app** – located in the project root (`src/`, `vite.config.js`).
- **Next.js app** – found in `nextjs-app/`.

Both front ends let you connect a Cardano wallet, issue credentials and verify simple zero-knowledge proofs. They can be run independently as described below.

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

## Running the Next.js App

From the `nextjs-app/` directory install packages and start the development server:

```bash
cd nextjs-app
npm install
npm run dev
```

Build the Next.js project for production with:

```bash
npm run build
```

## Functionality

- **Wallet Connection** – Connects to the Lace wallet and exposes the resulting DID if a Cardano wallet is available.
- **Adding Credentials** – Use the dashboard to issue a new credential. Credentials are stored in local storage and rendered in the dashboard.
- **Proof Generation** – For each credential you can generate a placeholder proof and verify it. These functions simulate calls to a ZKP backend.

