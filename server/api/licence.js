/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMLicence = mongoose.model('SMLicence');

router.route('/').get(function(req, res){
    SMLicence.find({del: 0}, function(err, licence){
        if(err){
            console.log(err);
        }
        res.json(licence);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMLicence.findById(id, function(err, licence){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(licence).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMLicence.find({del: 0, type_licence: id}, function(err, licence){
        if(err){
            console.log(err);
        }
        res.json(licence);
    });
});

router.route('/add').post(function(req, res){
    var licence = new SMLicence(req.body);
    licence.del = 0;
    licence.create_by = 0;
    licence.save().then(licence=>{res.json(licence).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMLicence.findById(id, function(err, licence){
        if(!licence){
            return next(new Error('licence introuvable!'));
        }else{
            licence.raison_sociale = req.body.raison_sociale;
            licence.adresse = req.body.adresse;
            licence.telephone = req.body.telephone;
            licence.faxe = req.body.faxe;
            licence.email = req.body.email;
            licence.logo = req.body.logo;
            licence.nbr_user = req.body.nbr_user;
            licence.type_licence = req.body.type_licence;
            licence.start_date = req.body.start_date;
            licence.end_date = req.body.end_date;
            licence.update_by = 0;
            licence.update_date = Date.now();
            licence.save().then(licence=>{res.json(licence).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMLicence.findById(id, function(err, licence){
        if(!licence){
            return next(new Error('licence introuvable!'));
        }else{
            licence.del = 1;
            licence.update_by = 0;
            licence.update_date = Date.now();
            licence.save().then(licence=>{res.json(licence).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;