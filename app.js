//MODULES
const express = require("express"), 
    bodyParser = require("body-parser"), 
    mongoose = require("mongoose"),
    app = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
let Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//     title: "Test",
//     image: "http://cache2.artprintimages.com/LRG/61/6122/ETUF100Z.jpg",
//     body: "This blog post"
// });

//RESTFUL ROUTES
//index route
app.get("/", function(req, res){
    res.redirect("/blogs");
});
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR");
        } else {
            res.render("index", {blogs : blogs});
        }
    });
});
//new route
app.get("/blogs/new", function(req,res){
    res.render("new")
});

//create route
app.post("/blogs", function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
    //then redirect to index
            res.redirect("/blogs");
        }
    });
});

//show route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog : foundBlog})
        } 
    })
});


























//SERVER 
app.listen(3000, function(){
    console.log("SERVER IS RUNNING");
});