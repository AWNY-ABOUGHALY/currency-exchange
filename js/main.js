let firstCountry = document.querySelector(".firstcountry select");
let secondCountry = document.querySelector(".secondcountry select");
let beginningMsg = document.querySelector(".beginningmsg");

fetch("https://v6.exchangerate-api.com/v6/b748c6fc007bc155477c12e4/latest/USD")
.then((e)=> e.json())
.then((datafile)=>{
    let myObj = datafile.conversion_rates;
    for(const k in myObj) {
        let firstOptions = `<option value="${k}">${k}</option>`
        let secondOptions = `<option value="${k}">${k}</option>`
        firstCountry.innerHTML += firstOptions;
        secondCountry.innerHTML += secondOptions;
    }
    let firstdefaultOpt = document.querySelector(`.firstcountry select option[value="USD"]`)
    firstdefaultOpt.setAttribute("selected","selected")
    let seconddefaultOpt = document.querySelector(`.secondcountry select option[value="EGP"]`)
    seconddefaultOpt.setAttribute("selected","selected")
})

let exchangeBtn = document.querySelector(".exbtn");
let exchangeEqual = document.querySelector(".exchangeequal");
let calcArrow = document.querySelector("#mainarrow");

exchangeBtn.addEventListener("click",()=>{
    if(calcArrow.className === "fa-solid fa-angles-up") {
        beginningMsg.style.display = "none";
        let firstOptionValue = firstCountry.value;
        firstCountry.addEventListener("change",(e)=>{
            firstOptionValue = e.target.value;
            return firstOptionValue;
        })
        let secondOptionValue = secondCountry.value;
        secondCountry.addEventListener("change",(e)=>{
            secondOptionValue = e.target.value;
            return secondOptionValue;
        })
        fetch(`https://v6.exchangerate-api.com/v6/b748c6fc007bc155477c12e4/latest/${firstOptionValue}`)
        .then((e)=> e.json())
        .then((data)=> {
            let convRate = data.conversion_rates[secondOptionValue];
            exchangeEqual.innerHTML = `1 ${firstOptionValue} Equal`
            let equlaTo = document.querySelector(".equalto");
            equlaTo.innerHTML = `${secondOptionValue}`
            let mainScreen = document.querySelector(".exchangescreen div.screen");
            mainScreen.textContent = convRate;
            let updatedScreen = document.querySelector(".headscreen");
            updatedScreen.textContent = `Updated ${data.time_last_update_utc.slice(0,16)}`;
        })
        let compareTitle = document.querySelector(".comparetitle");
        compareTitle.innerHTML = `${secondOptionValue} VS A Global Currencies`
        let compareOneHead = document.querySelector(".compareonehead");
        let compareTwoHead = document.querySelector(".comparetwohead");
        let compareThreeHead = document.querySelector(".comparethreehead");
        let compareOneCont = document.querySelector(".compareonecont");
        let compareTwoCont = document.querySelector(".comparetwocont");
        let compareThreeCont = document.querySelector(".comparethreecont");
        function usdFetch() {
            fetch(`https://v6.exchangerate-api.com/v6/b748c6fc007bc155477c12e4/latest/USD`)
            .then((e)=> e.json())
            .then((data)=> {
            let convRate = data.conversion_rates[secondOptionValue];
            compareOneHead.innerHTML = `<div>U. S. Dollar</div><div>Equal to</div>`
            compareOneCont.innerHTML = `<div><img src="./imgs/usd.png" class="mx-1">$1</div><div>${convRate} ${secondOptionValue}</div>`
            })
        }
        function eurFetch() {
            fetch(`https://v6.exchangerate-api.com/v6/b748c6fc007bc155477c12e4/latest/EUR`)
            .then((e)=> e.json())
            .then((data)=> {
            let convRate = data.conversion_rates[secondOptionValue];
            compareTwoHead.innerHTML = `<div>European Euro</div><div>Equal to</div>`
            compareTwoCont.innerHTML = `<div><img src="./imgs/eur.png" class="mx-1">€1</div><div>${convRate} ${secondOptionValue}</div>`
            })
        }
        function gbpFetch() {
            fetch(`https://v6.exchangerate-api.com/v6/b748c6fc007bc155477c12e4/latest/GBP`)
            .then((e)=> e.json())
            .then((data)=> {
            let convRate = data.conversion_rates[secondOptionValue];
            compareThreeHead.innerHTML = `<div>Pound Sterling</div><div>Equal to</div>`
            compareThreeCont.innerHTML = `<div><img src="./imgs/gbp.png" class="mx-1">£1</div><div>${convRate} ${secondOptionValue}</div>`
            })
        }
        // alternate fetch
        function cnyFetch(head,cont) {
            fetch(`https://v6.exchangerate-api.com/v6/b748c6fc007bc155477c12e4/latest/CNY`)
            .then((e)=> e.json())
            .then((data)=> {
            let convRate = data.conversion_rates[secondOptionValue];
            head.innerHTML = `<div>Chinese yuan</div><div>Equal to</div>`
            cont.innerHTML = `<div><img src="./imgs/cny.png" class="mx-1">¥1</div><div>${convRate} ${secondOptionValue}</div>`
            })
        }
        if(firstOptionValue !== "USD" && firstOptionValue !== "EUR" && firstOptionValue !== "GBP") {
            usdFetch();
            eurFetch();
            gbpFetch();
        } else if (firstOptionValue === "USD") {
            cnyFetch(compareOneHead,compareOneCont);
            eurFetch();
            gbpFetch();
        } else if (firstOptionValue === "EUR") {
            usdFetch();
            cnyFetch(compareTwoHead,compareTwoCont);
            gbpFetch();
        } else if (firstOptionValue === "GBP") {
            usdFetch();
            eurFetch();
            cnyFetch(compareThreeHead,compareThreeCont);
        }
        let compareDiv = document.querySelector(".compare");
        compareDiv.style.cssText = "visibility: visible; opacity:1; transition: visibility 2s linear, opacity 2s linear;";
        let exchangeScreenDiv = document.querySelector(".exchangescreen");
        exchangeScreenDiv.style.cssText = "display:flex; flex-direction:column; justify-content:center; align-items:center";
    }
})

