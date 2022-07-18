const Mentorado = require('../models/MentoradoModel')

module.exports = {
    async index(req, res) {
        const user = await Mentorado.find();
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },
    async create(req, res) {

        const { mentorado_name, mentorado_date, mentorado_pass, mentorado_email, mentorado_cpf, mentorado_seg, mentorado_contato, mentorado_sexo, mentorado_desc } = req.body;
        let data = {};
        let user = await Mentorado.findOne({ mentorado_name });
        if (!user) {

            data = { mentorado_name, mentorado_date, mentorado_pass, mentorado_email, mentorado_cpf, mentorado_seg, mentorado_contato, mentorado_sexo, mentorado_desc };
            user = await Mentorado.create(data);

            return res.status(200).json(user);

        } else {
            return res.status(500).json(user);
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const user = await Mentorado.findOne({ _id });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },
    async pesquisarPorEmail(req, res) {
        const { mentorado_email } = req.params;
        const user = await Mentorado.findOne({ mentorado_email });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },
    async delete(req, res) {
        const { _id } = req.params;
        const user = await Mentorado.findByIdAndDelete({ _id });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },

    async update(req, res) {
        const { _id, mentorado_name, mentorado_date, mentorado_pass, mentorado_email, mentorado_cpf, mentorado_seg, mentorado_contato, mentorado_sexo, mentorado_desc} = req.body;
        const data = { mentorado_name, mentorado_date, mentorado_pass, mentorado_email, mentorado_cpf, mentorado_seg, mentorado_contato, mentorado_sexo, mentorado_desc};
        const user = await Mentorado.findOneAndUpdate({ _id }, data, { new: true });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    }
}