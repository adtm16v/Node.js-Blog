var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  var posts = [
      {title: "My first post",text: "text1"},
      {title: "My second post", text: "text2"}
  ]
  app.get("/",function(req,res){
     res.render('index.ejs', {posts: posts});
  });
  app.get("/post/:id",function( req ,res){
      var id = req.params.id;
      res.render("post.ejs",{post: posts[id-1]});
  })
  
  app.get("/createPost",function(req,res){
      res.render("CreatePost.ejs");
  })
  //app.use("/createPost",bodyParser.urlencoded({extended:true}));

  app.post("/createPost",function(req,res){
        posts.push({title: req.body.title,text: req.body.text});
        res.redirect("/");
  })
  var i; 
  app.get("/edit/:id",function( req ,res){
    var id = req.params.id;
    i = id;
    res.render("edit.ejs",{post: posts[id-1]});
})
  app.use("/edit",bodyParser.urlencoded({extended:true}));
  app.post("/edit",function(req,res){
    posts[i-1] = {title: req.body.title, text: req.body.text};
    res.redirect("/");
  });
  app.get("/delete/:id",function(req,res){
    var id = req.params.id; 
    if (id === 1){
        delete posts;
    } 
    posts.splice(id-1,1);
    res.redirect("/");
  })

  app.listen(3000,function(){
      console.log('Server is running: 3000');
  })