const express = require('express');
const uuid = require('uuid');
const methodOverride = require('method-override');
const app = express();

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


let posts = [
    {
        id: uuid.v4(),
        name: 'Thabiso Kenneth Mokone',
        email: 'mokoneseptember@gmail.com',
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        youtube: 'https://www.youtube.com',
        linkedin: 'https://www.linkedin.com/in/mokoneseptember',
        tweet: 'In the dance of life, find your rhythm and let your heart lead the way!',
        src: 'user-soild.svg',
    },
    
]

app.get('/', (req, res) => {
    res.redirect('/posts');
})

app.get('/posts', (req, res) => {
    res.render('index', { posts });
})

app.get('/na', (req, res) => {
    res.send('Account not found!');
})

app.get('/posts/new', (req, res) => {
    res.render('form');
})

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(e => e.id === id);
    if (post) {
        res.render('detail', { post });
    } else { res.send('Post not found!') }
})

app.post('/posts', (req, res) => {
    let { name, email, tweet } = req.body;
    let id = uuid.v4();
    let src = 'user-solid.svg';
    posts.push({ name, email, tweet, id, src });
    res.redirect('/posts');
})

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(e => e.id === id);
    let tweet = req.body.tweet;
    post.tweet = tweet;
    res.redirect('/posts');
})

app.get('/posts/:id/delete', (req, res) => {
    let { id } = req.params;
    posts = posts.filter(e => e.id !== id);
    res.redirect('/posts');
})

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find(e => e.id === id);
    res.render('edit', { post });
})