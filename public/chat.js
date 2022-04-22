const socket = io()

//variables
const username = document.getElementById('userName')
const message = document.getElementById('message')
const ouput = document.getElementById('ouput')
const actions = document.getElementById('actions')
const send = document.getElementById('send')

send.addEventListener('click', () => {
    socket.emit('chat:message', {
        message: message.value
    })
    message.value = '';
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', message.value)
})

socket.on('chat:message', (data) => {
    ouput.innerHTML += `<p> ${data.message}</p>`
})

socket.on('chat:typing', (data) => {
    actions.innerHTML = `<b>: Escribiendo...</b>`
})