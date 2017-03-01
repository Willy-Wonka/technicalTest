const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://chengcheng:wang@ds113630.mlab.com:13630/technicaltest',
    function (err, database)
    {
        if (err) return console.log(err);
        db = database;
        app.listen(process.env.PORT || 3000, function ()
        {
            console.log('listening on 3000');
        })
    });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res)
{
    db.collection('posts').find().toArray(function (err, result)
    {
        if (err) return console.log(err);
        // render index.ejs
        res.render('index.ejs', {posts: result});
        // console.log(result);
    })
});

app.post('/posts', function (req, res)
{
    // console.log(req.body);
    db.collection('posts').save(req.body, function (err, result)
    {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/');
    })
});