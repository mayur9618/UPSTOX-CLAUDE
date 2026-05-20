// Place Order on Upstox
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const accessToken = authHeader.replace('Bearer ', '');
  const { symbol, quantity, transaction_type, order_type, price, product } = req.body;

  // Validate required fields
  if (!symbol || !quantity || !transaction_type || !order_type || !product) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['symbol', 'quantity', 'transaction_type', 'order_type', 'product']
    });
  }

  try {
    // Place order on Upstox
    const orderData = {
      quantity: parseInt(quantity),
      product: product, // 'D' for delivery, 'I' for intraday
      validity: 'DAY',
      price: order_type === 'MARKET' ? 0 : parseFloat(price),
      tag: 'claude-ai-trade',
      instrument_token: symbol, // In production, get proper instrument token
      order_type: order_type, // 'MARKET' or 'LIMIT'
      transaction_type: transaction_type, // 'BUY' or 'SELL'
      disclosed_quantity: 0,
      trigger_price: 0,
      is_amo: false
    };

    const response = await axios.post('https://api.upstox.com/v2/order/place', orderData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    res.status(200).json({
      success: true,
      order_id: response.data.data.order_id,
      message: 'Order placed successfully',
      details: response.data.data
    });

  } catch (error) {
    console.error('Order Placement Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to place order',
      details: error.response?.data || error.message
    });
  }
};
