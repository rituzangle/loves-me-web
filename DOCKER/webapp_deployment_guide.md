**Loves Me, Loves Me Not — Web App Deployment Guide**

This guide covers how to deploy and share your static Expo web app (`dist/` folder) via:

- Netlify (drag-and-drop method)
- Vercel (via GitHub integration)
- GitHub Pages
- Docker (for private or LAN access)

---

## 📦 1. Deploy to Netlify (Drag & Drop)

### Steps:

1. Go to [https://netlify.com](https://netlify.com) and sign up or log in.
2. On your Netlify dashboard, click **"Add new site" > "Deploy manually"**.
3. Drag your local `dist/` folder into the drop area.
4. Netlify will auto-deploy and give you a public link (e.g. `https://loves-me-demo.netlify.app`).
5. Done! Share the URL.

---

## 🚀 2. Deploy to Vercel via GitHub

### Steps:

1. Push your Expo project (including `dist/`) to a new GitHub repo.
2. Go to [https://vercel.com](https://vercel.com) and sign up/log in with GitHub.
3. Click **"New Project"** and import your GitHub repo.
4. Set the root directory to `dist/`
5. Click **Deploy**.

Your app will be live at something like: `https://loves-me.vercel.app`

---

## 💻 3. Upload to GitHub Pages

### One-time setup:

1. In your `package.json`, add:

```json
"homepage": "https://yourusername.github.io/your-repo-name",
"scripts": {
  "predeploy": "expo export --platform web",
  "deploy": "gh-pages -d dist"
}
```

2. Install GitHub Pages deploy tool:

```bash
npm install --save-dev gh-pages
```

3. Add, commit, and push your project to GitHub.

### To deploy:

```bash
npm run deploy
```

Then go to:

```
https://yourusername.github.io/your-repo-name
```

---

## 🔐 4. Share via Docker on Local Network (LAN)

### Create `Dockerfile` in project root:

```Dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and run:

```bash
docker build -t loves-me-app .
docker run -d -p 8080:80 loves-me-app
```

### Access:

- On your Mac: `http://localhost:8080`
- On LAN (from another device): `http://<your-mac-ip>:8080`

> Find your IP with: `ipconfig getifaddr en0`

You can now share this URL with your tester 🚀

---

Let me know which one you want to focus on first, and I’ll help you zip it, push it, or automate it!

