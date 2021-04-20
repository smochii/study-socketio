import * as io from "socket.io-client";
import WSEvents from "../constants/WSEvents";
import WSMessage from "../interface/WSMessage";

let socket: SocketIOClient.Socket;

const joinForm: HTMLFormElement = document.querySelector("#joinForm");
const usernameInput: HTMLInputElement = joinForm.querySelector("input[name='username']");
const joinButton: HTMLInputElement = joinForm.querySelector("input[name='join']");
const chatForm: HTMLFormElement = document.querySelector("#chatForm");
const messageInput: HTMLInputElement = chatForm.querySelector("input[name='message']");
const sendButton: HTMLInputElement = chatForm.querySelector("input[name='send']");
const chatView: HTMLUListElement = document.querySelector("#chatView");

joinForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  if (!usernameInput.value) {
    return;
  }

  const opts: SocketIOClient.ConnectOpts = {
    query: {
      username: usernameInput.value
    }
  }

  socket = io(opts);

  socket.on(WSEvents.S_MESSAGE, (s_message: WSMessage) => {
    chatView.insertAdjacentHTML("afterbegin", `<p>${s_message.data}</p>`);
  });

  usernameInput.disabled = true;
  joinButton.disabled = true;
  messageInput.disabled = false;
  sendButton.disabled = false;
});

chatForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  if (!messageInput.value) {
    return;
  }

  const c_message: WSMessage = {
    data: messageInput.value
  }
  socket.emit(WSEvents.C_MESSAGE, c_message);
  messageInput.value = "";
});
