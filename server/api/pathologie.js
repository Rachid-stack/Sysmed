/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMPathologie = mongoose.model('SMPathologie');

router.route('/').get(function(req, res){
    SMPathologie.find({del: 0}, function(err, pathologie){
        if(err){
            console.log(err);
        }
        res.json(pathologie);
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMPathologie.find({del: 0, id_categorie: id}, function(err, pathologie){
        if(err){
            console.log(err);
        }
        res.json(pathologie);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMPathologie.findById(id, function(err, pathologie){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(pathologie).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var pathologie = new SMPathologie(req.body);
    pathologie.del = 0;
    pathologie.create_by = 0;
    pathologie.save().then(pathologie=>{res.json(pathologie).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMPathologie.findById(id, function(err, pathologie){
        if(!pathologie){
            return next(new Error('pathologie introuvable!'));
        }else{
            pathologie.libelle_pathologie = req.body.libelle_pathologie;
            pathologie.desc_pathologie = req.body.desc_pathologie;
            pathologie.code_pathologie = req.body.code_pathologie;
            pathologie.id_categorie = req.body.id_categorie;
            pathologie.update_by = 0;
            pathologie.update_date = Date.now();
            pathologie.save().then(pathologie=>{res.json(pathologie).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMPathologie.findById(id, function(err, pathologie){
        if(!pathologie){
            return next(new Error('pathologie introuvable!'));
        }else{
            pathologie.del = 1;
            pathologie.update_by = 0;
            pathologie.update_date = Date.now();
            pathologie.save().then(pathologie=>{res.json(pathologie).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;