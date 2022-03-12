const ul = document.querySelector(".table-container__exchange-part__coins-container")
const loadingLogo = document.querySelector(".main-part .fa-solid")
const loadMoreButton = document.querySelector(".fa-arrows-rotate")
let page = 100
let allow = true 
let height 

document.addEventListener("DOMContentLoaded" , loadExchange )
loadMoreButton.addEventListener("click" , addExchange )

function loadExchange(){
    try{
        loadMoreButton.classList.toggle("loading")
        fetch(`https://api.coingecko.com/api/v3/exchanges?per_page=${page}`)
            .then(response => response.json())
            .then(json => {
                loadMoreButton.classList.toggle("loading")
                for (let i of json){
                    console.log(i)
                    const li = document.createElement("li")
                    li.className = 'exchange'
                    li.innerHTML = 
                    `
                    <img src="${i.image}" width="30px" alt="">
                    <p class="name" >${i.name}</p>
                    <p>${i.year_established}</p>
                    <p>${i.trust_score}</p>
                    <p>${i.trust_score_rank}</p>
                    <p>${i.country}</p>
                    <p class="last"><a href="${i.url}" target="_blank"><i class="fa-solid fa-globe"></i></a></p>
                    `
                    ul.appendChild(li)
                    if ( allow == true ){
                        window.scroll(height, height)
                    }
                    if ( page == 250 ){
                        loadMoreButton.style.display = "none"
                    }
                }
            })
    }catch{
        ul.innerHTML = "try again"
    }
}

function addExchange(){
    height = self.pageYOffset
    ul.innerHTML = `
    <li class="exchange-part__exchange-conatiner__table-header">
                        <h3>logo</h3>
                        <h3>Name</h3>
                        <h3>Symbol</h3>
                        <h3>Price</h3>
                        <h3>rank</h3>
                        <h3>Market Cap</h3>
                    </li>
    `
    page = page+15
    allow = true 
    loadExchange()
}
