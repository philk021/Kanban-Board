# Kanban Board (In-progress)

A collaborative kanban board that allows users to track and visualize project progress.

## Installation

1. Clone project and install dependencies

   ```Shell
   git clone https://github.com/philk021/Kanban-Board.git
   cd Kanban-Board
   cd frontend && npm install
   cd ../server && npm install
   ```
2. Start a MySQL server and create schema with server/db.sql
3. Create .env in frontend directory with API routes based on frontend/.env.example
4. Create .env in server directory with MySQL info and JWT secrets based on server/.env.example
5. Run frontend development server

   ```Shell
   npm run dev
   ```
6. Run backend development server

   ```Shell
   node server.js
   ```
