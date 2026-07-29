module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Member', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
};
