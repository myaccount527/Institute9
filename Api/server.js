require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/api', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ result: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to OpenAI." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});