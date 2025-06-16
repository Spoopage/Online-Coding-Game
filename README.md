# Online Coding Game Research Platform

A research platform built with React and Supabase, allowing users to publish and run Unity-based games independently of the React platform's database. This README will guide you through setup, development, and deployment.

## Features

* **React Frontend**: SPA built with React and TypeScript.
* **Supabase Backend**: Authentication, database, and storage managed through Supabase.
* **Unity WebGL Integration**: Embed Unity games seamlessly within the React app.
* **Modular Architecture**: Clear separation of components, hooks, and services.

## Prerequisites

* **Node.js** v16 or higher
* **npm** v8 or higher (or **yarn**)
* A **Supabase** project (URL and anon/public key)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Spoopage/Online-Coding-Game.git
   cd Online-Coding-Game
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root with the following values:

   ```env
   REACT_APP_SUPABASE_URL=https://your-supabase-url.supabase.co
   REACT_APP_SUPABASE_KEY=your-anon-public-key
   ```

4. **Run the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

   The app will be available at `http://localhost:3000`.

## Available Scripts

* `npm start` / `yarn start` — Run the app in development mode.
* `npm run build` / `yarn build` — Create a production build in the `build` folder.
* `npm test` / `yarn test` — Run unit tests with Jest.
* `npm run lint` / `yarn lint` — Lint code using ESLint.

## Unity WebGL Integration

* Place Unity build files in the `public/unity/` directory.
* Use the `UnityPlayer` component to embed games in your React pages.

## Contributing

Contributions are welcome! Please open issues and submit pull requests for any improvements.
