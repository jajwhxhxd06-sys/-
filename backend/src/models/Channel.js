module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Channel', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('text', 'voice', 'announcement'),
      defaultValue: 'text'
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
};
