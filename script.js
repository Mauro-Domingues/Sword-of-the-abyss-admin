const action = document.querySelector(".action")
const filter = document.querySelector(".filter")
const ticketStatus = document.querySelector(".status")
const tag = document.querySelector(".tag")
const stn = document.querySelectorAll(".stn")
const argument = document.querySelector(".argument")
const apply = document.querySelector(".apply")
const url = "http://127.0.0.1:3000"

function colors() {
    for (let situation of stn){
        switch(situation.innerHTML){
            case "Resolvido":
                situation.style.color = "#00e000"
            break
            case "Pendente":
                situation.style.color = "#e0e000"
            break
            case "Não Resolvido":
                situation.style.color = "#e00000"
            break
            default:
        }
    }
}

colors()

action.addEventListener("change", () => {
    switch(action.value) {
        case "Buscar":
            filter.value = "- Selecione um filtro -"
            ticketStatus.value = "- Selecione o status -"
            argument.placeholder = `  Buscar tickets`
            filter.removeAttribute("disabled")
            ticketStatus.setAttribute("disabled", "disabled")
            argument.setAttribute("disabled", "disabled")
            filter.addEventListener("change", () => {
                switch(filter.value){
                    case "Tudo":
                        ticketStatus.value = "- Selecione o status -"
                        tag.value = "- Selecione a tag -"
                        argument.placeholder = ` Buscar todos os tickets`
                        ticketStatus.setAttribute("disabled", "disabled")
                        argument.setAttribute("disabled", "disabled")
                        tag.setAttribute("disabled", "disabled")
                    break
                    case "Status":
                        tag.value = "- Selecione a tag -"
                        argument.placeholder = ` Buscar tickets por status`
                        ticketStatus.removeAttribute("disabled")
                        argument.setAttribute("disabled", "disabled")
                        tag.setAttribute("disabled", "disabled")
                    break
                    case "Tag":
                        ticketStatus.value = "- Selecione o status -"
                        argument.placeholder = ` Buscar tickets pela tag`
                        ticketStatus.setAttribute("disabled", "disabled")
                        argument.setAttribute("disabled", "disabled")
                        tag.removeAttribute("disabled")
                    break
                    case "Id":
                        argument.placeholder = ` Insira o Id de busca`
                        ticketStatus.value = "- Selecione o status -"
                        tag.value = "- Selecione a tag -"
                        ticketStatus.setAttribute("disabled", "disabled")
                        tag.setAttribute("disabled", "disabled")
                        argument.removeAttribute("disabled")
                    break
                    default:
                        ticketStatus.value = "- Selecione o status -"
                        tag.value = "- Selecione a tag -"
                        argument.placeholder = `  Aguardando comandos`
                        argument.setAttribute("disabled", "disabled")
                        ticketStatus.setAttribute("disabled", "disabled")
                        tag.setAttribute("disabled", "disabled")
                    break
                }
            })
        break
        case "Editar Status":
            filter.value = "Id"
            ticketStatus.value = "- Selecione o status -"
            tag.value = "- Selecione a tag -"
            filter.setAttribute("disabled", "disabled")
            tag.setAttribute("disabled", "disabled")
            ticketStatus.removeAttribute("disabled")
            argument.removeAttribute("disabled")
            argument.placeholder = ` Insira o ${filter.value} do ticket`
        break
        case "Deletar":
            filter.value = "Id"
            ticketStatus.value = "- Selecione o status -"
            tag.value = "- Selecione a tag -"
            filter.setAttribute("disabled", "disabled")
            ticketStatus.setAttribute("disabled", "disabled")
            tag.setAttribute("disabled", "disabled")
            argument.removeAttribute("disabled")
            argument.placeholder = ` Insira o ${filter.value} do ticket`
        break
        default:
            filter.value = "- Selecione um filtro -"
            ticketStatus.value = "- Selecione o status -"
            tag.value = "- Selecione a tag -"
            argument.placeholder = `  Aguardando comandos`
            filter.setAttribute("disabled", "disabled")
            ticketStatus.setAttribute("disabled", "disabled")
            tag.setAttribute("disabled", "disabled")
            argument.setAttribute("disabled", "disabled")
        break
    }
})

apply.addEventListener("click", async () => {

    /*Fetch na api*/

    switch(action.value) {
        case "Buscar":
            switch(filter.value){
                case "Status":
                    /* getBySatus{
                        "status" : `${ticketStatus.value}`,
                        "method" : "GET"
                    }*/
                break
                case "Tag":
                    /* getByTag{
                        "type" : `${tag.value}`,
                        "method" : "GET"
                    }*/
                break
                case "Id":
                    /* getById{
                        "id" : `${argument.value}`,
                        "method" : "GET"
                    }*/
                break
                default:
                    // get all
                break
            }
        break
        case "Editar Status":
            /* put{
                "id" : `${argument.value}`
                "status" : `${ticketStatus.value}`,
                "method" : "PUT"
            */
        break
        case "Deletar":
            /* delete{
                "id" : `${argument.value}`,
                "method" : "DELETE"
            */
        break
        default:
            /**/
        break
    }

    // Retorna os dados {id, title, data, type, status, description, contact} para o acumulator que insere na tabela

    /*
    const ticketPromises = () => Array(50).fill().map((_, i) =>
    fetch(getTicketUrl(i + 1)).then(response => response.json()));
    const listTickets = tickets => tickets.reduce((accumulator, {id, title, data, type, status, description, contact}) => {
        id = tickets.map((ticket) => ticket.id)
        title = tickets.map((ticket) => ticket.title)
        data = tickets.map((ticket) => ticket.data)
        type = tickets.map((ticket) => ticket.type)
        status = tickets.map((ticket) => ticket.status)
        description = tickets.map((ticket) => ticket.description)
        contact = tickets.map((ticket) => ticket.contact)
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

    const buildList = tickets => {
        const tbody = document.querySelector("tbody")
        tbody.innerHTML = listTickets
    }

    Promise.all(ticketPromises()).then(listTickets).then(buildList)*/

    colors()
})

