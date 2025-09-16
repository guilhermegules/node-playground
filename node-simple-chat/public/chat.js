const socket = io.connect("http://localhost:3030");

const messageInputElement = document.getElementById("message");
const handleInputElement = document.getElementById("handle");
const sendButtonElement = document.getElementById("send");
const outputElement = document.getElementById("output");
const feedbackElement = document.getElementById("feedback");

sendButtonElement.addEventListener("click", () => {
  socket.emit("chat", {
    message: messageInputElement.value,
    handle: handleInputElement.value,
  });
});

messageInputElement.addEventListener("keypress", () => {
  socket.emit("typing", handleInputElement.value);
});

socket.on("chat", (data) => {
  outputElement.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
  feedbackElement.innerHTML = "";
});

socket.on("typing", (data) => {
  feedbackElement.innerHTML = `<p><em>${data} is typing a message</em></p>`;
});
