/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMProfilSchema = new mongoose.Schema({
    id_profile: Number,
    code_profile: String,
    libelle_profile: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_profile: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMProfilSchema.methods.SMProfilDto = function(){
    return {
        id: this._id,
        id_profile: this.id_profile,
        code_profile: this.code_profile,
        libelle_profile: this.libelle_profile,
        desc_profile: this.desc_profile,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMProfil', SMProfilSchema);