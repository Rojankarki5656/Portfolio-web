async function sendMessage() {
    let userInput = document.getElementById("chat-input");
    let chatBox = document.getElementById("chat-messages");
    let message = userInput.value.trim();

    if (message === "") return;

    // Display user message on the left
    let userMessageElement = document.createElement("div");
    userMessageElement.className = "message user-message";
    userMessageElement.textContent = message;
    chatBox.appendChild(userMessageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    userInput.value = ""; // Clear input field

    // Show typing indicator
    let typingIndicator = document.createElement("div");
    typingIndicator.className = "typing-indicator";
    typingIndicator.textContent = "Bot is typing...";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let response = await fetch("http://127.0.0.1:8000/chat/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        let data = await response.json();
        let botResponse = data.response;

        // Remove typing indicator
        chatBox.removeChild(typingIndicator);

        // Display bot message on the right
        let botMessageElement = document.createElement("div");
        botMessageElement.className = "message bot-message";
        botMessageElement.textContent = botResponse;
        chatBox.appendChild(botMessageElement);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Error:", error);

        // Remove typing indicator
        chatBox.removeChild(typingIndicator);

        // Show error message
        let botMessageElement = document.createElement("div");
        botMessageElement.className = "message bot-message";
        botMessageElement.textContent = "Error: Unable to get a response.";
        chatBox.appendChild(botMessageElement);
    }
}
