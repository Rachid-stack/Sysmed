/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMSMenuSchema = new mongoose.Schema({
    id_sousMenu: Number,
    id_menu: Number,
    order_sousMenu: Number,
    code_sousMenu: String,
    libelle_sousMenu: String,
    module_sousMenu: String,
    routerLink_sousMenu: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMSMenuSchema.methods.SMSMenuDto = function(){
    return {
        id: this._id,
        id_sousMenu: this.id_sousMenu,
        id_menu: this.id_menu,
        order_sousMenu: this.order_sousMenu,
        code_sousMenu: this.code_sousMenu,
        libelle_sousMenu: this.libelle_sousMenu,
        module_sousMenu: this.module_sousMenu,
        routerLink_sousMenu: this.routerLink_sousMenu,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMSMenu', SMSMenuSchema);