const express = require('express');
const router = express.Router();

// Importar os casos de uso
const CreateUser = require('../usecases/CreateUser');
const GetUser = require('../usecases/GetUser');
const GetAllUsers = require('../usecases/GetAllUsers');
const DeleteUser = require('../usecases/DeleteUser');
const UpdateUser = require('../usecases/UpdateUser');

// CREATE: Criar um novo usuário
router.post('/', async (req, res) => {
    try {
        const user = await CreateUser.execute(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ: Buscar todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await GetAllUsers.execute();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ: Buscar um usuário por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await GetUser.execute(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// UPDATE: Atualizar um usuário por ID
router.put('/:id', async (req, res) => {
    console.log('Recebido PUT request com ID:', req.params.id); // Log para depuração
    try {
        const updatedUser = await UpdateUser.execute(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// DELETE: Deletar um usuário por ID
router.delete('/:id', async (req, res) => {
    try {
        await DeleteUser.execute(req.params.id);
        res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
