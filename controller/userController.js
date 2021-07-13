const User=require('../models/userModel')
const nodemailer=require('nodemailer')
const userController=(req,res)=>{
    const {username,email,password}=req.body

    if(username!=="" && email!=="" && password!==""){
        User.findOne({email})
        .then(user=>{
            if(user){
                res.render('response',{msg:'This user already have an account'})
            }else{
                const token=Math.floor(Math.random()*13)+"sddfuiuydf"+Math.floor(Math.random()*100000)+"skfjn8t7fa"+35*345
                user=new User({
                    username,
                    email,
                    password,
                    token
                })
                user.save()
                .then(newuser=>{
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
                        subject:'Account Activation',
                        html:`<p>Please click the link and active your account Thanks</p><a href="http://${req.headers.host}/activation/${token}">fbskffASsdFaARggAlkjh${token}</a>`
                    }
                    transpoter.sendMail(mailOption,(err,info)=>{
                        if(err) res.render('response',{msg:'Email cannot be sent for some error please try again. Thanks'})
                        if(info){
                            res.render('response',{msg:`User Created Successfull please check your email and active your account. Thanks ${email}`})
                        }else{
                            res.render('response',{msg:''})
                        }
                    })
                })
                .catch(err=> res.render('response',{msg:'Unknown Server Error Occurred'}))
            }
        }).catch(err=> res.render('response',{msg:'Server Error Occurred'}))
    }else{
        res.render('response',{msg:'All fields are required'})
    } 


}
module.exports=userController