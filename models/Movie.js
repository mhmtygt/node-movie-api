const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const movieSchema=new Schema({
    directorID:Schema.Types.ObjectId,
    title:{
        type:String,
        required:true,
        maxlength:[15,'{PATH} alanı {MAXLENGTH} karakterden az olmalı'],
        minlength:[3,'{PATH} alanı {MINLENGTH} karakterden fazla olmalı']
    },
    category:{
        type:String,
        maxlength:15,
        minlength:3
    },
    category:{
        type:String,
        maxlength:15,
        minlength:3
    },
    country:{
        type:String,
        maxlength:30,
        minlength:2
    },
    year:{
        type:Number,
        max:2018,
        min:1850
    },
    imdbScore:{
        type:Number,
        max:10,
        min:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('movie',movieSchema);