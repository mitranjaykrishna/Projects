var randomeNumber1=Math.floor(Math.random()*6)+1;
var randomeImage1="images/dice"+randomeNumber1+".png";
var a=document.querySelectorAll("img")[0];
a.setAttribute("src",randomeImage1);

var randomeNumber2=Math.floor(Math.random()*6)+1;
var randomeImage2="images/dice"+randomeNumber2+".png";
var b=document.querySelectorAll("img")[1];
b.setAttribute("src", randomeImage2);

//Text
var h=document.querySelector("h1");
if(randomeNumber1===randomeNumber2)
{
    h.innerHTML="Draw!";
}
else if(randomeNumber1> randomeNumber2)
{
    h.innerHTML="🚩Player 1 Win";
}
else
{
    h.innerHTML="Player 2 win 🚩";

}
    
