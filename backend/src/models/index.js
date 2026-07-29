const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User')(sequelize, DataTypes);
const Server = require('./Server')(sequelize, DataTypes);
const Channel = require('./Channel')(sequelize, DataTypes);
const Message = require('./Message')(sequelize, DataTypes);
const Role = require('./Role')(sequelize, DataTypes);
const Member = require('./Member')(sequelize, DataTypes);

// Relations
Server.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
User.hasMany(Server, { as: 'ownedServers', foreignKey: 'ownerId' });

Server.hasMany(Channel);
Channel.belongsTo(Server);

Server.hasMany(Member);
Member.belongsTo(User);
Member.belongsTo(Server);

Channel.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Channel);

Server.hasMany(Role);
Role.belongsTo(Server);

module.exports = { sequelize, User, Server, Channel, Message, Role, Member };
