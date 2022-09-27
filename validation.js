const main = document.querySelector("main")
const alert = document.querySelector(".alert")
const seconds = document.querySelector(".seconds")
const article = document.querySelector("article")
const userName = document.querySelector("#user")
const pass = document.querySelector("#pass")

const users = [
    {user: "admin0", password: "12345"},
    {user: "admin1", password: "123456"},
    {user: "admin2", password: "1234567"},
    {user: "admin3", password: "12345678"},
    {user: "admin4", password: "123456789"}
]

export function validation() {
    users.map(() => {
        let j = 0;
        let k = 0;
        const message = "543210"
        function typing(){
            alert.style.display = "block"
            if (j < message.length){
                seconds.textContent = message.charAt(j)
                j++
                setTimeout(typing, 1000)
            }
        }
        for(let i = 0; i < users.length; i++){
            if(userName.value === users[i].user){
                if(pass.value === users[i].password){
                    article.style.display = "none"
                    main.style.display = "flex"
                    break
                }else{
                    typing()
                    setTimeout(() => {location.reload()}, 5500)
                }
            }else{
                k++
            }
        }
        if(k === users.length){
            typing()
            setTimeout(() => {location.reload()}, 5500)
        }
    })
}