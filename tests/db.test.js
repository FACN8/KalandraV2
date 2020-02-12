const tape = require("tape");
const runDbBuild = require("../db/db_build.js");
const getData = require("../db/queries/getdata.js");
const setData = require("../db/queries/setdata.js");


const initialdb = '[{"id":1,"title":"Salesforce bullshit day","pic":"https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Salesforce_logo.svg/1200px-Salesforce_logo.svg.png","date":"2020-02-01T22:00:00.000Z","descr":"A Hijje to go home early"},{"id":2,"title":"Oracle day","pic":"https://ir0.mobify.com/project-oss-www-fujitsu-com/c8/webp80/1536/https://www.fujitsu.com/il/Images/oracle-db580x224_tcm152-40873.jpg","date":"2020-01-27T22:00:00.000Z","descr":"A trip to petah tikva"},{"id":3,"title":"Valentines day","pic":"https://www.myjewishlearning.com/wp-content/uploads/2003/02/love2-1598x900.jpg","date":"2020-02-13T22:00:00.000Z","descr":"A Hijje to consume love"},{"id":4,"title":"Fatmeeh Birthday","pic":"https://cdn.mos.cms.futurecdn.net/vChK6pTy3vN3KbYZ7UU7k3-1200-80.jpg","date":"2020-03-23T22:00:00.000Z","descr":"The only real celebration"}]'
const shirbd = '[{"id":1,"title":"Salesforce bullshit day","pic":"https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Salesforce_logo.svg/1200px-Salesforce_logo.svg.png","date":"2020-02-01T22:00:00.000Z","descr":"A Hijje to go home early"},{"id":2,"title":"Oracle day","pic":"https://ir0.mobify.com/project-oss-www-fujitsu-com/c8/webp80/1536/https://www.fujitsu.com/il/Images/oracle-db580x224_tcm152-40873.jpg","date":"2020-01-27T22:00:00.000Z","descr":"A trip to petah tikva"},{"id":3,"title":"Valentines day","pic":"https://www.myjewishlearning.com/wp-content/uploads/2003/02/love2-1598x900.jpg","date":"2020-02-13T22:00:00.000Z","descr":"A Hijje to consume love"},{"id":4,"title":"Fatmeeh Birthday","pic":"https://cdn.mos.cms.futurecdn.net/vChK6pTy3vN3KbYZ7UU7k3-1200-80.jpg","date":"2020-03-23T22:00:00.000Z","descr":"The only real celebration"},{"id":5,"title":"Shiren\'s Birthday","pic":"https://scontent.ftlv4-1.fna.fbcdn.net/v/t1.0-9/p960x960/67902567_109012490448797_111807164175089664_o.jpg?_nc_cat=108&_nc_ohc=zqza3y1fv8gAX_FXLNV&_nc_ht=scontent.ftlv4-1.fna&_nc_tp=6&oh=6c9aea60c9ae0805cb73cb2773782d5f&oe=5E8FEF12","date":"2020-07-06T21:00:00.000Z","descr":"Shireen\'s Birthday with mario on the guitar"}]'

tape('Testing browsing all data in intial database and adding an event and retrieving all data after change', (t) => {
    runDbBuild((err, res) => {
        getData.getEvents((err, res) => {
        console.log(getdata);
        getdata.getEvents((err, res) => {
            if (err) t.error(err);
            t.equal(JSON.stringify(res), initialdb, "Initial database values are correct");
            setData.setEvent("Shiren's Birthday", "https://scontent.ftlv4-1.fna.fbcdn.net/v/t1.0-9/p960x960/67902567_109012490448797_111807164175089664_o.jpg?_nc_cat=108&_nc_ohc=zqza3y1fv8gAX_FXLNV&_nc_ht=scontent.ftlv4-1.fna&_nc_tp=6&oh=6c9aea60c9ae0805cb73cb2773782d5f&oe=5E8FEF12", "07-07-2020", "Shireen's Birthday with mario on the guitar", (err, res) => {
            setdata.setEvent("Shiren's Birthday", "https://scontent.ftlv4-1.fna.fbcdn.net/v/t1.0-9/p960x960/67902567_109012490448797_111807164175089664_o.jpg?_nc_cat=108&_nc_ohc=zqza3y1fv8gAX_FXLNV&_nc_ht=scontent.ftlv4-1.fna&_nc_tp=6&oh=6c9aea60c9ae0805cb73cb2773782d5f&oe=5E8FEF12", "07-07-2020", "Shireen's Birthday with mario on the guitar", (err, res) => {
                if (err) t.error(err);
                t.equal(res.rowCount, 1, "Adding an event to database");
                getData.getEvents((err, res) => {
                getdata.getEvents((err, res) => {
                    if (err) t.error(err);
                    t.equal(JSON.stringify(res), shirbd, "data in database changed acording to added event");
                    t.end();
                })
            })
        })
    })
}) 


const initComments = [{ event_id: 4, username: 'lina', comtext: 'Mabrok habibte lal 120, lal farha el tame' }, { event_id: 4, username: 'ivan', comtext: 'Happy birthday fatmeeh, 3o2bal el 120 zay el 20 :p' }];


tape('Testing adding a comment and getting the comments ', (t) => {
    runDbBuild((err, res) => {
        getdata.getComments(4, (err, res) => {
            if (err) t.error(err);
            t.deepEqual(res, initComments, "Initial database values are correct");
            t.end();
        })
        setdata.setComment(1,4,'hkkkfff', (err, res) => {
            if (err) t.error(err);
            t.equal(res.rowCount, 1, "Adding a comment to database");
        })
    })
})

const initReview = [ { event_id: 1, username: 'lina', revtext: 'I cant believe you are wasting your time on salesforce!' }, { event_id: 1, username: 'rabea', revtext: 'It was wooooow i went home and i went to sleep' } ];

tape('Testing adding a review and getting the reviews ', (t) => {
    runDbBuild((err, res) => {
        getdata.getReviews(1, (err, res) => {
            if (err) t.error(err);
            t.deepEqual(res, initReview, "Initial reviews database values are correct");
            t.end();
        })
        setdata.setReview(1,4,'hkkkfff', (err, res) => {
            if (err) t.error(err);
            t.equal(res.rowCount, 1, "Adding a review to database");
        })
    })
})


const initRegister = [ { username: 'rabea' }, { username: 'fake' } ];

tape('Testing register table and getting the registered ', (t) => {
    runDbBuild((err, res) => {
        getdata.getRegister(1, (err, res) => {
            if (err) t.error(err);
            t.deepEqual(res, initRegister, "Initial register table database values are correct");
            t.end();
        })
        setdata.setRegister(1,4, (err, res) => {
            if (err) t.error(err);
            t.equal(res.rowCount, 1, "Adding a registeration to database");
        })
    })
})
