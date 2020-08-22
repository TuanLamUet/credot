/** @format */

const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const auth = require("../config/auth");

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: auth.facebook.CLIENT_ID,
      clientSecret: auth.facebook.SECRET_ID,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // const user = await User.findOne({
        //   authFacebookID: user.id,
        //   authType: "facebook",
        // });
        // if (user) {
        //   return done(null, user);
        // }
        // const newUser = newUser({
        //   authType: "facebook",
        //   authFacebookID: user.id,
        // });
        // await newUser.save();
        // done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
