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
const warningsElt = document.querySelector('.warnings');
const btnElts = document.querySelectorAll('button');
const inputElts = document.querySelectorAll('input');
let done = false;

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
    warningsElt.innerText = "";
    done = false;
    myCookiesElt.innerHTML = "";
    //If the cookie name already exists.
    let cookies = document.cookie.split(";");
    cookies.forEach(ck => {
    ck = ck.trim();
    let formatCk = ck.split("=");
    if (formatCk[0] === encodeURIComponent(name)) {
        done = true;
    }
    })

if (done === true) {
    warningsElt.innerText = "A cookie has already the same name.";
    return;
}
    //If the cookie doesn't have a name.
    if (name.length === 0) {
        warningsElt.innerText = "Impossible to define a cookie without a name.";
        return;
    }
    exp = new Date(exp).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp}`;
    let cookieElt = document.createElement('li');
    cookieElt.innerText = `Cookie ${name} created`;
    myCookiesElt.appendChild(cookieElt);
    setTimeout(() => {
        cookieElt.remove();
    }, 1500);
}

function displayAllCookies() {
    myCookiesElt.textContent = "";
    let cookies = document.cookie.split(";");
    if(cookies.join() === ""){
        warningsElt.innerText = "There are no cookies to display.";
        return;
    }
    cookies.forEach(ck => {
        ck = ck.trim();
        let formatCk = ck.split("=");
        let cookieElt = document.createElement('li');

        warningsElt.innerText = "Click on the cookie to delete it.";
        cookieElt.innerText = `Name : ${decodeURIComponent(formatCk[0])}, Value : ${decodeURIComponent(formatCk[1])}`;
        myCookiesElt.appendChild(cookieElt);

        //Supprimer un cookie
        cookieElt.addEventListener('click', () => {
            document.cookie = `${formatCk[0]}=; expires=${new Date(0)}`;
            cookieElt.innerText = `Cookie ${formatCk[0]} is deleted.`;
            setTimeout(() => {
                cookieElt.remove();
            }, 1000);
        })
    });
}
