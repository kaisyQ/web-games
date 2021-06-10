const express = require('express');
const User = require('../User')

const Router = express.Router;

const router = Router();

router.get('/', (request, response) => {
    response.render('index', {
        title: 'Project | Home',
        isIndexPage: true
    });
});

router.get('/forms', (request, response) => {
    response.render('index',{
        title: 'Project | Forms',
        isFormPage: true
    });
});

router.post('/form1', async (request, response) => {
    console.log(request.body);
    const user = new User({
        userName: request.body.userName,
        email: request.body.email,
        password: request.body.password
    });
    await user.save();

    /*response.render('index', {
        title: 'Project | Profile',
        isProfilePage: true
    });*/
});


router.get('/profile', (request, response) => {
    response.render('index',{
        title: 'Project | Profile',
        isProfilePage: true
    });
});

module.exports = router;