const Otp=require('../models/otp')

const otpController=(req,res)=>{
    if(req.body.otp){
        Otp.findOne({otp:req.body.otp})
        .then(otp=>{
            if(otp){
                res.render('changepassword',{id:otp._userId})
            }else{
                res.render('response',{msg:'Your otp does\'t match'})
            }
        })
        .catch(err=>res.render('response',{msg:'Server Error Occurred'})
        )

    }

}
module.exports=otpController