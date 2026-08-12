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

## 🚀 Production Build

To compile assets into optimized static files inside the `dist/` directory, run:
```bash
npm run build
```

## 👀 Preview Production Build

To serve the generated `dist/` build locally and verify correctness before deployment, run:
```bash
npm run preview
```

---

## 🌐 Deployment — Netlify

This project is configured and ready to be deployed as a static site to Netlify via continuous deployment from GitHub.

* **GitHub repository**: https://github.com/saagar-gautam-3/portfolio-react.git
* **Build command**: `npm run build`
* **Publish directory**: `dist`

### Netlify Deployment Steps
1. Go to [Netlify](https://www.netlify.com/).
2. Sign in to your account.
3. Choose **Add new site** -> **Import an existing project**.
4. Select **GitHub** as the provider and authorize Netlify.
5. Select the `saagar-gautam-3/portfolio-react` repository.
6. Select the `main` branch.
7. Netlify will automatically detect the settings from `netlify.toml`, but ensure the configuration is:
   * **Build command**: `npm run build`
   * **Publish directory**: `dist`
8. Click **Deploy Site**.

### Automatic Deployment Behavior
The deployment is connected directly to your GitHub repository. Netlify provides Continuous Deployment (CD). After the initial setup, the workflow is entirely automated:

1. You make changes to your local code.
2. Push changes to the `main` branch:
   ```bash
   git add .
   git commit -m "update portfolio"
   git push origin main
   ```
3. Netlify automatically detects the push, triggers `npm run build`, and deploys the generated `dist/` folder to your live website within seconds.

### Custom Domain
Once deployed, you can connect a custom domain to your Netlify site for free (you only need to own the domain name).
1. In your Netlify dashboard, go to your site settings.
2. Navigate to **Domain management** -> **Domains**.
3. Click **Add custom domain** and enter your domain name.
4. Netlify will guide you to update your domain registrar's DNS settings (either by pointing an A record to Netlify's IP or using Netlify's name servers).
5. Once DNS propagates, Netlify will automatically provision a free SSL certificate via Let's Encrypt.
