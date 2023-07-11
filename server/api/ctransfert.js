/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMCTransfert = mongoose.model('SMCTransfert');

router.route('/').get(function(req, res){
    SMCTransfert.find({del: 0}, function(err, ctransfert){
        if(err){
            console.log(err);
        }
        res.json(ctransfert);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMCTransfert.findById(id, function(err, ctransfert){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(ctransfert).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMCTransfert.find({del: 0, id_medecin: id}, function(err, ctransfert){
        if(err){
            console.log(err);
        }
        res.json(ctransfert);
    });
});

router.route('/byconsultation/:id_consultation').get(function(req, res){
    /*var id = req.params.id_consultation;*/
    SMCTransfert.find({del: 0, id_consultation: req.params.id_consultation}, function(err, ctransfert){
        if(err){
            console.log(err);
        }
        res.json(ctransfert);
    });
});

router.route('/actif/:id_consultation').get(function(req, res){
    /*var id = req.params.id_consultation;*/
    SMCTransfert.find({del: 0, actif: 1, id_consultation: req.params.id_consultation}, function(err, ctransfert){
        if(err){
            console.log(err);
        }
        res.json(ctransfert);
    });
});

router.route('/where/:id_medecin/:id_consultation').get(function(req, res){
    var id_consultation = req.params.id_consultation;
    var id_medecin = req.params.id_medecin;
    SMCTransfert.find({del: 0, id_medecin: id_medecin, id_consultation: id_consultation}, function(err, ctransfert){
        if(err){
            console.log(err);
        }
        res.json(ctransfert);
    });
});

router.route('/add').post(function(req, res){
    var ctransfert = new SMCTransfert(req.body);
    ctransfert.del = 0;
    ctransfert.actif = 1;
    ctransfert.create_by = 0;
    ctransfert.save().then(ctransfert=>{res.json(ctransfert).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMCTransfert.findById(id, function(err, ctransfert){
        if(!ctransfert){
            return next(new Error('Transfert de consultation introuvable!'));
        }else{
            ctransfert.id_consultation = req.body.id_consultation;
            ctransfert.id_medecin = req.body.id_medecin;
            ctransfert.date_transfert = req.body.date_transfert;
            ctransfert.note = req.body.note;
            ctransfert.actif = req.body.actif;
            ctransfert.update_by = 0;
            ctransfert.update_date = Date.now();
            ctransfert.save().then(ctransfert=>{res.json(ctransfert).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMCTransfert.findById(id, function(err, ctransfert){
        if(!ctransfert){
            return next(new Error('Transfert de consultation introuvable!'));
        }else{
            ctransfert.del = 1;
            ctransfert.update_by = 0;
            ctransfert.update_date = Date.now();
            ctransfert.save().then(ctransfert=>{res.json(ctransfert).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;