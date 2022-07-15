const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(userRoute);

app.route('/').get((req,res) => {
    res.send('Hi there!');
});

mongoose.connect(process.env.MOVIESAPP_MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
