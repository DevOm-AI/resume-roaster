# 🔥 Resume Roaster

> Upload your resume. Get brutally roasted by AI. No feelings spared.

A full-stack web app that extracts your resume PDF, sends it to Gemini AI, and returns a **savage, emoji-heavy, section-by-section roast** — in English or Hinglish.

---

## 📁 Project Structure

```
resume-roaster/
├── backend/
│   ├── main.py              # FastAPI app & /roast endpoint
│   ├── gemini.py            # Gemini AI integration + prompts
│   ├── resume_parser.py     # PDF text extraction with PyPDF2
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variable template
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx              # Root component & state management
        ├── api.js               # Axios API calls to backend
        ├── index.css            # Global styles + Tailwind
        └── components/
            ├── UploadBox.jsx        # Drag-and-drop PDF uploader
            ├── LanguageToggle.jsx   # English / Hinglish switcher
            └── RoastResult.jsx      # Roast display, scores, share buttons
```

---

## ⚡ Quick Start

### 1. Get a Gemini API Key

Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) and create a free API key.

---

### 2. Backend Setup

```bash
cd resume-roaster/backend

# Create and activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate      # Mac/Linux
# venv\Scripts\activate       # Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_key_here

# Start the server
uvicorn main:app --reload
```

Backend runs at: **http://localhost:8000**

API docs available at: **http://localhost:8000/docs**

---

### 3. Frontend Setup

```bash
cd resume-roaster/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend (optional `frontend/.env`)

```env
VITE_API_URL=http://localhost:8000
```

---

## 🌐 API Reference

### `POST /roast`

Accepts a PDF resume and returns an AI-generated roast.

**Request** (multipart/form-data):
| Field | Type | Description |
|-------|------|-------------|
| `file` | File (PDF) | The resume to roast |
| `language` | string | `"english"` or `"hinglish"` |

**Response** (JSON):
```json
{
  "roast": "🚨 FIRST IMPRESSION\n...",
  "scores": {
    "resume_strength": 3,
    "confidence": 9,
    "delusion": 8
  },
  "language": "english"
}
```

---

## ✨ Features

- 📄 **PDF Upload** — Drag & drop or click to upload
- 🔥 **AI Roast** — Brutal, emoji-heavy, section-structured critique
- 🌍 **Dual Language** — English and Hinglish roast modes
- 📊 **Roast Scores** — Resume Strength, Confidence, Delusion Level (animated bars)
- 📋 **Copy Roast** — One-click copy to clipboard
- 🐦 **Share** — Share to X (Twitter) and LinkedIn
- 💀 **Loading Quips** — Rotating sarcastic messages while roasting

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| HTTP | Axios |
| Backend | FastAPI + Python |
| AI | Google Gemini 1.5 Flash |
| PDF | PyPDF2 |

---

## 🔥 Roast Sections

Every roast is structured into 5 sections:

1. **🚨 First Impression** — Initial gut reaction
2. **🛠️ Skills Roast** — Dissects the skills section
3. **💼 Experience Roast** — Tears apart work history
4. **💀 Brutal Reality Check** — Hard truths recruiter sees
5. **🏆 Final Verdict** — Scores + one piece of actual advice

---

## 🚀 Production Deployment

**Backend**: Deploy to Railway, Render, or any Python host. Set `GEMINI_API_KEY` as an environment variable.

**Frontend**: Run `npm run build` and deploy the `dist/` folder to Vercel, Netlify, or similar. Set `VITE_API_URL` to your production backend URL.

---

## ⚠️ Notes

- Only PDF files are supported (not image-only scanned PDFs)
- Gemini API calls may take 5–15 seconds
- The app does **not** store any resume data
- Roast tone is sarcastic but avoids discriminatory content

---

Made with 🔥 and zero mercy.
