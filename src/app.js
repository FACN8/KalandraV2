const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const routes = require('./routes.js');
const helpers = require('./views/helpers/helpers.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
    'hbs',
    hbs({
        extname: 'hbs',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'views', 'partials'),
        defaultLayout: 'main',
        helpers
    })
);

app.set('port', process.env.PORT || 3000);
app.use(routes);

module.exports = app;