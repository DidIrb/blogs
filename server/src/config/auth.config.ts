import dotenv from "dotenv";
dotenv.config();
export const env = process.env;

const config = {
    secret : env.ACCESS_TOKEN_SECRET,
    jwtExpiration : 60,
    jwtRefreshExpiration : 120
}

export default config