function toggleClassName(){
    const sidebarElt = document.querySelector(".sidebar");
    const openElt = document.getElementById('open');
    const closeElt = document.getElementById('close');

    sidebarElt.classList.toggle('active');

    if(sidebarElt.classList.contains('active')){
        openElt.style.display = "none";
        closeElt.style.display = "block";
    }
    else{
        openElt.style.display = "block";
        closeElt.style.display = "none";
    }
}

const myCookiesElt = document.querySelector('.myCookies');
const warningsElt = document.querySelector('.warnigns');
const btnElts = document.querySelectorAll('button');
const inputElts = document.querySelectorAll('input');

//Date
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

//let day = ('0' + nextWeek); //To turn nextWeek into a string
let day = nextWeek.getDate().toString() 
let month = (today.getMonth() + 1).toString();
let year = today.getFullYear().toString();
//console.log(day, month, year) 
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;
btnElts.forEach(btn => {
    btn.addEventListener('click', btnAction);
});

function btnAction(e) {

    let newObj = {};

    inputElts.forEach(input => {
        let attributeName = input.getAttribute('name');
        let attributeValue = attributeName !== "CookieExpire" ? input.value : input.valueAsDate;
        newObj[attributeName] = attributeValue;
    });  
    let description = e.target.getAttribute('data-cookie');

    if(description === "create"){
        createCookie(newObj.cookieName, newObj.cookieValue, newObj.cookieExpire);
    } else if (description === "displayAll"){
        displayAllCookies();
    }
}

function createCookie(name, value, exp) {
    exp = new Date(exp).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp}`;
    let cookieElt = document.createElement('li');
    cookieElt.innerText = `Cookie ${name} created`;
    myCookiesElt.appendChild(cookieElt);
    setTimeout(() => {
        cookieElt.remove();
    }, 1500);
}