const bcrypt = require('bcryptjs');
const config = require('./config');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('./User')

const generateToken = (email, login) => {
    const userObj = {
        email: email, 
        login: login
    };
    return jwt.sign(userObj, config.jwtkey, {expiresIn: "24h"});
}


class Auntification{
    checkIn(request, response){
        const errors = validationResult(request);    

        if(!errors.isEmpty()){
            response.render('layouts/main', {
                title: 'Project | Forms',
                isFormPage: true, 
                isInputErr: true
            });
        }
        else{
            User.find({
                email: request.body.email
            }, (err, user) => {

                if(!err)
                    if(user.length === 0){
                        const passwordHash = bcrypt.hashSync(request.body.password);

                        const addingUser = new User({
                            userName: request.body.userName,
                            email: request.body.email,
                            password: passwordHash
                        });
                        
                        addingUser.save();

                        response.render('layouts/main',{
                            title: 'Project | Home',
                            isIndexPage: true
                        });
                    }
                    else{
                        console.log('found in database')
                        response.status(401)
                    }
            })
        }
    } 
    
    async entryUser(request, response){
        const user = await User.findOne({email: request.body.email});

        if(!user){
            response.status(401).json({message: `email ${request.body.email} not found in database`});
        }
        else{
            const validPasswd = bcrypt.compareSync(request.body.password, user.password);
            if(validPasswd){
                const token = generateToken(user.email, user.userName);
                return response.json(token);
            }
        }
    }
}


module.exports = new Auntification();