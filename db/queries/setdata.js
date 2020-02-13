const dbConnection = require('../db_connection.js');

/* Adds a new event to the events table in the database
   @param title the title of the event
   @param pic a pictures url for the event
   @param date the date of the event
   @param descr the description for the event
   @param cb a callback function
   returns an array of objects representing events */
module.exports.setEvent = (pic, title, date, descr, cb) => {
    dbConnection.query(
        'INSERT INTO events (pic, title, date, descr) VALUES ($1, $2, $3, $4)', [pic, title, date, descr],
        (err, res) => {
            if (err) return cb(err);
            cb(null, res);
        }
    );
}


module.exports.setComment = (userId, eventId, comtext, cb) => {
    dbConnection.query(
        'INSERT INTO comments (user_Id, event_Id, comtext) VALUES ($1, $2, $3)', [userId, eventId, comtext],
        (err, res) => {
            if (err) return cb(err);
            cb(null, res);
        }
    );
}


module.exports.setReview = (userId, eventId, revtext, cb) => {
    dbConnection.query(
        'INSERT INTO reviews (user_Id, event_Id, revtext) VALUES ($1, $2, $3)', [userId, eventId, revtext],
        (err, res) => {
            if (err) return cb(err);
            cb(null, res);
        }
    );
}


module.exports.setRegister = (userId, eventId, cb) => {
    dbConnection.query(
        'INSERT INTO attend (user_Id, event_Id) VALUES ($1, $2)', [userId, eventId],
        (err, res) => {
            if (err) return cb(err);
            cb(null, res);
        }
    );
}