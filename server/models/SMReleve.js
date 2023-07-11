/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMReleveSchema = new mongoose.Schema({
    id_consultation: String,
    id_tconstante: String,
    valeur: Number,
    create_date: {type: Date, default: Date.now()},
    create_by: String,
    update_date: Date,
    update_by: String,
    del: Number
}, {timestamps: true});

SMReleveSchema.methods.SMReleveDto = function(){
    return {
        id: this._id,
        id_consultation: this.id_consultation,
        id_tconstante: this.id_tconstante,
        valeur: this.valeur,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMReleve', SMReleveSchema);