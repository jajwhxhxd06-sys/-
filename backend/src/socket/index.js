const { Message, User, Channel, Server, Member } = require('../models');

module.exports.setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);

    socket.on('join-server', (serverId) => {
      socket.join(`server-${serverId}`);
    });

    socket.on('join-channel', (channelId) => {
      socket.join(`channel-${channelId}`);
    });

    socket.on('send-message', async (data) => {
      try {
        const { channelId, content, attachments } = data;
        const message = await Message.create({
          content,
          channelId,
          userId: socket.userId || data.userId,
          attachments: attachments || []
        });
        const full = await Message.findByPk(message.id, {
          include: [{ model: User, attributes: ['id', 'username', 'avatar'] }]
        });
        io.to(`channel-${channelId}`).emit('new-message', full);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('typing', ({ channelId, username }) => {
      socket.to(`channel-${channelId}`).emit('user-typing', { username });
    });

    socket.on('stop-typing', ({ channelId }) => {
      socket.to(`channel-${channelId}`).emit('user-stopped-typing');
    });

    socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected:', socket.id);
    });
  });
};
