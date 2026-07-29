module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'default.png'
    },
    discriminator: {
      type: DataTypes.STRING(4),
      defaultValue: '0000'
    },
    status: {
      type: DataTypes.ENUM('online', 'idle', 'dnd', 'offline'),
      defaultValue: 'offline'
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
};
