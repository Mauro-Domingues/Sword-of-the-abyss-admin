const getTicketUrl = (id) => `https://sword-of-the-abyss-api.herokuapp.com/ticket/${id}`

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

Promise.all(ticketPromises()).then(listTickets).then(buildList)