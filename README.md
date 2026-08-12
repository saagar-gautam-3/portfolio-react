# Sagar Gautam — Premium Personal Portfolio Website

A high-end, responsive, and interactive developer portfolio website built specifically for Sagar Gautam, Backend Engineer (FastAPI, Laravel & PostgreSQL). 

This website features a custom developer-centric theme modeled around terminal screens, REST API endpoints, and database relational schemas, showcasing your technical backend prowess through interactive frontend elements.

---

## 🚀 Key Features

* **Interactive API Sandbox**: A simulated mock client and SSH CLI terminal in the Hero section where recruiters can click routes or type commands (like `help`, `about`, `skills`, `projects`, `clear`) to interactively query your resume data.
* **Relational Schema Graph**: An interactive representation of an RBAC database schema inside the About section. Hovering over PK or FK keys highlights columns and outlines referencing entities.
* **Real Contact Form Delivery**: A developer-centric contact panel designed like an API client. Filling out standard form parameters live-formats a JSON payload. Submitting it sends a real email directly to your inbox via Web3Forms, all without needing a custom backend.
* **Expandable Project Cards**: Cards designed like HTTP method endpoints. Clicking an endpoint expands a detail drawer revealing your specific tasks and achievements on the project.
* **Clean Dark/Light Modes & Grid Lines**: A cyberpunk-minimal slate theme with cyan/green glows representing healthy `200 OK` API indicators, complete with glassmorphic cards and customized glow scrollbars. Toggleable between Dark and Light mode.

---

## 🛠️ Tech Stack

* **Core**: React.js (Component-based architecture)
* **Styling**: Custom Vanilla CSS (for layout control, animations, and custom scrollbar properties without compilation bloat)
* **Animations**: Framer Motion (for drawer expansions and layout transitions)
* **Icons**: Lucide React
* **Build Tool**: Vite (Superfast Hot Module Replacement)

---

## 📋 Prerequisites

Make sure you have Node.js and npm installed on your machine:
* **Node.js**: `v18.x` or later (Recommended)
* **npm**: `v9.x` or later

---

## ⚙️ Installation & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in terminal).

3. **Build for Production**:
   ```bash
   npm run build
   ```
   This compiles assets into optimized static files inside the `/dist` directory.

4. **Preview Production Build locally**:
   ```bash
   npm run preview
   ```
   Serves the generated `/dist` build locally to verify correctness.

---

## 📧 Contact Form

This portfolio remains a 100% static React/Vite application (no custom backend required). 
To make the contact form actually deliver emails to your inbox, it uses **Web3Forms**.

**Why Web3Forms?**
* It requires zero backend code and zero server configuration.
* The access key is completely safe to commit into public frontend code (it's not an SMTP secret).
* It allows you to use the sender's email address as the `Reply-To`, making it easy to reply directly to recruiters.
* Generous free tier with no submission limits.

**How to Setup:**
1. Go to [Web3Forms](https://web3forms.com/).
2. Enter your email address (`sagargautam0626@gmail.com`).
3. Click "Create Access Key" — your key will be sent instantly to your email.
4. Open [src/config/contact.js](file:///d:/portfolio/src/config/contact.js).
5. Paste your access key into the `ACCESS_KEY` constant, replacing `"YOUR_ACCESS_KEY_HERE"`.

Once deployed, you will receive all submissions directly to your email inbox, and you can view a full history at the Web3Forms dashboard.

---

## 🌓 Dark / Light Mode

The portfolio features a fully integrated CSS variable-based theming system. 
* **Dark Mode**: Cyberpunk, slate backgrounds with vibrant cyan accents.
* **Light Mode**: Clean, high-contrast, professional developer theme.
* **Persistence**: Theme choice is automatically saved to `localStorage` and persists across browser restarts.
* **System Preference**: If no preference is saved, the app automatically detects the user's OS/browser `(prefers-color-scheme: light)` preference and applies the correct theme on the first visit.
* **Toggle**: Use the Sun/Moon icon in the upper right navigation bar to manually toggle themes.

---

## ✏️ Customization & Content Modification

All the portfolio copywriting is stored in structured, decoupled JS files inside [src/data](file:///d:/portfolio/src/data). You can easily update your CV info later without touching React component codes:

### 1. Social Links & Biography Details
Open [src/data/profile.js](file:///d:/portfolio/src/data/profile.js) to edit:
* Full name and role subtitles.
* Email, phone, GitHub, and LinkedIn URLs.
* Contact forms and direct download targets for your resume.

### 2. Technical Stack List
Open [src/data/skills.js](file:///d:/portfolio/src/data/skills.js) to edit:
* Categories (e.g. Backend, Databases, DevOps).
* Specific technologies tags.
* Core competencies list.

### 3. Work History
Open [src/data/experience.js](file:///d:/portfolio/src/data/experience.js) to edit:
* Job titles, companies, locations, dates.
* Specific accomplishments and responsibility bullet points.
* Core tech stack arrays used in each position.
* Education histories and certifications.

### 4. Projects Dashboard
Open [src/data/projects.js](file:///d:/portfolio/src/data/projects.js) to edit:
* Project names, taglines, and descriptions.
* Specific technology tags list.
* Bullet points listing your unique contributions.
* GitHub links and live platform URL redirects (set to `null` to automatically display `Private Source` or `Backend API` indicators).

### 5. Replacing the CV PDF
To replace the downloadable resume PDF:
* Place your new PDF file inside `public/assets/` and name it `resume.pdf`.
* If you rename the file, update the `resumeUrl` field inside [src/data/profile.js](file:///d:/portfolio/src/data/profile.js).

---

## 🌐 Deploying to Production

Since this portfolio builds into purely static HTML, CSS, and JS files, it can be deployed for free on major hosting providers:

### Vercel
1. Install Vercel CLI: `npm install -g vercel`.
2. Run `vercel` in the project root.
3. Link to your project and select **Vite** preset (it will automatically configure `npm run build` and output folder `dist`).

### Netlify
1. Log in to your Netlify account and click **Add new site** -> **Import an existing project**.
2. Select your repository provider (GitHub, GitLab, etc.).
3. Set the **Build Command** to `npm run build` and **Publish Directory** to `dist`.
4. Click **Deploy Site**.
