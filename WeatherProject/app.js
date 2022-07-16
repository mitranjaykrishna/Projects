const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const { log } = require("console");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res) 
{
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res)
{

    const query=req.body.cityName;
    const city=query;
    const apiKey="b2d4001ef27810ca19c5a7c3dfcabf72";
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response)
    {
        console.log(response.statusCode);

        response.on("data",function(data)
        {
            const wheatherData=JSON.parse(data);
            const temp=wheatherData.main.temp;
            const description=wheatherData.weather[0].description;
            const icon=wheatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(temp+" "+description);
            res.write("<p>The weather of "+query+" currently "+description+"</p>");
            res.write("<h1>The temperature in "+query+" is "+temp+" degrees celcius</h1>");
            res.write("<image src="+imageURL+">");
            res.send();


        })

    })

})



app.listen(3000,function()
{
    console.log("Server is running at port 3000");
});