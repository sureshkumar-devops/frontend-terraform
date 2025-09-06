const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

// Add middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/health`);
        res.json({ status: "healthy", backend: response.data });
    } catch (err) {
        res.status(500).json({ 
            status: "unhealthy", 
            error: "Backend not reachable",
            details: err.message 
        });
    }
});

app.get("/", async (req, res) => {
    try {
        // First check if backend is healthy
        const healthCheck = await axios.get(`${BACKEND_URL}/health`);
        
        // If health check passes, get the data
        const response = await axios.get(`${BACKEND_URL}/api`);
        const users = response.data.users || [];
        
        const usersHtml = users.map(u => 
            `<li class="user-item">${u.name} (${u.email})</li>`
        ).join("");

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Frontend App</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .status { padding: 10px; margin-bottom: 20px; border-radius: 4px; }
                    .status.success { background-color: #dff0d8; color: #3c763d; }
                    .user-item { margin: 10px 0; }
                </style>
            </head>
            <body>
                <h1>Frontend App</h1>
                <div class="status success">✅ Backend is connected and healthy!</div>
                <h2>Users:</h2>
                <ul>${usersHtml}</ul>
            </body>
            </html>
        `);
    } catch (err) {
        console.error('Frontend error:', err.message);
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Frontend App - Error</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .error { background-color: #f2dede; color: #a94442; padding: 15px; border-radius: 4px; }
                </style>
            </head>
            <body>
                <h1>Frontend App</h1>
                <div class="error">
                    <h3>⚠️ Connection Error</h3>
                    <p>Backend not reachable at ${BACKEND_URL}</p>
                    <p>Error: ${err.message}</p>
                </div>
            </body>
            </html>
        `);
    }
});

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Frontend running on port ${PORT}`);
    console.log(`Connected to backend at: ${BACKEND_URL}`);
});
