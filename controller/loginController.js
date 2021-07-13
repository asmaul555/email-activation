const User = require("../models/userModel")
const loginController=(req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
    User.findOne({email})
    .then(user=>{
        if(user){
            if(!user.activation){
               
                res.render('response',{msg:'Please activate your account'})

            }else{
                if(user.password===password){
                    res.render('post')
                }else{
                    res.render('response',{msg:'Incorrect Your Password'})
                }
            }
        }else{
            res.render('response',{msg:'This user is not found !'})
            }
    }).catch(err=> res.render('response',{msg:'Server Error Occurred'}))

}
module.exports=loginController