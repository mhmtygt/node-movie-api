const express = require('express');
const router = express.Router();

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password }=req.body;
  
  bcrypt.hash(password, 10).then((hash)=> {
    const user=new User({
      username:username,
      password:hash
    }); 
  
    const promise=user.save();
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    })
  });
  
});

router.post('/authenticate',(req,res)=>{
  const {username,password}=req.body;

  User.findOne({
    username:username
  },(err,data)=>{
    if(err){//sorguda hata varsa 
      throw err;
    }
    if(!data){//kullanıcı yoksa
      res.json({
        status:false,
        message:'Authentication failed, user was not found'
      });
    }else{//kullanıcı varsa şifreyi karşılaştır
      bcrypt.compare(password,data.password).then((result)=>{
        if(!result){//şifre yanlışsa
          res.json({
            status:false,
            message:'Authentication failed, wrong password '
          });
        }else{//şifre doğruysa token oluştur
          const payload={
            username:username
          }
          const token=jwt.sign(payload,req.app.get('api_secret_key'),{expiresIn:720 }); //üçüncü parametre token'a geçerlilik süre verir.720=12 saat
          
          res.json({
            status:true,
            token:token
          });
        }
      });
    }
  });
});

module.exports = router;