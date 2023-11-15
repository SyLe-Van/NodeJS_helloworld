const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const route = require('./routes');
const port = 3000;
const cors = require('cors')
const methodOverride = require('method-override')
const mysql2 = require('mysql2');
const connection = require('./config/db/index')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(cors())
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
// HTTP logger
// app.use(morgan('combined'));
// Template engine


// Routes init
route(app);
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
