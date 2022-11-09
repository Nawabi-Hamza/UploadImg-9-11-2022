// first step require dependinces
var express = require('express')
var bodyParser = require("body-parser")
var fs = require("fs")
var mongoose = require("mongoose")
var path = require("path")
require('dotenv/config')
var app = express()
mongoose.connect(process.env.MONGO_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        },
        err => {console.log("Connected")})
    // step 3 model schema
    // step 4 setup of EJS file form
        app.use(bodyParser.urlencoded({extended:false}))
        app.use(bodyParser.json())
        app.set("view engine","ejs")
    var multer = require("multer")
    var storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"uploads")
        },
        filename:(req,file,cb)=>{
            cb(null,file.name + "-" + Date.now())
        }
    })
        var upload = multer({storage:storage})
// step 6 load the mongoose mode for image
    var ImgSchema = require("./model")
    app.get('/',(req,res)=>{
        ImgSchema.find({},(err,items)=>{
            if(err) throw err;
            res.render("imagesPages",{items:items})

        })
    })
// step 7 show images in images in imagesPages.js

// setp 8 storing image
app.post("/",upload.single('image'),(req,res,next)=>{
    var obj = {
        name:req.body.name,
        des:req.body.des,
        img:{
            data:fs.readFileSync(path.join(__dirname+'/uploads/'+req.file.filename)),
        }
    }
    ImgSchema.create(obj,(err,items)=>{
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/")
        }
    })
})
// step 2 configore server port 
var port = process.env.PORT || "4000"
app.listen(port,err =>{
    if(err) throw err;
    console.log("Server Is Running in Port "+port)
   
})