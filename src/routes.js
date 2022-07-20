const express = require('express');
const router = express.Router();

const Mentorado = require('./controller/MentoradoController');
const Mentor = require('./controller/MentorController');

router.post('/auth/login', async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    const findMentorado = await Mentorado.autenticacao({ email, pass });
    const findMentor = await Mentor.autenticacao({ email, pass });
    
    if (findMentorado) {
      
        return res.status(200).json(findMentorado);
    }
    if (findMentor) {
        return res.status(200).json(findMentor);
    }
   return res.json({ msg: "Acesso Negado" });
});
/*rotas de mentorados
router.get('/', Mentorado.index);
router.post('/api/mentorado',Mentorado.create);
router.get('/api/mentorado', Mentorado.index);
router.get('/api/mentorado.details/:_id',Mentorado.details);
router.get('/api/mentorado.find/:email',Mentorado.pesquisarPorEmail);
router.delete('/api/mentorado/:_id',Mentorado.delete);
router.put('/api/mentorado',Mentorado.update);
*/
//rotas de mentores
/*router.get('/', Mentor.index);
router.post('/api/mentor',Mentor.create);
router.get('/api/mentor', Mentor.index);
router.get('/api/mentor.details/:_id',Mentor.details);
router.get('/api/mentor.find/:email',Mentor.pesquisarPorEmail);
router.delete('/api/mentor/:_id',Mentor.delete);
router.put('/api/mentor',Mentor.update);*/

module.exports = router;