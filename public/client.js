const socket = io();

const loginSection = document.getElementById('login');
const loginForm = document.getElementById('login-form');
const nameInput = document.getElementById('name-input');
const loginError = document.getElementById('login-error');
const canvas = document.getElementById('canvas');

let myName = '';

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

  /*/
  
  function ejemplo2(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
    
    var pre = document.getElementById("code").innerText= "\
        var c = document.getElementById(\"myCanvas\");\n\
        var ctx = c.getContext(\"2d\");\n\
        ctx.beginPath();\n\
        ctx.arc(95, 50, 40, 0, 2 * Math.PI);\n\
        ctx.stroke();\n\
    ";
}
/*/

});
