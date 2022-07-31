const Mentoria = require('../models/MentoriaModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    async create(req, res) {
        const { _id_mentor, _id_mentorado, nome_mentorado, contato_mentorado, email_mentorado } = req;
        let data = {};
        let mentoria = await Mentoria.findOne({ _id_mentorado });

        if (!mentoria) {
            data = { _id_mentor, _id_mentorado, nome_mentorado, contato_mentorado, email_mentorado };
        
            mentoria = await Mentoria.create(data);
        
            return res.status(201).json(mentoria);
        } else {
            return res.status(500).json(mentoria);
        }
    },
    async mostrarConexoesMentor(req, res) {
        const { _id_mentor } = req;
        const user = await Mentoria.find({ _id_mentor });
        if (user == null) {
            return res.status(404);
        } else {
            return res.status(200).json(user);
        }
    },

}