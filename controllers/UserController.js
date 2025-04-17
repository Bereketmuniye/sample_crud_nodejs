const bcrypt = require('bcryptjs');
const validator = require('validator');
const UserModel = require('../model/user');
const {getAllUsers, getUserById, getUserByUsername, createUser, updateUser} = require('../model/user');
const db = require('../db/db');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get user by id
exports.getUserById = async (req, res) => {
    try{
        const user = await getUserById(req.params.id);
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });   
    }
};


//get user by username
exports.getUserByUsername = async (req, res) => {
    try{
        const user = await getUserByUsername(req.params.username);
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });   
    }
};
//create user
exports.createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await createUser(username, password, email);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
//update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, email } = req.body;
        const user = await updateUser(id, username, password, email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
//delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deleteUser(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
//login user




