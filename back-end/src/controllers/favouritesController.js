const Posts = require("../models/postsModel")
const User = require("../models/usersModel")
const Favourites = require("../models/favouritesModel")

// Получить все посты с именами пользователей
const getAllFavourite = async (req, res) => {
    try {
        const favourites = await Favourites.findAll({
            include: [
                { model: User, as: "users", attributes: ["id", "first_name", "email"] },
                { model: Posts, as: "posts", attributes: ["post_id", "title"] },
            ],
        });
        res.json(favourites);
    } catch (error) {
        console.error("Ошибка при получении закладок:", error);
        res.status(500).json({ error: "Ошибка при получении закладок" });
    }
}

const addFavourite = async (req, res) => {
    const { user_id, post_id } = req.body
    try {
        const favourite = await Favourites.findOne({ where: { user_id, post_id } })

        if (favourite) {
            await Favourites.destroy({ where: { user_id, post_id } })
            return res.json({ message: "Закладка удалена" })
        } else {
            await Favourites.create({ user_id, post_id })
            return res.json({ message: "Закладка добавлена" })
        }
    } catch (error) {
        console.error("Ошибка закладки:", error)
        res.status(500).json({ error: "Ошибка закладки" })
    }
}

module.exports = { getAllFavourite , addFavourite};