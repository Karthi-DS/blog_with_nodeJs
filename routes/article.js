const express = require('express')
const Article = require('../models/article')
const router = express.Router()


router.get('/new', (req, res) => {
    res.render("../views/articles/new", { article: { title: "", description: "", markdown: '' },edit:false })
})

router.get("/:id", async (req, res) => {
    console.log(req.params)
    const selectedArticle = await Article.findById(req.params.id)
    console.log(selectedArticle)
    if (selectedArticle == null) {
        res.redirect('/')
    }
    else {
        res.render("../views/articles/show", { article: selectedArticle })
    }
})

router.get("/edit/:id",async(req,res)=>{
    const selectedArticle = await Article.findById(req.params.id)
    console.log(selectedArticle)
    if (selectedArticle == null) {
        res.redirect('/')
    }
    else {
        res.render("../views/articles/new", { article: selectedArticle,edit:true })
    }
})


router.post('/sendArticle', async (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    console.log(newArticle)
    try {
        await newArticle.save()
        res.redirect(`/articles/${newArticle.id}`)
    } catch (e) {
        console.log(e)
        res.render("../views/articles/new", { article: newArticle })
    }
})

router.post('/updateArticle/:id',async(req,res)=>{
    console.log(req.body,req.params)
    const updateArticle = await Article.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(updateArticle)
    res.redirect("/")
})

router.post('/delete/:id',async (req,res) => {
    console.log(req.params)
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

router.get("/", (req, res) => {
    res.send("In articles")
})


module.exports = router
