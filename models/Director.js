const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const DirectorSchema=new Schema({
    name:{
        type:String,
        required:true,
        maxlength:30,
        minlength:1
    },
    surname:{
        type:String,
        required:true,
        maxlength:20,
        minlength:1
    },
    bio:{
        type:String,
        required:true,
        maxlength:300,
        minlength:10
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('director',DirectorSchema);