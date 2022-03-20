const Blog = require('../models/blog');

// blog_index

const blog_index = (req, res) => {

    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch(err => {
            console.log(err);
        })
}

// blog_details

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('single-post', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            res.status(404).render('404', { title: '404 Blog not found' });
        })
}

// blog_create_get

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog post' })
}

// blog_create_post, blog_delete

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        })
}

// blog_delete
const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}
