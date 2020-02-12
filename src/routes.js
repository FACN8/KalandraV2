const express = require('express');
const getData = require('./../db/queries/getdata')

const router = express.Router();

router.get('/', (req, res) => {
    getData.getEvents((err, events) => {
        if (err) throw err;
        res.render('events', {
            title: 'Browse Events',
            events
        })
    })
});

router.get('/search/:term', (req, res) => {
    getData.search(req.params.term, (err, events) => {
        if (err) throw err;
        res.render('events', {
            title: 'Search Events',
            events
        })
    })
});

router.get('/history', (req, res) => {
    getData.getEvents((err, events) => {
        if (err) throw err;
        res.render('events', {
            title: 'Browse past events',
            events
        })
    })
});

router.get('/attends/:eventid', (req, res) => {
    getData.getAttends(req.params.eventid, (err, attends) => {
        if (err) throw err;
        res.render('partials/attends', {
            title: 'Browse Attends',
            attends
        });
    })
})

router.get('/reviews/:eventid', (req, res) => {
    getData.getReviews(req.params.eventid, (err, reviews) => {
        if (err) throw err;
        res.render('partials/reviews', {
            title: 'Browse Reviews',
            reviews
        })
    })
})

router.get('/comments/:eventid', (req, res) => {
    getData.getComments(req.params.eventid, (err, comments) => {
        if (err) throw err;
        res.render('partials/comments', {
            title: 'Browse Comments',
            comments
        })
    })
})
module.exports = router;