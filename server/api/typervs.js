/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMTRvs = mongoose.model('SMTRvs');

router.route('/').get(function(req, res){
    SMTRvs.find({del: 0}, function(err, trvs){
        if(err){
            console.log(err);
        }
        res.json(trvs);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMTRvs.findById(id, function(err, trvs){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(trvs).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var trvs = new SMTRvs(req.body);
    trvs.del = 0;
    trvs.create_by = 0;
    trvs.save().then(trvs=>{res.json(trvs).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMTRvs.findById(id, function(err, trvs){
        if(!trvs){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            trvs.libelle_trvs = req.body.libelle_trvs;
            trvs.desc_trvs = req.body.desc_trvs;
            trvs.code_trvs = req.body.code_trvs;
            trvs.update_by = 0;
            trvs.update_date = Date.now();
            trvs.save().then(trvs=>{res.json(trvs).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMTRvs.findById(id, function(err, trvs){
        if(!trvs){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            trvs.del = 1;
            trvs.update_by = 0;
            trvs.update_date = Date.now();
            trvs.save().then(trvs=>{res.json(trvs).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;