const User=require('../models/userModel')

const activationController=(req,res)=>{
   const tokenId=req.params.tokenId
   if(tokenId){
       User.findOne({token:tokenId})
       .then(user=>{
           if(user){
              if(user.activation){
                  res.render('response',{msg:'Your account has been activated'})
              }else{
                user.activation=true
                user.save()
                .then(user=>res.render('response',{msg:'Activation Successfull Please Login',path:'/login'}))
                .catch(error=>res.render('response',{msg:'Activation Failed'}))
              }
            }else{
               res.render('response',{msg:'You account did not acctive'})
           }
       })
       .catch(error=>res.render('response',{msg:'Servar Error Occurred'}))
   }
}

module.exports=activationController