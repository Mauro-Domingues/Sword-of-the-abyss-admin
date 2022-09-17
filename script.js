const action = document.querySelector(".action")
const filter = document.querySelector(".filter")
const ticketStatus = document.querySelector(".status")
const argument = document.querySelector(".argument")
const apply = document.querySelector(".apply")
const url = "http://127.0.0.1:3000"

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
                        ticketStatus.setAttribute("disabled", "disabled")
                        argument.setAttribute("disabled", "disabled")
                        argument.placeholder = ` Buscar todos os tickets`
                    break
                    case "Status":
                        ticketStatus.removeAttribute("disabled")
                        argument.setAttribute("disabled", "disabled")
                        argument.placeholder = ` Buscar tickets por status`
                    break
                    case "Id":
                        ticketStatus.value = "- Selecione o status -"
                        ticketStatus.setAttribute("disabled", "disabled")
                        argument.removeAttribute("disabled")
                        argument.placeholder = ` Insira o Id de busca`
                    break
                    default:
                        ticketStatus.value = "- Selecione o status -"
                        ticketStatus.setAttribute("disabled", "disabled")
                        argument.placeholder = `  Aguardando comandos`
                        argument.setAttribute("disabled", "disabled")
                }
            })
        break
        case "Editar Status":
            filter.value = "Id"
            ticketStatus.value = "- Selecione o status -"
            filter.setAttribute("disabled", "disabled")
            ticketStatus.removeAttribute("disabled")
            argument.removeAttribute("disabled")
            argument.placeholder = ` Insira o ${filter.value} do ticket`
        break
        case "Deletar":
            filter.value = "Id"
            ticketStatus.value = "- Selecione o status -"
            filter.setAttribute("disabled", "disabled")
            ticketStatus.setAttribute("disabled", "disabled")
            argument.removeAttribute("disabled")
            argument.placeholder = ` Insira o ${filter.value} do ticket`
        break
        default:
            filter.value = "- Selecione um filtro -"
            ticketStatus.value = "- Selecione o status -"
            filter.setAttribute("disabled", "disabled")
            ticketStatus.setAttribute("disabled", "disabled")
            argument.placeholder = `  Aguardando comandos`
            argument.setAttribute("disabled", "disabled")
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
                        <td>${status}</td>
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
})

