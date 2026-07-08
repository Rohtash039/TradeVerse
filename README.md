#  TradeVerse

**TradeVerse** is a modern, state-of-the-art virtual cryptocurrency trading platform. It provides users with a risk-free simulated environment to practice trading strategies, learn risk management, and analyze market trends. Featuring institutional-grade tools, interactive charts, spot/futures mock trading with up to 100x leverage, and synthetic real-time news feeds, TradeVerse delivers a premium and engaging experience.

> **Status:** Educational/simulation project. All trades are simulated only — no real orders are routed to an exchange.

##  Features

###  Spot & Futures Simulated Trading
- **1x to 100x Leverage:** Trade with customizable margins on 12 major cryptocurrencies.
- **Market & Limit Orders:** Execute simulated market or limit trades.
- **Calculated Fees & PnL:** Automatic 0.1% trading fee simulation and live PnL tracking.

###  Real-Time Interactive Charts & Watchlists
- **TradingView Widget Integration:** Full-featured technical analysis charts showing live price actions.
- **Interactive Watchlists:** Track 12 supported coins (BTC, ETH, SOL, XRP, BNB, etc.) with custom additions.
- **Global Market Stats:** Monitor total market cap, 24h trading volume, and funding rates.

### Portfolio Performance Analytics
- **Dynamic Asset Allocation:** Visual breakdown of current assets, margins, and cash using interactive pie charts.
- **Equity Curves:** View historical portfolio growth over various ranges (`7d`, `1m`, `3m`, `1y`, `all`).
- **Transaction Logs:** Audited history of mock trades, deposits, withdrawals, and platform fees.

###  Live Synthesized News Feed
- **Market-Driven Articles:** Synthetic financial news dynamically generated from real-time asset prices and market metrics.
- **Fear & Greed Index:** Market sentiment gauge based on trending coin performance.

---

##  Screenshots

| Landing Page (Marketing) | Trading Dashboard |
| :---: | :---: |
| _[Landing Page Hero Graphic Placeholder]_ | _[Trading Chart & Quick Order Execution Panel Placeholder]_ |

| Portfolio Allocation | Market Quotes & Watchlist |
| :---: | :---: |
| _[Recharts Pie Chart & Performance Graph Placeholder]_ | _[Market Stats & Coin Tables Placeholder]_ |

---

##  Demo
-  **Live Demo:** `https://tradeverse-smoky.vercel.app/` *(Placeholder)*
-  **Video Walkthrough:** `https://youtube.com/example-tradeverse` *(Placeholder)*

---

##  Table of Contents
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## Prerequisites

To run this project locally, ensure you have the following software installed:
- **Node.js:** `v20.x` or later (Long Term Support recommended)
- **MongoDB:** `v7.0` (or access to a MongoDB Atlas cluster)
- **Docker & Docker Compose:** Required for running the containerized stack
- **Firebase Project Account:** For managing client authentication

---

##  Project Structure

```text
TradeVerse/
├── apps/
│   ├── frontend/             # Marketing landing page (React + Vite)
│   │   ├── public/           # Static icons, svgs, and hero images
│   │   └── src/              # Page layouts, company info, context API, navigation
│   └── dashboard/            # Authenticated simulated trading application (React + Vite)
│       ├── public/           # Favicon and SVGs
│       └── src/              # Charts, order pads, portfolio graphs, user profile
├── backend/                  # Node.js + Express API Server
│   ├── src/
│   │   ├── config/           # Firebase, MongoDB, and Env configurations
│   │   ├── controllers/      # Route controllers mapping business operations
│   │   ├── middlewares/      # Rate limiters, Error handlers, Loggers, and Auth guards
│   │   ├── models/           # Mongoose schemas (User, Trade, Holding, Watchlist)
│   │   ├── routes/           # Express router endpoints
│   │   ├── services/         # Core trading matching engine, caching, CoinGecko calls
│   │   └── utils/            # Shared constants, custom error classes, response formatters
│   │   └── validators/       # Joi request body validation schemas
│   ├── .env                  # Backend credentials config
│   ├── Dockerfile            # Production docker image configuration
│   └── package.json          # Server package specifications
└── docker-compose.yml        # Docker compose file orchestration
```

