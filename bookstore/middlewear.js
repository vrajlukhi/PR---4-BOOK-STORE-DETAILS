const express = require("express")

const check = (req,res,next) =>{
    const {title,author,category,publicationYear,price,quantity,description,imageUrl} = req.body;
    if(!title && !author && !category && !publicationYear && !price && !quantity && !description && !imageUrl){
        res.status(400).json({message: 'All fields are required'})
    }
    else{
        next();
    }
   
}

module.exports = check;