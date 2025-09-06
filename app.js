const express = require("express");
const axios = require("axios");
const app = express();

const BACKEND_URL = process.env.BACKEND_URL || "http://backend.local:8080";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api`);
    const users = response.data.users || [];
    
    let usersHtml = users.map(u => `<li>${u.id}: ${u.name} (${u.email})</li>`).join("");

    res.send(`
      <h1>Frontend App</h1>
      <ul>${usersHtml}</ul>      
    `);
  } catch (err) {
    res.send('<h1>Frontend App</h1><p>Backend not reachable</p>');
  }
});

app.listen(80, () => console.log("Frontend running on port 80"));
