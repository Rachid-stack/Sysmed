/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMMenuSchema = new mongoose.Schema({
    id_menu: Number,
    order_menu: Number,
    code_menu: String,
    libelle_menu: String,
    routerLink: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMMenuSchema.methods.SMMenuDto = function(){
    return {
        id: this._id,
        id_menu: this.id_menu,
        order_menu: this.order_menu,
        code_menu: this.code_menu,
        libelle_menu: this.libelle_menu,
        routerLink: this.routerLink,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMMenu', SMMenuSchema);