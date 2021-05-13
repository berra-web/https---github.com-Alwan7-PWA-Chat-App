// number 6 create a model for login form to user 
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: ''
    },
    coverPicture:{
        type: String,
        default: ''
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},
{timestamps: true}
);

// nuber 7 Export from User file this Schema 
module.exports = mongoose.model('User', UserSchema);