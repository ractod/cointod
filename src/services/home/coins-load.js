const ul = document.querySelector(".table-container__coins-part__coins-container")
const topList = document.querySelector(".swiper-wrapper")
const loadingLogo = document.querySelector(".loading i")

document.addEventListener("DOMContentLoaded" , () => {
    try{
        fetch("https://api.coingecko.com/api/v3/search/trending")
         .then(response => response.json())
         .then(json => {
            for ( let item of json.coins ){
                const coinId = item.item.id
               fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
               .then(response => response.json() )
               .then(json => {
                   const div = document.createElement("div")
                   div.className = "swiper-slide"
                   div.innerHTML = `
                   <div class="swiper-slide__top-content">
                           <img src="${json.image.small}" alt="">
                           <h1>${json.name}</h1>
                       </div>
                       <div class="swiper-slide__bottom-content">
                           <p>symnbol : ${json.symbol}</p>
                           <p>rank : ${json.market_cap_rank}</p>
                           <p>price : ${json.market_data.current_price.usd}$</p>
                           <p>market cap : ${json.market_data.market_cap.usd}$</p>
                   </div>
                   `
                   topList.appendChild(div)
               })
               .then(() => {
                    if ( topList.children.length == 6  ){
                        let space = 60
                        let slide = 3
                        if ( window.innerWidth < 768 ){
                            space = 60
                            slide = 1
                        }else if (window.innerWidth > 1367 ){
                            slide = 4 
                        }
                        const topListSwiper = new Swiper(".top-list-part__container" , {
                            navigation : {
                                nextEl : ".fa-angle-right",
                                prevEl : ".fa-angle-left"
                            },
                            loop: true,
                            autoplay: {
                                delay : 3500
                            }, 
                            speed: 500 ,
                            slidesPerView: slide ,
                            spaceBetween: space ,
                            
                        })
                    }
            })
            }
         })
        
    }catch (error){
            console.log("wrong")
            topList.innerHTML = "<h1>try agian!!</h1>"
    }

    
    try{
        loadingLogo.classList.toggle("fa-circle-notch")
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                for (let i of json){
                    const li = document.createElement("li")
                    li.className = 'coins'
                    li.innerHTML = 
                    `
                    <img src="${i.image}" width="30px" alt="">
                    <p class="coin-name">${i.name}</p>
                    <p>${i.symbol}</p>
                    <p>${i.current_price}$</p>
                    <p>${i.price_change_percentage_24h}%</p>
                    <p>${i.market_cap_rank}</p>
                    <p  class="last">${i.market_cap}$</p>
                    `
                    ul.appendChild(li)
                    loadingLogo.classList.toggle("fa-circle-notch")
                }
                loadingLogo.classList.toggle("fa-circle-notch")
            })
    }catch(error){
        () => {
            loadingLogo.innerText = "try again!!"
        }
    }
})
