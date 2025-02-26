const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./usersModel"); // Импортируем модель User

const Posts = sequelize.define("Posts", {
    post_id: {
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
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    text_post: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: "posts"
});

Posts.belongsTo(User, { foreignKey: "user_id", as: "users" });
User.hasMany(Posts, { foreignKey: "user_id", as: "posts" });


module.exports = Posts;