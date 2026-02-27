# 🧑‍🔬 Professor Oak AI

Chat with Professor Oak about Pokémon! Ask about types, evolutions, battle strategies, and more.

![Professor Oak AI](https://img.shields.io/badge/Powered%20by-OpenRouter-red)

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Get OpenRouter API Key
1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up (free)
3. Go to **API Keys** → **Create Key**
4. Copy the key (starts with `sk-or-v1-...`)

### Step 2: Deploy to Vercel
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"Add New Project"** → Select your repo
4. **IMPORTANT:** Before clicking Deploy, add Environment Variable:
   - Click **"Environment Variables"**
   - Name: `OPENROUTER_API_KEY`
   - Value: `sk-or-v1-your-api-key-here`
5. Click **Deploy**

### Step 3: Done! 🎉
Your app is now live with AI working!

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
echo "OPENROUTER_API_KEY=sk-or-v1-your-key" > .env.local

# Run dev server
npm run dev
```

## 📁 Project Structure

```
pokemon-professor-oak/
├── api/
│   └── chat.js          # Serverless function (hides API key)
├── src/
│   ├── main.jsx
│   └── App.jsx
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## ✨ Features

- 🎮 Retro Game Boy aesthetic
- 🤖 AI-powered responses (via OpenRouter)
- 🔐 Secure - API key hidden in backend
- ⚡ Quick question buttons
- 📱 Mobile responsive

## 📝 License

MIT - Feel free to use and modify!

---
Powered by OpenRouter
