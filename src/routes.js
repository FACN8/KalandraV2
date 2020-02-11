const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { });
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
    res.render('home', { });
});

router.get('/search', (req, res) => {
    res.render('home', { /* give search data here (term query in querystring) */ });
});

module.exports = router;
