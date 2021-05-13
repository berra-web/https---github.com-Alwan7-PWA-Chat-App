// number 8 create Auathontication register form to User
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // number 9 Require User Model 

const bcrypt = require('bcrypt'); //  number 10 Bcrypt to random password, then all User can create random pasword


// Number 11 Register User with post Method
router.post('/register', async(req, res) => {
    
    try {
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Number 12 Create new user OPS: befor using this, you can try your post with get method in localhost then create your body in postman or insomnia 
        // like this : router.get('/register', (req, res) => {const user = new User{username: 'Behrad', email: 'hbberra@gamil.com', password: '1234'} user.save(user); res.send('this is test')})

        //Number 16 create user new User 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        // Number 17 save user and response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }

});



// number  LOGIN user
router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).send('USER NOT FOUND');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json('WRONG PASSWORD');

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})


// number 13 export this file (router) whit router.get method to testing
module.exports = router