import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URI;  // Change the variable name to MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET