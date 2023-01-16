const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blog_routes = require('./routes/app_integrated_routes_handler');
const { render } = require('ejs');
// const port = require ('./server')

// Express app
const app = express();


// Connect into mongoDB
const dbURI = 'mongodb+srv://<cluster_name>:<password>@ironin.z5tsj0q.mongodb.net/test?retryWrites=true&w=majority';
mongoose.set('strictQuery' , false);//to supress the deprecation warning.
mongoose.connect(dbURI , {useNewUrlParser : true, useUnifiedTopology : true})
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err));

// register view engine
app.set('views' , './views_app');
app.set('view engine' , 'ejs');


// Listen for request
// app.listen(8080);

// middleware 3rd parties & static files.
app.use(express.static('./views_app/public'));//allowing css file to be displayed from head.ejs
app.use(express.urlencoded({ extended : true }));//app.post middleware
app.use(morgan('dev'));



app.get('/' , (req, res) => {
    
    res.redirect('/blogs')
    
});

app.get('/about', (req, res) => {
    res.render(
        'about', 
        {
            page_title : "I-Ronin About",
            headings_title : "About I-Ronin page"
        }
        );
    });
    
//blog routes
app.use('/blogs/', blog_routes);//try to uncomment the argument
        
app.use((req,res) => {
    res.status(404).render('404', {page_title : "Error:404"});
});

