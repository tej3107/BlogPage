var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// ========================================================================/

// mongoose.connect('mongodb://localhost/my_database', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// })
// .then(()=>console.log('Connected to db'))
// .catch((error)=>console.log(error));
mongoose.connect('mongodb+srv://tns:tnsingh@cluster0.xqbii.mongodb.net/my_database?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=>console.log('Connected to db'))
.catch((error)=>console.log(error));

var Schema = new mongoose.Schema({
    name:String,
    email:String,
    content:String
});
var comments = mongoose.model("comments_db",Schema);

var BlogSchema = new mongoose.Schema({
    image:String,
    title:String,
    data:String,
    Author:String,
    Insta_handle:String,
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comments_db"
    }]
})
var content = mongoose.model("Blog",BlogSchema);

// ========================================================================/

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

var content_static=[
    {
        image:"https://news.microsoft.com/stories/assets/images/jeff-ma-lg.jpg",
        title:"Jeff_Ma1",
        data:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis.",
        Author:"Tej Narayan Singh",
        Insta_handle:"https://www.instagram.com/tejnarayan170/",
        comment:[
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            },
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            }
        ]
    },
    {
        image:"https://news.microsoft.com/stories/assets/images/jeff-ma-lg.jpg",
        title:"Jeff_Ma2",
        data:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis.",
        Author:"Tej Narayan Singh",
        Insta_handle:"https://www.instagram.com/tejnarayan170/",
        comment:[
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            },
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            }
        ]
    },
    {
        image:"https://news.microsoft.com/stories/assets/images/jeff-ma-lg.jpg",
        title:"Jeff_Ma3",
        data:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis.",
        Author:"Tej Narayan Singh",
        Insta_handle:"https://www.instagram.com/tejnarayan170/",
        comment:[
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            },
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            }
        ]
    },
    {
        image:"https://news.microsoft.com/stories/assets/images/jeff-ma-lg.jpg",
        title:"Jeff_Ma4",
        data:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis.",
        Author:"Tej Narayan Singh",
        Insta_handle:"https://www.instagram.com/tejnarayan170/",
        comment:[
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            },
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            }
        ]
    },
    {
        image:"https://news.microsoft.com/stories/assets/images/jeff-ma-lg.jpg",
        title:"Jeff_Ma5",
        data:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum facilis autem doloribus, officiis debitis iusto, quo id voluptatem nobis placeat, pariatur tenetur. Voluptas recusandae, exercitationem cumque minima ad perspiciatis.",
        Author:"Tej Narayan Singh",
        Insta_handle:"https://www.instagram.com/tejnarayan170/",
        comment:[
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            },
            {
                name:"Tej Narayan Singh",
                email:"tejnarayan950@gmail.com",
                content:"It was an awesome content"
            }
        ]
    }
]
//=========================================================================/
app.get("/",function(req,res){
    // res.sendFile(__dirname+"/public/homepage.html");
    content.find({},function(err,db_data){
        res.render("home",{content:db_data});
    })
})

app.get("/content/:id",function(req,res){
    var id = req.params.id;
    content.find({_id:id}).populate("comment").exec(function(err,data){
        res.render("content",{data:data[0]});
    })
})

app.post("/comments/:id",function(req,res){
    var newcom = req.body;
    var id = req.params.id;
    insertion(newcom,id);
    res.redirect("/content/"+id);
})

app.get("/blog",function(req,res){
    res.render("newBlog");
})

app.post("/blog",function(req,res){
    var newcom = req.body;
    content.create(newcom,function(err,cont){
        res.redirect("/");
    });
})

app.get("/priv",function(req,res){
    res.send("There is No privacy Policy For this Site");
})
app.get("/priv",function(req,res){
    res.send("There is No privacy Policy For this Site");
})
app.get("/contact",function(req,res){
    res.send("You can contact me through tejnarayan950@gmail.com");
})
app.get("/cont",function(req,res){
    res.send("I am a Student and working on diffrent website that is needed to be hosted");
})
// app.listen(8080);
app.listen(process.env.PORT||8080,process.env.IP,function(){console.log("Server Started")});

const insertion = (a,b) =>{
    comments.create(a,function(err,cont){
        if(err){console.log("Nothing");}
        else{
            content.findOne({_id:b},function(error,found){
                if(error){console.log("Not Inserted");}
                else if(found){
                    found.comment.push(cont);
                    found.save(function(e,p){});
                }
            })
        }
    })
}

// mongodb+srv://tns:tnsingh@cluster0.xqbii.mongodb.net/my_database?retryWrites=true&w=majority
