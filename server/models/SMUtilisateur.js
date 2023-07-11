/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMUtilisateurSchema = new mongoose.Schema({
    id_personne: String,
    id_profile: String,
    username: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    password: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    actif: Boolean,
    start_date: Date,
    end_date: Date,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMUtilisateurSchema.methods.SMUtilisateurDto = function(){
    return {
        id: this._id,
        id_personne: this.id_personne,
        id_profile: this.id_profile,
        username: this.username,
        password: this.password,
        actif: this.actif,
        start_date: this.start_date,
        end_date: this.end_date,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMUtilisateur', SMUtilisateurSchema);
