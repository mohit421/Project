
// const express = require("express");
// const https = require("https");
// const app = express();

// app.get("/",function(req,res){
//     const query = "varanasi";
//     const appKey = "08ac004f43c9dcd03ff5e698b33991c5";
//     const units = "metric";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+ units;
//     https.get(url,function(response){
//         // console.log(response);
//         console.log(response.statusCode);
//         response.on("data",function(data){
//             // console.log(data);
//             const weatherData = JSON.parse(data);
//             // console.log(weatherData);
//             // const object = {
//             //     name: "Mohit",
//             //     favouriteFood: "Pizza"
//             // }
//             // console.log(JSON.stringify(object));
//             const temp = weatherData.main.temp;
//             const tempFeelsLike = weatherData.main.feels_like;
//             const weatherDescription = weatherData.weather[0].description;
//             const icon = weatherData.weather[0].icon;
//             const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
//             // console.log(temp);
//             // console.log(tempFeelsLike);
//             // console.log(weatherDescription);
//             // res.send("<h1>The temperature in Varanasi is " + temp + " Degrees Celcuis</h1>")

//             // how to send weatherDescription bcuz we can use only one send in an app method\
//             // so we can use multiple res.write() in combination with one res.send like
            
//             res.write("<p>The weather description is " + weatherDescription + "</p>");
//             res.write("<h1>The temperature in Varanasi is " + temp + " Degrees Celcuis</h1>");
//             res.write("<img src="+imageUrl + ">");
//             res.send();
//         });
//     });
//     // res.send("sever is up and running.");   //delete it of comment bcuz not two res.send in the same app menthod
// });





// app.listen(3000,function(){
//     console.log("Server is running on port 3000.");
// });



// Using bodyparser to parse post request to the servers




const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
    // console.log("Post request is received.")
    // console.log(req.body.cityName);
    const query = req.body.cityName;
    const appKey = "08ac004f43c9dcd03ff5e698b33991c5";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+ units;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const tempFeelsLike = weatherData.main.feels_like;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            
            res.write("<p>The weather description is " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + req.body.cityName + " is " + temp + " Degrees Celcuis</h1>");
            res.write("<img src="+imageUrl + ">");
            res.send();
        });
    });
})




app.listen(3000,function(){
    console.log("Server is running on port 3000.");
});