const regModal = document.querySelector('.registerModal')
const reg = document.querySelector('.register')
reg.addEventListener('click', () => {
    regModal.classList.remove('hidden')
    regModal.classList.remove('opacity-0')
    regModal.classList.add('opacity-100')
})
document.querySelector('.close').addEventListener('click', () => {
    regModal.classList.add('hidden')
    regModal.classList.remove('opacity-100')
    regModal.classList.add('opacity-0')
})

// document.querySelector('click', (e)=> {
//     if(regModal.classList.contains('hidden') === false && !regModal.contains(e.target) && !reg.contains(e.target)) {
//         regModal.classList.remove('hidden')
//     }
//     if(loginModal.classList.contains('hidden') === false && !loginModal.contains(e.target) && !login.contains(e.target)) {
//         loginModal.classList.remove('hidden')
//     }
// })
async function regButton() {
    const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.querySelector('.gmail').value,
            first_name: document.querySelector('.firstName').value,
            password: document.querySelector('.password').value
        })
    })

    if(response.ok) {
        Swal.fire({
            title: "Успешно!",
            text: `Вы зарегистрировались`,
            icon: "success"
        })
    }
    const data = await fetchs.json()
    console.log(data)
}

document.querySelector('.regButton').addEventListener('click', () => {
    regButton()
    regModal.classList.add('hidden')
})

const loginModal = document.querySelector('.loginModal')
const login = document.querySelector('.login')
login.addEventListener('click', () => {
    loginModal.classList.remove('hidden')
    loginModal.classList.remove('opacity-0')
    loginModal.classList.add('opacity-100')
})
document.querySelector('.closeLogin').addEventListener('click', () => {
    loginModal.classList.add('hidden')
    loginModal.classList.remove('opacity-100')
    loginModal.classList.add('opacity-0')
})

async function loginButton() {
    const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.querySelector('.loginGmail').value,
            password: document.querySelector('.loginPassword').value
        })
    })
    console.log("Ответ сервера: " , response)
    const data = await response.json()
    console.log("JSON-ответ: ", data)

    if(response.ok) {
        Swal.fire({
            title: "Успешно!",
            text: `Вы вошли успешно`,
            icon: "success"
        })
        setTimeout(() => {
            window.location.href = './index.html'
        }, 2000)
    } else{
        Swal.fire({
            title: "Ошибка",
            text: `Неверный логин или пароль`,
            icon: "error"
        })
    }
}

document.querySelector('.loginButton').addEventListener('click', () => {
    loginButton()    
})