const getData = require('./../../../db/queries/getdata')
module.exports = getData.getEvents((err, events) => {
    if (err) throw err;
    return events;
});