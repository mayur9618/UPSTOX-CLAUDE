// Upstox OAuth Authentication Endpoint
const axios = require('axios');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    const API_KEY = process.env.UPSTOX_API_KEY;
    const API_SECRET = process.env.UPSTOX_API_SECRET;
    const REDIRECT_URI = process.env.UPSTOX_REDIRECT_URI;

    // Exchange authorization code for access token
    const response = await axios.post('https://api.upstox.com/v2/login/authorization/token', {
      code: code,
      client_id: API_KEY,
      client_secret: API_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });

    res.status(200).json({
      access_token: response.data.access_token,
      expires_in: response.data.expires_in
    });

  } catch (error) {
    console.error('Upstox Auth Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to authenticate with Upstox',
      details: error.response?.data || error.message
    });
  }
};
