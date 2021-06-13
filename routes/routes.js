const express = require('express');
const { body, validationResult } = require('express-validator');
const Router = express.Router;
const Auntification = require('../auntification');

const router = Router();

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

router.post('/form1', body('email').isEmail(), body('password').isLength({min: 8}), (request, response) => Auntification.checkIn(request, response));

router.post('/form2', async(request, response) => Auntification.entryUser(request, response));

router.get('/profile', (request, response) => {
    response.render('layouts/main',{
        title: 'Project | Profile',
        isProfilePage: true
    });
    console.log(token)
});

module.exports = router;