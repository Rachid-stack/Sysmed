/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMMedecinSchema = new mongoose.Schema({
    id_personne: String,
    id_specialite: String,
    id_service: String,
    id_titre: String,
    code_med: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMMedecinSchema.methods.SMMedecinDto = function(){
    return {
        id: this._id,
        id_personne: this.id_personne,
        id_specialite: this.id_specialite,
        id_service: this.id_service,
        id_titre: this.id_titre,
        code_med: this.code_med,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMMedecin', SMMedecinSchema);