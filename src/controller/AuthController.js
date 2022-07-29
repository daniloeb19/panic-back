const Mentor = require('../controller/MentorController')
const Mentorado = require('../controller/MentoradoController')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
module.exports = {
    async authCheck(req, res) {
        const _id = req._id;
        const findMentorado = await Mentorado.details({ _id }, res);
        const findMentor = await Mentor.details({ _id }, res);
        if (findMentorado) {
            // console.log({ findMentorado })
            return res.status(202).json({ ...findMentorado });
        }

        if (findMentor) {
            //console.log({ ...findMentor })
            return res.status(202).json({ ...findMentor });
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    },
    async authLogin(req, res) {
        const email = req.body.email;
        const pass = req.body.pass;
        const findMentorado = await Mentorado.autenticacao({ email, pass });
        const findMentor = await Mentor.autenticacao({ email, pass });

        if (findMentorado) {
            return res.status(202).json({ ...findMentorado });
        }

        if (findMentor) {
            return res.status(202).json({ ...findMentor });
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    },
    async authSenha(req, res) {
        const email = req.body.email;
        const seg = req.body.seg;
        const findMentorado = await Mentorado.autenticacaoSenha({ email, seg });
        const findMentor = await Mentor.autenticacaoSenha({ email, seg });

        if (findMentorado) {
            return res.status(202).json({ ...findMentorado });
        }

        if (findMentor) {
            return res.status(202).json({ ...findMentor });
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    },
    async authSenhaLog(req, res) {
        const _id = req.id;
        const senha = req.body.pass;
        const findMentorado = await Mentorado.details({ _id }, res);
        const findMentor = await Mentor.details({ _id }, res);
        if (findMentorado) {
            const mentorado = await Mentorado.update({ updateValues: { pass: senha, _id: _id } })
            return res.json(mentorado);
        }

        if (findMentor) {
            const mentor = await Mentor.update({ updateValues: { pass: senha, _id: _id } });
            return res.json(mentor);
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    }

}