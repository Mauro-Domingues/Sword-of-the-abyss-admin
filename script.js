const action = document.querySelector(".action")
const filter = document.querySelector(".filter")
const ticketStatus = document.querySelector(".status")
const tag = document.querySelector(".tag")
const stn = document.querySelectorAll(".stn")
const argument = document.querySelector(".argument")
const apply = document.querySelector(".apply")

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
            argument.placeholder = " Insira o id do ticket"
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
                case "Tudo":
                    params = {
                        method: 'GET',
                        headers: new Headers(),
                    }
                break
                case "Status":
                    params = {
                        method: 'GET',
                        headers: new Headers(),
                        body: {'status' : `${ticketStatus.value}`},
                    }
                break
                case "Tag":
                    params = {
                        method: 'GET',
                        headers: new Headers(),
                        body: {'type' : `${tag.value}`},
                    }
                break
                case "Id":
                    params = {
                        method: 'GET',
                        headers: new Headers(),
                        body: {'id' : `${argument.value}`},
                    }
                break
                default:
                break
            }
        break
        case "Editar Status":
            fetch(`${baseUrl}${argument.value}`,{
                method: 'GET',
                headers: new Headers(),
                body: JSON.stringify(
                    { 'status': `${ticketStatus.value}`}
                )
            })
        break
        case "Deletar":
            fetch(`${baseUrl}${argument.value}`,{
                method: 'DELETE',
                headers: new Headers(),
            })
        break
        default:
        break
    } 

    //const baseUrl = "http://localhost:3000/ticket/"
    //const data = fetch(baseUrl).then(response => response.json())

    const url = (id) => `http://localhost:3000/ticket/${id}`
    const ticketPromises = () => Array(36).fill().map((_, i) =>
    fetch(url(i + 1)).then(response => response.json()))

    const listTickets = ticket => ticket.reduce((accumulator, obj) => {
        const id = obj.map((obj) => obj.id)
        const title = obj.map((obj) => obj.title)
        const data = obj.map((obj) => obj.data)
        const type = obj.map((obj) => obj.type)
        const status = obj.map((obj) => obj.status)
        const description = obj.map((obj) => obj.description)
        const contact = obj.map((obj) => obj.contact)
        //if(id == ""){
        //    console.log("a")
        //} else{
        accumulator += `<tr>
                        <td>${id}</td>
                        <td>${title}</td>
                        <td>${data}</td>
                        <td>${type}</td>
                        <td class="${status} stn">${status}</td>
                        <td>${description}</td>
                        <td>${contact}</td>
                        </tr>`
        return accumulator
        //}
    },"")
    const buildList = ticket => {
        const tbody = document.querySelector("tbody")
        tbody.innerHTML = ticket
    }
    Promise.all(ticketPromises()).then(listTickets).then(buildList)
})