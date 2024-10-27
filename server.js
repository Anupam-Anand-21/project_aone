// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle chat requests
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);

  try {
    // Use the gpt-3.5-turbo-1106 model here
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-1106',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const assistantMessage = response.data.choices[0].message.content;
    res.json({ response: assistantMessage });
  } catch (error) {
    if (error.response) {
      console.error('Error response from OpenAI API:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data.error.message || 'An error occurred.' });
    } else {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
