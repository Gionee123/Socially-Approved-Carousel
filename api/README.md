# DripTrip - Socially Approved Carousel API Backend

Welcome to the backend REST API for **DripTrip**. This is a Node.js, Express, and MongoDB application designed to support both the public client application and the secure Admin Dashboard.

---

## 🛠️ Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload Storage**: Cloudinary (Cloud-based media hosting)
- **Middleware**: Multer (Multipart/form-data handler), CORS, dotenv (Env variables)

---

## 📦 Key Integrations

### 🎥 Cloudinary Media Uploads
The API features full media integration using Cloudinary and Multer.
- **Videos**: Automatically uploaded to the `videos` folder on Cloudinary using optimal video formatting.
- **Thumbnails**: Images uploaded to the `thumbnails` folder on Cloudinary. Both are processed directly on upload triggers.

---

## 🧭 API Route Schema & Documentation

### 👤 Admin Area APIs
Base path: `/api/admin`

#### 📹 Video Management
- `POST /video/add` — Uploads a new video file (`videoUrl` field) and saves meta details to DB.
- `POST /video/view` — Fetches a sorted list of all uploaded videos.
- `PUT /video/update/:id` — Updates video meta details and replaces video files if provided.
- `POST /video/upload-thumbnail` — Processes and uploads a drag-and-dropped thumbnail file (`thumbnail` field) to Cloudinary.
- `POST /video/details` — Gets specific video info using request body ID.
- `POST /video/status-change` — Toggle visibility status (`status` true/false) of a video.
- `DELETE /video/delete/:id` — Deletes a video.

#### 💬 Comments Management
- `POST /comment/all` — Returns a list of all user comments (populated with video title and thumbnail details).
- `POST /comment/video` — Fetches comments matching a specific `videoId` in the request body.
- `POST /comment/status-change` — Toggle comment approval status (`status` true/false).

#### 💖 Likes Management
- `POST /like/all` — Lists all user likes (populated with video information).
- `POST /like/video` — Fetches all likes matching a specific `videoId` in the request body.

#### 🛍️ Products (Ecommerce)
- `POST /product/view` — Lists products populated with dynamic stats (calculating Likes and Comments count on the fly).

---

### 🌐 Website/Public Client APIs
Base path: `/api/website`

#### 📹 Videos
- `POST /video/view` — Fetches active videos only (`status: true`).

#### 💬 Comments
- `POST /comment/add` — Adds a user comment to a video (tracks client IP address, default `status: true` for website display).
- `POST /comment/video` — Lists approved comments (`status: true`) for a video ID.
- `PUT /comment/update/:id` — Updates user comment content.
- `DELETE /comment/delete/:id` — Deletes a comment.

#### 💖 Likes
- `POST /like/toggle` — Toggles a video like for a user's IP address. Increments/decrements totals dynamically.
- `POST /like/video/:videoId` — Gets total likes for a video.

---

## 🗄️ Database Schemas (Mongoose)

### 1. Admin Schema (`Admin.Schema.js`)
- `adminName` (String, Required)
- `adminPassword` (String, Required)

### 2. Video Schema (`Video.schema.js`)
- `title` (String, Required)
- `description` (String)
- `videoUrl` (String, Required - Cloudinary URL)
- `thumbnail` (String - Cloudinary URL)
- `duration` (Number, Max 30 seconds)
- `status` (Boolean, Default: `true`)

### 3. Comment Schema (`Comment.Schema.js`)
- `videoId` (Ref: `Video`, Required)
- `name` (String, Required)
- `comment` (String, Required)
- `ipAddress` (String)
- `status` (Boolean, Default: `true`)

### 4. Like Schema (`Like.Schema.js`)
- `videoId` (Ref: `Video`, Required)
- `ipAddress` (String)
- `liked` (Boolean, Default: `true`)

---

## ⚙️ Local Setup Guide

### 1. Environment Variables
Create an `.env` file in the root `api/` directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/test
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start API Server
For development (uses nodemon):
```bash
npm run dev
```
For production:
```bash
npm start
```
Server runs on `http://localhost:5000`. On initial run, a default admin account is seeded:
- **Admin Name**: `admin`
- **Admin Password**: `admin123`
