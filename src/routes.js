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

        let reviews, attends, comments;

        getdata.getComments(req.params.eventid, (err, commentsRes) => {
            if (err) throw err;
            comments = commentsRes;

            getdata.getReviews(req.params.eventid, (err, reviewsRes) => {
                if (err) throw err;
                reviews = reviewsRes;


                getdata.getAttends(req.params.eventid, (err, attendsRes) => {
                    if (err) throw err;
                    attends = attendsRes;

                    res.render('event', {
                        res: result[0],
                        comments,
                        reviews,
                        attends
                    });
                });

            });

        });

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

module.exports = router;