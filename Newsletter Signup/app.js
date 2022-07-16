const express=require("express");
const bodyParser=require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});//

mailchimp.setConfig(
    {
        apiKey:"cc784d1957eabf2ad7e8432dffba516d-us14",
        server: "us14"
    }
)

app.post("/",function(req,res)
{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    console.log(firstName,lastName,email);
    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
       };

       const obj={
               email_address:subscribingUser.email,
               status:"subscribed",
               merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
               }        
        };

      async function run()
       {
           try{
           const response=await mailchimp.lists.addListMember("5efdd37ba0",obj);
          console.log("Succesfully added");
          res.sendFile(__dirname+"/success.html");
       } catch(e)
       {
           res.sendFile(__dirname+"/failure.html");
       }
    }
    run();
});

app.post("/success",function(req,res)
{
    res.redirect("/");
})

app.post("/fail",function(req,res)
{
    res.redirect("/");
})




app.listen(process.env.PORT||3000,function()
{
    console.log("Server is running on port 3000");
})

//API Key
//cc784d1957eabf2ad7e8432dffba516d-us14


// unique id
// 5efdd37ba0