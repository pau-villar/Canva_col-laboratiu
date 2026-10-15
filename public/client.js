const socket = io();

const loginSection = document.getElementById('login');
const loginForm = document.getElementById('login-form');
const nameInput = document.getElementById('name-input');
const loginError = document.getElementById('login-error');
const canvas = document.getElementById('canvas');

let myName = '';

// Tamaño del canvas 
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw(); // repinta tras redimensionar 
}
window.addEventListener('resize', resizeCanvas);

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();

  if (name.length === 0) {
    loginError.textContent = 'El nom no pot estar buit.';
    return;
  }
  if (name.length > 20) {
    loginError.textContent = 'El nom pot tenir com a màxim 20 caràcters.';
    return;
  }

  myName = name;
  loginError.textContent = '';
  loginSection.hidden = true;
  canvas.hidden = false;

  socket.emit('user:join', myName);
  resizeCanvas();

});

const ctx = canvas.getContext('2d');
let users = {};


// Enviar mi posición
canvas.addEventListener('mousemove', (e) => {
  socket.emit('cursor:move', { x: e.clientX, y: e.clientY });
});

// Recibir las posiciones de todos
socket.on('cursors:update', (data) => {
  users = data;
  draw();
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const id in users) {
    const u = users[id];

    // Cursor: círculo
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(u.x, u.y, 6, 0, Math.PI * 2);
    ctx.fill();

    // Cuadrado con el nombre
    ctx.font = '14px Arial';
    const w = ctx.measureText(u.name).width + 12;
    ctx.fillStyle = u.color;
    ctx.fillRect(u.x + 12, u.y + 12, w, 24);

    ctx.fillStyle = 'white';
    ctx.fillText(u.name, u.x + 18, u.y + 29);
  }
}