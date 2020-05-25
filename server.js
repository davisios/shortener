const express = require('express')
const app=express()
const mongoose = require('mongoose')
const ShortURL =require('./models/shortURL')
const bodyParser = require('body-parser')
const URsController = require('./controllers/URLs')

mongoose.connect('mongodb://localhost:27017/URL',{
useNewUrlParser: true, useUnifiedTopology: true});





//required to 
app.set('view engine', 'ejs')

    // static middleware handles serving up the content from root
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
//return middlewar to aprse json
app.use(bodyParser.json());

//redirect root route to shorten
app.get('/', async (req, res) => {
    res.redirect('shorten')

  })
  //GET view stats for all created URLS
app.get('/all',  async (req, res) => {
    const shortURLs= await URsController.getAllURLS();
    res.render('allURLS',{shortURLs:shortURLs});

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
    const shortURL= await URsController.findURLbyShortened(req.params.shortURL);
           if(shortURL){
        res.render('stats',{shortURL:shortURL})
           }
           else{
       res.redirect('/404');
           }
    
      })

      //GET redirect to original url based on shortened url
app.get('/r/:shortURL', async (req, res) => {
    //check if URL exist by shortened
    const shortURLbyShorten= await URsController.findURLbyShortened(req.params.shortURL);
        if(shortURLbyShorten===null) {
    //check if URL exist by id
    const shortURLbyId= await URsController.findURLbyId(req.params.shortURL);
                if(shortURLbyId===null)return res.redirect('/404');
                shortURLbyId.clicks++;
                shortURLbyId.save();
                res.redirect(shortURLbyId.original);
        }else{
        shortURLbyShorten.clicks++;
        shortURLbyShorten.save();
        res.redirect(shortURLbyShorten.original);
    }
      })

      //POST new shorten URL
app.post('/shorten', async (req, res) => {
      //validate if the url was previously saved, if so return it, otherwhise, create new
    const alreadyCreated= await URsController.findURLbyOriginal(req.body.original);
      if(alreadyCreated===null){
         URsController.createURL(req.body.original).then((myShortURL)=>{
            console.log("shortURLbyShorten",myShortURL);
            res.json({shorten:"http://localhost:5000/r/"+myShortURL.shortened}) 
        }).catch((e)=>{
            console.log("eeeeeeee",e)
            res.send("faild") 
        });
      }else{
         res.json({shorten:"http://localhost:5000/r/"+alreadyCreated.shortened}) 
      }
  })

  app.get('*', (req, res) =>{
    
    res.redirect('404');
  });

app.listen(process.env.PORT || 5000);
