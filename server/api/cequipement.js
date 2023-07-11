/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMCEquipement = mongoose.model('SMCEquipement');

router.route('/').get(function(req, res){
    SMCEquipement.find({del: 0}, function(err, cequipement){
        if(err){
            console.log(err);
        }
        res.json(cequipement);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMCEquipement.findById(id, function(err, cequipement){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(cequipement).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMCEquipement.find({del: 0, id_chambre: id}, function(err, cequipement){
        if(err){
            console.log(err);
        }
        res.json(cequipement);
    });
});

router.route('/where/:chambre/:equipement').get(function(req, res){
    var chambre = req.params.chambre;
    var equipement = req.params.equipement;
    SMCEquipement.find({del: 0, id_chambre: chambre, id_equipement: equipement}, function(err, cequipement){
        if(err){
            console.log(err);
        }
        res.json(cequipement);
    });
});

router.route('/add').post(function(req, res){
    var cequipement = new SMCEquipement(req.body);
    cequipement.del = 0;
    cequipement.create_by = 0;
    cequipement.save().then(cequipement=>{res.json(cequipement).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMCEquipement.findById(id, function(err, cequipement){
        if(!cequipement){
            return next(new Error('Equipement introuvable!'));
        }else{
            cequipement.id_chambre = req.body.id_chambre;
            cequipement.id_equipement = req.body.id_equipement;
            cequipement.update_by = 0;
            cequipement.update_date = Date.now();
            cequipement.save().then(cequipement=>{res.json(cequipement).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMCEquipement.findById(id, function(err, cequipement){
        if(!cequipement){
            return next(new Error('Equipement introuvable!'));
        }else{
            cequipement.del = 1;
            cequipement.update_by = 0;
            cequipement.update_date = Date.now();
            cequipement.save().then(cequipement=>{res.json(cequipement).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;