const Mentorado = require('../models/MentoradoModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    async index(req, res) {
        const user = await Mentorado.find();
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    },
    async create(req, res) {
        const { name, date, pass, email, cpf, seg, contato, sexo, desc, tipo } = req.body;
        let data = {};
        let user = await Mentorado.findOne({ email });
        if (!user) {
            data = { name, date, pass, email, cpf, seg, contato, sexo, desc, tipo };
            user = await Mentorado.create(data);
            return res.status(201).json(user);
        } else {
            return res.status(500).json(user);
        }
    },
    async details(req, res) {
        const { _id } = req;
        const user = await Mentorado.findOne({ _id });
        if (user == null) {
            return false;
        } else {
            return { user };
        }
    },

    async detailsId(req, res) {
        const { _id } = req.params;
        const user = await Mentorado.findOne({ _id });
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    },

    async autenticacao(req) {
        const { email, pass } = req;
        const user = await Mentorado.findOne({ email });
        if (user == null) {
            return false;

        } else {
            const checkPass = await bcrypt.compare(pass, user.pass);
            if (checkPass) {
                let token = null;
                try {
                    token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                    },
                        process.env.SECRET,
                    );

                    console.log("Autenticação realizada com sucesso");
                } catch (error) {
                    console.log(`Ocorreu um erro ${error}`);
                }
                return { user, token };
            } else {
                return false;
            }

        }
    }, async autenticacaoSenha(req) {
        const { email, seg } = req;
        const user = await Mentorado.findOne({ email });
        if (user == null) {
            return false;

        } else {
            return { user };
        }
    },
    async delete(req, res) {
        const { _id } = req;
        const user = await Mentorado.findByIdAndDelete({ _id });
        if (user == null) {
            return res.status(203).json({ erro: "Erro" });
        } else {
            return res.status(202).json(user);
        }
    },

    // async update(req, res) {
    //     const { _id, name, date, pass, email, cpf, seg, contato, sexo, desc, tipo } = req.body;
    //     const data = { name, date, pass, email, cpf, seg, contato, sexo, desc, tipo };
    //     const user = await Mentorado.findOneAndUpdate({ _id }, data, { new: true });
    //     if (user == null) {
    //         return res.json({ erro: "Erro" });
    //     } else {
    //         return res.status(202).json(user);
    //     }
    // }
    async update(req, res) {
        const { _id, pass } = req.body;
        const user = await Mentorado.findOneAndUpdate({ _id: _id }, { pass: pass }, { new: true });
        if (user == null) {
            return { erro: "Erro" };
        } else {
            return res.status(202).json(user);
        }
    },
    async updateData(req, res) {
        const { _id, name, date, seg, contato, sexo, desc } = req.body;
        const data = { name, date, seg, contato, sexo, desc };
        const user = await Mentorado.updateOne({ _id }, data, { new: true });
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    }, async autenticado(req, res) {
        const { _id, currentPass } = req;
        const user = await Mentorado.findOne({ _id });
        if (user == null) {
            return { statusCode: 404 };
        } else {
            const checkPass = await bcrypt.compare(currentPass, user.pass);
            if (checkPass) {
                return { statusCode: 202, user };
            } else {
                return {statusCode: 203};
            }

        }
    },
}