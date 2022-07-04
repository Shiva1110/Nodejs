const { readFile, writeFile } = require('fs').promises;
const data = require('../data/user');

const getAllUsers = (req, res) => {
    res.status(200).json(data);
}

const getUseById = async (req, res) => {
    const fileData = JSON.parse(await readFile('./data/user.json', {encoding: 'utf8'}));
    const foundData = fileData.find((user) => user.id === Number(req.params.userId));
    if(!foundData) {
        res.status(404).json({"success": false, "message": "user data not found"});
    } else {
        res.status(200).json(foundData);
    }
}

const deleteUserById = async (req, res) => {
    const fileData = JSON.parse(await readFile('./data/user.json', {encoding: 'utf8'}));
    const foundData = fileData.find((user) => user.id === Number(req.params.userId));
    if(!foundData) {
        res.status(404).json({"success": false, "message": "user data not found"});
    } else {
        const writeData = fileData.filter((user) => user.id !== foundData.id);
        writeData.forEach((user, index) => {
            user.id = index+1;
        });
        await writeFile('./data/user.json', JSON.stringify(writeData), {encoding: 'utf8'});
        res.status(200).json({"success": true, "data": {...foundData}});
    }
}

const addUser = async (req, res) => {
    const userInfo = req.body;
    if(!userInfo) {
        res.status(400).json({"success": false, "message": "please provide user data"})
    } else {
        const fileData = JSON.parse(await readFile('./data/user.json', {encoding: 'utf8'}));
        res.status(201).json({"success": true, "data": {"id": `${fileData.length + 1}`, ...userInfo}});
        fileData.push({id: fileData.length + 1, ...userInfo});
        await writeFile('./data/user.json', JSON.stringify(fileData), {encoding: 'utf8'});
    }
}

const updateUserName = async (req, res) => {
    const userInfo = req.body;
    const fileData = JSON.parse(await readFile('./data/user.json', {encoding: 'utf8'}));
    const foundData = fileData.find((user) => user.id === Number(req.params.userId));
    if(!userInfo) {
        res.status(400).json({"success": false, "message": "please provide data to modify"})
    } else if(!foundData) {
        res.status(404).json({"success": false, "message": "user data not found"});
    } else {
        fileData[foundData.id-1].name = userInfo.name;
        res.status(201).json({"success": true, "data": fileData[foundData.id-1]});
        await writeFile('./data/user.json', JSON.stringify(fileData), {encoding: 'utf8'});
    }
}

const updateUserDetails = async (req, res) => {
    const userInfo = req.body;
    const fileData = JSON.parse(await readFile('./data/user.json', {encoding: 'utf8'}));
    const foundData = fileData.find((user) => user.id === Number(req.params.userId));
    if(!userInfo) {
        res.status(400).json({"success": false, "message": "please provide data to modify"})
    } else if(!foundData) {
        res.status(404).json({"success": false, "message": "user data not found"});
    } else {
        fileData[foundData.id-1] = {id: foundData.id, ...userInfo};
        res.status(201).json({"success": true, "data": fileData[foundData.id-1]});
        await writeFile('./data/user.json', JSON.stringify(fileData), {encoding: 'utf8'});
    }
}

module.exports = {
    getAllUsers,
    getUseById,
    deleteUserById,
    addUser,
    updateUserName,
    updateUserDetails
}