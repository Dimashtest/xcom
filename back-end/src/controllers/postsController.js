const Posts = require("../models/postsModel");
const User = require("../models/usersModel");

// Получить все посты с именами пользователей
const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            include: [{ model: User, as: "users", attributes: ["first_name", "email"] }],
        });
        res.json(posts);
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        res.status(500).json({ error: "Ошибка при получении постов" });
    }
};

// Создать новый пост
const createPost = async (req, res) => {
    try {
        const { user_id, title, text_post } = req.body;

        // Проверяем, существует ли пользователь
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        // Создаём новый пост
        const newPost = await Posts.create({ user_id, title, text_post });

        // Возвращаем созданный пост
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Ошибка при создании поста:", error);
        res.status(500).json({ error: "Ошибка при создании поста" });
    }
};


module.exports = { getAllPosts, createPost };
