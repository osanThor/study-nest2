const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected!`);
});
socket.on('new_chat', (data) => {
  const { username, chat } = data;
  drawNewChat(`${username}: ${chat}`);
});

const handleSubmit = (e) => {
  e.preventDefault();
  const inputValue = e.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    drawNewChat(`me: ${inputValue}`);
    e.target.elements[0].value = '';
  }
};

const drawHelloStranger = (username) => {
  helloStrangerElement.innerText = `Hello ${username} Stranger :)`;
};
const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `<div>${message}</div>`;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();

  //Event handler
  formElement.addEventListener('submit', handleSubmit);
}

init();
