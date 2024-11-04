const mongoose = require('mongoose')
const schema = mongoose.Schema
const createDomPurify = require('dompurify')
const {marked} = require('marked')
const jsdom = require('jsdom')
const dompurify = createDomPurify(new jsdom.JSDOM().window)


const articleSchema = new schema({
    title:String,
    description:String,
    markdown:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    sanitizedHtml:{
        type:String,
        required:true
    }
})

articleSchema.pre('validate',function (next) {
    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.model('Article',articleSchema)