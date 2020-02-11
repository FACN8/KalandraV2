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

router.get('/', (req, res) => {
    res.render('home', {

    });
});
router.get('/stylesheets/', (req, res) => {
    res.render('home', {});
});

router.get('/history', (req, res) => {
    res.render('history', {});
});

router.get('/event', (req, res) => {
    res.render('event', {
        //do things
    });
});

router.get('/create-post', (req, res) => {
    //add post to DB
    res.render('home', {});
});

router.get('/search', (req, res) => {
    res.render('home', { /* give search data here (term query in querystring) */ });
});

module.exports = router;