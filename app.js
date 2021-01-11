const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

var path = require('path');


//const date1 = require( __dirname + "/date.js");

var titleList = [];
var messageList = [];

// var blogList = {
//   title: 'Day1',
//   message: 'it is day one blog message'
// };
//list.push(list);
app.get('/Home', (req, res) => {
  //  let day = date1();
  console.log("testing");
  //console.log(blogList);
  //console.log("it is list"+ list[0]);
  res.render("home", {title:titleList, message:messageList});

});

app.get('/About', (req, res) => {
  //  let day = date1();
  console.log("testing about");
  res.render("about");

});

app.get('/Contact', (req, res) => {
  //  let day = date1();
  console.log("testing contact");
  res.render("contactus");

});

app.get('/Compose', (req, res) => {
  //  let day = date1();
  console.log("testing compose");
  res.render("Compose");

});


app.post('/', (req, res) => {
   console.log(req.body);
   //blogList.title = req.body.title;
   //blogList.message = req.body.Message;
   titleList.push(req.body.title);
   messageList.push(req.body.Message);
   console.log(titleList);
   console.log(messageList);
 //  if(req.body.list === "Work-List"){
 //    work.push(req.body.task);
 //    console.log(req.body.task);
 //    res.redirect("/work")
 //  }else {
 //    task.push(req.body.task);
 //    console.log(req.body.task);
     res.redirect("/Home")
 //  }

});


app.listen(3000, function() {

  console.log("server is working");
});
