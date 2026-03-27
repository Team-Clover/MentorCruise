import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

//mongodb connection 
import dbConnect from './utility/db.connect.js';
dbConnect();
//cloudinary connection
import connectCloudinary from './utility/cloudinary.js';
connectCloudinary();



const app = express();
const port = process.env.Port || 3001;
app.use(express.json());



// import routes
import userRoute from './routes/userRoute.js';



app.listen(port);