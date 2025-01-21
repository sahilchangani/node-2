const passport = require('passport');
const adminSchema = require('../Model/adminSchema');
const LocalSt = require('passport-local').Strategy;

passport.use("local", new LocalSt({
    usernameField: "email"
}, async (email, password, done) => {
    let admin = await adminSchema.findOne({ email: email });

    if (admin) {
        if (admin.password == password) {
            return done(null, admin);
        } else {
            return done(null, false);
        }
    } else {
        return done(null, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (userid, done) => {
    let admin = await adminSchema.findById(userid);
    done(null, admin);
});

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/");
    }
}

module.exports = passport;


