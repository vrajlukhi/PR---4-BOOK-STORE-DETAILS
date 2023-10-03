const express=require("express")
const connect = require("./db")
const book = require("./model")
const check = require("./middlewear")
const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("welcome to the book store")
})
app.get("/books/book/:id",async(req,res)=>{
    let data=await book.findById(req.params.id)
    if(!data){
        res.status(404).send({message:"book not found"})
    }  
    res.status(200).send(data)  
})
app.delete("/books/delete/:id",async(req,res)=>{
    let {id}=req.params
    let data=await book.findByIdAndDelete(id)
    let allbooks=await book.find()
    res.status(200).send(allbooks)
})
app.get("/books",async(req,res)=>{
    let data=await book.find()
    res.status(200).send(data)
})
app.post("/books/addbooks",check,async(req,res)=>{
    let data = await book.create(req.body)
    res.send(data)
})
app.patch("/books/update/:id",async(req,res)=>{
    let {id}=req.params
    let data=await book.findByIdAndUpdate(id,req.body)
    let books=await book.find()
    res.status(200).send(books)
})
app.get("/books/filter" , async (req,res) =>{
    const {author , category , title , price} = req.query;
    const filter = {}

    if(author){
        filter.author = author;
    }
    else if(title){
        filter.title = title;
    }
    else if(category){
        filter.category = category;
    }

    const sortoption = {}

    if(price == "lth"){
        sortoption.price = 1
    }
    else if(price == "htl"){
        sortoption.price = -1
    }

    let data = await book.find(filter).sort(sortoption)
    res.status(200).send(data)
})

app.listen(8090,()=>{
    console.log("server 8090");
    connect()
})