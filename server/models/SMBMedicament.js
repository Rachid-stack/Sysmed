/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMBMedicamentSchema = new mongoose.Schema({
    id_bmedicament: Number,
    code_med: String,
    nom_comercial: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    nom_generique: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    dosage_med: String,
    is_generic: Boolean,
    prix_moyen: Number,
    form_pharma: String,
    labo_pharma: String,
    voie_admin: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMBMedicamentSchema.methods.smbmedicamentDto = function(){
    return {
        id: this._id,
        id_bmedicament: this.id_bmedicament,
        code_med: this.code_med,
        nom_comercial: this.nom_comercial,
        nom_generique: this.nom_generique,
        dosage_med: this.dosage_med,
        is_generic: this.is_generic,
        prix_moyen: this.prix_moyen,
        form_pharma: this.form_pharma,
        labo_pharma: this.labo_pharma,
        voie_admin: this.voie_admin,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMBMedicament', SMBMedicamentSchema);