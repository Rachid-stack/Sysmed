/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMOrdonnanceSchema = new mongoose.Schema({
    id_patient: String,
    id_medecin: String,
    code_ordonnance: String,
    titre: String,
    is_confidential: Boolean,
    create_date: {type: Date, default: Date.now()},
    create_by: String,
    update_date: Date,
    update_by: String,
    del: Number
}, {timestamps: true});

SMOrdonnanceSchema.methods.SMOrdonnanceDto = function(){
    return {
        id: this._id,
        id_patient: this.id_patient,
        id_medecin: this.id_medecin,
        code_ordonnance: this.code_ordonnance,
        titre: this.titre,
        is_confidential: this.is_confidential,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMOrdonnance', SMOrdonnanceSchema);