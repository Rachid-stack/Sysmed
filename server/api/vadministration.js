/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMVAdministration = mongoose.model('SMVAdministration');

router.route('/').get(function(req, res){
    SMVAdministration.find({del: 0}, function(err, vadministration){
        if(err){
            console.log(err);
        }
        res.json(vadministration);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMVAdministration.findById(id, function(err, vadministration){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(vadministration).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMVAdministration.find({del: 0, id_service: id}, function(err, vadministration){
        if(err){
            console.log(err);
        }
        res.json(vadministration);
    });
});

router.route('/add').post(function(req, res){
    var vadministration = new SMVAdministration(req.body);
    vadministration.del = 0;
    vadministration.create_by = 0;
    vadministration.save().then(vadministration=>{res.json(vadministration).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMVAdministration.findById(id, function(err, vadministration){
        if(!vadministration){
            return next(new Error('Forme pharmaceutique introuvable!'));
        }else{
            vadministration.libelle_voie_admin = req.body.libelle_voie_admin;
            vadministration.code_voie_admin = req.body.code_voie_admin;
            vadministration.class_voie_admin = req.body.class_voie_admin;
            vadministration.update_by = 0;
            vadministration.update_date = Date.now();
            vadministration.save().then(vadministration=>{res.json(vadministration).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMVAdministration.findById(id, function(err, vadministration){
        if(!vadministration){
            return next(new Error('forme pharmaceutique introuvable!'));
        }else{
            vadministration.del = 1;
            vadministration.update_by = 0;
            vadministration.update_date = Date.now();
            vadministration.save().then(vadministration=>{res.json(vadministration).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;