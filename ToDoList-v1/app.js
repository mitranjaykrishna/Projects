const express=require("express");
const bodyPareser=require("body-parser");

const app=express();

app.set('view engine', 'ejs');

app.use(bodyPareser.urlencoded({extended:true}));
app.use(express.static("public"));

let items=[];
let works=[];

app.get("/",function(req,res)
{
    let today=new Date();
    let option={
        weekday: "long",
        day:"numeric",
        month: "long"
    };
    let day=today.toLocaleDateString("en-us",option);
    res.render("list",{listTitle: day, allItems: items});
    
})

app.post("/",function(req,res)
{
    let item=req.body.item;
    if(req.body.list==="WorkPlace")
    {
        works.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function(req,res)
{
    res.render("list",{listTitle: "WorkPlace", allItems: works});

});




app.listen(3000,function()
{
    console.log("Server is running");
})