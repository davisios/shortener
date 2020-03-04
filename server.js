const express = require('express')
const app=express()
const mongoose = require('mongoose')
const ShortURL =require('./models/shortURL')
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/URL',{
useNewUrlParser: true, useUnifiedTopology: true});

//required to 
app.set('view engine', 'ejs')

    // static middleware handles serving up the content from root
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.redirect('shorten')

  })
  //GET view stats for all created URLS
app.get('/all', async (req, res) => {
    const shortURL= await ShortURL.find()

    res.render('allURLS',{shortURLs:shortURL});

  })

  //GET main page
app.get('/shorten', async (req, res) => {
    res.sendFile(__dirname + "/" + "site.css");
    
    res.render('index')

  })

  //GET default 404
app.get('/404', async (req, res) => {
        res.render('errorPage');
    
    })

    //GET shortened url stats, if doesn´t exist redirect to 404
app.get('/s/:shortURL', async (req, res) => {   
        const shortURL= await ShortURL.findOne({shortened:req.params.shortURL})
           if(shortURL){
        res.render('stats',{shortURL:shortURL})
           }
           else{
       res.redirect('/404');
           }
    
      })

      //GET redirect to original url based on shortened url
app.get('/r/:shortURL', async (req, res) => {
     const shortURL= await ShortURL.findOne({shortened:req.params.shortURL})
        if(shortURL===null) return res.redirect('/404');
        shortURL.clicks++;
        shortURL.save();

        res.redirect(shortURL.original);

      })

      //POST new shorten URL
app.post('/shorten',  (req, res) => {
      //validate if the url was previously saved, if so return it, otherwhise, create new
    ShortURL.findOne({original:req.body.original}).then((element)=>{
        if(element===null){
            ShortURL.create({original:req.body.original}).then((myShortURL)=>{
                res.json({shorten:"http://localhost:5000/r/"+myShortURL.shortened}) 
            }).catch(()=>{
                res.send("faild") ;
            });
        }else{
            res.send("faild") ;
            res.json({shorten:"http://localhost:5000/r/"+element.shortened}) 
        }
     }).catch(()=>{
        res.send("faild") ;
     });
  })



app.listen(process.env.PORT || 5000);
