const express = require('express');
const getdata = require('../db/queries/getdata.js');
const setdata = require('../db/queries/setdata.js');
const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const router = express.Router();

router.get('/', (req, res) => {
    getdata.getEvents((err, events) => {
        if (err) throw err;
        res.render('events', {
            title: 'Browse Events',
            events: events.map((elem) => {
                elem.date = new Date(elem.date);
                return { id: elem.id, title: elem.title, pic: elem.pic, date: elem.date.getDate() + " " + Month[elem.date.getMonth()] + " " + elem.date.getFullYear(), time: elem.time.slice(0, 5), descr: elem.descr };
            })
        })
    })
})


router.get('/event/:eventid', (req, res) => {
    const event = getdata.getEvent(req.params.eventid, (err, result) => {
        if (err) return res.send('Error occurred');
        let elem = result[0];
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
                        res: { id: elem.id, title: elem.title, pic: elem.pic, date: elem.date.getDate() + " " + Month[elem.date.getMonth()] + " " + elem.date.getFullYear(), time: elem.time.slice(0, 5), descr: elem.descr },
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
    getdata.getPastEvents((err, events) => {
        if (err) throw err;
        res.render('events', {
            title: 'Browse past events',
            events: events.map((elem) => {
                elem.date = new Date(elem.date);
                return { id: elem.id, title: elem.title, pic: elem.pic, date: elem.date.getDate() + " " + Month[elem.date.getMonth()] + " " + elem.date.getFullYear(), time: (elem.time) ? elem.time.slice(0, 5) : "15:30", descr: elem.descr };
            })
        })
    })
});

router.get('/create-event', (req, res) => {
    console.log(req.query.date);
    setdata.setEvent(req.query.pic, req.query.title, req.query.date, req.query.descr, (error, result) => {
        if (error) throw error;
        getdata.getEvents((err, events) => {
            if (err) throw err;
            res.render('events', {
                title: 'Browse Events',
                events
            });
        });
    });
});

module.exports = router;