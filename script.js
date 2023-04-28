// Initialize RiveScript
const bot = new RiveScript();
bot.loadFile(["brain.rive"], on_load_success, on_load_error);

function on_load_success() {
  console.log("Chatbot brain loaded successfully.");
  bot.sortReplies();
}

function on_load_error(error) {
  console.log("Error loading chatbot brain: " + error);
}

// Get references to DOM elements
const userInput = document.querySelector("#user-input");
const sendButton = document.querySelector("#send-button");
const chatbotHistory = document.querySelector("#chatbot-history");

// Function to add a message to the chat history
function addMessageToHistory(sender, message) {
  const messageElement = document.createElement("p");
  messageElement.classList.add("chat-message");
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatbotHistory.appendChild(messageElement);
}

// Function to handle user input
function handleUserInput() {
  const inputMessage = userInput.value.trim();
  if (inputMessage !== "") {
    addMessageToHistory("user", inputMessage);
    bot.reply("local-user", inputMessage).then((response) => {
      addMessageToHistory("chatbot", response);
    });
    userInput.value = "";
  }
}

// Add event listeners
sendButton.addEventListener("click", handleUserInput);
userInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleUserInput();
  }
});
