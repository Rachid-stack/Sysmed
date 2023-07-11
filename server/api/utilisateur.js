/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMUtilisateur = mongoose.model('SMUtilisateur');

router.route('/').get(function(req, res){
    SMUtilisateur.find({del: 0}, function(err, utilisateur){
        if(err){
            console.log(err);
        }
        res.json(utilisateur);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMUtilisateur.findById(id, function(err, utilisateur){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(utilisateur).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMUtilisateur.find({del: 0, id_personne: id}, function(err, utilisateur){
        if(err){
            console.log(err);
        }
        res.json(utilisateur);
    });
});

router.route('/add').post(function(req, res){
    var utilisateur = new SMUtilisateur(req.body);
    utilisateur.del = 0;
    utilisateur.create_by = 0;
    utilisateur.save().then(utilisateur=>{res.json(utilisateur).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMUtilisateur.findById(id, function(err, utilisateur){
        if(!utilisateur){
            return next(new Error('utilisateur introuvable!'));
        }else{
            utilisateur.id_personne = req.body.id_personne;
            utilisateur.id_profile = req.body.id_profile;
            utilisateur.username = req.body.username;
            if(req.body.password != ''){
                utilisateur.password = req.body.password;
            }
            utilisateur.actif = req.body.actif;
            utilisateur.start_date = req.body.start_date;
            utilisateur.end_date = req.body.end_date;
            utilisateur.update_by = 0;
            utilisateur.update_date = Date.now();
            utilisateur.save().then(utilisateur=>{res.json(utilisateur).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMUtilisateur.findById(id, function(err, utilisateur){
        if(!utilisateur){
            return next(new Error('utilisateur introuvable!'));
        }else{
            utilisateur.del = 1;
            utilisateur.update_by = 0;
            utilisateur.update_date = Date.now();
            utilisateur.save().then(utilisateur=>{res.json(utilisateur).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;