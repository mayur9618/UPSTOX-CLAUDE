# ⚡ QUICK START GUIDE

Get your Upstox Trading Assistant live in 15 minutes!

## 📦 What You Need

1. **Upstox Account** - Active trading account
2. **Anthropic API Key** - Get from console.anthropic.com
3. **GitHub Account** - To store code
4. **Vercel Account** - For hosting (free tier works!)

## 🚀 5-Step Deployment

### Step 1: Get Upstox Credentials (5 mins)

1. Go to https://upstox.com/developer
2. Login with your Upstox account
3. Click "Create App"
4. Fill details:
   - Name: "AI Trading Assistant"
   - Redirect URI: Leave blank for now
5. Copy **API Key** and **Secret** - save them!

### Step 2: Get Anthropic API Key (2 mins)

1. Visit https://console.anthropic.com
2. Login/Signup
3. Go to "API Keys"
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-`)

### Step 3: Deploy to Vercel (3 mins)

```bash
# Open terminal in project folder

# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts - just hit Enter for defaults
```

You'll get a URL like: `https://upstox-trading-app-abc123.vercel.app`

### Step 4: Add Environment Variables (3 mins)

Go to: https://vercel.com/dashboard

1. Click your project
2. Go to **Settings** → **Environment Variables**
3. Add these 4 variables:

| Name | Value |
|------|-------|
| `UPSTOX_API_KEY` | Your Upstox API Key |
| `UPSTOX_API_SECRET` | Your Upstox API Secret |
| `UPSTOX_REDIRECT_URI` | `https://your-vercel-url.vercel.app/callback` |
| `ANTHROPIC_API_KEY` | Your Anthropic key (sk-ant-...) |

4. Click "Save"

### Step 5: Update Upstox & Redeploy (2 mins)

**Update Upstox:**
1. Go back to https://upstox.com/developer
2. Edit your app
3. Set Redirect URI: `https://your-vercel-url.vercel.app/callback`
4. Save

**Redeploy:**
```bash
vercel --prod
```

## ✅ Test Your App

1. Visit your Vercel URL
2. Click "Login with Upstox"
3. Authorize the app
4. Your portfolio should load!
5. Ask Claude: "What should I do with my portfolio?"

## 🎯 First Trade Suggestion

Try asking Claude:

```
"Analyze my portfolio and suggest one trade for today"
```

Claude will give you a formatted suggestion with:
- Action (BUY/SELL)
- Symbol
- Quantity
- Reason
- Risk level

Review it and click "Place Order" to execute!

## ⚠️ Important Notes

- **Start small**: Test with small quantities first
- **Trading hours**: NSE is 9:15 AM - 3:30 PM IST
- **Not financial advice**: Always do your own research
- **Review suggestions**: Don't blindly follow AI recommendations

## 🔧 Common Issues

**"Authentication failed"**
→ Check environment variables are saved and redeployed

**"Portfolio not loading"**
→ Make sure you have holdings in your Upstox account

**"Claude not responding"**
→ Verify Anthropic API key is correct and has credits

**"Order failed"**
→ Check trading hours and account balance

## 📱 Mobile App

The app works great on mobile! Just:
1. Open your Vercel URL on phone
2. Add to Home Screen (like an app)
3. Use it anywhere!

## 🎉 You're Done!

Your AI trading assistant is now live and ready to help you make smarter trading decisions!

**Next Steps:**
- Set up daily trading limits
- Enable 2FA on Upstox
- Explore different analysis queries
- Share feedback and improve

---

**Need help?** Check the full README.md or DEPLOYMENT.md

**Happy Trading! 📈🚀**
