const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const config = require('./config');
const User = require('./User');

const options = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtkey
};


module.exports = passport => {
    passport.use(
        new jwtStrategy(options, async (payload, done) => {
            try{
                const user = new User();

                await User.findById(payload.id).select('email id');

                if(user){
                    done(null, user);
                }
                else{
                    done(null, false);
                }
            }
            catch(err){
                console.error(err);
            }
        })
    )
}