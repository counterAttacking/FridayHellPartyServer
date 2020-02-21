const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('config');
const { getConnection } = require('typeorm');
const UserInfo = require('../schemas/UserinfoSchemas');

const secret = config.get('secret');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      const connection = getConnection();
      const repository = connection.getRepository(UserInfo.options.name);
      repository.findOne(payload.id)
        .then(user => {
          if(user){
            return done(null, {
                id: user.id,
                userid: user.userid,
                username: user.username,
                password: user.password,
                usertel: user.tel,
                userbirthday: user.birthday,
                useremail: user.email,
            });
          }
          return done(null, false);
        }).catch(err => console.error(err));
    })
  )
};

