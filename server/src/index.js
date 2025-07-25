import express from 'express';
import mongodb from '../config/db.js';
import { config } from 'dotenv'

import cookieParser from 'cookie-parser'
import cors from 'cors';
// import userRoute from '../routes/user.route.js';
import router from '../routes/index.route.js';


config()
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser())

app.use(cors(
    {
        origin: "http://localhost:3000", // Allow frontend
        credentials: true, // Allow cookies
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
      }
));

app.use('/api',router);


// Connect to MongoDB
mongodb();

const port=process.env.PORT || 8080;

app.listen(port , () => {
  console.log(`Server is running on port: ${port}`);
});
