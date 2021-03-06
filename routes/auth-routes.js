const express = require('express')
const passport = require('passport')
const route = express.Router()

//auth login
route.get('/login', (req, res) => {
    res.render('login')
})

//auth logout
route.get('/logout', (req, res) => {
    //handle with passport
    req.logout()
    res.redirect('/')
})

//auth with google
route.get('/google', passport.authenticate('google',{
    scope:['profile']
}))

//callbackURL
route.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user)
    res.redirect('/profile')
})

module.exports = route