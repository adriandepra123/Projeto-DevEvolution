const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const User = require('../models/User');
const { jwtSecret } = require('./jwt');
const passport = require('passport');

const localStrategy = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            if (!user.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            return done(null, user);
        })
        .catch(err => done(err));
});

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};

const jwtStrategy = new JWTStrategy(jwtOptions, (jwtPayload, done) => {
    User.findById(jwtPayload.sub)
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

