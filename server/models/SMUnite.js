/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMUniteSchema = new mongoose.Schema({
    id_unite: Number,
    id_service: String,
    code_unite: String,
    libelle_unite: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_unite: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMUniteSchema.methods.smuniteDto = function(){
    return {
        id: this._id,
        id_service: this.id_service,
        id_unite: this.id_unite,
        code_unite: this.code_unite,
        libelle_unite: this.libelle_unite,
        desc_unite: this.desc_unite,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMUnite', SMUniteSchema);
