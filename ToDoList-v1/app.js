const express=require("express");
const bodyPareser=require("body-parser");
const mongoose=require("mongoose");
var _ = require('lodash');

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

const listSchema=new mongoose.Schema(
    {
        name: String,
        items: [itemSchema]
    }
);

const List=mongoose.model("List",listSchema);



 

app.get("/",function(req,res)
{
    Item.find({},function(err,foundItems){
        if(foundItems.length===0)
        {

            Item.insertMany(defaultItems,function(err)
            {
                if(err)
                console.log(err);
                else
                console.log("Succesfully stored");
            });
            res.redirect("/");
        }
        else{
            res.render("list",{listTitle: "Today", allItems: foundItems});
        }
    });

    let today=new Date();
    let option={
        weekday: "long",
        day:"numeric",
        month: "long"
    };
    let day=today.toLocaleDateString("en-us",option);
    // res.render("list",{listTitle: "Today", allItems: items});
    
})

// app.get("/work", function(req,res)
// {
//     res.render("list",{listTitle: "WorkPlace", allItems: works});

// });

app.get("/:newList",function(req,res)
{
    const customList=_.capitalize(req.params.newList);

    
    // list.save();

    List.findOne({name: customList},function(err,foundList){
        if(!err)
        {
            if(!foundList)
            {
                const list= new List(
                    {
                        name: customList,
                        items: defaultItems
                    }
                ) ;      
                list.save();
                res.redirect("/"+customList);
            }
            else
            {
                res.render("list",{listTitle: foundList.name, allItems: foundList.items});
            }
        }
    });   
});

app.post("/",function(req,res)
{
    const itemName=req.body.item;
    const listName=req.body.list;
    const newItem=new Item({
        name: itemName
    });

    if(listName==="Today")
    {
        newItem.save();
        res.redirect("/");
    }

    else{
        List.findOne({name: listName}, function(err,foundList)
        {
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/"+listName);
        });
    }
    // let item=req.body.item;
    // if(req.body.list==="WorkPlace")
    // {
    //     works.push(item);
    //     res.redirect("/work");
    // }
    // else{
    //     items.push(item);
    //     res.redirect("/");
    // }
});

app.post("/delete",function(req,res){
    
    const removeId=req.body.checkbox;
    const listName=req.body.listName;

    if(listName==="Today")
    {
        Item.findByIdAndRemove(removeId,function(err){
            if(err)
            console.log(err);
            else
            console.log("Deleted From DB");
        });

        res.redirect("/");
    }
      else
      {
        List.findOne({name: listName}, function(err,foundList)
        {
            List.findOneAndUpdate({name: listName},{$pull: {items: {_id: removeId}}},function(err,foundList){
                if(!err)
                {
                    res.redirect("/"+listName);
                }
            });
        });
      }   
    
})






app.listen(3000,function()
{
    console.log("Server is running");
})