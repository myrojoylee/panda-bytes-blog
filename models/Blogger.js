const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blogger extends Model {}

Blogger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newBloggerData) => {
        newBloggerData.password = await bcrypt.has(newBloggerData.password, 11);
        return newBloggerData;
      },
      beforeUpdate: async (updatedBloggerData) => {
        updatedBloggerData.password = await bcrypt.hash(
          updatedBloggerData.password,
          11
        );
        return updatedBloggerData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "blogger",
  }
);

module.exports = Blogger;
