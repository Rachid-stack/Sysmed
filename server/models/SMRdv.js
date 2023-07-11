/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMRdvSchema = new mongoose.Schema({
    id_patient: String,
    id_medecin: String,
    id_motif: String,
    code: String,
    commentaire: String,
    date_rdv: Date,
    heure_rdv: String,
    create_date: {type: Date, default: Date.now()},
    create_by: String,
    update_date: Date,
    update_by: String,
    del: Number
}, {timestamps: true});

SMRdvSchema.methods.SMRdvDto = function(){
    return {
        id: this._id,
        id_patient: this.id_patient,
        id_medecin: this.id_medecin,
        id_motif: this.id_motif,
        code: this.code,
        commentaire: this.commentaire,
        heure_rdv: this.heure_rdv,
        date_rdv: this.date_rdv,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMRdv', SMRdvSchema);