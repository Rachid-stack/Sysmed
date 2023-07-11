/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMEquipement = mongoose.model('SMEquipement');

router.route('/').get(function(req, res){
    SMEquipement.find({del: 0}, function(err, equipement){
        if(err){
            console.log(err);
        }
        res.json(equipement);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMEquipement.findById(id, function(err, equipement){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(equipement).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMEquipement.find({del: 0, id_service: id}, function(err, equipement){
        if(err){
            console.log(err);
        }
        res.json(equipement);
    });
});

router.route('/add').post(function(req, res){
    var equipement = new SMEquipement(req.body);
    equipement.del = 0;
    equipement.create_by = 0;
    equipement.save().then(equipement=>{res.json(equipement).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMEquipement.findById(id, function(err, equipement){
        if(!equipement){
            return next(new Error('equipement introuvable!'));
        }else{
            equipement.libelle_equipement = req.body.libelle_equipement;
            equipement.code_equipement = req.body.code_equipement;
            equipement.class_equipement = req.body.class_equipement;
            equipement.update_by = 0;
            equipement.update_date = Date.now();
            equipement.save().then(equipement=>{res.json(equipement).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMEquipement.findById(id, function(err, equipement){
        if(!equipement){
            return next(new Error('equipement introuvable!'));
        }else{
            equipement.del = 1;
            equipement.update_by = 0;
            equipement.update_date = Date.now();
            equipement.save().then(equipement=>{res.json(equipement).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;