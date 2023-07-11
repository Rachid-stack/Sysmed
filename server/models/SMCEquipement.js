/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMCEquipementSchema = new mongoose.Schema({
    id_chambre: String,
    id_equipement: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMCEquipementSchema.methods.smcequipementDto = function(){
    return {
        id: this._id,
        id_equipement: this.id_equipement,
        id_chambre: this.id_chambre,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMCEquipement', SMCEquipementSchema);