require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
