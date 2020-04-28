'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    text: {
      type:DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false
    }}, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Post;
};