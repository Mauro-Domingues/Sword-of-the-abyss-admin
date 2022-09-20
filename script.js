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
    let url = "http://localhost:3000/ticket/"
    let params = {}
    switch(action.value) {
        case "Buscar":
            switch(filter.value){
                case "Tudo":
                    params = {method: 'GET', headers: new Headers()}
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
                    url = `${url}${argument.value}`
                    params = {method: 'GET', headers: new Headers()}
                break
                default:
                    url = null
                    params = null
                break
            }
        break
        case "Editar Status":
            fetch(`http://localhost:3000/ticket/5`, {
                method: 'PUT',
                headers: new Headers(),
                body: JSON.stringify(
                    { 'status': `${ticketStatus.value}`}
                )
            })
        break
        case "Deletar":
            fetch(`${url}${argument.value}`, {
                method: 'DELETE',
                headers: new Headers()  
            })
        break
        default:
            url = null
            params = null
        break
    } 
    setTimeout(() => {
    fetch(url, params).then(response => response.json()).then(ticket =>
        document.querySelector("tbody").innerHTML = ticket.reduce((accumulator, obj) => {
            accumulator += `<tr>
                            <td>${obj.id}</td>
                            <td>${obj.title}</td>
                            <td>${obj.data}</td>
                            <td>${obj.type}</td>
                            <td class="${obj.status} stn">${obj.status}</td>
                            <td>${obj.description}</td>
                            <td>${obj.contact}</td>
                            </tr>`
            return accumulator   
        },"") 
    )
    }, 10)
})