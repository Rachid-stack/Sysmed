/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMPersonneSchema = new mongoose.Schema({
    nom_pers: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    prenom_pers: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    date_naiss_pers: Date,
    lieu_naiss_pers: String,
    sexe: String,
    photo: String,
    adresse: String,
    email: String,
    telephone_fixe: String,
    telephone_portable: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMPersonneSchema.methods.SMPersonneDto = function(){
    return {
        id: this._id,
        nom_pers: this.nom_pers,
        prenom_pers: this.prenom_pers,
        date_naiss_pers: this.date_naiss_pers,
        lieu_naiss_pers: this.lieu_naiss_pers,
        sexe: this.sexe,
        photo: this.photo,
        adresse: this.adresse,
        email: this.email,
        telephone_fixe: this.telephone_fixe,
        telephone_portable: this.telephone_portable,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMPersonne', SMPersonneSchema);