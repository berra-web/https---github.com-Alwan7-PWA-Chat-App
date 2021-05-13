// Number 18 Require all this
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// Number 19 Require User Model for UPDATE DELETE and GET Methods
const User = require('../models/User');


// OPS: befor using this Create Request in Insomnia or Postman 


// Number 20 Update User whit :id
router.put('/:id', async(req, res) => {

    // Check the uer if equal using params.id or body.isAdmin 
    // then you can update your password using bcrypt.hash

    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            // Wait until you get new password 
            await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json('Account has been updated');
        } catch (err) {
            return res.status(500).json(err);
        }
    }else{
        // if users id NOT equal params.id or body.isAdmin so you can not change any body's password 
        return res.status(403).json('You can update only your account')
    }
})


// Number 21 Delete User its same Update but ve using findByIdAndDelete to delete 
router.delete('/:id', async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted')
        } catch (err) {
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json('You can delete only your account')
    }
})

// Number 22 Get a User using findById
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc  // _doc is a object to create new User
        res.status(200).json(other);
        
    } catch (err) {
        return res.status(500).json(err);
    }
})



module.exports = router


