import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  })
);

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/generate', async (req, res) => {
  const { topic, tone } = req.body;

  const prompt = `Write a ${tone} blog post about ${topic}.`;

  console.log(prompt);

  res.json({ prompt });
  // try {
  //   const { topic, tone } = req.body;

  //   const prompt = `Write a ${tone} blog post about ${topic}.`;

  //   const response = await openai.chat.completions.create({
  //     model: 'gpt-3.5-turbo',
  //     messages: [{ role: 'user', content: prompt }]
  //   });

  //   const content = response.choices[0].message.content;
  //   res.json({ content });
  // } catch (error) {
  //   console.error('Error generating content:', error);
  //   res.status(500).json({ error: 'Failed to generate content' });
  // }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
