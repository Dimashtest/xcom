
const reg = document.querySelector(".reg");
const log = document.querySelector(".log");
const ads = document.querySelector(".div");
const ads2 = document.querySelector(".div2")
const closeBtn = document.querySelectorAll(".first");

const nameUser = document.querySelector('.name-user')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const email2 = document.querySelector('.email2')
const password2 = document.querySelector('.password2')
const registerBtn = document.querySelector('.register-btn')
const loginBtn = document.querySelector('.login-btn')



registerBtn.addEventListener('click', async () => {
  await register(nameUser.value, email.value, password.value)
})
loginBtn.addEventListener('click', async () => {
  await login(email2.value, password2.value)
})

reg.addEventListener('click', () => {
  ads.classList.add("active");

})

log.addEventListener('click', () => {
  ads2.classList.add("active");

})

document.addEventListener('click', (e) => {
  if (!ads.contains(e.target) && !reg.contains(e.target)) {
    ads.classList.remove("active");
  }
  if (!ads2.contains(e.target) && !log.contains(e.target)) {
    ads2.classList.remove("active");
  }
});

closeBtn.forEach(item => {
  item.addEventListener('click', () => {
    ads.classList.remove("active");
    ads2.classList.remove("active");
  })
})

async function register(first_name, email, password) {
  console.log(email, first_name, password)
  const fetchs = await fetch('http://localhost:5000/api/userRoutes/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      first_name,
      password
    })
  })
  const data = await fetchs.json()
  console.log(data)
  ads.classList.remove("active");


}

async function login(email, password) {
  console.log(email, password)
  const fetchs = await fetch('http://localhost:5000/api/userRoutes/loginUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  const data = await fetchs.json()
  console.log(data)
  ads2.classList.remove("active");
  localStorage.setItem('user_id', data.user.id)
  localStorage.setItem('name_user', data.user.first_name)
  localStorage.setItem('email_user', data.user.email)
  if (fetchs.ok) {
    window.location.href = './main.html'
  }

}