let switchArrow = document.querySelector(".switcharrow");
switchArrow.addEventListener("click",()=>{
    let firstValue = firstCountry.value
    let secondValue = secondCountry.value
    firstCountry.value = secondValue
    secondCountry.value = firstValue
})

let errorMsg = document.querySelector(".errormsg");
let btns = document.querySelectorAll(".calcbtns .digit");
let checkValid = /^(?:[0-9.] ?){1,8}$/;
btns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        firstAmountInpt.value += btn.value;
        if(checkValid.test(firstAmountInpt.value) === true || firstAmountInpt.value === "") {
            errorMsg.style.cssText = `display:none;`;
        } else if(checkValid.test(firstAmountInpt.value) === false) {
            errorMsg.style.cssText = `display:block; background-color:orange;`
            errorMsg.innerHTML = "Just Numbers Please";
        }
    })
})

let calcArrowDiv = document.querySelector("div.calc");
let calculatorDiv = document.querySelector(".calculator");
let exchangeScreenDiv = document.querySelector(".exchangescreen");
let compareDiv = document.querySelector(".compare");

let topHalf = document.querySelector(".tophalf");
let bottomHalf = document.querySelector(".bottomhalf");
let convAmount = document.querySelector(".convamount")

let firstAmountInpt = document.querySelector(".firstamount input");
let secondAmount = document.querySelector(".secondamount input");

calcArrowDiv.addEventListener("click",()=>{
    if(calcArrow.className === "fa-solid fa-angles-up") {
        calcArrowDiv.style.cssText = "background-color:#6C0241;"
        beginningMsg.style.display = "none";
        errorMsg.style.display = "none";
        exchangeScreenDiv.style.cssText = "display:none";
        compareDiv.style.cssText = "visibility:hidden; opacity:0;transition: visibility 0s linear, opacity 0s linear;";
        calculatorDiv.style.cssText = "display:block";
        calcArrow.setAttribute("class","fa-solid fa-angles-down");
        topHalf.style.cssText = "height: 305px"
        bottomHalf.style.cssText = "height: 150px"
        convAmount.style.cssText = "display:flex; justify-content:space-between;";
        let exchangeBtn = document.querySelector(".exbtn");
        exchangeBtn.addEventListener("click",()=>{
            if(checkValid.test(firstAmountInpt.value) === true && firstAmountInpt.value !== ".") {
                let firstOptionValue = firstCountry.value;
                let secondOptionValue = secondCountry.value;
                fetch(`https://v6.exchangerate-api.com/v6/b748c6fc007bc155477c12e4/latest/${firstOptionValue}`)
                .then((n)=> n.json())
                .then((dataamount)=> {
                    let convRate = dataamount.conversion_rates[secondOptionValue]*firstAmountInpt.value;
                    secondAmount.value = `${convRate}`
                })
            } else {
                errorMsg.style.cssText = `display:block;`;
                errorMsg.innerHTML = "Invalid Amount";
            }
        })
        let clearBtn = document.querySelector(".calcbtns .clearbtn");
        clearBtn.addEventListener("click",()=>{
            firstAmountInpt.value = "";
            secondAmount.value = "";
            errorMsg.style.cssText = `display:none;`;
        })
        firstAmountInpt.addEventListener("keyup",()=>{
            if(checkValid.test(firstAmountInpt.value) === true || firstAmountInpt.value === "") {
                errorMsg.style.cssText = `display:none;`;
            } else if(checkValid.test(firstAmountInpt.value) === false) {
                errorMsg.style.cssText = `display:block; background-color:orange;`
                errorMsg.innerHTML = "Just Numbers Please"
            }
        })
    } else if (calcArrow.className === "fa-solid fa-angles-down") {
        calcArrowDiv.style.cssText = ""
        calcArrow.setAttribute("class","fa-solid fa-angles-up");
        topHalf.style.cssText = "";
        bottomHalf.style.cssText = "";
        convAmount.style.cssText = "";
        exchangeScreenDiv.style.cssText = "display:flex; flex-direction:column; justify-content:center; align-items:center"
        let mainScreen = document.querySelector(".exchangescreen div.screen");
        if(mainScreen.textContent === ""){
            compareDiv.style.cssText = "visibility:hidden; opacity:0; transition: visibility 0s linear 0.5s, opacity 0s;"
            beginningMsg.style.display = "";
        } else {
            compareDiv.style.cssText = "visibility:visible; opacity:1; transition: visibility 2s linear, opacity 2s linear;"
            beginningMsg.style.display = "none";
        }
        calculatorDiv.style.cssText = "display:none";
    }    
})