const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query() {
    try {
        const collection = await dbService.getCollection('members');
        const members = await collection.find({}).toArray();
        return members;
    } catch (err) {
        logger.error('cannot find members', err);
        throw err;
    }
}
async function remove(memberId) {
    try {
        const collection = await dbService.getCollection('members');
        const query = { _id: ObjectId(memberId) };
        await collection.deleteOne(query);
    } catch (err) {
        logger.error(`cannot remove stay ${memberId}`, err);
        throw err;
    }
}
async function getById(memberId) {
    try {
        const collection = await dbService.getCollection('members');
        const member = await collection.findOne({ _id: ObjectId(memberId) });
        return member;
    } catch (err) {
        logger.error(`while finding stay ${memberId}`, err);
        throw err;
    }
}

async function update(member) {
    try {
        member._id = ObjectId(member._id);
        const collection = await dbService.getCollection('members');
        await collection.updateOne({ _id: member._id }, { $set: member });
        return member;
    } catch (err) {
        console.log('err:', err);
    }
}
async function add(member) {
    try {
        const collection = await dbService.getCollection('members');
        await collection.insertOne(member);
        return member;
    } catch (err) {
        logger.error('cannot insert stay', err);
        throw err;
    }
}
module.exports = {
    query,
    remove,
    update,
    add,
    getById,
};
