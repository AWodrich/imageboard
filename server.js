// SERVER SIDE

// THIS IS A SINGLE PAGE APP BUILT WITH ANGULAR!!!

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const database = require('./database')


const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('uploads'));
app.use(express.static('public'));

// app.post('/upload', uploader.single('file'), s3.upload, (req, res) => {
app.post('/upload', uploader.single('file'), (req, res) => {
    console.log('req body================', req.body);
    console.log('req.file++++++++++++++++',req.file);
    if (req.file) {
        console.log('here comes the filename??', req.file.filename);
        s3.upload(req.file).then(results  => {
            database.uploadImages(req.file.filename, req.body.title, req.body.user, req.body.description)
        })
    }
})


//======route to get images and do db query to get data from database

app.get('/images', (req, res) => {
    database.getImages()
    .then(results => {
        res.json(results)
    })
    .catch(err => {
        console.log(err);
    })
})

app.get('/image/:id', (req, res) => {
    console.log('req.params comes here on the server side????', req.params.id);
    database.getImageDetails(req.params.id)
    .then(results => {
        res.json(results)
    })
    .catch(err => {
        console.log(err);
    })
})

app.post('/comments', (req, res) => {
    console.log('getting comments here');
    console.log('req.body???', req.body);
})

app.get('*', (req, res) => {
    res.sendFile(__dirname+'/public/index.html')
});

app.listen(8080, (req, res) => console.log('listening on server'));
