const express = require('express')
const app = express()
const Article = require('./models/article')
const mongoose = require('mongoose')
const articleRouter = require("./routes/article.js")

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/BlogPost").then(()=>{
    app.listen(5000,()=>{
        console.log("Port is running")
    })
}).catch((error)=>{console.log(error)})

app.set('view engine','ejs')
app.engine('ejs', require('ejs').__express);

//article roter
app.use('/articles',articleRouter)


//base route
app.get('/',async (req,res)=>{
    const articles = await Article.find()
    res.render("articles/index",{articles:articles})
}
)

