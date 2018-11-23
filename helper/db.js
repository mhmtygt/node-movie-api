const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://movie_user:123abc@ds113454.mlab.com:13454/movie-api',{useNewUrlParser:true});
    mongoose.connection.on('open',()=>{
        console.log('Bağlantı başarılı');
    });
    mongoose.connection.on('error',(err)=>{
        console.log('Bağlantı başarısız: ',err);
    });
//promiseyapısını kullanmak için mongoose.save() için
    mongoose.Promise=global.Promise;
};