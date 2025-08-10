const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ShortUrl = require('./schema/urlSchema.js');
const cors = require('cors');
const { nanoid } = require('nanoid'); // ✅ sahi import

dotenv.config();
const app = express();
app.use(cors({
  origin: 'https://jolly-marshmallow-1f996b.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));


app.use(express.json());
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/api/short', async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Long URL is REQUIRED' });
  }

  const shortCode = nanoid(6);
  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

  // ✅ Save in DB
  await ShortUrl.create({ longUrl, shortCode });

  console.log("✅ Generated Short URL:", shortUrl);
  res.json({ shortUrl });
});

app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  // ✅ Find record by shortCode only
  const record = await ShortUrl.findOne({ shortCode });
  if (!record) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(record.longUrl);
});


app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
