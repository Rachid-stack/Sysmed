/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMMenu = mongoose.model('SMMenu');

router.route('/').get(function(req, res){
    SMMenu.find({del: 0}, function(err, menu){
        if(err){
            console.log(err);
        }
        res.json(menu);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMMenu.findById(id, function(err, menu){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(menu).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var menu = new SMMenu(req.body);
    menu.del = 0;
    menu.create_by = 0;
    menu.save().then(menu=>{res.json(menu).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMMenu.findById(id, function(err, menu){
        if(!menu){
            return next(new Error('menu introuvable!'));
        }else{
            menu.id_menu = req.body.id_menu;
            menu.order_menu = req.body.order_menu;
            menu.code_menu = req.body.code_menu;
            menu.libelle_menu = req.body.libelle_menu;
            menu.routerLink = req.body.routerLink;
            menu.update_by = 0;
            menu.update_date = Date.now();
            menu.save().then(menu=>{res.json(menu).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMMenu.findById(id, function(err, menu){
        if(!menu){
            return next(new Error('menu introuvable!'));
        }else{
            menu.del = 1;
            menu.update_by = 0;
            menu.update_date = Date.now();
            menu.save().then(menu=>{res.json(menu).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;