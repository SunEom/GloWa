const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () =>{
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
    }, async (userID, password, done)=>{
        try{  
            const exUser = await User.findOne({where: {user_id: userID}});
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password)
                if(result){
                    console.log(exUser.dataValues);
                    return done(null,exUser.dataValues);
                } else{
                    return done(null,false,{message:'비밀번호가 일치하지 않습니다.'});
                }
            } else{
                return done(null,false,{message: '가입되지 않은 회원입니다.'});
            }
        } catch(error){
            console.log(error);
            done(error);
        }
    }))
}