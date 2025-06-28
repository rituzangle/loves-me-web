#!/bin/bash

# Set your working directory
cd /Users/mommy/Documents/_loves-me-App/loves_project || exit 1

echo "🔄 Cleaning dist/"
rm -rf dist/

echo "🚀 Exporting updated web build..."
npx expo export --platform web

echo "🐳 Rebuilding Docker image..."
docker build -t loves-me-app .

echo "📦 Creating Docker ZIP package..."
# Create Docker package folder
rm -rf loves-me-docker-package
mkdir loves-me-docker-package
cp -r dist loves-me-docker-package/
cp Dockerfile loves-me-docker-package/
cat > loves-me-docker-package/README_DOCKER_DEPLOY.md <<EOF
# Loves Me, Loves Me Not – Docker Deployment

## 🐳 Run Locally

docker build -t loves-me-app .
docker run -d -p 8080:80 loves-me-app

Then open: http://localhost:8080
Or from another device: http://<your-mac-ip>:8080
EOF

zip -r loves-me-docker-package.zip loves-me-docker-package/

echo "🌐 Creating Web Deploy ZIP package..."
rm -rf loves-me-web-deploy-package
mkdir loves-me-web-deploy-package
cp -r dist loves-me-web-deploy-package/
cat > loves-me-web-deploy-package/README_WEB_DEPLOY.md <<EOF
# Loves Me, Loves Me Not – Web Deployment

## ✅ Netlify
Drag & drop the dist/ folder at https://app.netlify.com

## 🚀 Vercel
Push to GitHub and set root to dist/ in Vercel dashboard

## 🧑‍💻 GitHub Pages
Add to package.json:
"homepage": "https://yourusername.github.io/your-repo-name",
"scripts": {
  "predeploy": "expo export --platform web",
  "deploy": "gh-pages -d dist"
}
EOF

zip -r loves-me-web-deploy-package.zip loves-me-web-deploy-package/

echo "✅ All done! Packages ready:"
echo "- loves-me-docker-package.zip"
echo "- loves-me-web-deploy-package.zip"
