require("dotenv").config();
const express = require("express");
const rateLimit = require('express-rate-limit')
const cors = require("cors");
const app = express();


const weather = require("./routes");
//development currently should changed to url where it is being hosted 
const whitelist = ['https://davidsproductivityapp.netlify.app/'];

const corsOptions = {
    orgin: (origin, callback) => {
        if(!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } 
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
    
}

app.use(express.json());

app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 1000,
    max: 1
})

app.use(limiter);

//test route 

app.get("/", (req, res)=> res.json({success: "hello World"}));

app.use("/weather", weather);

