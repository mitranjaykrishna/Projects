

const express=require("express");
const app=express();

app.get("/",function(req,res)
{
    res.send("Hello World!");
})

app.get("/contact",function(req,res)
{
    res.send("Contact me on mitranjaykrishna@gmail.com");
})

app.get("/about",function(req,res)
{
    res.send("I am Mitranjay Krishna . I am currently pursuing btech in cse from glbitm greater noida");
});

app.listen(3000,function()
{
    console.log("Server started at port 3000");
});