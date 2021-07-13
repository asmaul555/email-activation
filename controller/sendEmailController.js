const Otp = require("../models/otp")
const User = require("../models/userModel")
const nodemailer=require('nodemailer')
const sendEmailController=(req,res)=>{
    const {email}=req.body
    if(!email) return res.render('response',{msg:'Email cannot be blanck'})
    User.findOne({email})
    .then(user=>{
        if(user){
            const createOtp=Math.floor(Math.random()*1000000+1)
           Otp.findOne({_userId:user._id})
           .then(otpId=>{
               if(otpId){
                   Otp.deleteOne({_id:otpId._id})
                   .then(delet=>{
                       if(delet){
                        const otp=new Otp({
                            otp:createOtp,
                            _userId:user._id
                        })
                        otp.save()
                        .then(newotp=>{
                           const transpoter=nodemailer.createTransport({
                               host:'smtp.gmail.com',
                               secure:false,
                               port:587,
                               requireTLS:true,
                               auth:{
                                   user:process.env.USER_EMAIL,
                                   pass:process.env.USER_PASSWORD
                               }
                           })
                           const mailOption={
                               from:process.env.USER_EMAIL,
                               to:email,
                               subject:'Password Reset',
                               html:`<p>You request for the reset your account password</p><h3>Your OTP:${createOtp }</h3>`
                           }
                           transpoter.sendMail(mailOption,(err,info)=>{
                               if(err) res.render('response',{msg:'Otp cannot be sent please try again'})
                               if(info){
                                   res.render('confirmOtp',{msg:`Otp has been sent please check your email ${email}`,id:newotp._id})
                               }
                           })
                        })
                        .catch(err=>{
                            res.render('response',{msg:'Unkwon server error occured'})
                        })
                       }else{
                           res.render('response',{msg:'Unknown Error'})
                       }
                   })
                   .catch(error=>res.render('response',{msg:'Server Error Occurred'}))
               }else{
                const otp=new Otp({
                    otp:createOtp,
                    _userId:user._id
                })
                otp.save()
                .then(newotp=>{
                   const transpoter=nodemailer.createTransport({
                       host:'smtp.gmail.com',
                       secure:false,
                       port:587,
                       requireTLS:true,
                       auth:{
                           user:process.env.USER_EMAIL,
                           pass:process.env.USER_PASSWORD
                       }
                   })
                   const mailOption={
                       from:process.env.USER_EMAIL,
                       to:email,
                       subject:'Password Reset',
                       html:`<p>You request for the reset your account password</p><h3>Your OTP:${createOtp }</h3>`
                   }
                   transpoter.sendMail(mailOption,(err,info)=>{
                       if(err) res.render('response',{msg:'Otp cannot be sent please try again'})
                       if(info){
                           res.render('confirmOtp',{msg:`Otp has been sent please check your email ${email}`,id:newotp._id})
                       }
                   })
                })
                .catch(err=>{
                    res.render('response',{msg:'Unkwon server error occured'})
                })
               }
           })
           .catch(error=>res.render('response',{msg:'Server Error Occurred'}))

        }else{
            res.render('response',{msg:`${email} this user not found`})
        }
    })
    .catch(error=>res.render('response',{msg:'server error occured'}))
}
module.exports=sendEmailController