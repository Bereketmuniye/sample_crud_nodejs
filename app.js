require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.js');
const authRoutes = require('./routes/authRoutes.js');
const sqlite = require('./db/db.js');


const app = express();


app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/',userRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ error: 'Internal server error', details: err.message });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

