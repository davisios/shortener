const mongoose = require('mongoose')
const ShortURL =require('../models/shortURL')

mongoose.connect('mongodb://localhost:27017/URL',{
useNewUrlParser: true, useUnifiedTopology: true});


const findURLbyShortened=(shortenedID)=>{
   return ShortURL.findOne({shortened:shortenedID}).then((URL)=>{
        return URL;
    }).catch((e)=>{
      
        return e; 
     })
}

const findURLbyId=(id)=>{
    return ShortURL.findOne({_id:id}).then((URL)=>{
        return URL;
    }).catch((e)=>{
       
        return e; 
     })
}

const findURLbyOriginal=(original)=>{
    return ShortURL.findOne({original:original}).then((URL)=>{
        return URL;
    }).catch((e)=>{
        console.log("eeeee 1",e);

        return e; 
     })
} 

const getAllURLS= ()=>{
    return ShortURL.find().then((URLs)=>{
        return URLs
    }).catch((e)=>{

       return e; 
        
    })
}

const createURL= (original)=>{
    return ShortURL.create({original:original})
    .then((element)=>{
        return element;
    })
    .catch((e)=>{
      
       return e; 
        
    })
}

exports.getAllURLS = getAllURLS;
exports.createURL = createURL;
exports.findURLbyId = findURLbyId;
exports.findURLbyOriginal = findURLbyOriginal;
exports.findURLbyShortened = findURLbyShortened;
