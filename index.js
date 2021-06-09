const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



async function startServer(){
    try{
        await mongoose.connect("mongodb://localhost:27017/usersdb", { 
            useUnifiedTopology: true,
            useNewUrlParser: true 
        });

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}...`);
        });
        

    }
    catch(err){
        console.error(err);
    }
};

startServer().then(res => console.log('Successfully'));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/pages/dist/index.html');  
});

app.post('/', (request, response) => {
    console.log(request.body);
});

app.get('/forms.html', (request, response) => {
    response.sendFile(__dirname + '/pages/dist/forms.html');
});

app.post('/forms.html'  , (request, response) => {
    console.log(request.body);
});

app.get('/profile.html', (request, response) => {
    response.sendFile(__dirname + '/pages/dist/profile.html');
});
