const chatIcon = document.getElementById('chat-icon');
const chatContainer = document.getElementById('chat-container');
const closeChat = document.querySelector('.close-chat');
const resetChat = document.querySelector('.reset-chat');

let isBotResponding = false; 

chatIcon.addEventListener('click', function() {
    chatContainer.style.display = 'flex';
    chatIcon.style.display = 'none';
});

closeChat.addEventListener('click', function() {
    chatContainer.style.display = 'none';
    chatIcon.style.display = 'flex';
});

resetChat.addEventListener('click', function() {
    resetMessages();
});

document.getElementById('send-button').addEventListener('click', function() {
    if (!isBotResponding) { 
        sendMessage();
    }
});

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !isBotResponding) { 
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addMessage(userInput, 'user');
        document.getElementById('user-input').value = '';
        isBotResponding = true; 
        showLoadingIndicator(); 
        setTimeout(() => {
            getBotResponse(userInput);
        }, 1000); 
    }
}

function addMessage(text, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', sender);
    messageContainer.textContent = text;
    document.getElementById('messages').appendChild(messageContainer);
}

function getBotResponse(userInput) {
    let botResponse = '';

    switch (userInput.toLowerCase()) {
        case 'hi':
            botResponse = 'Hi!';
            break;
        case 'how are you?':
            botResponse = 'I`m fine, thanks!';
            break;
        case 'what are you doing?':
            botResponse = 'I am answering the questions!';
            break;
        default:
            botResponse = 'Sorry, but i can`t understand. Can you repeat the auestion.';
    }

    setTimeout(() => {
        addMessage(botResponse, 'bot');
        isBotResponding = false; 
        hideLoadingIndicator(); 
    }, 2000); 
}

function showLoadingIndicator() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        loadingIndicator.appendChild(dot);
    }
    document.getElementById('messages').appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

function resetMessages() {
    document.getElementById('messages').innerHTML = '';
} 
