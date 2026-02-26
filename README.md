# Ibercaja Frontend

Frontend application built with **Next.js (App Router)** and **Tailwind CSS**.  
This document explains **only** how to run the project in a **local development environment**.

---

## Requirements

Make sure you have the following installed:

- **Node.js** version **20 or higher**
- **npm** (included with Node.js)
- **Git**

Verify the versions:

```shell
node -v
npm -v
```


## Install dependencies

```shell
npm install
```

## Environment variables


Create a .env.local file at the root of the project:

```shell
touch .env.local
```

Add the following content:

```shell
NODE_ENV=development
FASTAPI_URL=http://localhost:8000
NEXT_PUBLIC_ENABLE_AUTH=true
USE_FAKE_LOGIN=true
NEXT_PUBLIC_USE_FAKE_API=true

```

## Run the project locally
Start the development server:

```shell
npm run dev

```

The application will be available at: http://localhost:3000

