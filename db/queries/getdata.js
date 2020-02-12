const dbConnection = require('../db_connection.js');

/* function returns an array with all the events in
   the database.
   @param cb a callback function
   returns: an array of objects representing events */
const search = (term, cb) => {
    const query = 'SELECT * FROM events WHERE Upper(title) LIKE $1 OR Upper(descr) LIKE $2;';
    dbConnection.query(query, ['%' + term.toUpperCase() + '%', '%' + term.toUpperCase() + '%'], (err, result) => {
        if (err) return cb(err);
        cb(null, result.rows);
    });
};

const getEvents = (cb) =>
    dbConnection.query('SELECT * FROM events;',
        (err, result) => {
            if (err) return cb(err);
            cb(null, result.rows);
        });

const getComments = (eventId, cb) =>
    dbConnection.query(
        'SELECT users.username,comments.comtext FROM users JOIN comments ON comments.user_id = users.id WHERE comments.event_id = $1;', [eventId],
        (err, result) => {
            if (err) return cb(err)
            cb(null, result.rows)
        });

const getReviews = (eventId, cb) =>
    dbConnection.query(
        'SELECT users.username,reviews.revtext FROM users JOIN reviews ON reviews.user_id = users.id WHERE reviews.event_id = $1;', [eventId],
        (err, result) => {
            if (err) return cb(err)
            cb(null, result.rows)
        });

const getRegister = (eventId, cb) =>
    dbConnection.query(
        'SELECT users.username FROM attend JOIN users ON attend.user_id ' +
        '= users.id WHEREattend.event_id = $1;', [eventId],
        (err, result) => {
            if (err) return cb(err)
            cb(null, result.rows)
        });

module.exports = {
    search,
    getEvents,
    getComments,
    getReviews,
    getRegister
};