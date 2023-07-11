/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMLicenceSchema = new mongoose.Schema({
    raison_sociale: { type: String, required: [true, "Le champs raison sociale est obligatoire !"], index: true},
    adresse: String,
    telephone: String,
    faxe: String,
    email: String,
    logo: String,
    nbr_user: Number,
    type_licence: String,
    start_date: Date,
    end_date: Date,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMLicenceSchema.methods.SMLicenceDto = function(){
    return {
        id: this._id,
        raison_sociale: this.raison_sociale,
        adresse: this.adresse,
        telephone: this.telephone,
        faxe: this.faxe,
        email: this.email,
        logo: this.logo,
        nbr_user: this.nbr_user,
        type_licence: this.type_licence,
        start_date: this.start_date,
        end_date: this.end_date,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMLicence', SMLicenceSchema);