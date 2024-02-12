import express from 'express';
import connectDB from "./config/dbConn.js"

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
