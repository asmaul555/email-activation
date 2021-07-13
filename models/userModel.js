const mongoose=require('mongoose')


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{type:String,
        unique:true,
        trim:true
    },
    password:{type:String},
    token:{
        type:String,
        required:true
    },
    activation:{
        type:Boolean,
        default:false
    }

})
const User=mongoose.model('User',userSchema)
module.exports=User