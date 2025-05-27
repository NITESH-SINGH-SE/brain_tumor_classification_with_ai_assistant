---

## 🧩 My App — Next.js Frontend

This is a **Next.js frontend project** that uses Tailwind CSS, Zustand for state management, OpenAI API, Radix UI, and more.

---

### 🚀 Project Setup

Follow these steps to get the project running locally.

---

### ✅ Prerequisites

Ensure the following are installed on your machine:

* [Node.js (v18 or later)](https://nodejs.org/)
* npm (comes with Node.js)
  *or*
  [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) (optional)

---

### 📁 Step 1: Clone the Repository

```bash
git clone https://github.com/NITESH-SINGH-SE/brain_tumor_classification_with_ai_assistant.git
cd brain_tumor_classification_with_ai_assistant
```

---

### 📦 Step 2: Install Dependencies

Using **npm**:

```bash
npm install
```

Or with **yarn**:

```bash
yarn
```

---

### 🔐 Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory of the project and add the following:

```env
# OpenAI API Key (required for using OpenAI services)
OPENAI_API_KEY=your-openai-api-key-here

# Backend API URL (used in production)
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com

# Local Backend URL (used in development)
NEXT_PUBLIC_BACKEND_URL_LOCAL=http://localhost:8000
```

> **Note:** Never commit your `.env.local` file to version control. It should be listed in `.gitignore`.

---

### 🧪 Step 4: Start the Development Server

```bash
npm run dev
```

Or:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

### 📜 Available Scripts

| Script          | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Build the project for production |
| `npm run start` | Start the production server      |
| `npm run lint`  | Run linting checks               |


---
