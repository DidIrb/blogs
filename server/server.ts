import express, { urlencoded } from 'express';
import bcrypt from 'bcryptjs'; 
import cors from "cors"
import corsOptions from "./src/config/corsOptions.js"
import connect_to_db, { db, models } from './src/models/index.js';
import { env } from './src/config/db.config.js';
import userRoute from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";

const PORT = env.PORT || 3500;
const base = env.BASE
const app = express();

app.use(cookieParser());
// parse requests of content-type - application/json
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(express.json()); 
app.use(cors(corsOptions)); 

// Testing route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Centralized Blogs Management." });
});

// All routes
app.use(`/${base}/users`, userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connect_to_db();

// Sync
db.conn
  .sync({ alter: true })
  .then(async () => {
    console.log("Synced db.");
    const User = models.user;
    const username = 'default_admin';
    const email = 'default@example.com';
    const password = 'ComplicatedPassword'; // replace with your actual default password

    const user = await User.findOne({ where: { username } });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const newUser = await User.create({ username, email, password: hashedPassword });
        console.log("Default user created:", newUser);
      } catch (err: any) {
        console.log("Failed to create default user:", err.message);
      }
    }
  })
  .catch((err) => { 
    console.log("Failed to sync db: " + err.message);
  });
