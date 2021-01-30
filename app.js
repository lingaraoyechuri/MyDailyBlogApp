const express = require('express');
const bodyparser = require('body-parser');
var _ = require('lodash');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MyBlog', {useNewUrlParser: true, useUnifiedTopology: true});

var path = require('path');

const blogschema =  new mongoose.Schema ({
  title: String,
  message: String
});

const blog = mongoose.model('blog', blogschema);

var titleList = [];
var messageList = [];

// var blogList = {
//   title: 'Day1',
//   message: 'it is day one blog message'
// };
//list.push(list);
app.get('/Home', (req, res) => {

  console.log("testing");
  // var trimmedmessageList = [];
  // for(var i = 0; i<titleList.length; i++){
  //   var trimmedmessage =  messageList[i].substring(0,100);
  //   trimmedmessageList.push(trimmedmessage);
  // }
  // res.render("home", {title:titleList, message:trimmedmessageList});
  blog.find(function(err, foundBlogs){
      if(err){
        console.log(err);
      }else {
        console.log(foundBlogs);
        res.render("home", {blogs:foundBlogs});
      }
  })



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

app.get('/:post', (req, res) => {
  //  let day = date1();
  console.log(req.params);
  var currentPath = req.params.post;
  var currentPath1 = _.lowerCase(currentPath);
  console.log("currentPath1"+currentPath1);
  //console.log(currentPath1);
  blog.find(function(err, foundBlogs){
      if(err){
        console.log(err);
      }else {
          //console.log(foundBlogs);
          for (var i = 0; i < foundBlogs.length; i++) {

            console.log("foundBlogs.title"+ foundBlogs[i].title);
            var currentTitle = _.lowerCase(foundBlogs[i].title);
            console.log("currentTitle"+ currentTitle);
             if(currentTitle === currentPath1){
               res.render("posts", {title:foundBlogs[i].title, message:foundBlogs[i].message});
               console.log("Match Found!");
             }else {
               console.log("Match Not Found!");
             }
          }
      }
  })

  // for(var i = 0; i<titleList.length; i++){
  //      console.log(i);
  //      console.log(titleList[i]);
  //      var currentTitle = _.lowerCase(titleList[i]);
  //      console.log("currentTitle"+ currentTitle);
  //     if(currentTitle === currentPath1){
  //       res.render("posts", {title:titleList[i], message:messageList[i]});
  //       console.log("Match Found!");
  //     }else {
  //       console.log("Match Not Found!");
  //     }
  // }
  //res.send(req.params.post);
//

});


app.post('/', (req, res) => {
   console.log(req.body);
   //blogList.title = req.body.title;
   //blogList.message = req.body.Message;
   const blog1 = new blog({title: req.body.title, message:req.body.Message});
   blog1.save();
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
