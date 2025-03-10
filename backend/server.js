import express from 'express';
import dotenv from 'dotenv';
import connectDB from './source/config/db.js';
import routes from './source/routes/index.js'; 

dotenv.config();
const app= express();

app.use(express.json());

connectDB();

app.use('/api', routes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});