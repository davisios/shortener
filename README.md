
    Enviroments requirements:
     1.install mongoDB locally
     
     Project dependencies:
    1. npm install mongoose     --> mongoDB connectivity and queries
    2. npm install express      --> express for rest api endpoints
    3. npm install shortid      --> basic id generator
    4. npm install body-parser  --> read http post data in req.body
    5. npm install ejs          --> template engine so we can pass html code in a single varaible instead writing it in the res.render
    
    mongoose configuration:
    1. already installed mongoDB locally
    2. require mongoose and conenct using localhost connection string 'mongodb://localhost:27017/URL', should look like the below configuration
        mongoose.connect('mongodb://localhost:27017/URL',{
        useNewUrlParser: true, useUnifiedTopology: true});
        
       
        run the project with npm run dev
    
