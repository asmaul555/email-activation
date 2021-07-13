const mongoose=require('mongoose')

const geoSchema=new mongoose.Schema({
    latitude:String,
    logitude:String
})

const geoModel=mongoose.model('geolocation',geoSchema,'geolocation')
module.exports=geoModel