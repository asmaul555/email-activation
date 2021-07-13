const express=require('express')
const app=express()
const bodyParser=require('body-parser')
require('dotenv').config()
const mongoose=require('mongoose')
const userController = require('./controller/userController')
const loginController = require('./controller/loginController')
const sendEmailController = require('./controller/sendEmailController')
const otpController = require('./controller/otpController')
const changePasswordController=require('./controller/chagePasswordController')
const activationController = require('./controller/activationController')
app.use(bodyParser({extends:true}))
app.use(express.json())
app.use(require('morgan')('dev'))
app.use(require('cors')())
app.set('view engine','ejs')


app.post('/api/user/signup',userController)
app.post('/api/user/login',loginController)
app.post('/api/user/check-email',sendEmailController)
app.post('/api/user/confirm-otp',otpController)
app.post('/api/user/change-password',changePasswordController)
app.get('/activation/:tokenId',activationController)


app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/forgetpassword',(req,res)=>{
    res.render('checkEmailAndSendOtp')
})







app.get('/get-location',(req,res)=>{
    res.render('geolocation')
})
app.post('/location',(req,res)=>{
    console.log(req.body)
})
const mongooseConnection=()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(info=>console.log('Database connection successfull'))
    .catch(err=>console.log('Database connection Error'))
}

app.listen(process.env.PORT,()=>{
    console.log('server is runnig on port',process.env.PORT)
    mongooseConnection()
})