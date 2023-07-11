/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMConsultationSchema = new mongoose.Schema({
    id_patient: String,
    id_specialite: String,
    code_consultation: String,
    libelle_consultation: String,
    commentaire_consultation: String,
    resultat_consultation: String,
    is_confidential: Boolean,
    date_consultation: Date,
    create_date: {type: Date, default: Date.now()},
    create_by: String,
    update_date: Date,
    update_by: String,
    del: Number
}, {timestamps: true});

SMConsultationSchema.methods.SMConsultationDto = function(){
    return {
        id: this._id,
        id_patient: this.id_patient,
        id_specialite: this.id_specialite,
        code_consultation: this.code_consultation,
        libelle_consultation: this.libelle_consultation,
        commentaire_consultation: this.commentaire_consultation,
        resultat_consultation: this.resultat_consultation,
        is_confidential: this.is_confidential,
        date_consultation: this.date_consultation,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMConsultation', SMConsultationSchema);