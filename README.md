# WAFLens

**Cloud Well-Architected Framework Assessment Platform** – Analyze, score, and improve your cloud infrastructure across all five WAF pillars.

---

## Overview

WAFLens helps organizations assess their cloud infrastructure against the Well-Architected Framework (WAF). Currently focused on **Azure**, with multi-cloud support planned for GCP and AWS.

| Pillar             | Description                        |
| ------------------ | ---------------------------------- |
| 🔒 **Security**    | Protect data, systems, and assets  |
| ⚡ **Reliability** | Ensure workloads perform correctly |
| 🚀 **Performance** | Use resources efficiently          |
| 💰 **Cost**        | Avoid unnecessary spending         |
| ⚙️ **Operations**  | Run and monitor effectively        |

---

## Key Features

- **Azure Advisor Integration** – Pull recommendations directly from Azure
- **AI-Powered Analysis** – Gemini, OpenAI, Claude, Perplexity integration
- **Automated Workflows** – n8n (self-hosted), Buildship orchestration
- **Real-time Dashboards** – Track compliance scores over time
- **Embeddable Widget** – Deploy on existing sites via CDN

---

## Tech Stack

| Layer      | Technology                                     |
| ---------- | ---------------------------------------------- |
| Frontend   | Next.js 15, React 18, TailwindCSS, shadcn/ui   |
| Backend    | Python FastAPI (Cloud Run), Firebase Functions |
| Database   | Firestore, Firebase Data Connect (PostgreSQL)  |
| AI         | Gemini 1.5, OpenAI GPT-4, Claude 3, Perplexity |
| Auth       | Firebase Authentication (Google Sign-In)       |
| Automation | n8n (self-hosted VPS), Buildship               |
| CI/CD      | GitHub Actions                                 |
| Cloud      | Azure (primary), GCP, AWS (planned)            |

---

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+
- Firebase CLI (`npm install -g firebase-tools`)
- Azure CLI (for Advisor integration)

### Installation

```bash
# Clone and install frontend
git clone https://github.com/your-org/waflens.git
cd waflens && npm install

# Install backend
cd backend && pip install -r requirements.txt
```

### Development

```bash
# Frontend (http://localhost:3000)
npm run dev

# Backend (http://localhost:8000)
cd backend && uvicorn app.main:app --reload
```

### Environment Variables

Create `.env.local` in root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
GEMINI_API_KEY=...
```

Create `.env` in `backend/`:

```env
FIREBASE_PROJECT_ID=...
GEMINI_API_KEY=...
AZURE_SUBSCRIPTION_ID=...
AZURE_TENANT_ID=...
AZURE_CLIENT_ID=...
AZURE_CLIENT_SECRET=...
```

---

## Project Structure

```
waflens/
├── src/                     # Next.js frontend
│   ├── app/                 # Pages (dashboard, pillars)
│   ├── components/          # React components
│   ├── hooks/               # Custom React hooks
│   └── contexts/            # Auth context
├── backend/                 # Python FastAPI
│   └── app/
│       ├── api/v1/          # API endpoints
│       └── core/            # Config, security, AI client
├── dataconnect/             # Firebase Data Connect schema
├── functions/               # Firebase Functions
├── n8n/                     # n8n workflow exports (planned)
└── .github/workflows/       # CI/CD pipelines
```

---

## Automation Architecture

### n8n (Self-Hosted VPS)

- **Daily Azure Sync** – Azure Advisor → Firestore → Slack
- **AI Recommendation Pipeline** – Multi-model analysis
- **GitHub Issue Automation** – Findings → Issues → Tasks

### Buildship

- **Assessment Scoring Engine** – Calculate pillar scores
- **Cloud Resource Scanner** – Map resources to controls

---

## Deployment

```bash
# Frontend → Firebase Hosting
firebase deploy --only hosting

# Backend → Cloud Run
cd backend && gcloud run deploy waflens-api --source . --region us-central1

# Firestore Rules
firebase deploy --only firestore:rules
```

---

## Contributing

See [TODO.md](./TODO.md) for priority tasks and open issues.

1. Fork → Branch → Commit → PR
2. Follow TypeScript strict mode
3. Add tests for new features
4. Update documentation

---

## License

MIT
