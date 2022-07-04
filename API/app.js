const express = require('express');
const userRoute = require('./routes/userRoute');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/users', userRoute);

app.listen(8080, () => {
    console.log(`Server Listensing on port ${PORT}...`);
});