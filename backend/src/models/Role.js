module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Role', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(7),
      defaultValue: '#5865f2'
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
};
