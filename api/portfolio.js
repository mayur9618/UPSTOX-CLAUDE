// Get Portfolio Holdings from Upstox
const axios = require('axios');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const accessToken = authHeader.replace('Bearer ', '');

  try {
    // Get holdings from Upstox
    const holdingsResponse = await axios.get('https://api.upstox.com/v2/portfolio/long-term-holdings', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    // Get positions
    const positionsResponse = await axios.get('https://api.upstox.com/v2/portfolio/short-term-positions', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    // Combine and format data
    const holdings = holdingsResponse.data.data || [];
    const positions = positionsResponse.data.data || [];

    const portfolio = [];

    // Process holdings
    holdings.forEach(holding => {
      portfolio.push({
        symbol: holding.trading_symbol,
        quantity: holding.quantity,
        buyPrice: holding.average_price,
        currentPrice: holding.last_price,
        change: holding.pnl_percentage,
        value: holding.last_price * holding.quantity,
        pnl: holding.pnl,
        type: 'holding'
      });
    });

    // Process positions
    positions.forEach(position => {
      portfolio.push({
        symbol: position.trading_symbol,
        quantity: position.quantity,
        buyPrice: position.average_price,
        currentPrice: position.last_price,
        change: ((position.last_price - position.average_price) / position.average_price * 100).toFixed(2),
        value: position.last_price * position.quantity,
        pnl: (position.last_price - position.average_price) * position.quantity,
        type: 'position'
      });
    });

    res.status(200).json({ portfolio });

  } catch (error) {
    console.error('Portfolio Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch portfolio',
      details: error.response?.data || error.message
    });
  }
};
