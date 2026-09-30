# 🇯🇴 Masar (مسار) — Jordan Travel Companion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Language](https://img.shields.io/badge/Language-English%20%7C%20العربية-orange.svg)](#)

**Masar (مسار)** is an interactive, gamified travel companion web application crafted for exploring the Kingdom of Jordan. From hiking the canyons of Wadi Mujib and baking Shrak bread in As-Salt to stargazing in Wadi Rum, Masar transforms travel into an adventure with points, badges, local host connections, and an AI guide.

---

## ✨ Features

- **🌐 Full Bilingual Experience (English & Arabic)**
  - Seamless language toggle between English and Arabic with instant dynamic RTL/LTR switching.
  - Complete translations across all screens: onboarding, home, explore, challenges, leaderboard, AI assistant, and profile.

- **🤖 "Rashid" AI Travel Companion**
  - An intelligent travel guide providing cultural tips, trail guidance, and local hidden gems.
  - Powered by Google Gemini API with smart offline/fallback responses.

- **🏆 Gamified Exploration & Rewards**
  - **Points System:** Earn points by completing real-world Jordanian adventures and cultural activities.
  - **Weekly Challenges:** Step-by-step interactive checklists (e.g., baking Shrak with Um Mohammed in Salt).
  - **Leaderboard:** Live ranks and friendly competition among fellow travelers.
  - **Badges:** Unlockable achievements (First Hike, Gourmet, Photographer, 7-Day Streak, Bedouin, Legend).

- **🗺️ Curated Jordan Experiences**
  - Authentic, local-first adventures with detailed itineraries, duration, pricing, and verified local hosts.
  - Filter by category: Nature & Adventure, Local Culture, Food, and Heritage.

- **👤 Personalized Traveler Profile**
  - Custom onboarding flow tailoring recommendations based on travel style and age group.
  - Firebase Authentication with Email/Password & Google Sign-In support.
  - Sound effects and interactive audio toggles.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)

### Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zeyad-badran/Masar.git
   cd Masar
   ```

2. **Start the local server:**
   ```bash
   npm start
   # or
   node server.js
   ```

3. **Open in your browser:**
   ```
   http://localhost:3000
   ```

---

## 🛠️ Configuration (Optional)

### Gemini AI Assistant
To enable live AI answers from Google Gemini:
```bash
# On Linux/macOS
export GEMINI_API_KEY="your-gemini-api-key"

# On Windows (PowerShell)
$env:GEMINI_API_KEY="your-gemini-api-key"

npm start
```
*If no API key is provided, Rashid gracefully falls back to local intelligent responses.*

### Firebase Setup
Firebase configuration is managed in `js/firebase.js`. To seed default catalog data to your Firestore instance:
```bash
npm run seed
```

---

## 📁 Project Structure

```text
Masar/
├── assets/
│   ├── fonts/             # Custom typography (Alexandria font)
│   └── images/            # High-resolution Jordanian photography & artwork
├── css/
│   └── style.css          # Core styles, responsive design, animations, RTL/LTR
├── js/
│   ├── assistant.js       # AI chat companion ("Rashid") logic
│   ├── firebase.js        # Firebase SDK integration, auth & Firestore sync
│   ├── home.js            # Home screen, challenge modals, audio FX, leaderboard
│   ├── i18n.js            # Comprehensive English/Arabic translation dictionary & engine
│   ├── onboarding.js      # Onboarding carousel & step management
│   ├── profile.js         # Traveler preferences, questionnaires & profile editing
│   ├── settings.js        # Language toggle, audio preferences, feedback
│   └── splash.js          # Intro splash screen animation
├── scripts/
│   └── seed-firestore.js  # Database seeder utility
├── index.html             # Single-page application entry point
├── package.json           # Project manifest & run scripts
├── server.js              # Lightweight Node.js static server & API proxy
└── README.md
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
