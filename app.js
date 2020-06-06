const express = require('express')
const app = express()
const authRoute = require('./routes/auth-routes')
const profileRoute = require('./routes/profile-routes')
const mongoose = require('mongoose')
const passport = require('./config/passport-setup')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')

const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// set up view engine
app.set('view engine','ejs')

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to Database')
})

//set up route middleware
app.use('/auth', authRoute)
app.use('/profile', profileRoute)

//create home page
app.get('/', (req, res) => {
    res.render('home',{user: req.user});
})

app.listen(port, () => {
    console.log("Server Running at port : " + port)
})