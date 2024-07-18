
const socket = io();

const form = document.getElementById('form');
const textarea = document.getElementById('input');
const messages = document.getElementById('message_area');

//prompt the user for their name
const userName = prompt('Enter your name');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (textarea.value) {
        const message = { user: userName, message: textarea.value }
        displayMessage(message, true)
        socket.emit('chat message', message);
        textarea.value = '';
    }
});

socket.on('chat message', (msg) => {
    // displayMessage(msg, msg.user !== userName)
    if(msg.user!==userName){
        displayMessage(msg,false)
    }
})

function displayMessage(msg, isOwnMessage) {
    const item = document.createElement('div');
    item.classList.add('message', isOwnMessage ? 'out_message' : 'in_message');
    const messageContent = `
   <h4>${msg.user}</h4>
   <p>${msg.message}</p>
   `;
    item.innerHTML = messageContent;
    messages.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
    messages.scrollTo = messages.scrollHeight;
}



