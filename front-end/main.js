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

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.querySelector('.title').value;
    const text_post = document.querySelector('.text-post').value;
    const user_id = localStorage.getItem('user_id');
    await createPost(user_id, title, text_post);
    modal.classList.add("hidden");
    await renderPosts()
    await renderProfile()
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


async function getAllPosts() {
    try {
        const response = await fetch('http://localhost:5000/api/postsRoutes/posts')
        const posts = await response.json()
        return posts
    } catch (error) {
        console.log(error)
    }
}
const userEmail = localStorage.getItem('email_user')
const nameUser = localStorage.getItem('name_user')
const renderProfile = () => {
    if (userEmail && !document.querySelector('.profile-email')) {
        document.querySelector('.profile').innerHTML = `
        <p class="profile-email text-xl">${nameUser}</p>    
        <p class="profile-email text-xl">${userEmail}</p>
        `;
    }
}

renderProfile()

async function renderPosts() {
    document.querySelector('.main').innerHTML = '';
    const posts = await getAllPosts()

    posts.forEach(post => {

        const formattedDate = new Date(post.createdAt).toLocaleString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric' 
        })
        document.querySelector('.main').insertAdjacentHTML('afterbegin', `
            <div class="border-slate-600 border rounded-xl">
                <div class="lenta-user flex items-start gap-4 mt-[20px] px-6 py-4">
                    <i class="fa-solid fa-user-tie text-5xl"></i>
                    <div class="profile flex items-left flex-col">
                        <p class="text-3xl">${post.users.email}</p>
                        <p class="text-slate-500">${formattedDate}</p> <!-- Дата поста -->
                    </div>
                    <i class="fa-solid fa-circle-check text-blue-400 text-3xl"></i>
                </div>
                <div class="lenta-body px-6 py-2 flex flex-col items-start text-justify text-2xl gap-3">
                    <p class="font-bold">${post.title}</p>
                    <p>${post.text_post}</p>
                </div>
                <div class="users-stats flex text-xl items-center gap-2 p-5">
                    <i class="fa-solid fa-heart text-red-600"></i>0
                    <i class="fa-solid fa-comment"></i>0
                    <div class="flex items-end gap-2">
                        <i class="fa-solid fa-bookmark text-yellow-500"></i>
                    </div>
                </div>
                <div class="users-comment flex items-center p-5 gap-3">
                    <input class="bg-white text-black w-[100%] placeholder:pl-1 p-3 rounded-full" type="text"
                        placeholder="Комментарии..." name="" id="">
                    <button
                        class="hover:bg-gray-300 ease-in duration-300 cursor-pointer bg-white text-black rounded-full">Оставить
                        коментарии</button>
                </div>
            </div>
            
            `)
    })
}
renderPosts()