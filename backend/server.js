// entry point for API
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

// allows us to use the connectDB function to connect to the database.
import { connectDB } from './config/db.js';

// Allows to use all code in the router file
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT | 5000;
const __dirname = path.resolve();

// allows us to accept JSON data in the req.body
app.use(express.json()); 

// adds "/api/products" before all the api endpoints. 
// Changing this will mean that we will have to use a different endpoint in our frontend. Ex. /apis/endpoints
app.use("/api/products", productRoutes);

// Code for deployment

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
};

// Connects to the database and starts the server on the port that we configured
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
}); 
 