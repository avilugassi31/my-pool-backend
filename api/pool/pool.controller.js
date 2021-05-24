const logger = require('../../services/logger.service');
const userService = require('../user/user.service');
const poolService = require('./pool.service');

async function getMembers(req, res) {
    try {
        const members = await poolService.query(req.query);
        res.send(members);
    } catch (err) {
        logger.error('Cannot get members', err);
        res.status(500).send({ err: 'Failed to get members' });
    }
}

async function getMember(req, res) {
    try {
        const member = await poolService.getById(req.params.id);
        res.send(member);
    } catch (err) {
        logger.error('Failed to get member', err);
        res.status(500).send({ err: 'Failed to get member' });
    }
}

async function deleteMember(req, res) {
    try {
        await poolService.remove(req.params.id);
        res.send({ msg: 'Deleted successfully' });
    } catch (err) {
        logger.error('Failed to delete member', err);
        res.status(500).send({ err: 'Failed to delete member' });
    }
}
async function addMember(req, res) {
    try {
        var member = req.body;
        member = await poolService.add(member);
        res.send(member);
    } catch (err) {
        logger.error('Failed to add member', err);
        res.status(500).send({ err: 'Failed to add member' });
    }
}

async function updateMember(req, res) {
    try {
        const member = req.body;
        const savedMember = await poolService.update(member);
        res.send(savedMember);
    } catch (err) {
        console.log('err:', err);
    }
}
module.exports = {
    getMembers,
    deleteMember,
    addMember,
    getMember,
    updateMember,
};
