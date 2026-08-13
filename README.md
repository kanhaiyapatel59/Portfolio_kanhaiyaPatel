# 🌐 Kanhaiya Patel — Developer Portfolio

> **High-performance, 3D interactive developer portfolio website built with React, Vite, Framer Motion, and WebP performance optimizations.**

[![Live Portfolio](https://img.shields.io/badge/🌐_Live_Demo-portfolio--kanhaiya--patel.vercel.app-00E5FF?style=for-the-badge&logo=vercel&logoColor=black)](https://portfolio-kanhaiya-patel.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌟 Key Features

- **🎨 Modern Dark Theme & Glassmorphism**: Tailored HSL dark design palette with dynamic 3D tilt cards, ambient glow effects, and smooth Framer Motion transitions.
- **⚡ Sub-Second Image Loading (< 1.1 MB Payload)**: All image assets (avatar, certificates, achievements, project thumbnails) are optimized to WebP format, achieving a **> 92% size reduction** (from 15 MB down to ~1.1 MB).
- **🖥️ Interactive Terminal Simulator Modal**: Command-line terminal experience allowing visitors to run commands like `help`, `skills`, `projects`, `experience`, and `contact` directly inside the browser.
- **📱 Responsive Layout & Mobile Optimized**: Fully adaptable layout supporting mobile, tablet, and desktop screens with custom device preview framing.
- **📊 Comprehensive Developer Showcase**:
  - **Hero & About**: Interactive profile identity, taglines, and open-to-work status.
  - **Projects Showcase**: Interactive cards featuring CrimeLens, AI Disaster Command Center, MediRoute AI, Campus Ambulance Tracker, and Food Ordering System.
  - **Certifications & Achievements**: Lightbox viewer for awards (Freshathon 3.0 Winner, Mini Project EXPO 1st Prize) and certifications (NPTEL, Oracle Java, IBM SkillBuild).
  - **Education & Experience**: Interactive timeline of education and internship roles.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Styling & UI** | Tailwind CSS, Custom Glassmorphic CSS Design System |
| **Animations** | Framer Motion, 3D Perspective Tilt Hooks |
| **Icons & Media** | Lucide React, Simple Icons, WebP Assets |
| **Deployment** | Vercel Edge Network |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kanhaiyapatel59/Portfolio_kanhaiyaPatel.git
   cd Portfolio_kanhaiyaPatel
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
Portfolio/
├── public/                  # Favicon, SVG icons, resume PDF
├── src/
│   ├── assets/              # Optimized WebP image assets (< 1.1 MB total)
│   ├── components/          # React UI components (Hero, About, Projects, TerminalModal, etc.)
│   ├── data/                # Master portfolio data schema (portfolioData.js)
│   ├── hooks/               # Custom React hooks (3D tilt, window dimensions)
│   ├── App.jsx              # Main App wrapper & section layouts
│   ├── index.css            # Design system, CSS variables & utilities
│   └── main.jsx             # React DOM root entry
├── index.html               # Main HTML entry with SEO meta tags
├── vite.config.ts           # Vite bundler configuration
└── package.json             # Dependencies & scripts
```

---

## 📬 Contact & Connect

- **Live Website**: [portfolio-kanhaiya-patel.vercel.app](https://portfolio-kanhaiya-patel.vercel.app/)
- **LinkedIn**: [kanhaiya-patel](https://www.linkedin.com/in/kanhaiya-patel-1490b6324/)
- **Email**: [kanhaiyapatel383@gmail.com](mailto:kanhaiyapatel383@gmail.com)
- **GitHub**: [@kanhaiyapatel59](https://github.com/kanhaiyapatel59)
