const express = require('express')
const app = express()
const authRoute = require('./routes/auth-routes')
const mongoose = require('mongoose')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')

const port = process.env.PORT || 4000

// set up view engine
app.set('view engine','ejs')

//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to Database')
})

//set up route middleware
app.use('/auth', authRoute)

//create home page
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log("Server Running at port : " + port)
})