// Claude AI Analysis Endpoint
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, portfolio, conversationHistory } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'Anthropic API key not configured' });
    }

    // Prepare portfolio context
    let portfolioContext = 'No portfolio data available.';
    if (portfolio && portfolio.length > 0) {
      portfolioContext = portfolio.map(stock => 
        `${stock.symbol}: ${stock.quantity} shares @ ₹${stock.currentPrice} (${stock.change >= 0 ? '+' : ''}${stock.change}%, P&L: ₹${stock.pnl?.toFixed(2) || 0})`
      ).join('\n');
    }

    const systemPrompt = `You are a financial analysis assistant integrated with Upstox trading platform. Analyze the user's portfolio and provide actionable trading insights.

Current Portfolio:
${portfolioContext}

Guidelines:
1. Provide clear, actionable suggestions
2. Consider risk management and diversification
3. If suggesting trades, format as:
   🎯 ACTION: [BUY/SELL/HOLD]
   📊 SYMBOL: [Stock symbol]
   🔢 QUANTITY: [Number of shares]
   💡 REASON: [Brief explanation]
   ⚠️ RISK: [Low/Medium/High]
   
4. Consider Indian market conditions and NSE/BSE stocks
5. Be conservative with risk assessment
6. Always mention that this is not financial advice`;

    // Build messages array
    const messages = conversationHistory && conversationHistory.length > 0 
      ? conversationHistory 
      : [];

    messages.push({
      role: 'user',
      content: `${systemPrompt}\n\nUser Query: ${query}`
    });

    // Call Claude API
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: messages
    }, {
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      }
    });

    const assistantMessage = response.data.content[0].text;

    res.status(200).json({
      response: assistantMessage,
      conversationHistory: [...messages, {
        role: 'assistant',
        content: assistantMessage
      }]
    });

  } catch (error) {
    console.error('Claude API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to analyze with Claude',
      details: error.response?.data || error.message
    });
  }
};
