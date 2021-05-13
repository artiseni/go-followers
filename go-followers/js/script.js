$.ajax({
    url : '../data/data.json',
    dataType: 'json',
    success : function (res){ 
        let sosmed = []
        displayData(sosmed, res)
        event_submit()
    }, error : function (err){
        console.log(err)
    }
})

function cards(i, data){
    let str = 
    `<div class="card text-white bg-dark">
        <div class="card-header">
            <img class="card-img-top" src="${data[i].image}">
        </div>
        <div class="card-body">
        <h5 class="card-title">${data[i].name}</h5>
        <div class="btnSubmit">
            <a class="btn btn-primary btnSub" data="${data[i].name}">Cek harga!</a>
        </div>
        </div>
    </div>`
    return str
}

function displayData(sosmed, res){
    
    let div = ''
    let name = res.name

    for(let i = 0; i < res.length; i++) {
        sosmed.push(res[i].name)
        div+=cards(i, res)
    }
    return $('.list-menu').html(div)
}


function event_submit(){

    let btnSub = document.getElementsByClassName('btnSub')    
    for(let i = 0; i < btnSub.length; i++) {
        checkBtn(i, btnSub)
    }
}

function checkBtn(i, btnSub){
    btnSub[i].addEventListener('click', function (){
        $('.list-menu').css('display', 'none')
        $.ajax({
            url : '../data/data.json',
            dataType: 'json',
            success : function (res){ 
                let data = btnSub[i].getAttribute('data')
                let checkIndex = res.findIndex(find => find.name === data)
                let newData = res[checkIndex]
                
                let name = newData.name
                let type = newData.type
                let price = newData.price

                appendToContent(type)

                let hidden = $('.hidden')
                
                // hiden div (prices)
                for(let i = 0; i < type.length; i++) {
                    hiddenDiv(`${name} ${type[i]}`, hidden[i])
                }

                // prices

                let listPop = document.getElementsByClassName(`${name}`)

                // get higgest value from prices

                let lengthObj = Object.keys(price).length
                let tmp = []
                for(let j = 0; j < lengthObj; j++) {
                    tmp.push(price[j].length)
                }
                let max = tmp.reduce((a, b) => {
                    return Math.max(a, b);
                })

                // condition by sosmad name
                displayPrises(type, price, listPop, max)

                // for undefined div

                let eliminate = $('.colsFol')                
                for(let e = 0; e < eliminate.length; e++) {
                    if (eliminate[e].innerHTML === 'undefined') {
                        eliminate[e].style.display = 'none'
                    }
                }

                // click card even
                clickCard(eliminate)
            }
        })
    })
}

function clickCard(eliminate){
    for(let i = 0; i < eliminate.length; i++) {
        eliminate[i].addEventListener('click', function (){
            let parentClass = eliminate[i].parentElement.className
            let parent = parentClass.replace('list-pop', '')
            let data = eliminate[i].innerHTML
            let text = `Hallo, Saya pesan : ${parent} ${data}`
            window.open(`https://web.whatsapp.com/send?phone=6283806725271&text=${text}`, '_blank');
        })
    }
}

function displayPrises(type, price, listPop, max){
    for(let i = 0; i < max; i++) {
        countTittle(type, i, price, listPop)
    }
}

function hiddenDiv(title, i){
    let str =
        `<div class="list-pop ${title}">
            <div class="card1 header"><h2></h2></div>
            <div class="card1 header"><h2></h2></div>
            <div class="card1 header"><h2>${title}</h2></div> 
        </div>`
    return i.innerHTML = str
}

// count type elements

function countTittle(type, i, price, listPop){
    for(let l = 0; l < type.length; l++) {
        addDiv(price[l][i], listPop[l])
    }
}

// add div tag to class list-pop

function addDiv(data, titleClass){    
    let str_div = document.createTextNode(`${data}`)
    let div = document.createElement('div')
    div.className = 'card1 colsFol'
    div.appendChild(str_div)

    return titleClass.appendChild(div)
}

// append hidden classes to content class

function appendToContent(type){
    let content = document.getElementsByClassName('content')

    type.forEach(el => {
        let div = document.createElement('div')
        let br = document.createElement('br')
        div.className = 'hidden'
        
        content[0].appendChild(div)
        content[0].appendChild(br)
    });
}