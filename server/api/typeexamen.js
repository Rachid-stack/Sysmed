/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMTExamen = mongoose.model('SMTExamen');

router.route('/').get(function(req, res){
    SMTExamen.find({del: 0}, function(err, texamen){
        if(err){
            console.log(err);
        }
        res.json(texamen);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMTExamen.findById(id, function(err, texamen){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(texamen).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var texamen = new SMTExamen(req.body);
    texamen.del = 0;
    texamen.create_by = 0;
    texamen.save().then(texamen=>{res.json(texamen).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMTExamen.findById(id, function(err, texamen){
        if(!texamen){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            texamen.libelle_texamen = req.body.libelle_texamen;
            texamen.desc_texamen = req.body.desc_texamen;
            texamen.id_telement = req.body.id_telement;
            texamen.code_texamen = req.body.code_texamen;
            texamen.update_by = 0;
            texamen.update_date = Date.now();
            texamen.save().then(texamen=>{res.json(texamen).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMTExamen.findById(id, function(err, texamen){
        if(!texamen){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            texamen.del = 1;
            texamen.update_by = 0;
            texamen.update_date = Date.now();
            texamen.save().then(texamen=>{res.json(texamen).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;