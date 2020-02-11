const express = require('express');
const getdata = require('../db/queries/getdata.js');
const setdata = require('../db/queries/setdata.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {});
});

router.get('/event/:eventid', (req, res) => {
    const event = getdata.getEvent(req.params.eventid, (err, result) => {
        if (err) return res.send('Error occurred');
        res.render('event', result[0]);
    });
});

router.get('/history', (req, res) => {
    res.render('history', {});
});

router.get('/create-post', (req, res) => {
    //add post to DB
    res.render('home', {});
});

router.get('/search', (req, res) => {
    res.render('home', { /* give search data here (term query in querystring) */ });
});

module.exports = router;
