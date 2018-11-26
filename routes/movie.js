const express = require('express');
const router = express.Router();

//model
const Movie=require('../models/Movie');

router.get('/',(req,res)=>{
  const promise=Movie.aggregate([
    {
      $lookup:{
        from:'directors',
        localField:'directorID',
        foreignField:'_id',
        as:'returnDirector'
      }
    },
    {
      $unwind:'$returnDirector'
    }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/top10',(req,res,next)=>{
  const promise=Movie.find({ }).sort({imdbScore:-1}).limit(10);

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});

router.get('/between/:start_year/:end_year',(req,res)=>{
  const {start_year,end_year}=req.params;
  const promise=Movie.find(
    {
      year: {
        '$gte':parseInt(start_year),//büyük eşit
        '$lte':parseInt(end_year)//küçük eşit
      }
    }
  );

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});

router.get('/:movie_id',(req,res,next)=>{
  const promise=Movie.findById(req.params.movie_id);

  promise.then((data)=>{
    if(!data){
      next({message:'The movie was not found!!',code:99});
    }
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});

router.put('/:movie_id',(req,res,next)=>{
  const promise=Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});//güncellenen verinin dönmesi için {new:true},
                                                                                  //kullanılmazsa güncellenir ama eski veri döner.Zorunlu değil.
  promise.then((data)=>{
    if(!data){
      next({message:'The movie was not found!!',code:99});
    }
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.delete('/:movie_id',(req,res,next)=>{
  const promise=Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((data)=>{
    if(!data){
      next({message:'This movie was not found!!',code:99});
    }
    res.json({status:true});
  }).catch((err)=>{
    res.json(err);
  });
});


router.post('/', (req, res, next) => {
  //const {title,category,country,year,imdbScore}=req.body;

  const movie=new Movie(req.body);

  //filmi kaydetmek için promise yapısı kullanıldı
  const promise=movie.save();
  promise.then((data)=>{
    res.json(data);  
  }).catch((err)=>{
    res.json(err);
  })
 
});

module.exports = router;
