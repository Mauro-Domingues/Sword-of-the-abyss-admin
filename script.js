const action = document.querySelector(".action")
const filter = document.querySelector(".filter")
const ticketStatus = document.querySelector(".status")
const tag = document.querySelector(".tag")
const stn = document.querySelectorAll(".stn")
const argument = document.querySelector(".argument")
const apply = document.querySelector(".apply")

function colors() {
    for (let situation of stn){
        switch(situation.innerHTML){
            case "Resolvido":
                situation.style.color = "#05df05"
            break
            case "Pendente":
                situation.style.color = "#efef00"
            break
            case "Não Resolvido":
                situation.style.color = "#ef0505"
            break
            default:
        }
    }
}
colors()

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
            argument.placeholder = ` Insira o ${filter.value} do ticket`
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
            argument.placeholder = ` Insira o ${filter.value} do ticket`
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

apply.addEventListener("click", async () => {
    let params = {}
    switch(action.value) {
        case "Buscar":
            switch(filter.value){
                case "Status":
                    params = {
                        method: 'GET',
                        headers: new Headers(),
                        body: {'status' : `${ticketStatus.value}`},
                        mode: 'no-cors'
                    }
                break
                case "Tag":
                    params = {
                        method: 'GET',
                        headers: new Headers(),
                        body: {'type' : `${tag.value}`},
                        mode: 'no-cors'
                    }
                break
                case "Id":
                    params = {
                        method: 'GET',
                        headers: new Headers(),
                        body: {'id' : `${argument.value}`},
                        mode: 'no-cors'
                    }
                break
                default:
                    params = {
                        method: 'GET',
                        headers: new Headers(),
                        mode: 'no-cors'
                    }
                break
            }
        break
        case "Editar Status":
            params = {
                method: 'PUT',
                headers: new Headers(),
                body: {
                    'id' : `${argument.value}`,
                    'status' : `${ticketStatus.value}`
                },
                mode: 'cors'
            }
        break
        case "Deletar":
            params = {
                method: 'DELETE',
                headers: new Headers(),
                body: {
                    'id' : `${argument.value}`,
                },
                mode: 'cors'
            }
        break
        default:
        break
    }
    const url = id => `http://127.0.0.1:3000/ticket/${id}`
    const ticketPromises = () => Array(50).fill().map((_, i) =>
    fetch(url(i + 1), params).then(response => response))
    const listTickets = ticket => ticket.reduce((accumulator, {id, title, data, type, status, description, contact}) => {
        accumulator += `
                        <tr>
                        <td>${id}</td>
                        <td>${title}</td>
                        <td>${data}</td>
                        <td>${type}</td>
                        <td class="stn">${status}</td>
                        <td>${description}</td>
                        <td>${contact}</td>
                        </tr>`
        return accumulator
    },"")
    const buildList = ticket => {
        const tbody = document.querySelector("tbody")
        tbody.innerHTML = ticket
    }
    Promise.all(ticketPromises()).then(listTickets).then(buildList)
    colors()
})