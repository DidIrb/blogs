import { CorsOptions } from "cors";
import { env } from "./db.config.js";

const allowedOrigins = env.ALLOWED_ORIGINS.split(',');

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS Testing to see if it works"));
    } 
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Parameter 'origin' implicitly has an 'any' type.
export default corsOptions