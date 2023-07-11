/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMADPersonnelSchema = new mongoose.Schema({
    id_personne: String,
    id_service: String,
    id_titre: String,
    num_matricule: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMADPersonnelSchema.methods.SMADPersonnelDto = function(){
    return {
        id: this._id,
        id_personne: this.id_personne,
        id_service: this.id_service,
        id_titre: this.id_titre,
        num_matricule: this.num_matricule,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMADPersonnel', SMADPersonnelSchema);