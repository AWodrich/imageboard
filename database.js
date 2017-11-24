const spicedPg = require('spiced-pg');
const config = require('./config.json');


if(process.env.DATABASE_URL){
    dbUrl = process.env.DATABASE_URL
} else {
    var info = require('./passwords.json')
    dbUrl = `postgres:${info.username}:${info.password}@localhost:5432/images`
}

var db = spicedPg(dbUrl);


//===getting images from database
exports.getImages = () => {
    var q = `SELECT * FROM images ORDER BY created_at DESC`
    return db.query(q)
    .then(images => {
        images.rows.forEach(row => {
            row.image = config.s3Url + row.image;
        })
        return images.rows;
    }).catch(err => {
        console.log(err);
    })
}

exports.uploadImages = (image, title, username, description) => {
    var q = `INSERT INTO images(image, title, username, description) VALUES($1, $2, $3, $4)`
    var params = [image, title, username, description]
    return db.query(q, params)
    .then(results => {
        console.log('//////', results.rows);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getImageDetails = (imageId) => {
    var q = `SELECT title, image, description
            FROM images
            WHERE id = $1`;
    var params = [imageId];
    return db.query(q, params)
    .then(results => {
            return results.rows[0];
    })
}
