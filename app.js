const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongodb
// const dbURI = 'mongodb+srv://invisible26:invisible26@nodetuto.xdo2a2q.mongodb.net/node-tuto?retryWrites=true&w=majority';
const dbURI = 'mongodb+srv://invisible26:invisible26@nodetuto.xdo2a2q.mongodb.net/node-tuto?retryWrites=true&w=majority&appName=nodetuto'

mongoose.connect(dbURI)
    .then((result) => app.listen(3002))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for requests
// app.listen(3002);

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });


// app.get('/single-blog', (req, res) => {
//     Blog.findById('683422d6ad9a311ac4a4a5e0')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });

// Set current year in all views
app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    next();
});

//routes
app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    // ];
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

//block routes
app.use('/blogs', blogRoutes);

// //redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

//404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});