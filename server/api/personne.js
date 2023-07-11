/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMPersonne = mongoose.model('SMPersonne');

router.route('/').get(function(req, res){
    SMPersonne.find({del: 0}, function(err, personne){
        if(err){
            console.log(err);
        }
        res.json(personne);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMPersonne.findById(id, function(err, personne){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(personne).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMPersonne.find({del: 0, id_service: id}, function(err, personne){
        if(err){
            console.log(err);
        }
        res.json(personne);
    });
});

router.route('/add').post(function(req, res){
    var personne = new SMPersonne(req.body);
    personne.del = 0;
    personne.create_by = 0;
    personne.save().then(personne=>{res.json(personne).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMPersonne.findById(id, function(err, personne){
        if(!personne){
            return next(new Error('personne introuvable!'));
        }else{
            personne.nom_pers = req.body.nom_pers;
            personne.prenom_pers = req.body.prenom_pers;
            personne.date_naiss_pers = req.body.date_naiss_pers;
            personne.lieu_naiss_pers = req.body.lieu_naiss_pers;
            personne.sexe = req.body.sexe;
            personne.photo = req.body.photo;
            personne.adresse = req.body.adresse;
            personne.email = req.body.email;
            personne.telephone_fixe = req.body.telephone_fixe;
            personne.telephone_portable = req.body.telephone_portable;
            personne.update_by = 0;
            personne.update_date = Date.now();
            personne.save().then(personne=>{res.json(personne).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMPersonne.findById(id, function(err, personne){
        if(!personne){
            return next(new Error('personne introuvable!'));
        }else{
            personne.del = 1;
            personne.update_by = 0;
            personne.update_date = Date.now();
            personne.save().then(personne=>{res.json(personne).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;