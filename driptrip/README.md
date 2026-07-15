# DripTrip - Socially Approved Carousel Frontend

Welcome to **DripTrip**, the frontend application for the Socially Approved Carousel. This project is built using React, TypeScript, Vite, Tailwind CSS, Redux Toolkit, and React Router. It offers an engaging, premium-designed TikTok/Reels-style video carousel with ecommerce features, along with a powerful Admin Panel to manage the video library and user interactions.

---

## 🚀 Key Features

### 🌐 Public Web Application
- **Vertical Video Carousel**: Immersive reels-style feed displaying high-quality fitness and lifestyle videos.
- **Interactive UI Overlay**: 
  - **Dynamic Like/Unlike Toggle**: Double-tap or tap the heart icon to toggle video likes, updating counts instantly via the API.
  - **Live Comment Drawer**: Write and view comments dynamically. Only approved comments are displayed. Icon counts are updated reactively on submission.
  - **Web Share Integration**: Share the current video using native device share options, falling back to instant clipboard copy.
- **Ecommerce Product Cards**: View products featured in the current video with accurate pricing, discounts, and quick view details.

### 🛡️ Admin Dashboard
- **Video Management**:
  - **View Videos**: Complete list of uploaded videos showing titles, durations, active statuses, and links to the live file.
  - **Add/Edit Videos**: Upload new video files directly from your computer, drag-and-drop or browse thumbnail images, set description, duration limits, and status.
  - **Dynamic Status Toggle**: Enable/disable video visibility on the frontend instantly.
- **Interactions Logs**:
  - **Comments Management**: Review user-submitted comments, with options to toggle visibility (Approved vs. Hidden).
  - **Likes Monitoring**: Check which videos received likes and monitor the IP address of users.
- **Collapsible Sidebar Drawer**: Sleek expandable sidebar menu with collapsible drop-downs and smooth rotation transitions.

---

## 🛠️ Technology Stack
- **Build Tool**: Vite (Lightning-fast build tool and developer server)
- **Framework**: React with TypeScript (type-safe logic)
- **Styling**: Tailwind CSS & Custom CSS (custom HSL variables, sleek dark modes, micro-animations, glassmorphism)
- **State Management**: Redux Toolkit (maintaining login store, admin session)
- **Routing**: React Router DOM (protected layout routes, index redirects)
- **API Client**: Axios (configured with environment base URLs)
- **Icons**: React Icons (lucide, fontawesome, weather/io icons)

---

## ⚙️ Setup and Installation

### 1. Prerequisites
Ensure you have Node.js (v16+) and npm installed on your system.

### 2. Install Dependencies
Navigate to the root directory and install dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root folder of the project:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Run Development Server
Start the Vite dev server locally:
```bash
npm run dev
```
The server will run on `http://localhost:5173`.

---

## 📂 Project Architecture

```text
driptrip/
├── public/                 # Static assets
├── src/
│   ├── admin_panel/        # Admin Dashboard Layout & Modules
│   │   ├── comman/         # Common Admin components (Header, Sidebar)
│   │   └── pages/          # Admin pages (Videos, Comments, Likes)
│   ├── common/             # Website layout components (Header, Footer)
│   ├── components/         # Reusable widgets (OuterCarousel, InnerModal)
│   ├── data/               # Static fallback data (dummyVideos)
│   ├── pages/              # Public web pages (Home, Login, NotFound)
│   ├── redux/              # Redux slices, actions and stores
│   ├── App.tsx             # Main router config
│   ├── main.tsx            # Vite root entry
│   └── index.css           # Global design stylesheet & Tailwind config
├── .env                    # Environment config
├── tailwind.config.js      # Utility-first styling variables
└── vite.config.ts          # Vite bundling presets
```

---

## 🔒 Security & Optimization Notes
- **Vite Import Types**: Types and Interfaces are imported explicitly as `import type` to prevent bundler runtime issues in ESM modules.
- **Multer Image/Video Split**: Form uploads use separate Cloudinary storage configurations dynamically based on file type.
- **Reactive Hooks**: Carousel cards utilize `useCallback` to prevent redundant triggers and memoize state changes.
