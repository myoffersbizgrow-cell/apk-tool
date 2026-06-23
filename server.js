const express = require('express');
const cors = require('cors');
const path = require('path');  // ✅ Ye line add karein
const fs = require('fs-extra');
const convertRoute = require('./routes/convert');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ STATIC FILES (public folder se serve karein)
app.use(express.static('public'));

// ✅ ROOT ROUTE - HTML PAGE SERVE KAREIN
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    tools: checkTools()
  });
});

// Routes
app.use('/api', convertRoute);

// Check required tools
function checkTools() {
  const toolsPath = path.join(__dirname, 'tools');
  const required = ['apktool.jar', 'aapt2', 'bundletool.jar', 'android.jar'];
  const available = {};
  
  required.forEach(tool => {
    available[tool] = fs.existsSync(path.join(toolsPath, tool));
  });
  
  return available;
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    available_endpoints: ['GET /', 'GET /health', 'POST /api/convert', 'GET /api/download/:filename']
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Tools status:`, checkTools());
  console.log(`📍 Visit: http://localhost:${PORT}`);
});
