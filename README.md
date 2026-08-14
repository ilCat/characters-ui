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

---

## Running Full Stack with Docker Compose

You can run both the **Frontend (`characters-ui`)** and **Backend (`characters-api`)** together in production mode using Docker Compose from the sibling `characters-api` directory.

### Quick Start

0. Make sure both repositories are at the same level like this:
   ```
   my_characters_project/
   ├── characters-api/
   └── characters-ui/
   ```

1. **Navigate to the `characters-api` folder**:
   ```bash
   cd ../characters-api
   ```

2. **Build and start all services**:
   ```bash
   docker compose up -d --build
   ```

3. **Access the application**:
   - **Web UI**: [http://localhost](http://localhost) (Served via Nginx on Port 80)
   - **FastAPI Docs**: [http://localhost:8080/docs](http://localhost:8080/docs) (Swagger UI on Port 8080)

4. **Stop the environment**:
   ```bash
   docker compose down
   ```

