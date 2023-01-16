const Blogs_data = require('../models_app/app_integrated_db');

//ronin_index, ronin_blog_details, ronin_blog_create_get, ronin_blog_create_post, ronin_blog_delete

const ronin_blog_index = (req, res) => {
    Blogs_data.find().sort({createdAt:-1})
    .then((result) => {
        res.render('blogs/index' , 
        {
        page_title: 'Home' ,
        headings_title: 'Ronin Blogs',
        ronin_blogs: result
        });
    })
    .catch((err) => {
        console.log(err);
    })
}

const ronin_blog_create_get = (req, res) => {
    res.render(
        'blogs/create', 
        {
            page_title : "I-Ronin Create New Blog",
            headings_title : "Create New I-Ronin Blog"
        }
        )
}

const ronin_blog_create_post = (req, res) => {
    console.log(req.body);
    const ronin_blogs = new Blogs_data(req.body);
    
    ronin_blogs.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
}

const ronin_blog_details = (req, res) => {
    const identity = req.params.id
    console.log(identity);
    Blogs_data.findById(identity)
    .then((result) => {
        res.render(
            'blogs/blog_detail' , 
            {
                page_title : "A Ronin's Blsog",
                headings_title : `Ronin's blog`,
                ronin_blogs : result
            }
        );
    })
    .catch((err) => {
        console.log(err);
    })
}

const ronin_blog_delete = (req, res) => {
    const identity = req.params.id;
    
    Blogs_data.findByIdAndDelete(identity)
    .then(result => {
        //redirect to retrieve the json file from the server and delete it.
        res.json({redirecting: '/blogs'});
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    ronin_blog_index, 
    ronin_blog_create_get, 
    ronin_blog_create_post, 
    ronin_blog_details,
    ronin_blog_delete
}
