const main = document.querySelector("main")
const alert = document.querySelector(".alert")
const seconds = document.querySelector(".seconds")
const article = document.querySelector("article")
const userName = document.querySelector("#user")
const pass = document.querySelector("#pass")
const message = "543210"
let i = 0;

function typing(){
    alert.style.display = "block"
    if (i < message.length){
        seconds.textContent = message.charAt(i)
        i++
        setTimeout(typing, 1000)
    }
}

export async function validation() {
    let userData = {user: userName.value, password: pass.value}
    await fetch('https://sword-of-the-abyss-api.herokuapp.com/ticket/users', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    }).then(response => response.json()).then(data => data.map(() => {
        if(data[0] === "Denied"){
            typing()
            setTimeout(() => {location.reload()}, 5500)
        }else{
            article.style.display = "none"
            main.style.display = "flex"
        }
    }))
}