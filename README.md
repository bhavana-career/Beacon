<div align="center">

# Beacon

**From Spreadsheet to Strategy.**
<br>
Beacon is an executive AI assistant that transforms raw Excel/CSV business data into actionable executive insights and interactive dashboards.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## Overview

Modern businesses generate vast amounts of data stored in spreadsheets, but extracting meaningful, high-level strategy from raw rows and columns is time-consuming. 

**Beacon solves this problem.** By uploading a standard business spreadsheet (CSV/Excel), Beacon instantly analyzes the data using Pandas, calculates a holistic Business Health Score, generates an executive summary using Google Gemini AI, and presents the findings in a premium, responsive dashboard. Users can then organically chat with the AI to ask specific questions about their business performance.

---

## Features

- **Spreadsheet Upload**: Seamlessly ingest `.csv` and `.xlsx` files.
- **Business Health Score**: Proprietary algorithm scoring business health based on sales, profit, and product growth.
- **Executive Summary**: Instant AI-generated narrative explaining the raw data.
- **Interactive Dashboards**: Visualizations for Sales Analytics and Profit Analytics.
- **AI Chat Assistant**: Context-aware chatbot that answers questions strictly based on the uploaded data.
- **Historical Reports**: Browse and reload past data reports instantly.
- **Robust Storage**: Fast, document-based storage utilizing MongoDB.
- **Premium UI**: A sleek, cinematic dark-mode interface built with Framer Motion and Tailwind.

---

## Architecture

```mermaid
graph TD
    Client[User Browser] -->|Uploads CSV/Excel| Frontend[React / Lovable]
    Frontend -->|POST /upload| Backend[FastAPI Backend]
    
    subgraph Data Processing Pipeline
        Backend -->|Extract & Calculate| Pandas[Pandas Engine]
        Pandas -->|Sanitized Metrics| Backend
    end
    
    subgraph AI Integration
        Backend -->|Summary & Questions| Gemini[Google Gemini API]
        Gemini -->|AI Insights| Backend
    end
    
    subgraph Storage
        Backend -->|Save Report| MongoDB[(MongoDB)]
        MongoDB -->|Retrieve Report| Backend
    end
    
    Backend -->|Return JSON| Frontend
    Frontend -->|Renders Dashboard| Client
```

*   **React Frontend**: Provides the cinematic UI, handles file uploads, and renders interactive Recharts.
*   **FastAPI Backend**: Serves as the central orchestrator, handling HTTP requests, file buffering, and error catching.
*   **Pandas Engine**: Performs heavy-lifting mathematical aggregations (e.g., month-over-month growth, best/worst products).
*   **Gemini AI**: Generates the executive summary and powers the context-aware chat assistant.
*   **MongoDB**: Persists the calculated metrics and AI summaries for historical retrieval.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Python 3, FastAPI, Uvicorn, python-multipart |
| **Database** | MongoDB (PyMongo) |
| **AI** | Google GenAI SDK (Gemini 2.5 Flash) |
| **Data Processing**| Pandas, OpenPyXL |
| **Visualization** | Recharts, Lucide React |
| **Deployment** | Render (Backend), Lovable (Frontend) |

---

## Project Structure

```text
beacon/
├── backend/
│   ├── app/
│   │   ├── ai.py           # Gemini AI integration and prompting
│   │   ├── analysis.py     # Pandas data processing and dictionary sanitization
│   │   ├── config.py       # Environment variable loading
│   │   ├── database.py     # MongoDB connection setup
│   │   ├── main.py         # FastAPI application and CORS configuration
│   │   ├── prompts.py      # System prompts for the AI
│   │   ├── routes.py       # API endpoint definitions
│   │   └── schemas.py      # Pydantic models for request validation
│   ├── uploads/            # Temporary directory for buffered file uploads
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Backend environment variables
└── frontend/
    ├── public/             # Static assets
    ├── src/
    │   ├── components/     # Reusable React components (UploadCard, ChatBox, etc.)
    │   │   └── charts/     # Recharts visualization components
    │   ├── pages/
    │   │   └── Home.jsx    # Main dashboard view
    │   ├── services/
    │   │   └── api.js      # Axios instance configured for the backend
    │   ├── App.jsx         # Application root component
    │   └── index.css       # Global styles and Tailwind directives
    ├── package.json        # Node dependencies
    ├── tailwind.config.js  # Tailwind theme and custom color palette
    └── vite.config.js      # Vite build configuration
```

---

## API Documentation

The backend exposes a RESTful API hosted on FastAPI.

