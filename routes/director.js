const mongoose=require('mongoose'); //mongoose.Types.ObjectId metodu için ($match işleminde)

const express = require('express');
const router = express.Router();

const Director=require('../models/Director');

router.post('/', (req, res, next) => {
  const director=new Director(req.body);
  const promise=director.save();

  promise.then((data)=>{
      res.json(data);
  }).catch((err)=>{
      res.json(err);
  })
});

router.get('/',(req,res)=>{
    const promise=Director.aggregate([
        {   
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'directorID',
                as:'returnMovie'

            }
        },
        {
            $unwind:{
                path:'$returnMovie',
                preserveNullAndEmptyArrays:true //filmi olmayan yönetmenlerinde listelenmesi için
            }
        },
        {
            $group:{ //yönetmenle filmlerini gruplamak için
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$returnMovie'
                }
            }
        },
        {
            $project:{ //listenin düzenli gelmesi için
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movie:'$movies'

            }
        }
    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});
router.get('/:directorId',(req,res)=>{
    const promise=Director.aggregate([
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.directorId)
            }
        },
        {   
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'directorID',
                as:'returnMovie'

            }
        },
        {
            $unwind:{
                path:'$returnMovie',
                preserveNullAndEmptyArrays:true //filmi olmayan yönetmenlerinde listelenmesi için
            }
        },
        {
            $group:{ //yönetmenle filmlerini gruplamak için
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$returnMovie'
                }
            }
        },
        {
            $project:{ //listenin düzenli gelmesi için
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movie:'$movies'

            }
        }
    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});

router.put('/:directorId',(req,res,next)=>{
    const promise=Director.findByIdAndUpdate(
        req.params.directorId,
        req.body,
        {
            new:true  //güncellenen verinin dönmesi için {new:true},kullanılmazsa güncellenir ama eski veri döner.Zorunlu değil.
        }
        );
                                                                                    
    promise.then((data)=>{
      if(!data){
        next({message:'The director was not found!!',code:99});
      }
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
});

  router.delete('/:directorId',(req,res,next)=>{
    const promise=Director.findByIdAndRemove(req.params.directorId);
  
    promise.then((data)=>{
      if(!data){
        next({message:'This director was not found!!',code:99});
      }
      res.json({status:true});
    }).catch((err)=>{
      res.json(err);
    });
});

module.exports = router;
