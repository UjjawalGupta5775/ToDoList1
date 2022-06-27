const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items = ["Pick Bottle", "Fill Water", "Drink Water"];
const workList = [];

app.get("/", function(req, res){
  const day = date.getDate();
  res.render("list", {
    listTitle:day,
    newItem:items
  });
})

app.post("/", function(req, res){
  const item = req.body.newListItem;
  if (req.body.list == "Work"){
    workList.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }

})

app.get("/work", function(req, res){
  res.render("list", {
    listTitle:"Work List",
    newItem:workList
  })
})

app.post("/work", function(req, res){
  const item = req.body.newListItem;
  workList.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(3001, function(){
  console.log("Server is up and running on port 3001.");
})
