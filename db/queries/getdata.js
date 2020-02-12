const dbConnection = require('../db_connection');

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

const getEvent = (id, cb) => {
    const query = 'SELECT * FROM events WHERE id=$1;';

    dbConnection.query(query, [id], (err, result) => {
        if (err) return cb(err);
        cb(null, result.rows);
    });
};

getEvents = (cb) =>
    dbConnection.query('SELECT * FROM events;',
        (err, result) => {
            if (err) return cb(err);
            cb(null, result.rows);
        });

const getComments = (eventId, cb) =>
    dbConnection.query(
        'SELECT comments.event_id,users.username,comments.comtext ' +
        'FROM users join comments on comments.user_id = users.id ' +
        'where comments.event_id = $1;', [eventId],
        (err, result) => {
            if (err) return cb(err)
            cb(null, result.rows)
        });

const getReviews = (eventId, cb) =>
    dbConnection.query(
        'SELECT reviews.event_id,users.username,reviews.revtext ' +
        'FROM users join reviews on reviews.user_id = users.id ' +
        'where reviews.event_id = $1;', [eventId],
        (err, result) => {
            if (err) return cb(err)
            cb(null, result.rows)
        });

const getRegister = (eventId, cb) =>
    dbConnection.query(
        'SELECT users.username FROM attend join users on attend.user_id ' +
        '= users.id where attend.event_id = $1;', [eventId],
        (err, result) => {
            if (err) return cb(err)
            cb(null, result.rows)
        });

module.exports = {
    search,
    getEvent,
    getEvents,
    getRegister,
    getReviews
}