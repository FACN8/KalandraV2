const express = require('express');
const getData = require('./../db/queries/getdata')

const router = express.Router();

router.get('/events', (req, res) => {
    getData.getEvents((err, events) => {
        if (err) throw err;
        res.render('partials/events', {
            title: 'Browse Events',
            events
        })
    })
})

router.get('/reviews/:eventid', (req, res) => {
    getData.getReviews(req.params.eventid,(err, reviews) => {
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