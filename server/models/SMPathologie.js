/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMPathologie = new mongoose.Schema({
    id_pathologie: Number,
    id_categorie: String,
    code_pathologie: String,
    libelle_pathologie: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_pathologie: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMPathologie.methods.smpathologieDto = function(){
    return {
        id: this._id,
        id_pathologie: this.id_pathologie,
        id_categorie: this.id_categorie,
        code_pathologie: this.code_pathologie,
        libelle_pathologie: this.libelle_pathologie,
        desc_pathologie: this.desc_pathologie,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMPathologie', SMPathologie);
