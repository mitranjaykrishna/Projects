const express=require("express");
const bodyPareser=require("body-parser");
const mongoose=require("mongoose");

const app=express();

app.set('view engine', 'ejs');

app.use(bodyPareser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});
const itemSchema=new mongoose.Schema(
    {
        name:String
    }
);

const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"Welcome To Your ToDoLiist!"
});
const item2=new Item({
    name: "Hit + button to add a new item"
});
const item3=new Item({
    name: "<-- Hit this to delete"
});
const defaultItems=[item1,item2,item3];

Item.insertMany(defaultItems,function(err)
{
    if(err)
    console.log(err);
    else
    console.log("Succesfully stored");
});
 

// let items=[];
// let works=[];

app.get("/",function(req,res)
{
    let today=new Date();
    let option={
        weekday: "long",
        day:"numeric",
        month: "long"
    };
    let day=today.toLocaleDateString("en-us",option);
    res.render("list",{listTitle: "Today", allItems: items});
    
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