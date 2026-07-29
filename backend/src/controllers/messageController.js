const { Message, User } = require('../models');

exports.getByChannel = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { channelId: req.params.channelId },
      include: [{ model: User, attributes: ['id', 'username', 'avatar'] }],
      order: [['createdAt', 'ASC']],
      limit: 100
    });
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { channelId, content, attachments } = req.body;
    const message = await Message.create({
      content,
      channelId,
      userId: req.user.id,
      attachments: attachments || []
    });
    const full = await Message.findByPk(message.id, {
      include: [{ model: User, attributes: ['id', 'username', 'avatar'] }]
    });
    res.status(201).json(full);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    if (message.userId !== req.user.id) return res.status(403).json({ error: 'Not owner' });
    await message.update({ content: req.body.content, edited: true });
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    if (message.userId !== req.user.id) return res.status(403).json({ error: 'Not owner' });
    await message.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
