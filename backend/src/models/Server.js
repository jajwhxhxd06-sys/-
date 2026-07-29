module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Server', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: 'default.png'
    },
    inviteCode: {
      type: DataTypes.STRING,
      unique: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
