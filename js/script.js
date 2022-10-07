const main = document.querySelector("main")
const alert = document.querySelector(".alert")
const seconds = document.querySelector(".seconds")
const article = document.querySelector(".login-article")
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

async function validation() {
    let userData = {user: userName.value, password: pass.value}
    await fetch('http://localhost:3000/user/login', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    }).then(response => response.json()).then(data => data.map(() => {
        if(data[0] === "Falha na autenticação"){
            typing()
            setTimeout(() => {location.reload()}, 5500)
        }else{
            article.style.display = "none"
            main.style.display = "flex"
            const userToken = document.querySelector(".userToken")
            userToken.innerHTML = data[0]
            const action = document.querySelector(".action")
            const filter = document.querySelector(".filter")
            const ticketStatus = document.querySelector(".status")
            const tag = document.querySelector(".tag")
            const argument = document.querySelector(".argument")
            const apply = document.querySelector(".apply")
            const adminArticle = document.querySelector(".admin-article")
            const adminUserName = document.querySelector("#adminUserName")
            const adminPass = document.querySelector("#adminPass")
            const section = document.querySelector("section")
            action.addEventListener("change", () => {
                switch(action.value) {
                    case "Buscar":
                        argument.placeholder = "  Buscar tickets"
                        ticketStatus.value = "- Selecione o status -"
                        argument.value = ""
                        filter.value = "- Selecione um filtro -"
                        ticketStatus.setAttribute("disabled", "disabled")
                        argument.setAttribute("disabled", "disabled")
                        filter.removeAttribute("disabled")
                        filter.addEventListener("change", () => {
                            switch(filter.value){
                                case "Tudo":
                                    argument.placeholder = " Buscar todos os tickets"
                                    ticketStatus.value = "- Selecione o status -"
                                    tag.value = "- Selecione a tag -"
                                    ticketStatus.setAttribute("disabled", "disabled")
                                    argument.setAttribute("disabled", "disabled")
                                    tag.setAttribute("disabled", "disabled")
                                break
                                case "Status":
                                    argument.placeholder = " Buscar tickets por status"
                                    tag.value = "- Selecione a tag -"
                                    ticketStatus.removeAttribute("disabled")
                                    argument.setAttribute("disabled", "disabled")
                                    tag.setAttribute("disabled", "disabled")
                                break
                                case "Tag":
                                    argument.placeholder = " Buscar tickets pela tag"
                                    ticketStatus.value = "- Selecione o status -"         
                                    ticketStatus.setAttribute("disabled", "disabled")
                                    argument.setAttribute("disabled", "disabled")
                                    tag.removeAttribute("disabled")
                                break
                                case "Id":
                                    argument.placeholder = " Insira o Id de busca"
                                    ticketStatus.value = "- Selecione o status -"
                                    tag.value = "- Selecione a tag -"
                                    ticketStatus.setAttribute("disabled", "disabled")
                                    argument.removeAttribute("disabled")
                                    tag.setAttribute("disabled", "disabled")
                                break
                                default:
                                    argument.placeholder = "  Aguardando comandos"
                                    ticketStatus.value = "- Selecione o status -"
                                    tag.value = "- Selecione a tag -"
                                    ticketStatus.setAttribute("disabled", "disabled")
                                    argument.setAttribute("disabled", "disabled")
                                    tag.setAttribute("disabled", "disabled")
                                break
                            }
                        })
                    break
                    case "Editar Status":
                        argument.placeholder = " Insira o id do ticket"
                        ticketStatus.value = "- Selecione o status -"
                        argument.value = ""
                        filter.value = "Id"
                        tag.value = "- Selecione a tag -"
                        ticketStatus.removeAttribute("disabled")
                        argument.removeAttribute("disabled")
                        filter.setAttribute("disabled", "disabled")
                        tag.setAttribute("disabled", "disabled")
                    break
                    case "Deletar":
                        argument.placeholder = ` Insira o id do ticket (ou deixe vazio para deletar todos)`
                        ticketStatus.value = "- Selecione o status -"
                        argument.value = ""
                        filter.value = "Id"
                        tag.value = "- Selecione a tag -"
                        ticketStatus.setAttribute("disabled", "disabled")
                        argument.removeAttribute("disabled")
                        filter.setAttribute("disabled", "disabled")
                        tag.setAttribute("disabled", "disabled")

                    break
                    default:
                        argument.placeholder = "  Aguardando comandos"
                        ticketStatus.value = "- Selecione o status -"
                        argument.value = ""
                        filter.value = "- Selecione um filtro -"
                        tag.value = "- Selecione a tag -"
                        ticketStatus.setAttribute("disabled", "disabled")
                        argument.setAttribute("disabled", "disabled")
                        filter.setAttribute("disabled", "disabled")
                        tag.setAttribute("disabled", "disabled")
                    break
                }
            })

            apply.addEventListener("click", async() => {
                let url = "https://sword-of-the-abyss-api.herokuapp.com/ticket/" 
                let params = {Authorization: `${userToken.value}`}
                switch(action.value) {
                    case "Buscar":
                        switch(filter.value){
                            case "Tudo":
                            break
                            case "Status":
                                url = `${url}status/${ticketStatus.value}`
                            break
                            case "Tag":
                                url = `${url}type/${tag.value}`
                            break
                            case "Id":
                                url = `${url}${argument.value}`
                            break
                            default:
                                url = null
                            break
                        }
                    break
                    case "Editar Status":
                        let ticketData = {status: `${ticketStatus.value}`}
                        await fetch(`${url}${argument.value}`, {method: 'PUT', headers: {'Authorization': `${userToken.value}`, 'Content-Type': 'application/json'}, body: JSON.stringify(ticketData)})
                    break
                    case "Deletar":
                        if (argument.value !== ""){
                        if (argument.value === "Todos"){await fetch(url, {method: 'DELETE', headers: {'Authorization': `${userToken.value}`}})
                        }else{await fetch(`${url}${argument.value}`, {method: 'DELETE', headers: {'Authorization': `${userToken.value}`}})}}
                    break
                    default:
                        url = null
                    break
                } 
                fetch(url, params).then(response => response.json()).then(ticket =>
                    document.querySelector(".user-tbody").innerHTML = ticket.reduce((accumulator, obj) => {
                        const data = new Date(Date.parse(obj.data))
                        let day = data.getDate()
                        let month = data.getMonth()
                        const year = data.getFullYear()
                        day < 10 ? day = `0${day}` : false	
                        month < 10 ? month = `0${month}` : false
                        accumulator += `<tr>
                                        <td>${obj.id}</td>
                                        <td>${obj.title}</td>
                                        <td>${day}/${month}/${year}</td>
                                        <td>${obj.type}</td>
                                        <td class="${obj.status} stn">${obj.status}</td>
                                        <td class="description"><details><summary>Exibir descrição completa</summary>${obj.description}</details></td>
                                        <td><a href ="mailto:${obj.contact}">${obj.contact}</a></td>
                                        </tr>`
                        return accumulator
                    },"")
                )
            })

            // login usersssssssssssssssssssssssssssssss
            async function adminValidation() {
                let userData = {user: adminUserName.value, password: adminPass.value}
                await fetch('http://localhost:3000/user/login-admin', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(userData)
                }).then(response => response.json()).then(data => data.map(() => {
                    if(data[0] === "Falha na autenticação"){
                        typing()
                        setTimeout(() => {location.reload()}, 5500)
                    }else{
                        adminArticle.style.display = "none"
                        main.style.display = "none"
                        section.style.display = "flex"
                        const adminToken = document.querySelector(".adminToken")
                        adminToken.innerHTML = data[0]
                        const adminAction = document.querySelector(".admin-action")
                        const adminArgument = document.querySelector(".admin-argument")
                        const adminCEmail = document.querySelector(".admin-c-email")
                        const adminCPassword = document.querySelector(".admin-c-password")
                        const adminApply = document.querySelector(".admin-apply")
                        adminAction.addEventListener("change", () => {
                            switch(adminAction.value){
                                case "Buscar usuários":
                                    adminArgument.placeholder = " Buscar todos os usuários"
                                    adminCEmail.placeholder = " Aguardando comandos"
                                    adminCPassword.placeholder = " Aguardando comandos"
                                    adminCEmail.setAttribute("disabled", "disabled")
                                    adminCPassword.setAttribute("disabled", "disabled")
                                    adminArgument.setAttribute("disabled", "disabled")
                                break
                                case "Criar usuário":
                                    adminArgument.placeholder = " Criar usuário"
                                    adminCEmail.placeholder = " Insira o email"
                                    adminCPassword.placeholder = " Insira a senha"
                                    adminCEmail.removeAttribute("disabled")
                                    adminCPassword.removeAttribute("disabled")
                                    adminArgument.setAttribute("disabled", "disabled")
                                break
                                case "Deletar usuário":
                                    adminArgument.placeholder = " Insira o id do usuário"
                                    adminCEmail.placeholder = " Aguardando comandos"
                                    adminCPassword.placeholder = " Aguardando comandos"
                                    adminCEmail.setAttribute("disabled", "disabled")
                                    adminCPassword.setAttribute("disabled", "disabled")
                                    adminArgument.removeAttribute("disabled")
                                break
                                default:
                                    adminArgument.placeholder = " Aguardando comandos"
                                    adminCEmail.placeholder = " Aguardando comandos"
                                    adminCPassword.placeholder = " Aguardando comandos"
                                    adminCEmail.setAttribute("disabled", "disabled")
                                    adminCPassword.setAttribute("disabled", "disabled")
                                    adminArgument.setAttribute("disabled", "disabled")
                                break
                            }
                        })
                        adminApply.addEventListener("click", async () => {
                            let adminUrl = 'http://localhost:3000/user/'
                            let adminParams = {}
                            switch(adminAction.value) {
                                case "Buscar":
                                    switch(filter.value){
                                        case "Buscar usuários":
                                            adminParams = {Authorization: `${userToken.value}`}
                                        break
                                        case "Criar usuário":
                                            let userData = {user: `${adminCEmail.value}`, password: `${adminCPassword.value}`}
                                            await fetch(adminUrl, {method: 'PUT', headers: {'Authorization': `${adminToken.value}`, 'Content-Type': 'application/json'}, body: JSON.stringify(userData)})
                                        break
                                        case "Deletar usuário":
                                            if (adminArgument.value !== ""){
                                            await fetch(`${adminUrl}${adminArgument.value}`, {method: 'DELETE', headers: {'Authorization': `${adminToken.value}`}})}
                                        break
                                        default:
                                            adminUrl = null
                                        break
                                    }
                                break
                            }
                            fetch(adminUrl, adminParams).then(response => response.json()).then(user =>
                                document.querySelector(".admin-tbody").innerHTML = user.reduce((accumulator, user) => {
                                    accumulator += `<tr>
                                                    <td>${user.id}</td>
                                                    <td>${user.email}</td>
                                                    <td>${user.email}</td>
                                                    </tr>`
                                    return accumulator
                                },"")
                            )
                        })
                    }
                }))
            }

            document.querySelector(".admin-section").addEventListener("click", () => {
                adminArticle.style.display = "flex"
            })

            document.querySelector(".admin-button").addEventListener("click", () => {
                adminValidation()
            })

        }
    }))
}

document.querySelector(".auth-button").addEventListener("click", () => {
    validation()
})