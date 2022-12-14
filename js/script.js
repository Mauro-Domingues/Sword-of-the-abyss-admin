const main = document.querySelector("main")
const alert = document.querySelector(".alert")
const seconds = document.querySelector(".seconds")
const article = document.querySelector(".login-article")
const userName = document.querySelector("#user")
const pass = document.querySelector("#pass")
const baseUrl = 'http://localhost:3000/' // colocar o link da api aqui
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
    let userData = {name: userName.value, password: pass.value}
    await fetch(`${baseUrl}user/login`, {
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
                        argument.placeholder = ` Insira o id do ticket (ou digite "Todos" para limpar o banco de dados)`
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
                let url = `${baseUrl}ticket/` 
                let params = {headers: {'Authorization': `${userToken.innerHTML}`}}
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
                        await fetch(`${url}${argument.value}`, {method: 'PUT', headers: {'Authorization': `${userToken.innerHTML}`, 'Content-Type': 'application/json'}, body: JSON.stringify(ticketData)})
                    break
                    case "Deletar":
                        if (argument.value !== ""){
                        if (argument.value === "Todos"){await fetch(url, {method: 'DELETE', headers: {'Authorization': `${userToken.innerHTML}`}})
                        }else{await fetch(`${url}${argument.value}`, {method: 'DELETE', headers: {'Authorization': `${userToken.innerHTML}`}})}}
                    break
                    default:
                        url = null
                    break
                } 
                fetch(url, params).then(response => response.json()).then(ticket =>
                    document.querySelector(".user-tbody").innerHTML = ticket.reduce((accumulator, obj) => {
                        accumulator += `<tr>
                                        <td>${obj.id}</td>
                                        <td>${obj.title}</td>
                                        <td>${new Date(obj.date).toLocaleDateString()}</td>
                                        <td>${obj.type}</td>
                                        <td class="${obj.status} stn">${obj.status}</td>
                                        <td class="description"><details><summary>Exibir descrição completa</summary>${obj.description}</details></td>
                                        <td><a href ="mailto:${obj.contact}">${obj.contact}</a></td>
                                        </tr>`
                        return accumulator
                    },"")
                )
            })

            async function adminValidation() {
                let userData = {name: adminUserName.value, password: adminPass.value}
                await fetch(`${baseUrl}user/login-admin`, {
                    method: 'POST', headers: {'Authorization': `${userToken.innerHTML}`, 'Content-Type': 'application/json'},
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
                        const adminCName = document.querySelector(".admin-c-name")
                        const adminCPassword = document.querySelector(".admin-c-password")
                        const adminApply = document.querySelector(".admin-apply")
                        adminAction.addEventListener("change", () => {
                            switch(adminAction.value){
                                case "Buscar usuários":
                                    adminCPassword.placeholder = " Aguardando comandos"
                                    adminArgument.placeholder = " Buscar todos os usuários"
                                    adminCName.placeholder = " Aguardando comandos" 
                                    adminCPassword.value = ""
                                    adminArgument.value = ""
                                    adminCName.value = ""  
                                    adminCName.setAttribute("disabled", "disabled")
                                    adminCPassword.setAttribute("disabled", "disabled")
                                    adminArgument.setAttribute("disabled", "disabled")
                                break
                                case "Criar usuário":                                   
                                    adminCPassword.placeholder = " Insira a senha"
                                    adminArgument.placeholder = " Criar usuário"
                                    adminCName.placeholder = " Insira o nome"
                                    adminArgument.value = ""
                                    adminArgument.setAttribute("disabled", "disabled")
                                    adminCPassword.removeAttribute("disabled")
                                    adminCName.removeAttribute("disabled")  
                                break
                                case "Deletar usuário":
                                    adminCPassword.placeholder = " Aguardando comandos" 
                                    adminArgument.placeholder = " Insira o id do usuário"
                                    adminCName.placeholder = " Aguardando comandos"
                                    adminCPassword.value = ""
                                    adminCName.value = ""                                 
                                    adminCPassword.setAttribute("disabled", "disabled")
                                    adminCName.setAttribute("disabled", "disabled")
                                    adminArgument.removeAttribute("disabled")
                                break
                                default:
                                    adminCPassword.placeholder = " Aguardando comandos"
                                    adminArgument.placeholder = " Aguardando comandos"
                                    adminCName.placeholder = " Aguardando comandos"                                   
                                    adminCPassword.value = ""
                                    adminArgument.value = ""
                                    adminCName.value = ""                                    
                                    adminCPassword.setAttribute("disabled", "disabled")
                                    adminArgument.setAttribute("disabled", "disabled")
                                    adminCName.setAttribute("disabled", "disabled")
                                break
                            }
                        })
                        adminApply.addEventListener("click", async () => {
                            let adminUrl = `${baseUrl}user/`
                            let adminParams = {headers: {'Authorization': `${adminToken.innerHTML}`}}
                            switch(adminAction.value){
                                case "Buscar usuários":
                                break
                                case "Criar usuário":
                                    let adminData = {name: `${adminCName.value}`, password: `${adminCPassword.value}`}
                                    await fetch(adminUrl, {method: 'POST', headers: {'Authorization': `${adminToken.innerHTML}`, 'Content-Type': 'application/json'}, body: JSON.stringify(adminData)})
                                break
                                case "Deletar usuário":
                                    if (adminArgument.value !== "" && adminArgument.value !== "1"){
                                    await fetch(`${adminUrl}${adminArgument.value}`, {method: 'DELETE', headers: {'Authorization': `${adminToken.innerHTML}`}})}
                                break
                                default:
                                    adminUrl = null
                                break
                            }
                            fetch(adminUrl, adminParams).then(response => response.json()).then(users =>
                                document.querySelector(".admin-tbody").innerHTML = users.reduce((accumulator, user) => {
                                    accumulator += `<tr>
                                                    <td>${user.id}</td>
                                                    <td>${user.name}</td>
                                                    <td>${user.password}</td>
                                                    </tr>`
                                    return accumulator
                                },"")
                            )
                        })
                    }
                }))
            }

            document.querySelector(".admin-section").addEventListener("click", () => {
                main.style.display = "none"
                adminArticle.style.display = "flex"
                document.querySelector(".admin-section").style.display = "none"
                document.querySelector(".header").innerHTML = "Administrador de usuários"
            })

            document.querySelector(".return-section").addEventListener("click", () => {
                main.style.display = "flex"
                section.style.display = "none"
                document.querySelector(".admin-section").style.display = "block"
                document.querySelector(".header").innerHTML = "Administrador de tickets de bugs e sugestões"
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