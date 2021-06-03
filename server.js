const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const routes = require('./routes'); 
const path = require("path");
const Exercise = require("./models/Exercise")

const PORT = process.env.PORT || 3000

const app = express();

app.use(logger('dev'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//connects to mongo DB and creates mongo object from imports above
mongoose.connect(
    process.envMONGODB_URI || 'mongodb://localhost/workout',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);
    
// app.use(routes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
})

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
})

app.post("/api/workouts", ({ body }, res) => {
    Exercise
        .create({day: new Date()})
        .then((data) => res.json(data))
        .catch( e => console.error(e))
})

app.get("/api/workouts", (req, res) => {
    Exercise   
        .find({}, (error, data) => {
            if(error){
                res.send(error);
            }else{
                console.log("data",data);
                res.json(data);
            }
        })
})

app.put("/api/workouts/:id", (req, res) => {
    console.log("body put", req.body);
    Exercise
            .findByIdAndUpdate(req.params.id, { $push: {exercises: req.body}}, {new: true, runValidators: true})
            .then(() => res.sendStatus(200))
            .catch(e => console.error("put error",e))
});

app.get("api/workouts/range", (req, res) => {
    Exercise
            .find()
            .then( workout => res.json(workout))
            .catch(e => console.error("get error",e))
        console.log(req.body);
})


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});