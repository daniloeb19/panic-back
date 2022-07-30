const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
    name: String,
    date: String,
    sexo: String,
    pass: String,
    email: String,
    cpf: String,
    contato: String,
    desc: { type: String, default: "" },
    seg: String,
    tipo: String,
    mentor_id: { type: Number, default: 0 },
}, {
    timestamps: true
});

DataSchema.pre('save', function (next) {
    if (!this.isModified("pass")) {
        return next();
    }

    this.pass = bcrypt.hashSync(this.pass, 10);
    next();

});

DataSchema.pre('findAndUpdate', function (next) {
    var password = this.getUpdate().pass + '';
    if (password.length < 55) {
        this.getUpdate().pass = bcrypt.hashSync(password, 10);
    }
    next();
});

const mentorado = mongoose.model('Mentorado', DataSchema);
module.exports = mentorado;
