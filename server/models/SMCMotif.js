/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMCMotifSchema = new mongoose.Schema({
    id_cmotif: Number,
    code_cmotif: String,
    libelle_cmotif: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_cmotif: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMCMotifSchema.methods.SMCMotifDto = function(){
    return {
        id: this._id,
        id_cmotif: this.id_cmotif,
        code_cmotif: this.code_cmotif,
        libelle_cmotif: this.libelle_cmotif,
        desc_cmotif: this.desc_cmotif,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMCMotif', SMCMotifSchema);