### `POST /upload`
**Purpose:** Uploads a spreadsheet, processes it via Pandas, stores the result in MongoDB, and returns the calculated metrics.
- **Request:** `multipart/form-data` containing `file` (.csv or .xlsx).
- **Response:** JSON containing the report ID and metrics.
```json
{
  "message": "Business report stored successfully!",
  "report_id": "60d5ec49c9e77c001f3e7912",
  "analysis": {
    "rows": 120,
    "columns": 5,
    "health_score": 85,
    "status": "Excellent",
    "total_sales": 50000,
    "total_profit": 15000
    // ... additional metrics
  }
}
```

### `POST /chat`
**Purpose:** Sends a user question to the Gemini AI, using the previously generated executive summary as context.
- **Request:** JSON `ChatRequest`
```json
{
  "report_id": "60d5ec49c9e77c001f3e7912",
  "question": "Why did our profits dip in February?"
}
```
- **Response:**
```json
{
  "answer": "Based on the data, February saw a decline in Product B sales which dragged down overall profit by 12%..."
}
```

### `GET /reports`
**Purpose:** Retrieves a list of all historical reports (excluding heavy metrics to save bandwidth).
- **Request:** None
- **Response:**
```json
{
  "reports": [
    {
      "id": "60d5ec49c9e77c001f3e7912",
      "filename": "Q1_Financials.csv"
    }
  ]
}
```

### `GET /reports/{id}`
**Purpose:** Retrieves the full metrics for a specific historical report.
- **Request:** URL Parameter `report_id`
- **Response:** JSON containing `report_id`, `filename`, and the full `analysis` dictionary.

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Beacon.git
cd Beacon
```

### 2. Backend Setup
```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables (see section below)
# Create a .env file in the backend directory

# Run the FastAPI server
uvicorn app.main:app --reload
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory.

| Variable | Description | Example |
| :--- | :--- | :--- |
| `MONGO_URI` | Connection string for your MongoDB database (local or Atlas). | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `GOOGLE_API_KEY` | API key for accessing Google's Gemini Models via the GenAI SDK. | `AIzaSyD...` |

---

## Deployment

### Backend (Render)
The backend is deployed as a Web Service on Render.
- It runs `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- **CORS Configuration:** `app/main.py` utilizes FastAPI's `CORSMiddleware` to allow cross-origin requests specifically from the frontend domain, ensuring browser security policies don't block API requests.

### Frontend (Lovable)
The frontend is deployed as a static Single Page Application (SPA) on Lovable.
- Production API requests are routed securely via Axios (`frontend/src/services/api.js`), which has been configured with the absolute Render URL (`https://beacon-backend-w0gb.onrender.com`).

---

## Screenshots

### Landing Page
<img width="1918" height="910" alt="image" src="https://github.com/user-attachments/assets/4a6b5b40-5a88-4fd8-b4e7-f8c58aaa7ba9" />




### Executive Summary
<img width="1916" height="903" alt="image" src="https://github.com/user-attachments/assets/d64c5295-a879-44f7-8b06-2a2badbfa5f1" />

---

## Challenges Solved

Building Beacon required solving several non-trivial architectural challenges:
- **NaN JSON Serialization:** Pandas aggregations frequently generate `NaN` or `Infinity` values when encountering missing data or performing zero-division. Because standard JSON strictly forbids these types, we built a recursive dictionary sanitizer in `analysis.py` to convert these to `null` before passing them to PyMongo or FastAPI, preventing catastrophic `500 Internal Server Error` crashes during API serialization.
- **Cross-Origin Resource Sharing (CORS):** Deploying the frontend and backend on distinct domains (Lovable and Render) required precise configuration of FastAPI's `CORSMiddleware` to prevent the browser from blocking `fetch()` preflight requests.
- **Axios Production Configuration:** Transitioning from Vite's local `/api` proxy to a hardcoded production URL required ensuring the Axios instance dynamically handled the correct base URL without breaking the local development experience.

---

## Future Improvements

- **Authentication:** Implement JWT-based user login to secure business data.
- **Team Workspaces:** Allow multiple users to access and share the same historical reports.
- **Conversation Memory:** Upgrade the ChatBox to remember previous questions within the same session.
- **Report Comparison:** Add UI features to overlay multiple months/quarters of data to analyze long-term trends.
- **PDF Exports:** Allow executives to generate and download a static, branded PDF of the dashboard.
- **Forecasting:** Utilize advanced Pandas modeling to predict future sales trends based on historical uploads.

---

## License

This project is licensed under the MIT License.
