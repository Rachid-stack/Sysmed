/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMUPrivilege = mongoose.model('SMUPrivilege');

router.route('/').get(function(req, res){
    SMUPrivilege.find({del: 0}, function(err, uprivilege){
        if(err){
            console.log(err);
        }
        res.json(uprivilege);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMUPrivilege.findById(id, function(err, uprivilege){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(uprivilege).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMUPrivilege.find({del: 0, id_utilisateur: id}, function(err, uprivilege){
        if(err){
            console.log(err);
        }
        res.json(uprivilege);
    });
});

router.route('/where/:utilisateur/:privilege').get(function(req, res){
    var utilisateur = req.params.utilisateur;
    var privilege = req.params.privilege;
    SMUPrivilege.find({del: 0, id_utilisateur: utilisateur, id_privilege: privilege}, function(err, uprivilege){
        if(err){
            console.log(err);
        }
        res.json(uprivilege);
    });
});

router.route('/add').post(function(req, res){
    var uprivilege = new SMUPrivilege(req.body);
    uprivilege.del = 0;
    uprivilege.create_by = 0;
    uprivilege.save().then(uprivilege=>{res.json(uprivilege).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMUPrivilege.findById(id, function(err, uprivilege){
        if(!uprivilege){
            return next(new Error('privilège introuvable!'));
        }else{
            uprivilege.id_utilisateur = req.body.id_utilisateur;
            uprivilege.id_privilege = req.body.id_privilege;
            uprivilege.update_by = 0;
            uprivilege.update_date = Date.now();
            uprivilege.save().then(uprivilege=>{res.json(uprivilege).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMUPrivilege.findById(id, function(err, uprivilege){
        if(!uprivilege){
            return next(new Error('privilège introuvable!'));
        }else{
            uprivilege.del = 1;
            uprivilege.update_by = 0;
            uprivilege.update_date = Date.now();
            uprivilege.save().then(uprivilege=>{res.json(uprivilege).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;