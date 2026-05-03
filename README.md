# 🗳️ Election Pathways

**Election Pathways** is an interactive, AI-powered platform designed to educate citizens on the Indian election process. It simplifies the complex journey from voter registration to counting day, ensuring every citizen is informed, empowered, and ready to participate in democracy.

[![GCP Cloud Run](https://img.shields.io/badge/Deployed%20on-GCP%20Cloud%20Run-4285F4?style=flat-square&logo=google-cloud)](https://election-assistant-621290343795.us-central1.run.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20|%20Tailwind%20|%20Gemini-black?style=flat-square)](https://nextjs.org)

## 🌟 Key Features

- **Chunav Guru AI**: A multi-lingual AI assistant powered by **Gemini 1.5 Flash** that answers queries about the election process with both online intelligence and offline expert knowledge.
- **Interactive Process Map**: A 5-stage visual guide covering Registration, Nomination, Campaigning, Polling, and Results, tailored for General, State, and Local elections.
- **Eligibility Wizard**: A step-by-step logic-based tool to help citizens determine their voting eligibility.
- **Live Election Watch**: Real-time visualization of ongoing and upcoming elections across India using interactive maps.
- **Polling Station Finder**: Integrated location search to help users find their nearest polling booths.
- **EVM Simulator**: A safe environment to practice the voting process using Electronic Voting Machines and VVPAT.

## 🛠️ Tech Stack & Google Services

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **AI/ML**: Google Generative AI (Gemini 1.5 Flash) via Server Actions.
- **Maps**: Google Maps Platform (Tile layers & Geocoding simulation).
- **Analytics**: Google Analytics (Gtag) for user engagement tracking.
- **Infrastructure**: Google Cloud Run (Fully managed serverless container deployment).
- **CI/CD**: GitHub Actions for automated builds and deployment.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Google Generative AI API Key

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/nvsaikumar9/Election_Assistant.git
   cd Election_Assistant
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing

We prioritize reliability and accessibility. Our test suite is built with **Vitest** and **React Testing Library**.

Run all tests:
```bash
npm test
```

## 📄 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Full details on GCP deployment.
- [Evaluation Focus](./EVALUATION.md) - How this project aligns with the challenge criteria.

## 📜 License
Distributed under the MIT License.
