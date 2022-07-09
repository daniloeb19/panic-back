const Usuario = require('../models/UsuarioModel')

module.exports = {
    async index(req, res) {
        const user = await Usuario.find();
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },
    async create(req, res) {

        const { user_name, user_date, user_pass, user_email, user_cpf, ment_id, user_contato, user_sexo, user_desc } = req.body;
        let data = {};
        let user = await Usuario.findOne({ user_name });
        if (!user) {

            data = { user_name, user_date, user_pass, user_email, user_cpf, ment_id, user_contato, user_sexo, user_desc };
            user = await Usuario.create(data);

            return res.status(200).json(user);

        } else {
            return res.status(500).json(user);
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const user = await Usuario.findOne({ _id });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }

    },
    async delete(req, res) {
        const { _id } = req.params;
        const user = await Usuario.findByIdAndDelete({ _id });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },

    async update(req, res) {
        const { _id, user_name, user_date, user_pass, user_email, user_cpf, ment_id, user_contato, user_sexo, user_desc, tipo_usuario } = req.body;
        const data = { user_name, user_date, user_pass, user_email, user_cpf, ment_id, user_contato, user_sexo, user_desc, tipo_usuario };
        const user = await Usuario.findOneAndUpdate({ _id }, data, { new: true });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    }
}