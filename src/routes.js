const express = require('express');
const getdata = require('../db/queries/getdata.js');
const setdata = require('../db/queries/setdata.js');

const router = express.Router();

router.get('/', (req, res) => {
    getdata.getEvents((err, events) => {
        if (err) throw err;
        res.render('events', {
            title: 'Browse Events',
            events
        })
    })
});

router.get('/event/:eventid', (req, res) => {
    const event = getdata.getEvent(req.params.eventid, (err, result) => {
        if (err) return res.send('Error occurred');
        res.render('event', result[0]);
    });
});

router.get('/search/:term', (req, res) => {
    getdata.search(req.params.term, (err, events) => {
        if (err) throw err;
        res.render('events', {
            title: 'Search Events',
            events
        })
    })
});

router.get('/history', (req, res) => {
    getdata.getEvents((err, events) => {
        if (err) throw err;
        res.render('events', {
            title: 'Browse past events',
            events
        })
    })
});

router.get('/attends/:eventid', (req, res) => {
    getdata.getAttends(req.params.eventid, (err, attends) => {
        if (err) throw err;
        res.render('partials/attends', {
            title: 'Browse Attends',
            attends
        });
    })
})

router.get('/reviews/:eventid', (req, res) => {
    getdata.getReviews(req.params.eventid, (err, reviews) => {
        if (err) throw err;
        res.render('partials/reviews', {
            title: 'Browse Reviews',
            reviews
        })
    })
})

router.get('/comments/:eventid', (req, res) => {
    getdata.getComments(req.params.eventid, (err, comments) => {
        if (err) throw err;
        res.render('partials/comments', {
            title: 'Browse Comments',
            comments
        })
    })
})

module.exports = router;