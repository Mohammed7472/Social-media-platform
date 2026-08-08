# 🌐 Social Media Platform (With Tarmeez)

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

<p align="center">
  <b>A modern, responsive, and feature-rich Social Media Web Application built with vanilla JavaScript, Bootstrap, and RESTful APIs.</b>
</p>

<p align="center">
  <a href="https://social-media-platform-two-fawn.vercel.app/">🚀 <b>Live Demo</b></a> •
  <a href="https://github.com/Mohammed7472/Social-media-platform">📦 <b>GitHub Repo</b></a>
</p>

---

## 📌 Overview

**Social Media Platform (Tarmeez)** is an interactive single-page-like web application designed to simulate modern social networking platforms. Users can register new accounts, log in securely, create and share media-rich posts, edit or delete their content, write comments, and view personalized user profiles.

Built with performance, user experience, and visual clarity in mind, the platform consumes asynchronous REST APIs for seamless client-server communication without page reloads.

---

## ✨ Key Features

- 🔐 **User Authentication & Authorization:**
  - Account Registration and Secure JWT-based Login.
  - Session management using LocalStorage/Tokens.
  - Protected routes and actions (Only authenticated users can post/comment/edit).

- 📰 **Interactive Newsfeed & Posts:**
  - Dynamic Post Feed with pagination/infinite content rendering.
  - Multi-media posts (Text content + Image attachments).
  - Tags and categories support for enhanced categorization.

- ✍️ **CRUD Operations:**
  - **Create:** Share new posts with images and custom tags via modal forms.
  - **Read:** Detailed view for individual posts along with full comment threads.
  - **Update:** Edit existing post titles, body, or attached images.
  - **Delete:** Safe post deletion with confirmation prompts.

- 💬 **Real-time Interaction:**
  - Add comments to any post with instant UI updates.
  - View author profiles directly by clicking on post headers or avatars.

- 👤 **User Profiles:**
  - Dedicated Profile page showcasing personal user details and all authored posts.

- 📱 **Responsive & Accessible UI:**
  - Fully mobile-responsive layout crafted with Bootstrap 5.
  - Dark-tinted navigation headers, toasts/alerts for user feedback, and smooth transitions.

---

## 🛠️ Tech Stack & Tools

| Area | Technologies Used |
| :--- | :--- |
| **Frontend Core** | HTML5, CSS3, JavaScript (ES6+ Asynchronous DOM Manipulation) |
| **UI Framework** | Bootstrap 5, FontAwesome / Bootstrap Icons |
| **API & Data** | RESTful Web APIs, Axios / Fetch API, JSON |
| **State & Auth** | LocalStorage, Bearer Token Authentication |
| **Deployment** | Vercel Platform |

---

## 📂 Project Structure

```text
Social-media-platform/
│
├── index.html            # Main feed & application landing page
├── profile.html          # User profile view page
├── main.js               # Primary application logic & API requests
├── main.css              # Custom styling & overrides
└── README.md             # Project documentation
