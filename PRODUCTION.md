# 🎯 PRODUCTION SETUP - COMPLETE GUIDE

This guide covers everything you need for a production-ready deployment.

## 📊 Architecture Overview

```
Frontend (Vercel)
    ↓
API Routes (Vercel Serverless)
    ↓
    ├─→ Upstox API (Portfolio & Trading)
    └─→ Claude API (AI Analysis)
```

## 🔐 Security Configuration

### 1. Environment Variables (Critical)

Never hardcode credentials! All sensitive data goes in Vercel environment variables.

**Required Variables:**

```env
UPSTOX_API_KEY=your_api_key_here
UPSTOX_API_SECRET=your_api_secret_here
UPSTOX_REDIRECT_URI=https://your-app.vercel.app/callback
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 2. OAuth Security

- Use HTTPS only (Vercel provides this automatically)
- Validate redirect URIs match exactly
- Store access tokens securely (localStorage with encryption recommended for production)
- Implement token refresh logic
- Add CSRF protection for OAuth flow

### 3. API Rate Limiting

**Upstox Limits:**
- 10 requests per second per user
- Implement exponential backoff for retries

**Claude API Limits:**
- Depends on your plan
- Implement request queuing
- Add timeout handling

## 🚀 Deployment Steps

### 1. GitHub Setup

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial production setup"

# Create GitHub repo (via web interface)
# Then connect:
git remote add origin https://github.com/YOUR_USERNAME/upstox-trading-app.git
git branch -M main
git push -u origin main
```

### 2. Vercel Deployment

**Option A: Via GitHub Integration (Recommended)**

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure build settings (auto-detected)
4. Add environment variables
5. Deploy!

**Option B: Via CLI**

```bash
# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### 3. Domain Setup (Optional)

If you want custom domain:

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `trading.yourdomain.com`)
3. Update DNS records as instructed
4. Update Upstox redirect URI to new domain

### 4. Environment Variables Configuration

**Via Vercel Dashboard:**

1. Project → Settings → Environment Variables
2. Add each variable:
   - Name: `UPSTOX_API_KEY`
   - Value: Your actual key
   - Environment: Production, Preview, Development (select all)
3. Repeat for all 4 variables
4. Redeploy to apply

**Via CLI:**

```bash
vercel env add UPSTOX_API_KEY production
# Paste value when prompted

vercel env add UPSTOX_API_SECRET production
vercel env add UPSTOX_REDIRECT_URI production
vercel env add ANTHROPIC_API_KEY production
```

## 📈 Monitoring & Analytics

### 1. Vercel Analytics

Enable in dashboard:
- Project → Analytics
- View traffic, performance, errors

### 2. Error Tracking

Add error logging to API routes:

```javascript
try {
  // Your code
} catch (error) {
  console.error('Error:', error);
  // Send to error tracking service (Sentry, etc.)
}
```

### 3. Trading Logs

Implement trade logging:
- All executed trades
- AI suggestions
- User actions
- Store in database or log service

## 🔄 Maintenance

### Regular Updates

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm update

# Test locally (optional)
npm run dev

# Deploy
vercel --prod
```

### Database Backup (If using)

If you add database for trade history:
- Set up automated backups
- Use Vercel Postgres or external DB
- Export trades regularly

### API Key Rotation

Every 90 days:
1. Generate new Upstox API credentials
2. Update Vercel environment variables
3. Redeploy
4. Test login flow

## 🧪 Testing Checklist

Before going live, test:

- [ ] Upstox OAuth flow
- [ ] Portfolio loading
- [ ] Real-time price updates
- [ ] Claude AI responses
- [ ] Order placement (with ₹1 test)
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Token expiration handling
- [ ] Multiple concurrent users

## 🚨 Production Readiness

### Must-Have Features

- [x] Upstox OAuth integration
- [x] Portfolio fetching
- [x] Claude AI analysis
- [x] Order placement
- [x] Error handling
- [x] Mobile responsive
- [x] HTTPS enabled

### Nice-to-Have Features

- [ ] Trade history database
- [ ] Email notifications
- [ ] Price alerts
- [ ] Portfolio analytics dashboard
- [ ] Backtesting capabilities
- [ ] Multi-user support
- [ ] Advanced charting

## 💰 Cost Estimation

**Free Tier (Suitable for personal use):**
- Vercel: 100GB bandwidth/month (free)
- Anthropic: Pay per token usage (~$0.01-0.10/day for moderate use)
- Upstox: Free API access

**Expected Costs:**
- Light usage (10 queries/day): ~₹300/month
- Medium usage (50 queries/day): ~₹1,500/month
- Heavy usage (200 queries/day): ~₹5,000/month

## 🛡️ Risk Management

### Trading Limits

Implement in code:

```javascript
const DAILY_LIMIT = 100000; // ₹1 lakh daily
const TRADE_LIMIT = 10000;  // ₹10k per trade
const MAX_TRADES_PER_DAY = 10;

// Check before placing order
if (orderValue > TRADE_LIMIT) {
  throw new Error('Trade exceeds limit');
}
```

### AI Suggestion Filters

Add validation:
- Minimum confidence threshold
- Risk level caps
- Sector diversification checks
- Stop-loss requirements

## 📊 Performance Optimization

### Frontend
- Lazy load components
- Compress images
- Use CDN for assets
- Enable gzip compression

### API Routes
- Cache portfolio data (5-10 seconds)
- Implement request debouncing
- Use concurrent API calls where possible
- Add response compression

### Claude API
- Optimize prompt length
- Reuse conversation context
- Batch multiple questions when possible
- Cache common responses

## 🔍 Debugging

### Check Vercel Logs

```bash
vercel logs
```

### Check Browser Console

F12 → Console tab
Look for:
- API errors
- CORS issues
- Token problems

### Test API Endpoints

```bash
# Test auth endpoint
curl https://your-app.vercel.app/api/auth?code=test

# Test portfolio
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://your-app.vercel.app/api/portfolio
```

## 🎯 Go-Live Checklist

Final checks before going live:

- [ ] All environment variables set
- [ ] Upstox redirect URI matches production URL
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Error handling tested
- [ ] Mobile testing done
- [ ] Small test trade executed successfully
- [ ] Trading limits configured
- [ ] Backup plan ready
- [ ] Documentation updated
- [ ] Team trained (if applicable)

## 📞 Support & Resources

**Upstox API:**
- Docs: https://upstox.com/developer/api-documentation
- Support: developer@upstox.com

**Anthropic API:**
- Docs: https://docs.anthropic.com
- Support: support@anthropic.com

**Vercel:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

## 🎉 Launch!

Once all checks pass:

```bash
# Final production deployment
vercel --prod

# Verify it's live
curl https://your-app.vercel.app

# Start trading smartly with AI assistance!
```

---

**Remember:** AI is a tool to assist your decisions, not replace your judgment. Always review suggestions carefully before executing trades.

**Good luck! 🚀📈**
