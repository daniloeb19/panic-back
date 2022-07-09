const express = require('express');
const router = express.Router();

const Usuario = require('./controller/UsuariosController');
router.get('/', Usuario.index);

//rotas de usuários
router.post('/api/usuarios',Usuario.create);
router.get('/api/usuarios', Usuario.index);
router.get('/api/usuarios.details/:_id',Usuario.details);
router.delete('/api/usuarios/:_id',Usuario.delete);
router.put('/api/usuarios',Usuario.update);
module.exports = router;