# Characters UI

**Characters UI** is a React + TypeScript + Vite frontend client specifically designed to serve as the user interface for the **`characters-api`** backend service.

This application provides an interactive experience where users can browse, manage characters, assemble custom teams, and prepare for simulated battles.



## Features

- **Character Management**: Easily list, add, and delete characters from the system.
- **Detailed Profiles**: Each character comes with specific characteristics, statistics (wins, losses, draws), and levels.
- **User Teams**: Users can assemble and organize their own custom team of characters.
- **Competitions (Concept)**: The ultimate goal is to prepare teams for simulated battles and competitions against character squads created by other users.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom Design System with Neutral Slate Theme & Yellow Accents)
- **Linter**: Oxlint

## Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8080
   ```

3. **Run Local Dev Server**:
   ```bash
   npm run dev
   ```
   *Note: Vite config is pre-configured with a local development proxy forwarding `/api` to `http://localhost:8080`.*
