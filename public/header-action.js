const menuButton = document.querySelector(".fa-bars")
const menu = document.querySelector(".menu-part__container")

menuButton.addEventListener("click" , () => {
    menuButton.classList.toggle("fa-xmark")
    menu.classList.toggle("clip")
})

document.querySelector(".menu-part__container__links" , () => {
    menu.classList.toggle("clip")
})