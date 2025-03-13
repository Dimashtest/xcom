const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./usersModel"); // Импортируем модель User
const Posts = require("./postsModel")

const Favourites = sequelize.define("Favourites", {
    favourite_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Posts,
            key: "post_id",
        },
    },
}  , {
        tableName: "favourites"
    })

Favourites.belongsTo(User, { foreignKey: "user_id", as: "users" });
Favourites.belongsTo(Posts, { foreignKey: "post_id", as: "posts" });

module.exports = Favourites;