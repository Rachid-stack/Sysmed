/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMPPrivilege = mongoose.model('SMPPrivilege');

router.route('/').get(function(req, res){
    SMPPrivilege.find({del: 0}, function(err, pprivilege){
        if(err){
            console.log(err);
        }
        res.json(pprivilege);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMPPrivilege.findById(id, function(err, pprivilege){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(pprivilege).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMPPrivilege.find({del: 0, id_profile: id}, function(err, pprivilege){
        if(err){
            console.log(err);
        }
        res.json(pprivilege);
    });
});

router.route('/where/:profile/:privilege').get(function(req, res){
    var profile = req.params.profile;
    var privilege = req.params.privilege;
    SMPPrivilege.find({del: 0, id_profile: profile, id_privilege: privilege}, function(err, pprivilege){
        if(err){
            console.log(err);
        }
        res.json(pprivilege);
    });
});

router.route('/add').post(function(req, res){
    var pprivilege = new SMPPrivilege(req.body);
    pprivilege.del = 0;
    pprivilege.create_by = 0;
    pprivilege.save().then(pprivilege=>{res.json(pprivilege).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMPPrivilege.findById(id, function(err, pprivilege){
        if(!pprivilege){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            pprivilege.id_profile = req.body.id_profile;
            pprivilege.id_privilege = req.body.id_privilege;
            pprivilege.update_by = 0;
            pprivilege.update_date = Date.now();
            pprivilege.save().then(pprivilege=>{res.json(pprivilege).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMPPrivilege.findById(id, function(err, pprivilege){
        if(!pprivilege){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            pprivilege.del = 1;
            pprivilege.update_by = 0;
            pprivilege.update_date = Date.now();
            pprivilege.save().then(pprivilege=>{res.json(pprivilege).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;