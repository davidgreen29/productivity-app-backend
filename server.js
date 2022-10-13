require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const {createProxyMiddleware}= require('http-proxy-middleware');
const UNSPLASH_API_KEY = process.env.IMAGE_KEY
const API_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}&orientation=landscape&query=mountains`

const weather = require("./routes.js");

app.use(express.json());



const whitelist = ["https://davidsproductivityapp.netlify.app"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



const limiter = rateLimit({
  windowMs: 1000,
  max: 1
});
app.use(limiter);



app.use('/image',createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  pathRewrite:{
    [`^/image`]:'',
  }
}));
app.use("/weather", weather);

app.listen(process.env.PORT);