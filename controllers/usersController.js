//controller/usersController.js - Back-End

//createUser: Cria um novo usuário na tabela users da Supabase com os dados recebidos no corpo da requisição.
//getAllUsers: Consulta todos os usuários da tabela users.
//getUserById: Consulta um usuário específico pelo ID.
//updateUser: Atualiza as informações de um usuário pelo ID.
//deleteUser: Exclui um usuário pelo ID.

//importa a variavel supabase do app.js
//const { supabase } = require('../app'); 
const supabase = require('../app'); 

//cria um novo usuario
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const { data, error } = await supabase
            .from('users')
            .insert({ name, email });
        
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json(data);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuario.' });
    }
};


//Consulta todos os usuarios
const getAllUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('*');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao consultar usuario.' });
    }
};


//Consulta um usuario pelo ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id);
        
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'Usuario nao encontrado.' });
        }

        res.status(200).json(data[0]);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao consultar usuario.' });
    }
};


// Atualiza um usuario pelo ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const { error } = await supabase
            .from('users')
            .update({ name, email })
            .eq('id', id);
        
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(204).send(); //204 no Content

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuario.' });
    }
};

//Exclui um usuario pelo ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);
        
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(204).send(); //204 no Content

    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir usuario.' });
    }
};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};

