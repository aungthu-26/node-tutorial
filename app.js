const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://invisible26:invisible26@nodetuto.xdo2a2q.mongodb.net/node-tuto?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3002))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3002);

app.use(morgan('dev'));

//middleware & static files
app.use(express.static('public'));

// Set current year in all views
app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    next();
});

app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

// //redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

//404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});