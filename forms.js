const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('./User');
const session = require('express-session')

class Auntification{

        async Registr(request, response){
            const errors = validationResult(request); 
            if(!errors.isEmpty()){
                return response.redirect('/');
            }
            else{
                const condidate = await User.findOne({email: request.body.email});
                if(!condidate){
                    const passwordHash = bcrypt.hashSync(request.body.password);

                        const addingUser = new User({
                            userName: request.body.userName,
                            email: request.body.email,
                            password: passwordHash, 
                            FlappyScore: '0', 
                            SnakeScore: '0', 
                            SapperScore: '0'
                        });
                        
                        await addingUser.save();
                        return response.redirect('/forms');
                }
                else{
                    console.log('found in database');
                    return response.status(401);
                }
            }
        }
        async logIn(request, response){
            const user = await User.findOne({email: request.body.email});
            if(!user){
                response.status(401).json({message: `${request.body.email} not found in database`});
            }
            else{
                const validPasswd = bcrypt.compareSync(request.body.password, user.password);
                if(validPasswd){
    
                    return {
                        email: user.email,
                        username: user.userName
                    }
                }
            }
        }
        async changePassword(newPassword, email) {

            const update = {
                password: bcrypt.hashSync(newPassword)
            }
    
            await User.findOneAndUpdate({email: email}, update, (error, result) => {
                if(error){
                    response.status(401).json({message: `${email} not found in database`});
                }
                else{
                  console.log(result);
                }
            })
        }
    } 
    
    

module.exports = new Auntification();