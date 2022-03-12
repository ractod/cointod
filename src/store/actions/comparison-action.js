const input = document.querySelectorAll("input")
const rightUl = document.querySelector(".right-content__search-bar__result-container")
const leftUl = document.querySelector(".left-content__search-bar__result-container")
const rightInput = document.querySelector(".right-input")
const leftInput = document.querySelector(".left-input")
const allUl = document.querySelectorAll("ul")

let count = 0
let test = false
let time 

for ( let i of  allUl ){
    i.addEventListener("click" , showSelectedCoin )
}

for(let i of input ){
    i.addEventListener("keydown" , gettingValue )
    i.addEventListener("click" , closeResult )
}

function searching(value,position){

    document.querySelector(`.${position}-content__search-bar__result-container`).style.display = "block"
    document.querySelector(`.${position}-content__search-bar__result-container`).innerHTML = `
            <li class="error">
                <i class="fa-solid fa-circle-notch ${position}-loading"></i>
            </li>`

    fetch(`https://api.coingecko.com/api/v3/search?query=${value}`)
        .then(response => response.json() )
        .then(json => {

            for (let i = 0 ; i <= 8 ; i++ ){
                const li = document.createElement("li")
                li.className = "result"
                li.innerHTML = `
                    <img src="${json.coins[i].thumb}" alt="">
                    <p>${json.coins[i].name}</p>
                `
                document.querySelector(`.${position}-content__search-bar__result-container`).appendChild(li)
            } 
        })
        .catch(() => {document.querySelector(`.${position}-content__search-bar__result-container`).innerHTML = "<h3 style='color: red'>not founded</h3>"})
}

function gettingValue(event){
    let position 
    const regex = /\w/

    if ( event.target.className == "right-input"){
        position = "right"
        leftUl.style.display = "none"
        leftUl.innerHTML = `
        <li class="error">
                            <i class="fa-solid fa-circle-notch right-loading"></i>
                        </li
        `

    } else {
        position = "left"
        rightUl.style.display = "none"
        rightUl.innerHTML = `
        <li class="error">
                            <i class="fa-solid fa-circle-notch right-loading"></i>
                        </li
        `
    }

        if (regex.test(event.target.value) == false ){
            if(test == true ){  
                clearTimeout(time)
                test = false 
            }

            document.querySelector(`.${position}-content__search-bar__result-container`).innerHTML = ``
            document.querySelector(`.${position}-content__search-bar__result-container`).style.display = "none"

        } else {
            if(test == true ){
                clearTimeout(time)
                test = false
            }
    
            test = true 
            time = setTimeout(() => {
                searching(event.target.value,position)
            } , 1000)
        }
    
}

function closeResult(event){
    if ( event.target.className == "right-input"){
        leftInput.value = ""
        leftUl.style.display = "none"
        leftUl.innerHTML = `
        <li class="error">
                            <i class="fa-solid fa-circle-notch right-loading"></i>
                        </li
        `
    } else {
        rightInput.value = ""
        rightUl.style.display = "none"
        rightUl.innerHTML = `
        <li class="error">
                            <i class="fa-solid fa-circle-notch right-loading"></i>
                        </li
        `
    }
}

function showSelectedCoin(event){
    if ( event.target.className == "result"){
        let position 
        if ( event.target.parentElement.className == "left-content__search-bar__result-container"){
            position = "left"
            leftUl.style.display = "none"
            leftUl.innerHTML = ""            
            leftInput.value = ""
        } else {
            position = "right"
            rightUl.style.display = "none"
            rightUl.innerHTML = ""
            rightInput.value = ""
        }

        
        const coinName = event.target.children[1].innerText
        fetch(`https://api.coingecko.com/api/v3/search?query=${coinName}`)
            .then(response => response.json())
            .then(json => {
                const coinId = json.coins[0].id
                fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
                    .then(response => response.json())
                    .then(json => {
                        document.querySelector(`.${position}-coin-information`).innerHTML = `
                            <div class="coin-information__top-content">
                                <img src="${json.image.small}"id="coin-logo">
                                <h3>${json.name}</h3>
                            </div>

                            <div class="coin-information__bottom-content">
                                <P>symbol : ${json.symbol}</P>
                                <P>rank : ${json.market_cap_rank}</P>
                                <p>low 24h : ${json.market_data.low_24h.usd}$</p>
                                <p>high 24h : ${json.market_data.high_24h.usd}$</p>
                                <p>price : ${json.market_data.current_price.usd}$</p>
                                <p>market cap : ${json.market_data.market_cap.usd}$</p>
                            </div>
                        `
                    })
            })
    }
}

