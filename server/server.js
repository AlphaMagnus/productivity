const express = require('express')
const mongoose = require('mongoose')

const app = express();
mongoose.connect('mongodb://localhost:27017/mydatabase');
const port = 3500;

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,


})

const User = mongoose.model('User',UserSchemaSchema);

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
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