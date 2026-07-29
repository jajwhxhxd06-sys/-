module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
