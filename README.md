# Mouaadh Zegaoula — Premium Portfolio
A premium, highly interactive personal portfolio website for **Mouaadh Zegaoula**, AI Engineer & Cybersecurity Developer from Algeria.

The project features a sleek black-and-red cybersecurity aesthetic, a custom canvas-based code-matrix background, Lenis smooth scrolling, GSAP scroll-triggered parallax effects, and character-by-character SplitText title stagger reveals.

---

## 🚀 Local Development

To run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zegaoulamouaadh96/me.git
   cd me
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (usually `http://localhost:5173`).

---

## 🌐 Production Server Deployment (IP: `84.247.191.169`, Port: `6000`)

Here are the step-by-step instructions to run and serve this website on your production server **`84.247.191.169`** on port **`6000`**.

### Option A: Serve Static Files using Nginx (Recommended & Best Performance)
Since this is a high-performance React frontend application, compiling the project into static HTML/JS/CSS files and serving them with Nginx is the most secure and efficient method.

1. **Build the project on the server (or locally and upload):**
   ```bash
   npm run build
   ```
   This generates a production-ready, highly optimized folder named `dist`.

2. **Install Nginx on your server:**
   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

3. **Configure Nginx to serve the site on port `6000`:**
   Create a new Nginx configuration file:
   ```bash
   sudo nano /etc/nginx/sites-available/portfolio
   ```
   Add the following configuration:
   ```nginx
   server {
       listen 6000;
       server_name 84.247.191.169;

       root /var/www/portfolio/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Optimize static assets caching
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|otf)$ {
           expires 30d;
           add_header Cache-Control "public, no-transform";
       }
   }
   ```

4. **Link the config, test, and restart Nginx:**
   ```bash
   # Create a directory to hold the built files
   sudo mkdir -p /var/www/portfolio
   
   # Copy the 'dist' folder content to this folder
   sudo cp -r dist /var/www/portfolio/
   
   # Enable the site
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   
   # Remove default nginx config link if needed
   sudo rm /etc/nginx/sites-enabled/default
   
   # Verify configuration syntax
   sudo nginx -t
   
   # Restart Nginx
   sudo systemctl restart nginx
   ```

---

### Option B: Deploy using Docker (Easiest and Self-Contained)
If you have Docker installed on your server, you can containerize the app and run it instantly on port `6000`.

1. **Run the container directly (Nginx-backed static build):**
   Create a file named `Dockerfile` in the root of the project:
   ```dockerfile
   # Stage 1: Build the React application
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # Stage 2: Serve the build using Nginx
   FROM nginx:stable-alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run the Docker image on port `6000`:**
   ```bash
   # Build the image
   docker build -t mouaadh-portfolio .

   # Run the container on port 6000
   docker run -d -p 6000:80 --name portfolio mouaadh-portfolio
   ```

---

### Option C: Serve using Node.js static server & PM2 (Quickest Node setup)
If you want to serve the static build directly using Node.js:

1. **Install PM2 and the `serve` package globally:**
   ```bash
   npm install -g pm2 serve
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Start the server on port `6000` using PM2 (background runner):**
   ```bash
   pm2 start serve --name "mouaadh-portfolio" -- -s dist -l 6000
   ```

4. **Configure PM2 to start automatically on system reboot:**
   ```bash
   pm2 save
   pm2 startup
   ```

---

### Option D: Run Vite Dev Server (For testing/development only)
If you want to quickly test the application in dev mode on port `6000`:

1. **Run Vite with port and host flags:**
   ```bash
   npm run dev -- --port 6000 --host
   ```
