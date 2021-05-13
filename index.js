// Number 1 ve install and require all this from package.json
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotEnv = require('dotenv'); // // DotENV for secret URL key 
const helmet = require('helmet'); // Helmet helps you secure your Express apps by setting various HTTP headers
const morgan = require('morgan'); // HTTP request logger middleware for node.js (login middleware)

// number 14 get or require users and aouth from routes file
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

// number 2 .ENV 
dotEnv.config(); // as a config 


//Connect to Mongo
// number 4 Connect to mongoDB Atlas 
mongoose
.connect(process.env.MONGO_URL , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log('MongoDB is Connected'))
.catch(err => console.log(err));

// Middleware // number 5 use middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Number 15 Use router file
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);



// number 3 create PORT 
app.listen(8080, () => {
    console.log('Chat app servre is running !');
})