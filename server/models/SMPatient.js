/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMPatientSchema = new mongoose.Schema({
    id_personne: String,
    id_rhesus: String,
    id_gsanguin: String,
    profession: String,
    signe_particulier: String,
    code_patient: String,
    num_as_ss: String,
    commentaire: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMPatientSchema.methods.SMPatientDto = function(){
    return {
        id: this._id,
        id_personne: this.id_personne,
        id_rhesus: this.id_rhesus,
        id_gsanguin: this.id_gsanguin,
        profession: this.profession,
        signe_particulier: this.signe_particulier,
        code_patient: this.code_patient,
        num_as_ss: this.num_as_ss,
        commentaire: this.commentaire,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMPatient', SMPatientSchema);