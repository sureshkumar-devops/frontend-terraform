// frontend/app.js
const express = require("express");
const axios = require("axios");
const app = express();

// Read backend URL from environment variable
const BACKEND_URL = process.env.BACKEND_URL || "http://backend.local:5000";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get('${BACKEND_URL}/api');
    res.send(`
      <h1>Frontend App</h1>
      // <p>Response from backend: ${response.data}</p>
      <p>Response from backend: ${JSON.stringify(response.data)}</p>
    `);
  } catch (err) {
    res.send('<h1>Frontend App</h1><p>Backend not reachable</p>');
  }
});

app.listen(80, () => console.log("Frontend running on port 80"));
