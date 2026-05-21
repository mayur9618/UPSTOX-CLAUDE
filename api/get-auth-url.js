// Get Upstox OAuth URL with correct client_id
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const API_KEY = process.env.UPSTOX_API_KEY;
    const REDIRECT_URI = process.env.UPSTOX_REDIRECT_URI;

    if (!API_KEY || !REDIRECT_URI) {
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'UPSTOX_API_KEY or UPSTOX_REDIRECT_URI not configured in environment variables'
      });
    }

    // Build the OAuth URL
    const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

    res.status(200).json({ authUrl });

  } catch (error) {
    console.error('Get Auth URL Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate auth URL',
      details: error.message
    });
  }
};
