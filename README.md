# Sapphire 🌴

*The Digital Nomad's Guide to Sri Lanka.*

This repository contains the code related to the **Sapphire** application.

## Setup

Make sure you have the following prerequisites installed on your system:

1. NodeJS (`v18.7.0` or above)
2. NPM (`v9.0.0` or above)
3. Python (`v3.9` or above)

Clone the repository to a desired location on your system:

```shell
git clone https://github.com/Caramel-Labs/CaramelLabs_Sapphire.git
```

Navigate into the cloned directory:

```shell
cd loop
```

### The Frontend (Mobile Web)

To setup the mobile web frontend of the Sapphire application, navigate to the `client/mobile` folder from the root folder:

```shell
cd client/mobile
```

Create a `.env.local` file within the root folder with the following content:

```shell
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-api-key"
```

Install the required packages:

```shell
npm install
```

Launch the development server:

```shell
npm run dev
```

### The Frontend (Admin Web Panel)

To setup the administrative dashboard of the Sapphire application, navigate to the `client/admin` folder from the root folder:

```shell
cd client/admin
```

Install the required packages:

```shell
npm install
```

Launch the development server:

```shell
npm run dev
```

### The Server

To setup the server of the Sapphire application, navigate to the `server` folder from the root folder:

```shell
cd server
```

Create a `.env` file within the root folder with the following content:

```shell
MONGO_URI = your-api-key
PORT = 4000

GOOGLE_API_KEY = your-api-key
OPEN_WEATHER_API = your-api-key
STRIPE_SECRET_KEY = your-stripe-secret-key

EMAIL_USER = youremail@example.com
EMAIL_PASS = your-email-passkey

INTELLIGENCE_URL = https://sapphire.koyeb.app/
```

Install the required packages:

```shell
npm install
```

Navigate to the entrypoint folder (`src`):

```shell
cd src
```

Launch the server:

```shell
node index.js
```

### The Intelligence System

To setup Sapphire Intelligence, navigate to the `intelligence` folder from the root folder:

```shell
cd intelligence
```

Create a `.env` file within the root folder with the following content:

```shell
GROQ_API_KEY = "your-api-key"
COHERE_API_KEY = "your-api-key"
MONGO_URI_STRING = "your-mongo-uri"
```

To connect to LangSmith for observability, add the following content too:

```shell
LANGCHAIN_TRACING_V2=true
LANGCHAIN_ENDPOINT="https://api.smith.langchain.com"
LANGCHAIN_API_KEY="your-api-key"
LANGCHAIN_PROJECT="default"
```

Install the required packages:

```shell
pip install -r requirements.txt
```

Launch the FastAPI server:

```shell
fastapi dev main.py
```

---

After the above steps have been completed, open up `localhost:3000/home` in the browser to view the Sapphire mobile web app.

It is recommended to open this app in a <b>360 x 800</b> screen size.

The admin dashboard will be opened in `localhost:3001/home` (if you started the admin dashboard server after the mobile web server).

---

Built with ❤️ by Caramel Labs.
