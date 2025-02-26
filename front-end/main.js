document.querySelector(".close-modal").addEventListener("click", () => {
    document.querySelector(".modal-post").classList.add("hidden");
});

document.querySelector(".post-btn").addEventListener("click", () => {
    document.querySelector(".modal-post").classList.remove("hidden");
});
const postBtn = document.querySelector(".post-btn");
const modal = document.querySelector(".modal-post");
const closeBtn = document.querySelector(".close-modal");
document.addEventListener('click', (e) => {
    if (!modal.contains(e.target) && !postBtn.contains(e.target)) {
        modal.classList.add("hidden");
    }

});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('.title').value;
    const text_post = document.querySelector('.text-post').value;
    const user_id = localStorage.getItem('user_id');
    createPost(user_id, title, text_post);
    modal.classList.add("hidden");

})

async function createPost(user_id, title, text_post) {
    try {
        const response = await fetch('http://localhost:5000/api/postsRoutes/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id,
                title,
                text_post
            })
        })
    } catch (error) {
        console.log(error)
    }
}