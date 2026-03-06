document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.querySelector('.message-input');
    const sendBtn = document.querySelector('.send-btn');
    const messagesSection = document.querySelector('.messages-section');
    const attachFileBtn = document.querySelector('.attach-file');
    const attachContractBtn = document.querySelector('.attach-contract');
    const fileList = document.getElementById('file-list');
    const speakBtn = document.querySelector('.speak-btn');

    // Message sending functionality
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            addMessage('sent', message);
            messageInput.value = '';
            scrollToBottom();

            // Simulate a response
            setTimeout(() => {
                addMessage('received', "Thank you for your message! I'll get back to you shortly.");
                scrollToBottom();
            }, 1000); // Adjust the delay as needed
        }
    });

    // Enter key to send message
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Function to add message to the chat
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerText = content;

        messageDiv.appendChild(messageContent);
        messagesSection.appendChild(messageDiv);

        scrollToBottom();
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        messagesSection.scrollTop = messagesSection.scrollHeight;
    }

    // File upload functionality
    attachFileBtn.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx,.png,.jpg,.jpeg';
        fileInput.click();

        fileInput.onchange = () => {
            if (fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;
                const fileItem = document.createElement('div');
                fileItem.innerText = `📎 ${fileName}`;
                fileList.appendChild(fileItem);
            }
        };
    });

    // Contract upload functionality
    attachContractBtn.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf';
        fileInput.click();

        fileInput.onchange = () => {
            if (fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;
                const fileItem = document.createElement('div');
                fileItem.innerText = `📄 ${fileName}`;
                fileList.appendChild(fileItem);
            }
        };
    });

    // Speech-to-text functionality (Web Speech API)
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            speakBtn.classList.add('listening');
            speakBtn.innerText = '🎤 Listening...';
        };

        recognition.onend = () => {
            speakBtn.classList.remove('listening');
            speakBtn.innerText = '🎤';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            messageInput.value += transcript;
        };

        speakBtn.addEventListener('click', () => {
            recognition.start();
        });
    } else {
        speakBtn.style.display = 'none';  // Hide the button if the API is not supported
    }
});
