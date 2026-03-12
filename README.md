# 🪐 ExoPlanet Detection — AI-Powered Exoplanet Classifier

A full-stack machine learning application that predicts whether celestial bodies are **exoplanets** using light curve flux data. Upload a CSV of stellar observations and get instant AI-powered classification with probability scores.

> **Live Frontend** → [exoplanet-frontend-ten.vercel.app](https://exoplanet-frontend-ten.vercel.app)  
> **Live Backend** → [exoplanet--am3072171.replit.app](https://exoplanet--am3072171.replit.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#api-reference)
- [How It Works](#how-it-works)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

ExoPlanet Detection uses a trained **XGBoost** machine learning model to classify stellar light curve data. The system analyzes flux measurements from NASA's Kepler Space Telescope to determine if a star's brightness dips indicate the presence of an orbiting exoplanet.

The project consists of two main parts:

| Component | Description |
|-----------|-------------|
| **Backend** | FastAPI REST API serving the ML model with CSV upload/prediction endpoints |
| **Frontend** | React + TypeScript SPA with a space-themed UI for uploading data and visualizing results |

---

## Features

### 🤖 Machine Learning
- **XGBoost classifier** trained on Kepler mission light curve data
- Probability scoring with configurable detection threshold
- Automatic feature padding/trimming for flexible CSV input
- Streaming CSV response with predictions appended

### 🎨 Frontend
- **Space/universe themed UI** — cosmic gradients, glassmorphism cards, animated starfield
- **Pure Tailwind CSS animations** — 30+ custom keyframes, zero external animation libraries
- **Drag-and-drop CSV upload** with native HTML5 (no library dependencies)
- **Real-time results table** with probability scores, labels, and row-level animations
- **CSV export** — download predictions as a CSV file
- **Live backend health indicator** polling every 30 seconds
- **Fully responsive** — mobile hamburger nav, adaptive grid layouts
- **Scroll-triggered animations** via custom `useInView` IntersectionObserver hook

### ⚡ Backend
- FastAPI with automatic OpenAPI/Swagger docs
- CORS enabled for frontend integration
- Streaming CSV response for large datasets
- Robust error handling with HTTP exceptions

---

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Python 3.10 | Runtime |
| FastAPI | Web framework & API |
| Uvicorn | ASGI server |
| XGBoost | ML model |
| scikit-learn | ML pipeline |
| pandas / NumPy | Data processing |
| joblib | Model serialization |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 6 | Build tool & dev server |
| Tailwind CSS 3.4 | Styling & animations |
| Lucide React | Icon library |
| Recharts | Data visualization |

---

## Project Structure

```
exoplanet-backend/
├── app/
│   ├── main.py              # FastAPI entry (imported by Procfile)
│   ├── model_loader.py      # Loads XGBoost model + threshold
│   └── preprocessing.py     # Data preprocessing utilities
├── data/                    # Training datasets
├── models/                  # Saved ML model artifacts
├── main.py                  # FastAPI app definition & endpoints
├── schemas.py               # Pydantic request/response schemas
├── requirements.txt         # Python dependencies
├── runtime.txt              # Python version (3.10.13)
├── Procfile                 # Deployment command
│
└── frontend/                # React + TypeScript SPA
    ├── public/              # Static assets
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.tsx         # Fixed nav with scroll detection & mobile menu
    │   │   ├── Hero.tsx           # Landing hero with orbit rings & SVG light curve
    │   │   ├── UploadSection.tsx  # Drag-and-drop CSV upload & results display
    │   │   ├── Features.tsx       # Feature cards grid with stagger animations
    │   │   ├── HowItWorks.tsx     # 3-step timeline with connecting gradient line
    │   │   ├── About.tsx          # About section with animated planet & stats
    │   │   ├── BackendStatus.tsx  # Live health indicator (polls GET /)
    │   │   ├── StarField.tsx      # Canvas-based animated starfield background
    │   │   └── Footer.tsx         # Footer with links
    │   ├── hooks/
    │   │   └── useInView.ts       # IntersectionObserver hook for scroll animations
    │   ├── services/
    │   │   └── exoplanetApi.ts    # API client (health check, predict, parse CSV)
    │   ├── config/
    │   │   └── api.ts             # Centralized API base URL config
    │   ├── App.tsx                # Root layout composing all sections
    │   ├── main.tsx               # React entry point
    │   └── index.css              # Global styles, glassmorphism, custom scrollbar
    ├── index.html
    ├── package.json
    ├── tailwind.config.js         # 30+ custom animations & cosmic theme
    ├── tsconfig.json
    ├── vite.config.ts
    └── vercel.json                # Vercel deployment config
```

---

## Getting Started

### Prerequisites

- **Python 3.10+** (backend)
- **Node.js 18+** and **npm** (frontend)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/shahnoor-exe/exoplanet-backend.git
cd exoplanet-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`. Visit `http://localhost:8000/docs` for the interactive Swagger UI.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and set:
# VITE_API_BASE_URL=http://localhost:8000

# Start dev server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |

---

## API Reference

### `GET /`

Health check endpoint.

**Response:**
```json
{
  "status": "Backend running 🚀"
}
```

### `POST /predict-csv`

Upload a CSV file of stellar flux data for exoplanet classification.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` — CSV file with numerical flux columns

**Response:**
- Content-Type: `text/csv`
- Returns the original CSV with two appended columns:
  - `pred_probability` — probability score (0.0 to 1.0) of being an exoplanet
  - `pred_label` — binary classification (1 = exoplanet, 0 = non-exoplanet)

**Example using cURL:**
```bash
curl -X POST "http://localhost:8000/predict-csv" \
  -F "file=@your_data.csv" \
  -o predictions.csv
```

---

## How It Works

1. **Upload** — User drags and drops (or selects) a CSV file containing stellar light curve flux measurements
2. **Process** — The backend reads the CSV, pads/trims features to match the model's expected input dimensions
3. **Predict** — The XGBoost model computes exoplanet probability for each row
4. **Classify** — Rows are labeled as exoplanet (1) or non-exoplanet (0) based on the trained threshold
5. **Return** — Results are streamed back as a CSV with prediction columns appended
6. **Visualize** — The frontend displays results in an interactive table with probability highlights

### The ML Model

The model is an **XGBoost classifier** trained on NASA Kepler mission data. Light curves measure a star's brightness over time — periodic dips in brightness can indicate a planet transiting in front of the star. The model learns to distinguish genuine planetary transits from noise and other astrophysical phenomena.

---

## Deployment

### Backend (Replit / Heroku)

The backend is configured for deployment with a `Procfile`:
```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Currently deployed at: `https://exoplanet--am3072171.replit.app`

### Frontend (Vercel)

The frontend is deployed on Vercel with:
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Framework:** Vite
- **Environment variable:** `VITE_API_BASE_URL` set in Vercel project settings

Currently deployed at: `https://exoplanet-frontend-ten.vercel.app`

To deploy your own:
```bash
cd frontend
npm i -g vercel
vercel --prod
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feat/your-feature`
5. Open a Pull Request

---

## License

This project is open source. Feel free to use and modify for educational and research purposes.

---

<p align="center">
  Built with ❤️ for space exploration and machine learning
</p>
