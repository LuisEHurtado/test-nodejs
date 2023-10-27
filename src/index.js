const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { database } = require('./setting');


// Intializations
const app = express();
// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  }))
  app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('dev'));

// Global variables


// Routes
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use(require('./routes/url'));


// Public
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
});