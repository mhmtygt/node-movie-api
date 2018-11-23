const express = require('express');
const router = express.Router();

//model
const Movie=require('../models/Movie');

router.post('/', (req, res, next) => {
  //const {title,category,country,year,imdbScore}=req.body;

  const movie=new Movie(req.body);

  //filmi kaydetmek için promise yapısı kullanıldı
  const promise=movie.save();
  promise.then((data)=>{
    res.json({status:1});  //status:1 kaydedildiğini anlamak için
  }).catch((err)=>{
    res.json(err);
  })
 
});

module.exports = router;
