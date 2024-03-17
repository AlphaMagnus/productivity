const express = require('express')
const mongoose = require('mongoose')

const app = express();
mongoose.connect('mongodb://localhost:27017/mydatabase');
const port = 3500;

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    date: Date,
    habitArr: Array,
    usertask: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const MatrixSchema = new mongoose.Schema({
    todo: {
        urgent: Boolean,
        important: Boolean,
        task: String
    }
})

const User = mongoose.model('User',UserSchema);
const Matrix = mongoose.model('Matrix',MatrixSchema);

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    User.findOne({
        username,
        password
    })
    .then(function(value){
        if(value){
            next()
        }
        else{
            res.status(403).json({msg:"User doesnt exist"})
        }
    })
}




app.listen(port,()=>{
    console.log("Listening on"+`${port}`)
})