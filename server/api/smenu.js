/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMSMenu = mongoose.model('SMSMenu');

router.route('/').get(function(req, res){
    SMSMenu.find({del: 0}, function(err, smenu){
        if(err){
            console.log(err);
        }
        res.json(smenu);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMSMenu.findById(id, function(err, smenu){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(smenu).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMSMenu.find({del: 0, id_menu: id}, function(err, smenu){
        if(err){
            console.log(err);
        }
        res.json(smenu);
    });
});

router.route('/add').post(function(req, res){
    var smenu = new SMSMenu(req.body);
    smenu.del = 0;
    smenu.create_by = 0;
    smenu.save().then(smenu=>{res.json(smenu).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMSMenu.findById(id, function(err, smenu){
        if(!smenu){
            return next(new Error('smenu introuvable!'));
        }else{
            smenu.id_sousMenu = req.body.id_sousMenu;
            smenu.id_menu = req.body.id_menu;
            smenu.order_sousMenu = req.body.order_sousMenu;
            smenu.code_sousMenu = req.body.code_sousMenu;
            smenu.libelle_sousMenu = req.body.libelle_sousMenu;
            smenu.module_sousMenu = req.body.module_sousMenu;
            smenu.routerLink_sousMenu = req.body.routerLink_sousMenu;
            smenu.update_by = 0;
            smenu.update_date = Date.now();
            smenu.save().then(smenu=>{res.json(smenu).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMSMenu.findById(id, function(err, smenu){
        if(!smenu){
            return next(new Error('smenu introuvable!'));
        }else{
            smenu.del = 1;
            smenu.update_by = 0;
            smenu.update_date = Date.now();
            smenu.save().then(smenu=>{res.json(smenu).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;