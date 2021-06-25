const express = require('express');
const { body, validationResult } = require('express-validator');
const Router = express.Router;
const forms = require('../forms');
const passport = require('passport');
const User = require('../User');
const GoogleUser = require('../Google-user');
require('../passport-setup');
const session = require('express-session');
const router = Router();


router.use(session({
    secret: require('../config').jwtkey,
    resave: false, 
    saveUninitialized: false
}));

const isLoggedIn = (request, response, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
};
  

router.get('/', async(request, response) => {
    if(request.session.isAuth){
        response.render('layouts/main', {
            title: 'Project | Home',
            isIndexPage: true, 
            name: request.session.username, 
            notAuth: true
        });
    }
    else{
        if(request.user)
            response.render('layouts/main', {
                title: 'Project | Home',
                isIndexPage: true, 
                name: request.user.displayName, 
                notAuth: true
            });
        else{
            response.render('layouts/main', {
                title: 'Project | Home',
                isIndexPage: true, 
                notAuth: false
            });
        }
    }

});

router.get('/forms', (request, response) => {
    response.render('layouts/main',{
        title: 'Project | Forms',
        isFormPage: true
    });
});

router.get('/profile', async(request, response) => {

    if(request.session.isAuth){
        const GameInfo = await User.findOne({email: request.session.email})
        console.log(GameInfo)
        response.render('layouts/main',{
            title: 'Project | Profile',
            isProfilePage: true, 
            name: request.session.username,
            notAuth: true, 
            FlappyScore: GameInfo.FlappyScore, 
            SnakeScore: GameInfo.SnakeScore, 
            SapperScore: GameInfo.SapperScore
        }); 
    }
    else{
        if(request.user){
            const googleUserInfo = await GoogleUser.findOne({googleUserName: request.user.displayName});
            
            response.render('layouts/main',{
                title: 'Project | Profile',
                isProfilePage: true, 
                name: request.user.displayName, 
                notAuth: true,
                FlappyScore: googleUserInfo.FlappyScore, 
                SnakeScore: googleUserInfo.SnakeScore, 
                SapperScore: googleUserInfo.SapperScore 
            });
        }
        else
            response.render('layouts/main',{
                title: 'Project | Profile',
                isProfilePage: true, 
                notAuth: false
            }); 
    }
});

router.get('/library', async (request, response) => {

    if(request.session.isAuth){
        response.render('layouts/main',{
            title: 'Project | Profile',
            isLibraryPage: true,
            name: request.session.username,
            notAuth: true
        }); 
    }
    else{
        if(request.user)
            response.render('layouts/main', {
                title: 'Project | Profile',
                isLibraryPage: true,
                name: request.user.displayName, 
                notAuth: true
            });
        else
            response.render('layouts/main', {
                title: 'Project | Profile',
                isLibraryPage: true,
                notAuth: false,
            });
    }   
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/bad', (request, response) => {
    response.redirect('/forms');
});

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/bad' }),
  async (request, response) => {

    const condidate =  await GoogleUser.findOne({googleUserName: request.user.displayName});
    
    if(condidate){
        return response.redirect('/profile');
    }
    else{
        const newGoogleUser = new GoogleUser({
            googleUserName: request.user.displayName, 
            FlappyScore: '0', 
            SnakeScore: '0', 
            SapperScore: '0'
        });
        await newGoogleUser.save();
    }

    return response.redirect('/');
});

router.get('/logout', async (request, response) => {
    request.session = null;
    request.logout();
    response.redirect('/');
});

router.get('/crazybird', (request, response) => {
    response.sendFile(__dirname + '/games/flappy.html');
});

router.post('/flappybird', async (request, response) => {
    if(request.user){
        const googleUser = await GoogleUser.findOne({googleUserName: request.user.displayName});

        if(googleUser.FlappyScore < request.body.score){
            await GoogleUser.updateOne({googleUserName: request.user.displayName}, {
                $set:{
                    FlappyScore: request.body.score
                } 
            })
        }
        
        return response.redirect('/profile');
    }
    else {
        if(request.session.isAuth){

            const user = await User.findOne({userName: request.session.username});
            if(user.FlappyScore < request.body.score){
                await User.updateOne({userName: request.session.username}, {
                    $set:{
                        FlappyScore: request.body.score
                    }   
                });
                return response.redirect('/profile');
            }
            return response.redirect('/profile');
        }
        else{
            return response.redirect('/');
        }
    }
});

router.get('/snakegame', (request, response) => {
    response.sendFile(__dirname + '/games/snake.html');
});

router.post('/snake', async (request, response) => {
    if(request.user){
        const googleUser = await GoogleUser.findOne({googleUserName: request.user.displayName});

        if(googleUser.SnakeScore < request.body.score){
            await GoogleUser.updateOne({googleUserName: request.user.displayName}, {
                $set:{
                    SnakeScore: request.body.score
                } 
            })
        }
        
        return response.redirect('/profile');
    }
    else {
        if(request.session.isAuth){

            const user = await User.findOne({userName: request.session.username});
            if(user.SnakeScore < request.body.score){
                await User.updateOne({userName: request.session.username}, {
                    $set:{
                        SnakeScore: request.body.score
                    }   
                });
                return response.redirect('/profile');
            }
            return response.redirect('/profile');
        }
        else{
            return response.redirect('/');
        }
    }
});

router.get('/sappergame', (request, response) => {
    response.sendFile(__dirname + '/games/sapper.html');
});

router.post('/sapper', async (request, response) => {
    if(request.user){
        const googleUser = await GoogleUser.findOne({googleUserName: request.user.displayName});

        if(googleUser.SapperScore < request.body.score){
            await GoogleUser.updateOne({googleUserName: request.user.displayName}, {
                $set:{
                    SapperScore: request.body.score
                } 
            })
        }
        
        return response.redirect('/profile');
    }
    else {
        if(request.session.isAuth){

            const user = await User.findOne({userName: request.session.username});
            if(user.SapperScore < request.body.score){
                await User.updateOne({userName: request.session.username}, {
                    $set:{
                        SapperScore: request.body.score
                    }   
                });
                return response.redirect('/profile');
            }
            return response.redirect('/profile');
        }
        else{
            return response.redirect('/');
        }
    }
});

router.post('/form2', body('username').isEmail(), body('password').isLength({ min: 8, max: 16 }),
    async (request, response) => {
    if(request.body.password == request.body.confirmpassword){
        await forms.Registr(request, response);
    }
    else
        return response.redirect('/forms');
});

router.post('/form1', async (request, response) => {
    const info = await forms.logIn(request, response);

    if(info){
        request.session.isAuth = true;
        request.session.email = info.email;
        request.session.username = info.username;
    }

    response.redirect('/');
});

router.post('/form3', (request, response) => {
    require('../mail')(request.body.email);
    response.redirect('/');
});


module.exports = router;