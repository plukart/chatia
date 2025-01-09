document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message !== '') {
        appendMessage('user', message);
        userInput.value = '';
        const botResponse = await getBotResponse(message);
        appendMessage('bot', botResponse);
    }
}

function appendMessage(sender, message) {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function getBotResponse(userMessage) {
    const apiKey = 'sk-svcacct-lowN322BXtE6WnhpGv7pbFJGsIxQzfnZWX7EWCpXqGaT_X75bqsf6PxIAEX1AEpSM5BT3BlbkFJDgSfzLQ8mIGXfKZnJjgLiNCqcYinPyYIx9ycSCbbQkWuBMiJL7ztRWz-PRTgTjAGGAA';
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
}




