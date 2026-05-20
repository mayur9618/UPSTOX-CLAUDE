# 🚀 DEPLOYMENT CHECKLIST

Complete this checklist step-by-step for successful deployment.

## ✅ Pre-Deployment

- [ ] Upstox Developer Account created
- [ ] Upstox app created (API Key & Secret obtained)
- [ ] Anthropic API key obtained
- [ ] Vercel account created
- [ ] GitHub repository created

## ✅ Initial Setup

- [ ] All project files downloaded/cloned
- [ ] `.env.example` reviewed
- [ ] Local testing done (optional)

## ✅ Vercel Deployment

- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Logged into Vercel (`vercel login`)
- [ ] Project deployed (`vercel`)
- [ ] Production URL obtained

## ✅ Environment Configuration

Add these to Vercel Dashboard → Settings → Environment Variables:

- [ ] `UPSTOX_API_KEY` = [Your Upstox API Key]
- [ ] `UPSTOX_API_SECRET` = [Your Upstox API Secret]  
- [ ] `UPSTOX_REDIRECT_URI` = [https://your-app.vercel.app/callback]
- [ ] `ANTHROPIC_API_KEY` = [Your Anthropic API Key starting with sk-ant-]

## ✅ Upstox Configuration

- [ ] Logged into Upstox Developer Console
- [ ] Updated app redirect URI to match Vercel URL
- [ ] Saved changes
- [ ] App status is "Active"

## ✅ Final Deployment

- [ ] Redeployed with env vars (`vercel --prod`)
- [ ] Visited production URL
- [ ] Tested Upstox login flow
- [ ] Verified portfolio loads correctly
- [ ] Tested Claude AI suggestions
- [ ] Tested order placement (with small amount!)

## ✅ Security Check

- [ ] `.env` file NOT committed to Git
- [ ] Environment variables secured in Vercel
- [ ] 2FA enabled on Upstox account
- [ ] API keys kept private
- [ ] Trading limits set

## ✅ Post-Deployment

- [ ] Bookmarked app URL
- [ ] Tested on mobile device
- [ ] Shared with trusted users (optional)
- [ ] Set up monitoring/alerts (optional)

## 🎯 Quick Test Checklist

After deployment, verify:

1. [ ] Home page loads without errors
2. [ ] "Login with Upstox" button works
3. [ ] OAuth redirects successfully
4. [ ] Portfolio displays correctly
5. [ ] Claude responds to queries
6. [ ] Trading suggestions appear
7. [ ] Order form shows up
8. [ ] (Optional) Place a small test order

## 📞 Need Help?

If stuck on any step:

1. Check browser console for errors (F12)
2. Check Vercel deployment logs
3. Verify all environment variables are set
4. Review README.md troubleshooting section
5. Check Upstox API documentation

## 🎉 Success!

Once all items are checked, your app is live and ready to use!

**App URL**: _________________

**Deployed on**: _________________

**Notes**: 
_____________________________________________
_____________________________________________
_____________________________________________
