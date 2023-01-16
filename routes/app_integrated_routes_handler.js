const express = require('express');
const ronin_blog_controller = require ('../controller_app/app_integrated_blog_controller');


const app_router = express.Router();

//blog index route
app_router.get('/', ronin_blog_controller.ronin_blog_index)

//posting handler of create blog route
app_router.post('/' , ronin_blog_controller.ronin_blog_create_post);

//create blog route
app_router.get('/create' , ronin_blog_controller.ronin_blog_create_get);

//retrieve a specific blog
app_router.get('/:id', ronin_blog_controller.ronin_blog_details)

//delete a specific blog
app_router.delete('/:id', ronin_blog_controller.ronin_blog_delete);

module.exports = app_router;