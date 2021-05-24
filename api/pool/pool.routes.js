const express = require('express');
const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const {
    addMember,
    getMembers,
    getMember,
    deleteMember,
    updateMember,
} = require('./pool.controller');
const router = express.Router();


router.get('/', getMembers);
router.post('/', addMember)
router.get('/:id', getMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember)

module.exports = router;
