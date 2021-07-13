const mongoose  = require("mongoose");

const otpSchema=new mongoose.Schema({
    otp:{type:String,required:true},
    _userId:{type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const Otp=mongoose.model('otp',otpSchema, 'otp')
module.exports=Otp