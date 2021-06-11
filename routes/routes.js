const express = require('express');
const User = require('../User');
const config = require('../config');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { request } = require('express');

const Router = express.Router;

const router = Router();

const generateToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

router.get('/', (request, response) => {
    response.render('layouts/main', {
        title: 'Project | Home',
        isIndexPage: true
    });
});

router.get('/forms', (request, response) => {
    response.render('layouts/main',{
        title: 'Project | Forms',
        isFormPage: true
    });
});

router.post('/form1', body('email').isEmail(), body('password').isLength({min: 8}), async (request, response) => {
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
});

router.post('/form2', async(request, response) => {
    const user = await User.findOne({email: request.body.email});

    if(!user){
        response.status(401).json({message: `email ${request.body.email} not found in database`});
    }
    else{
        const validPasswd = bcrypt.compareSync(request.body.password, user.password);
        if(validPasswd){
            const token = generateToken(user._id, user.userName);
            return response.json(token);
        }
    }
});

router.get('/profile', (request, response) => {
    response.render('layouts/main',{
        title: 'Project | Profile',
        isProfilePage: true
    });
});

module.exports = router;