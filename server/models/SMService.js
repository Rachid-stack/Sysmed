/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMServiceSchema = new mongoose.Schema({
    id_service: Number,
    code_service: String,
    libelle_service: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_service: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMServiceSchema.methods.smserviceDto = function(){
    return {
        id: this._id,
        id_service: this.id_service,
        code_service: this.code_service,
        libelle_service: this.libelle_service,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMService', SMServiceSchema);