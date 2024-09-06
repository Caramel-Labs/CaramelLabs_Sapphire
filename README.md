# Sapphire 🌴

*The Digital Nomad's Guide to Sri Lanka.*

This repository contains code related to the **Sapphire** application.

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

Install the required packages:

```shell
pip install -r requirements.txt
```

Launch the FastAPI server:

```shell
fastapi dev main.py
```

---

After the above steps have been completed, open up `localhost:3000` in the browser to view the Sapphire mobile web app.

It is recommended to open this app in a <b>360 x 800</b> screen size.

The admin dashboard will be opened in `localhost:3001` (if you started the admin dashboard server after the mobile web server).

Detailed information and setup instructions can be found in the subfolders of this repository.

---

Built with ❤️ by Caramel Labs.