---

##  Technologies Used

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (v19) | Reactive user interface components |
| **Build Tool** | Vite | Ultra-fast local development and production asset bundling |
| **Routing** | React Router | Single-page application route management |
| **Charts** | Recharts | Interactive SVG chart components for portfolios |
| **Widgets** | TradingView Widgets | Real-time market analytics and candlestick tracking |
| **Icons** | Lucide React | Modern vector design icons |
| **Backend** | Express (v5) | RESTful API server routing and middleware pipeline |
| **Database** | MongoDB & Mongoose | Document database structure and schema validations |
| **Auth** | Firebase Auth | Secure client authentication and session controls |
| **Validation** | Joi | Input schema validation guards |
| **Caching** | Node Cache | In-memory query caching |
| **Security** | Helmet & Rate Limit | Header protection and API protection |

---

##  Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Rohtash039/TradeVerse.git
cd tradeverse
```

### 2. Configure Environment Variables
Create `.env` configuration files in the appropriate folders (see [Configuration](#-configuration) for required keys).

```bash
# Backend Config
cp backend/.env.example backend/.env

# Dashboard Config
cp apps/dashboard/.env.example apps/dashboard/.env
```

### 3. Start via Docker Compose (Recommended)
This launches MongoDB, the Backend API, the Frontend Landing site, and the Trading Dashboard containerized:
```bash
docker-compose up --build -d
```
- Frontend Landing Page: `http://localhost:5173`
- Trading Dashboard: `http://localhost:5174`
- Backend API Server: `http://localhost:5000`

### 4. Running Manually for Development
Ensure you have a MongoDB instance running locally.

**Start the Backend:**
```bash
cd backend
npm install
npm run dev
```

**Start the Landing Frontend:**
```bash
cd apps/frontend
npm install
npm run dev
```

**Start the Dashboard:**
```bash
cd apps/dashboard
npm install
npm run dev
```

---

## Configuration

### Environment Variables

#### Backend API (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/tradeverse
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-sdk-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-key-here\n-----END PRIVATE KEY-----\n"
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

#### Dashboard App (`apps/dashboard/.env`)
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-firebase-client-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

---

##  Usage

### Executing a Trade (Dashboard View)
1. Navigate to the **Trade** tab.
2. Select an asset from the **Watchlist** (e.g. `BTC` / Bitcoin).
3. In the **Quick Execute** panel, select your trade parameters:
   - **Action:** Buy or Sell
   - **Leverage:** 1x to 100x (Futures margin selection)
   - **Order Type:** Market or Limit
   - **Quantity:** Value in decimals (e.g. `0.25`)
4. Click **Execute Order**. A success alert will trigger, the balance will deduct, a Holding will generate, and a transaction fee of 0.1% will be assessed.

---

##  API Documentation

Base Endpoint: `/api`

### Auth Endpoints
- `POST /api/auth/session` — Exposes HttpOnly session cookie `token` exchange.
- `POST /api/auth/logout` — Clears the HttpOnly session cookie.
- `POST /api/auth/sync` — Synchronizes user profile status upon initial registration (adds default `$10,000` balance).

### Trade Endpoints
- `POST /api/trades/execute` — Submits a trade order for processing.
  - **Headers:** Authentication required (Cookie or Bearer token).
  - **Body Example:**
    ```json
    {
      "symbol": "BTC",
      "quantity": 0.5,
      "action": "buy",
      "orderType": "market",
      "price": 68500,
      "leverage": 5
    }
    ```
  - **Response Example:**
    ```json
    {
      "success": true,
      "message": "Trade executed successfully",
      "trade": {
        "userId": "603d2e1b12b5f1295c531d04",
        "symbol": "BTC",
        "action": "buy",
        "quantity": 0.5,
        "price": 68500,
        "total": 34250,
        "leverage": 5,
        "marginUsed": 6850,
        "fee": 34.25,
        "status": "completed"
      }
    }
    ```

- `GET /api/trades/history?limit=20&offset=0` — Retrieves paginated history of executed trades.

### Portfolio Endpoints
- `GET /api/portfolio/` — Returns aggregate portfolio worth, active cash balances, net asset value, and holding breakdowns.
- `GET /api/portfolio/performance?range=1m` — Fetches historical data points for the equity curve.

