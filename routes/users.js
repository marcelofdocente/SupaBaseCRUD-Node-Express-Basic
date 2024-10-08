
//routes/users.js - Back-End

const express = require('express');
//importa variavel supabase do arquivo app.js
//const { supabase } = require('../app');
const supabase = require('../app');
//referencia para o arquivo CRUD para users
const usersController = require('../controllers/usersController');

//Cria um novo roteador
const router = express.Router();

// Rota para cadastrar um novo usuario
router.post('/', usersController.createUser);
// Rota para consultar todos os usuarios
router.get('/', usersController.getAllUsers);
//Consultar um Usuario pelo ID
router.get('/:id', usersController.getUserById);
// Atualiza um usuario
router.put('/:id', usersController.updateUser);
// Exclui um usuario
router.delete('/:id', usersController.deleteUser);

//exporta o roteador
module.exports = router;

