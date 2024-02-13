import express from 'express';
import cors from "cors"
import connectDB from "./src/config/dbConn.js"
import corsOptions from "./src/config/corsOptions.js"

const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.json()); 
app.use(cors(corsOptions)); 

app.get('/', (req, res) => {
    const itemList = [
        { id: 1, name: 'Item 1', category: 'Category A' }, 
        { id: 2, name: 'Item 2', category: 'Category B' },
        { id: 3, name: 'Item 3', category: 'Category A' },
        { id: 4, name: 'Item 4', category: 'Category A' },
        { id: 5, name: 'Item 5', category: 'Category D' },
        { id: 6, name: 'Item 6', category: 'Category C' },
        { id: 7, name: 'Item 7', category: 'Category A' },
        { id: 8, name: 'Item 8', category: 'Category B' },
    ];

    res.json(itemList);
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
