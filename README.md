# Frontend Engineer Technical Test

This project is a technical assessment built with **React**, **TypeScript**, and **Vite**.

It includes a simple authentication flow with token persistence using `localStorage`, protected routes, and a **Rick and Morty memory game** powered by the public API.

---

## Overview

The application has three main sections:

- **Login Page**: allows the user to authenticate with demo credentials
- **Home Page**: works as a landing page after login, with navigation and logout
- **Game Page**: contains the memory game flow, including preview, gameplay, and final result

---

## Features

- Login form with validation using **React Hook Form**
- Mock authentication with token persistence in `localStorage`
- Protected routes using **React Router DOM**
- Home page with logout support
- Character preview before starting the game
- Memory game with shuffled pairs
- Turn counter
- Match counter
- Final game state with restart option
- Custom styling with CSS

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router DOM
- React Hook Form
- CSS

---

## Requirements

Before running this project, make sure you have the following installed:

- **Node.js** `20.19.0` or higher
- **npm**

You can install it using **nvm** 

```bash
nvm install 20.19.0
```

and use it 

```bash
nvm use 20.19.0
```

---

## Installation and Running the Project

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd frontend-engineer-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project in development mode

```bash
npm run dev
```

### 4. Open the project in your browser

```bash
http://localhost:5173
```

## Demo Credentials

### 1. User: admin

### 2. Pass: 1234

## API Used

### This project uses the public Rick and Morty API:

```bash
https://rickandmortyapi.com/api/character
```

## Project Structure

```bash
src/
  components/
  context/
  hooks/
  pages/
  router/
  services/
  styles/
  types/
  utils/
```

## Main folders

### components: reusable UI pieces such as headers

### context: authentication context and provider

### hooks: custom hooks such as useAuth

### pages: route-level pages like Login, Home, and Game

### router: route definitions and protected routes

### services: API calls

### styles: global and page-specific CSS

### types: TypeScript types for auth and game entities

### utils: helper functions like deck creation and shuffle logic
