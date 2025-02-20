
const reg = document.querySelector(".reg");
const ads = document.querySelector(".div");
const close = document.querySelector(".first");

reg.addEventListener('click', () => {  
  ads.classList.add("active");
  
})

close.addEventListener('click', () => {  
  ads.classList.remove("active");
  
})



