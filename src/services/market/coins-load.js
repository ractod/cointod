const ul = document.querySelector(".table-container__coins-part__coins-container")
const loadingLogo = document.querySelector(".main-part .fa-solid")
const loadMoreButton = document.querySelector(".fa-arrows-rotate")
let page = 100
let allow = true 
let height 

document.addEventListener("DOMContentLoaded" , loadCoins )
loadMoreButton.addEventListener("click" , addCoins )

function loadCoins(){
    try{
        loadMoreButton.classList.toggle("loading")
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${page}&page=1&sparkline=false`)
            .then(response => response.json())
            .then(json => {
                loadMoreButton.classList.toggle("loading")
                for (let i of json){
                    console.log(i)
                    const li = document.createElement("li")
                    li.className = 'coins'
                    li.innerHTML = 
                    `
                    <img src="${i.image}" width="30px" alt="">
                    <p class="coin-name" >${i.name}</p>
                    <p>${i.symbol}</p>
                    <p>${i.current_price}$</p>
                    <p>${i.price_change_percentage_24h}%</p>
                    <p>${i.market_cap_rank}</p>
                    <p class="last">${i.market_cap}$</p>
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

function addCoins(){
    height = self.pageYOffset
    ul.innerHTML = `
    <li class="coins-part__conins-conatiner__table-header">
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
    loadCoins()
}
