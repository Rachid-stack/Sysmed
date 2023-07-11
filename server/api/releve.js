/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMReleve = mongoose.model('SMReleve');

router.route('/').get(function(req, res){
    SMReleve.find({del: 0}, function(err, releve){
        if(err){
            console.log(err);
        }
        res.json(releve);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMReleve.findById(id, function(err, releve){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(releve).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMReleve.find({del: 0, id_consultation: id}, function(err, releve){
        if(err){
            console.log(err);
        }
        res.json(releve);
    });
});

router.route('/where/:consultation/:tconstante').get(function(req, res){
    var consultation = req.params.consultation;
    var tconstante = req.params.tconstante;
    SMReleve.find({del: 0, id_consultation: consultation, id_tconstante: tconstante}, function(err, releve){
        if(err){
            console.log(err);
        }
        res.json(releve);
    });
});

router.route('/add').post(function(req, res){
    var releve = new SMReleve(req.body);
    releve.del = 0;
    releve.create_by = '0';
    releve.save().then(releve=>{res.json(releve).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMReleve.findById(id, function(err, releve){
        if(!releve){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            releve.id_consultation = req.body.id_consultation;
            releve.id_tconstante = req.body.id_tconstante;
            releve.valeur = req.body.valeur;
            releve.update_by = '0';
            releve.update_date = Date.now();
            releve.save().then(releve=>{res.json(releve).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMReleve.findById(id, function(err, releve){
        if(!releve){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            releve.del = 1;
            releve.update_by = 0;
            releve.update_date = Date.now();
            releve.save().then(releve=>{res.json(releve).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;