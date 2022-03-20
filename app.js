const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// setting the express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://nodeninja:test1234@node-blog.znz0q.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routers
// scoping the blog routers to the blogs url
app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
