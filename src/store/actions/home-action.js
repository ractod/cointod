const list = document.querySelector(".table-container__coins-part__coins-container")
const showCoins = document.querySelector(".show-coins-part")
const spinerLoading = document.querySelector(".show-coin-loading i")
const topListContainer = document.querySelector(".swiper-wrapper")

// اضافه کردن رویداد

list.addEventListener("click" , showSelectedCoin )
showCoins.addEventListener("click" , closeShowSlectedCoin )
topListContainer.addEventListener("click" , showTopCoin )

// نمایش ارز انتخاب شده

function showSelectedCoin(event){
    let coinSelected 

    if ( event.target.className == "coins"){
        coinSelected = event.target
    } else{
        coinSelected = event.target.parentElement
    }

    if (coinSelected){
        
        showCoins.innerHTML = `
        <div class="show-coins-part__container">
            <div class="show-coin-loading">
                <i class="fa-solid fa-circle-notch display"></i>
            </div>
        </div>
        `
        showCoins.style.display = "flex"
        spinerLoading.classList.toggle("display")
        let coinID 
        const coinName = coinSelected.children[1].innerText
        const promise = new Promise ((reslove,reject) => {
            reslove(
                fetch(`https://api.coingecko.com/api/v3/search?query=${coinName.toLowerCase()}`)
                    .then(response => response.json())
                    .then(json => {
                        coinID = json.coins[0].id
                    } )
            )
        })
        promise.then(() => {
            fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                showCoins.innerHTML = 
                `
                <div class="show-coins-part__container">
                    <div class="show-coins-part__first-content">
                        <div class="firt-content__left-text">
                            <img src="${json.image.small}}" alt="">
                            <p>${json.name}</p>
                        </div>
                        <div class="firt-content__right-text">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    <div class="show-coins-part__second-content">
                        <div class="seond-content__left-text">
                            <p>symbol : ${json.symbol}</p>
                            <p>site : <a target="_blank" href="${json.links.homepage[0]}">${json.links.homepage[0]}</a> </p>
                            <p>low 24h : ${json.market_data.low_24h.usd}$</p>
                            <p>high 24h : ${json.market_data.high_24h.usd}$</p>
                        </div>
                        <div class="seond-content__right-text">
                            <p>score : ${json.community_score}</p>
                            <p>price : ${json.market_data.current_price.usd}$</p>
                            <p>market cap : ${json.market_data.market_cap.usd}$</p>
                            <p>rank : ${json.market_cap_rank}</p>
                        </div>
                    </div>
                    <div class="show-coins-part___third-content">
                        ${json.description.en}
                    </div>
                </div>
                `
                
                spinerLoading.classList.toggle("display")
            })
            .catch(error => {showCoins.innerHTML = `
            <div class="show-coins-part__container">
            <div class="show-coin-loading">
                <h1 class="error">try again!</h1>
                <i class="fa-solid fa-xmark"></i>
            </div>
            </div>
            `})
        })
    }
}

// بستن بخش ارز انتخاب شده

function closeShowSlectedCoin(event){
    if ( event.target.classList[1] == "fa-xmark"){
        if ( showCoins.style.display == "flex" ){
            showCoins.style.display = "none" 
        }
    }

    if ( event.target.className == "show-coins-part"){
        if ( showCoins.style.display == "flex" ){
            showCoins.style.display = "none" 
        }
    }
}

// نمایش رمز ارز برتر انتخاب شده



function showTopCoin(event){
    let coinSelected
    if ( event.target.classList[0] == "swiper-slide" ){
        coinSelected = event.target
    } else if ( event.target.className == 'swiper-slide__top-content'){
        coinSelected = event.target.parentElement
    } else if (event.target.tagName == "IMG" || event.target.tagName == "H1"){
        coinSelected = event.target.parentElement.parentElement
    }

    if (coinSelected){
        showCoins.innerHTML = `
        <div class="show-coins-part__container">
            <div class="show-coin-loading">
                <i class="fa-solid fa-circle-notch display"></i>
            </div>
        </div>
        `
        showCoins.style.display = "flex"
        spinerLoading.classList.toggle("display")
        console.log("test")
        coinName = coinSelected.children[0].children[1].innerText
        let coinID
        const promise = new Promise ((reslove,reject) => {
            reslove(
                fetch(`https://api.coingecko.com/api/v3/search?query=${coinName.toLowerCase()}`)
                    .then(response => response.json())
                    .then(json => {
                        coinID = json.coins[0].id
                    } )
            )
        })
        promise.then(() => {
            fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`)
            .then(response => response.json())
            .then(json => {
                
                showCoins.innerHTML = 
                `
                <div class="show-coins-part__container">
                    <div class="show-coins-part__first-content">
                        <div class="firt-content__left-text">
                            <img src="${json.image.small}}" alt="">
                            <p>${json.name}</p>
                        </div>
                        <div class="firt-content__right-text">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    <div class="show-coins-part__second-content">
                        <div class="seond-content__left-text">
                            <p>symbol : ${json.symbol}</p>
                            <p>site : <a target="_blank" href="${json.links.homepage[0]}">${json.links.homepage[0]}</a> </p>
                            <p>low 24h : ${json.market_data.low_24h.usd}$</p>
                            <p>high 24h : ${json.market_data.high_24h.usd}$</p>
                        </div>
                        <div class="seond-content__right-text">
                            <p>score : ${json.community_score}</p>
                            <p>price : ${json.market_data.current_price.usd}$</p>
                            <p>market cap : ${json.market_data.market_cap.usd}$</p>
                            <p>rank : ${json.market_cap_rank}</p>
                        </div>
                    </div>
                    <div class="show-coins-part___third-content">
                        ${json.description.en}
                    </div>
                </div>
                `
                
                spinerLoading.classList.toggle("display")
            })
            .catch(error => {showCoins.innerHTML = `
            <div class="show-coins-part__container">
            <div class="show-coin-loading">
                <h1 class="error">try again!</h1>
                <i class="fa-solid fa-xmark"></i>
            </div>
            </div>
            `})
        })
    }
}

