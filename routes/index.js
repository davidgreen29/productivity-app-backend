const express = require("express");
const router = express.Router();



const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));


const fetchWeather = async(latitude, longitude) =>  {
    const url= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;


try {
    const weatherStream = await fetch(url);
    const weatherJson = await weatherStream.json();
    return weatherJson;
}catch(err) {
    return{Error: err.stack };
}
}

router.get("/:latitude/:longitude", async(req,res)=> {
    const latitude= req.params.latitude;
    const longitude= req.params.longitude;
    const data = await fetchWeather(latitude, longitude);
    res.json(data);
})

router.post("/", async(req,res)=> {
    const latitude = req.body.latitude;
    const longitude=req.body.longitude;
    const data =await fetchWeather(latitude, longitude);
    res.json(data);

})



module.exports = router;