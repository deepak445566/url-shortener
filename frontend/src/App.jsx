import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://url-shortener-1-te56.onrender.com/api/short', { longUrl });
      setShortUrl(res.data.shortUrl);
      setLongUrl('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">🔗 URL Shortener</h1>

      <form
        onSubmit={handle}
        className="flex flex-col md:flex-row gap-4 w-full max-w-2xl"
      >
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          required
          className="flex-1 px-4 py-3 rounded-lg text-gray-100 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-md transition"
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-lg text-center">
          <p className="mb-2 text-gray-300">Your Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
