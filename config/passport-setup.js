const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-models')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        //options for google strategy
        clientID: keys.google.ClientId,
        clientSecret: keys.google.ClientSecret,
        callbackURL: '/auth/google/redirect'
        }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        // check if user already exists in database
        
        //console.log(profile)

        User.findOne({googleId: profile.id}) 
            .then((currentUser) => {
                if(currentUser){
                    //already a user
                    console.log('User is : ' + currentUser)
                    done(null, currentUser)
                } else {
                    //if not, create a user in our db
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        thumbnail: profile._json.picture
                        }).save().then((newUser) => {
                        console.log('New User Created : ' + newUser)
                        done(null, newUser)
                    })
                }
            })
    })
)

module.exports = passport