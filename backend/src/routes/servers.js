const express = require('express');
const router = express.Router();
const serverController = require('../controllers/serverController');
const auth = require('../middleware/auth');

router.post('/', auth, serverController.create);
router.get('/mine', auth, serverController.getMyServers);
router.get('/:id', auth, serverController.getOne);
router.put('/:id', auth, serverController.update);
router.delete('/:id', auth, serverController.delete);

module.exports = router;
