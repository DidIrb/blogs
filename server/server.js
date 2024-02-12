import express from 'express';
import connectDB from "./config/dbConn.js"

const app = express();
const PORT = process.env.PORT || 3500;

app.get('/', (req, res) => {
    res.send('Hello from Express Service!');
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
