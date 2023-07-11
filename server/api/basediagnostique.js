/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMBDiagnostique = mongoose.model('SMBDiagnostique');

router.route('/').get(function(req, res){
    SMBDiagnostique.find({del: 0}, function(err, diagnostique){
        if(err){
            console.log(err);
        }
        res.json(diagnostique);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMBDiagnostique.findById(id, function(err, diagnostique){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(diagnostique).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var diagnostique = new SMBDiagnostique(req.body);
    diagnostique.del = 0;
    diagnostique.create_by = 0;
    diagnostique.save().then(diagnostique=>{res.json(diagnostique).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMBDiagnostique.findById(id, function(err, diagnostique){
        if(!diagnostique){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            diagnostique.code_diagnostique = req.body.code_diagnostique;
            diagnostique.libelle_diagnostique = req.body.libelle_diagnostique;
            diagnostique.desc_diagnostique = req.body.desc_diagnostique;
            diagnostique.update_by = 0;
            diagnostique.update_date = Date.now();
            diagnostique.save().then(diagnostique=>{res.json(diagnostique).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMBDiagnostique.findById(id, function(err, diagnostique){
        if(!diagnostique){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            diagnostique.del = 1;
            diagnostique.update_by = 0;
            diagnostique.update_date = Date.now();
            diagnostique.save().then(diagnostique=>{res.json(diagnostique).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;