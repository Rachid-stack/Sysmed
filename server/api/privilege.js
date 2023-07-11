/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMPrivilege = mongoose.model('SMPrivilege');

router.route('/').get(function(req, res){
    SMPrivilege.find({del: 0}, function(err, privilege){
        if(err){
            console.log(err);
        }
        res.json(privilege);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMPrivilege.findById(id, function(err, privilege){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(privilege).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var privilege = new SMPrivilege(req.body);
    privilege.del = 0;
    privilege.create_by = 0;
    privilege.save().then(privilege=>{res.json(privilege).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMPrivilege.findById(id, function(err, privilege){
        if(!privilege){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            privilege.code_privilege = req.body.code_privilege;
            privilege.libelle_privilege = req.body.libelle_privilege;
            privilege.desc_privilege = req.body.desc_privilege;
            privilege.update_by = 0;
            privilege.update_date = Date.now();
            privilege.save().then(privilege=>{res.json(privilege).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMPrivilege.findById(id, function(err, privilege){
        if(!privilege){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            privilege.del = 1;
            privilege.update_by = 0;
            privilege.update_date = Date.now();
            privilege.save().then(privilege=>{res.json(privilege).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;