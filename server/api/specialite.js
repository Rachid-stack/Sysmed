/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMSpecialite = mongoose.model('SMSpecialite');

router.route('/').get(function(req, res){
    SMSpecialite.find({del: 0}, function(err, specialite){
        if(err){
            console.log(err);
        }
        res.json(specialite);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMSpecialite.findById(id, function(err, specialite){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(specialite).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var specialite = new SMSpecialite(req.body);
    specialite.del = 0;
    specialite.create_by = 0;
    specialite.save().then(specialite=>{res.json(specialite).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMSpecialite.findById(id, function(err, specialite){
        if(!specialite){
            return next(new Error('specialite introuvable!'));
        }else{
            specialite.libelle_spe = req.body.libelle_spe;
            specialite.code_spe = req.body.code_spe;
            specialite.desc_spe = req.body.desc_spe;
            specialite.update_by = 0;
            specialite.update_date = Date.now();
            specialite.save().then(specialite=>{res.json(specialite).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMSpecialite.findById(id, function(err, specialite){
        if(!specialite){
            return next(new Error('specialite introuvable!'));
        }else{
            specialite.del = 1;
            specialite.update_by = 0;
            specialite.update_date = Date.now();
            specialite.save().then(specialite=>{res.json(specialite).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;