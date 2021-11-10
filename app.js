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

//Date
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

//let day = ('0' + nextWeek); //To turn nextWeek into a string
let day = nextWeek.getDate().toString() 
let month = (today.getMonth() + 1).toString();
let year = today.getFullYear().toString();
console.log(day, month, year) 
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

