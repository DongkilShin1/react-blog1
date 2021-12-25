const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { User }  = require('./models/user');

const config = require('./config/key');


// const url = 'mongodb://localhost:27017/admin';
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', _ => {
//   console.log('Database connected:', url)
  console.log('Database connected:', config.mongoURI)

});

db.on('error', err => {
  console.error('connection error:', err)
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})


app.get('/', (req, res) => res.send('hello world1'));

app.get('/api/hello', (req, res) => res.send('hello world2'));

const port = 3003;

app.listen(port, () => console.log(`server is running on ${port}`));