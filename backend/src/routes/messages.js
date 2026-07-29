const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.get('/channel/:channelId', auth, messageController.getByChannel);
router.post('/', auth, messageController.create);
router.put('/:id', auth, messageController.update);
router.delete('/:id', auth, messageController.delete);

module.exports = router;
