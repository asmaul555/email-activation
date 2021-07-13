const User = require("../models/userModel")
const Otp =require('../models/otp')
const changPasswordController=(req,res)=>{
    const {password,confirmpassword}=req.body
    if(password && confirmpassword===''){
        res.render('response',{msg:'Password cannot be blank'})
    }else if(password!==confirmpassword){
        res.render('response',{msg:'Confirm Password Does\'t match'})
    }else{
        User.findOne({_id:req.body.id})
        .then(user=>{
            if(user){
                user.password=req.body.password
                user.save()
                .then(info=>res.render('response',{msg:'Password Reset Successfull',path:'/login'})                )
                .catch(error=>res.render('response',{msg:'Server error occurred'}))

            }else{
                res.render('response',{msg:'This User not found'})
            }
        })
        .catch(error=>res.render('response',{msg:'Server error occurred'}))
    }

}
module.exports=changPasswordController