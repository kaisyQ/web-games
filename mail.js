const nodemailer = require('nodemailer');
const forms = require('./forms');

const mailname = require('./config').mailname;
const mailpass = require('./config').mailpass;

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: mailname,
        pass: mailpass
    }
});

const generateNewPassword = () => {
    let resultPassword = "";
    let passwordLength = Math.floor(Math.random() * 10e5) % 10;
    if(passwordLength < 8){
        passwordLength += 8;
    }

    for(let i = 0; i < passwordLength; ++i){
        let temp =  Math.floor(Math.random() * 10e3) % 100;

        if(temp % 2 === 0){
            if(String.fromCharCode(temp) == '\n'){
                temp %= 10;
            }
            resultPassword += String.fromCharCode(temp);
        }
        else
            resultPassword += temp.toString();
    }

    return resultPassword;
}

module.exports = (email) => {

    const newPassword = generateNewPassword();

    forms.changePassword(newPassword, email);

    const message = {
        from: `Mailer Test <${mailname}>`,
        to: email,
        subject: 'Восстановление пароля',
        text: `Письмо с восстановлением\nВаш новый пароль : ${newPassword}`
    };


    transporter.sendMail(message, (err, info) => {
        if(err)
            return console.error(err);

        console.log('Email send:', info);
    });
};