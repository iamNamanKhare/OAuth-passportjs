const express = require('express')
const route = express.Router()

//auth login
route.get('/login', (req, res) => {
    res.render('login')
})

//auth logout
route.get('/logout', (req, res) => {
    //handle with passport
    res.send('Logging out')
})

//auth with google
route.get('/google', (req, res) => {
    //handle with passport
    res.send('Logging in with google')
})

module.exports = route