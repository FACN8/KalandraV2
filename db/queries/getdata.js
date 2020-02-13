const dbConnection = require('../db_connection.js');

/* function returns an array with all the events in
   the database.
   @param cb a callback function
   returns: an array of objects representing events */
module.exports.search = (term, cb) => {
    const query = 'SELECT * FROM events WHERE Upper(title) LIKE $1 OR Upper(descr) LIKE $2;';

    dbConnection.query(query, ['%' + term.toUpperCase() + '%', '%' + term.toUpperCase() + '%'], (err, result) => {
        if (err) return cb(err);
        cb(null, result.rows);
    });
};

module.exports.getEvent = (id, cb) => {
    const query = 'SELECT id,title,pic,date,time,descr FROM events WHERE id=$1;';
    dbConnection.query(query, [id], (err, result) => {
        if (err) return cb(err);
        cb(null, result.rows);
    });
};

module.exports.getPastEvents = (cb) =>
    dbConnection.query('SELECT * FROM events WHERE date <= NOW() ORDER BY date DESC;',
        (err, result) => {
            if (err) return cb(err);
            cb(null, result.rows);
        });

module.exports.getEvents = (cb) =>
    dbConnection.query('SELECT * FROM events WHERE date >= NOW() ORDER BY date ASC;',
        (err, result) => {
            if (err) return cb(err);
            cb(null, result.rows);
        });

module.exports.getComments = (eventId, cb) =>
    dbConnection.query(
        'SELECT users.username,comments.comtext ' +
        'FROM users join comments on comments.user_id = users.id ' +
        'where comments.event_id = $1;', [eventId],
        (err, result) => {
            if (err) return cb(err);
            cb(null, result.rows);
        });

module.exports.getReviews = (eventId, cb) =>
    dbConnection.query(
        'SELECT users.username,reviews.revtext ' +
        'FROM users join reviews on reviews.user_id = users.id ' +
        'where reviews.event_id = $1;', [eventId],
        (err, result) => {
            if (err) return cb(err);
            cb(null, result.rows);
        });

module.exports.getAttends = (eventId, cb) =>
    dbConnection.query(
        'SELECT users.username, users.pic FROM attend join users on attend.user_id ' +
        '= users.id where attend.event_id = $1;', [eventId],
        (err, result) => {
            if (err) return cb(err);
            cb(null, result.rows);
        });