const { Server, Channel, Member } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.create = async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const server = await Server.create({
      name,
      isPublic,
      ownerId: req.user.id,
      inviteCode: uuidv4().slice(0, 8)
    });
    // Создаем дефолтные каналы
    await Channel.create({ name: 'general', serverId: server.id, position: 0 });
    await Channel.create({ name: 'voice-general', serverId: server.id, type: 'voice', position: 1 });
    // Добавляем владельца как участника
    await Member.create({ userId: req.user.id, serverId: server.id });
    res.status(201).json(server);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyServers = async (req, res) => {
  try {
    const members = await Member.findAll({
      where: { userId: req.user.id },
      include: [{ model: Server }]
    });
    const servers = members.map(m => m.Server);
    res.json(servers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const server = await Server.findByPk(req.params.id, {
      include: [
        { model: Channel, order: [['position', 'ASC']] },
        { model: Member, include: ['User'] }
      ]
    });
    res.json(server);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const server = await Server.findByPk(req.params.id);
    if (!server) return res.status(404).json({ error: 'Server not found' });
    if (server.ownerId !== req.user.id) return res.status(403).json({ error: 'Not owner' });
    await server.update(req.body);
    res.json(server);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const server = await Server.findByPk(req.params.id);
    if (!server) return res.status(404).json({ error: 'Server not found' });
    if (server.ownerId !== req.user.id) return res.status(403).json({ error: 'Not owner' });
    await server.destroy();
    res.json({ message: 'Server deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
