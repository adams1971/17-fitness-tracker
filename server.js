const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const routes = require('./routes/api') 

const PORT =process.env.PORT || 3000

const app = express();

app.use(logger('dev'));


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));
app.use(routes);


//connects to mongo DB and creates mongo object from imports above
mongoose.connect(
    process.envMONGODB_URL || 'mongodb://localhost/workout',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    app.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });