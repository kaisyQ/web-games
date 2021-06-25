const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const Routes = require('./routes/routes');
const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');
const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(cookieSession({
    name: 'new-session',
    keys: ['key1', 'key2']
  }))

app.use(passport.initialize())
app.use(passport.session())

app.use(Routes);
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());

async function startServer(){
    try{
        await mongoose.connect("mongodb://localhost:27017/usersdb", { 
            useUnifiedTopology: true,
            useNewUrlParser: true 
        });

        app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));

    }
    catch(err){
        console.error(err);
    }
};

startServer().then(res => console.log('Successfully'));