---

##  Database Schema

```mermaid
erDiagram
    USER {
        ObjectId id PK
        string firebaseUid
        string email
        string displayName
        number balance
        number lockedBalance
        string role
        object settings
    }
    TRADE {
        ObjectId id PK
        ObjectId userId FK
        string symbol
        string coinId
        string action
        string orderType
        number quantity
        number price
        number total
        number leverage
        number marginUsed
        number fee
        number pnl
        string status
        date executedAt
    }
    HOLDING {
        ObjectId id PK
        ObjectId userId FK
        string symbol
        string coinId
        string name
        number quantity
        number avgBuyPrice
        number leverage
        number marginUsed
    }
    TRANSACTION {
        ObjectId id PK
        ObjectId userId FK
        string type
        string asset
        string amount
        number value
        ObjectId tradeId FK
        string status
    }
    WATCHLIST {
        ObjectId id PK
        ObjectId userId FK
        string_array symbols
    }

    USER ||--o{ TRADE : executes
    USER ||--o{ HOLDING : owns
    USER ||--o{ TRANSACTION : triggers
    USER ||--|| WATCHLIST : keeps
    TRADE ||--o| TRANSACTION : logs
```

---

##  Authentication

Authentication is handled via the **Firebase Admin SDK** featuring **HttpOnly session cookies** with a transparent fallback to bearer token headers.

1. **Exchange ID Token:** The client signs in via Firebase Client Web Auth and retrieves an ID token. This is exchanged via `POST /api/auth/session` for a session cookie.
2. **HttpOnly Cookie Store:** The server issues a secure, HttpOnly, SameSite-secured cookie named `token` expiring in 5 days.
3. **Guard Checking:** All protected `/api` routes parse this cookie to identify and authenticate the active session. If cookies are disabled, authorization headers (`Authorization: Bearer <IDToken>`) act as a secondary fallback.

---

##  Deployment

### Production Docker Stack
The production docker stack builds minimal images optimized for size and caching:
1. Ensure `.env` files are configured on your host server.
2. Run docker compose in production daemon mode:
   ```bash
   docker-compose -f docker-compose.yml up -d --build
   ```

### CDN & Web Serving
- Frontend structures compile into flat minified html/css assets under `dist/` folders.
- These can be uploaded directly to CDNs (e.g. Vercel, Netlify, Cloudflare Pages, S3) or served via reverse proxies (e.g., Nginx, Traefik).

---

##  Testing

### Running Tests
To run tests (ensure you have configured your environment variables):

```bash
cd backend
npm run test
```

*Note: Automated unit tests will be configured in future releases. Refer to database seeding and mock connections inside backend configuration files for testing strategies.*

---

##  Security

TradeVerse utilizes several layers of security mechanisms to guarantee environment stability and safety:
- **Helmet Middleware:** Configures HTTP security headers to defend against Cross-Site Scripting (XSS), Clickjacking, and packet sniffing.
- **CORS Configuration:** Strict whitelist enforcement allowing access only from authenticated application URLs.
- **Express Rate Limiters:**
  - *Global:* 100 requests per 15 minutes.
  - *Trade Executor:* 10 requests per 60 seconds (prevents order-execution spam).
- **Joi Body Guards:** All data inputs are rigorously validated before reaching controllers or database service components.
- **Process DNS Resolver Fallback:** Prevents DNS spoofing or local resolver crashes on Atlas connections.

---

##  Roadmap
- [ ] **AI-driven Smart Alerts:** Custom user alerts triggered by indicators and machine learning analysis.
- [ ] **Multi-Currency Accounts:** Allow users to simulate portfolios in EUR, GBP, and JPY with live FX conversion rates.
- [ ] **Leaderboards & Competitions:** Create public trading lobbies where users can compete for high weekly PnLs.
- [ ] **Automated Backtesting Sandbox:** Write custom trade parameters and run strategies against historical datasets.

---

##  Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the Project.
2. Create a Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---



## ✉️Contact
- **Project Lead:** Rohtash Bainsla - `rohtashbainsla039@gmail.com` *(Assumption)*
- **GitHub Repository:** `https://github.com/Rohtash039/TradeVerse.git`
