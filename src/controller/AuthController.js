const Mentor = require('../controller/MentorController')
const Mentorado = require('../controller/MentoradoController')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
module.exports = {
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
    }, async authSenha(req, res) {
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
    }

}