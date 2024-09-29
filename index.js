import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors';
import connection from './DataBase/db.js';
import router from './routes/routes.js';
import multer from "multer";
import fs from "fs";
import path from "path";
import { Authorization } from './middleware/middlewareAuth.js';

const app = express();
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin: https://raag-dhun-music-web-app.netlify.app', // React app URL
    methods: 'GET,POST,PUT,DELETE,PATCH',
}));

app.use('/',router);

// Global error handler (optional, but helpful for debugging)
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    res.status(500).send('Something broke!');
});


app.get("/",(req,res)=>{
    res.send("Hii This is backend application");
});

app.listen("3001",()=>{
    "Listening on the port 3001";
});

connection();
