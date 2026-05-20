# Upstox Trading Assistant with Claude AI

AI-powered trading assistant that integrates Upstox broker API with Claude AI for intelligent portfolio analysis and trading suggestions.

## 🚀 Features

- **Real-time Portfolio Integration** - Connect with Upstox to fetch live holdings and positions
- **Claude AI Analysis** - Get intelligent trading suggestions and portfolio insights
- **Risk Assessment** - Each suggestion comes with risk evaluation
- **Manual Approval** - Every trade requires your explicit confirmation
- **Conversation History** - Contextual AI conversations about your investments
- **Mobile Responsive** - Works seamlessly on desktop and mobile

## 📋 Prerequisites

1. **Upstox Developer Account**
   - Sign up at [Upstox Developer Portal](https://upstox.com/developer/api-documentation)
   - Create an app to get API Key and Secret
   - Note your redirect URI (will be your Vercel URL + `/callback`)

2. **Anthropic API Key**
   - Sign up at [Anthropic Console](https://console.anthropic.com/)
   - Generate an API key
   - Ensure you have credits for Claude Sonnet 4

3. **Vercel Account**
   - Sign up at [Vercel](https://vercel.com)
   - Install Vercel CLI: `npm i -g vercel`

## 🛠️ Installation & Setup

### Step 1: Clone/Download Project

```bash
# If using Git
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/upstox-trading-app.git
git push -u origin main
```

### Step 2: Configure Upstox API

1. Go to [Upstox Developer Console](https://upstox.com/developer/apps)
2. Create a new app:
   - **App Name**: Upstox Trading Assistant
   - **Redirect URI**: `https://your-app-name.vercel.app/callback` (you'll get this after deployment)
3. Note down:
   - API Key
   - API Secret

### Step 3: Get Anthropic API Key

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Go to API Keys section
3. Create a new API key
4. Copy the key (starts with `sk-ant-...`)

### Step 4: Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy (from project root directory)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? upstox-trading-app (or your choice)
# - Directory? ./
# - Override settings? No
```

### Step 5: Configure Environment Variables in Vercel

After first deployment, add environment variables:

```bash
# Method 1: Via Vercel Dashboard
# 1. Go to your project on vercel.com
# 2. Settings → Environment Variables
# 3. Add these variables:

UPSTOX_API_KEY=your_upstox_api_key
UPSTOX_API_SECRET=your_upstox_api_secret
UPSTOX_REDIRECT_URI=https://your-app-name.vercel.app/callback
ANTHROPIC_API_KEY=your_anthropic_api_key

# Method 2: Via Vercel CLI
vercel env add UPSTOX_API_KEY
vercel env add UPSTOX_API_SECRET
vercel env add UPSTOX_REDIRECT_URI
vercel env add ANTHROPIC_API_KEY
```

### Step 6: Update Upstox Redirect URI

1. Go back to Upstox Developer Console
2. Edit your app
3. Update Redirect URI to: `https://your-actual-vercel-url.vercel.app/callback`
4. Save changes

### Step 7: Redeploy

```bash
# Redeploy with environment variables
vercel --prod
```

## 🎯 Usage Guide

### First Time Setup

1. **Visit Your App**
   ```
   https://your-app-name.vercel.app
   ```

2. **Login with Upstox**
   - Click "Login with Upstox"
   - Authorize the app
   - You'll be redirected back with your portfolio loaded

3. **Start Chatting with Claude**
   - Ask questions about your portfolio
   - Request trading suggestions
   - Get risk analysis

### Example Queries

```
"Should I buy more tech stocks?"
"What's my overall risk exposure?"
"Suggest a diversification strategy"
"Analyze RELIANCE for swing trading"
"Should I sell any holdings to book profits?"
```

### Executing Trades

1. Claude will suggest trades in formatted blocks
2. Click "Place Order" on any suggestion
3. Review order details
4. Confirm to execute on Upstox
5. Order placed in real-time!

## 📁 Project Structure

```
upstox-trading-app/
├── api/
│   ├── auth.js           # Upstox OAuth handler
│   ├── portfolio.js      # Fetch portfolio data
│   ├── analyze.js        # Claude AI analysis
│   └── place-order.js    # Execute trades
├── public/
│   └── index.html        # Frontend application
├── package.json
├── vercel.json           # Vercel configuration
├── .env.example          # Environment template
├── .gitignore
└── README.md
```

## 🔒 Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use Vercel Environment Variables** - Encrypted and secure
3. **Enable 2FA on Upstox** - Extra layer of security
4. **Review all trades** - Never auto-execute without confirmation
5. **Set trading limits** - Monitor daily/weekly limits
6. **Regular audits** - Check trade history regularly

## 🐛 Troubleshooting

### Issue: "Authentication failed"
**Solution**: 
- Verify API Key and Secret in Vercel env vars
- Check redirect URI matches exactly
- Ensure Upstox app is active

### Issue: "Failed to fetch portfolio"
**Solution**:
- Verify access token is valid
- Check if you have holdings in your account
- Try refreshing the page

### Issue: "Claude API error"
**Solution**:
- Check Anthropic API key is correct
- Verify you have API credits
- Check API key has proper permissions

### Issue: "Order placement failed"
**Solution**:
- Verify trading hours (NSE: 9:15 AM - 3:30 PM IST)
- Check if you have sufficient funds
- Verify instrument token is correct

## 📊 API Endpoints

### Authentication
```
GET /api/auth?code={authorization_code}
Response: { access_token, expires_in }
```

### Portfolio
```
GET /api/portfolio
Headers: Authorization: Bearer {access_token}
Response: { portfolio: [...] }
```

### Analysis
```
POST /api/analyze
Body: { query, portfolio, conversationHistory }
Response: { response, conversationHistory }
```

### Place Order
```
POST /api/place-order
Headers: Authorization: Bearer {access_token}
Body: { symbol, quantity, transaction_type, order_type, product, price }
Response: { success, order_id, details }
```

## 🔄 Updates & Maintenance

### Update Dependencies
```bash
npm update
vercel --prod
```

### View Logs
```bash
vercel logs
```

### Rollback Deployment
```bash
vercel rollback
```

## ⚠️ Disclaimer

**This is a prototype trading assistant for educational purposes.**

- Not financial advice - Always do your own research
- Use at your own risk - Trading involves financial risk
- Paper trade first - Test strategies before real money
- Past performance ≠ future results
- AI suggestions are not guaranteed to be profitable
- Always verify trades before execution

## 📝 License

MIT License - Feel free to modify and use for personal projects

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and pull requests.

## 📧 Support

For issues related to:
- **Upstox API**: [Upstox Support](https://upstox.com/support)
- **Claude API**: [Anthropic Support](https://support.anthropic.com)
- **This App**: Open a GitHub issue

## 🙏 Credits

Built with:
- [Upstox API v2](https://upstox.com/developer)
- [Claude AI by Anthropic](https://www.anthropic.com)
- [Vercel](https://vercel.com)

---

**Happy Trading! 🚀📈**
