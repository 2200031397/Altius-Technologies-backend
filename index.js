const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Router = require('./routes/router');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection URL (hardcoded for demonstration purposes)
const dburl = 'mongodb+srv://charanchowdarynunnam:KzULXYPA8UqWl4R4@seequenze.ngp9l.mongodb.net/?retryWrites=true&w=majority&appName=Seequenze';

// Connect to MongoDB
mongoose.connect(dburl, {
 
})
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('DB Connection Error:', err));

// Route handling
app.use('/api', Router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
