let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

function updateCursor() {
  const gamepad = navigator.getGamepads()[0];
  if (gamepad) {
    const stickX = gamepad.axes[0]; // Stick izquierdo eje X
    const stickY = gamepad.axes[1]; // Stick izquierdo eje Y

    // Ajusta la velocidad de movimiento
    const speed = 5;
    cursorX += stickX * speed;
    cursorY += stickY * speed;

    // Limita el cursor a la pantalla
    cursorX = Math.max(0, Math.min(window.innerWidth, cursorX));
    cursorY = Math.max(0, Math.min(window.innerHeight, cursorY));

    const cursor = document.getElementById('gamepad-cursor');
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
  }

  requestAnimationFrame(updateCursor);
}

window.addEventListener('gamepadconnected', () => {
  console.log('Gamepad conectado');
  requestAnimationFrame(updateCursor);
});

if (gamepad.buttons[0].pressed) {
  // Simula un clic donde está el cursor
  const el = document.elementFromPoint(cursorX, cursorY);
  if (el) el.click();
}


// Mostrar u ocultar las opciones al hacer clic/tocar
function mostrarOpcionesFiltro() {
  const opciones = document.getElementById('opcionesFiltro');
  const visible = opciones.style.display === 'block';
  opciones.style.display = visible ? 'none' : 'block';
}

// Detectar clic del GamePad sobre la imagen
document.addEventListener('gamepadconnected', function() {
  const gamepadCursor = document.getElementById('filtroContenedor');
  let cursorX = 0;
  let cursorY = 0;

  function actualizarCursor() {
    const gamepad = navigator.getGamepads()[0];
    if (gamepad) {
      const stickX = gamepad.axes[0]; // X del stick izquierdo
      const stickY = gamepad.axes[1]; // Y del stick izquierdo

      // Ajusta la velocidad de movimiento
      const speed = 5;
      cursorX += stickX * speed;
      cursorY += stickY * speed;

      // Asegúrate que el cursor no se salga de los límites
      cursorX = Math.max(0, Math.min(window.innerWidth, cursorX));
      cursorY = Math.max(0, Math.min(window.innerHeight, cursorY));

      gamepadCursor.style.left = `${cursorX}px`;
      gamepadCursor.style.top = `${cursorY}px`;
    }
    requestAnimationFrame(actualizarCursor);
  }
  requestAnimationFrame(actualizarCursor);

  // Detecta cuando se presiona el botón A del GamePad (gamepad.buttons[0])
  setInterval(function() {
    const gamepad = navigator.getGamepads()[0];
    if (gamepad && gamepad.buttons[0].pressed) {
      const rect = gamepadCursor.getBoundingClientRect();
      const clickX = cursorX;
      const clickY = cursorY;

      if (clickX >= rect.left && clickX <= rect.right && clickY >= rect.top && clickY <= rect.bottom) {
        mostrarOpcionesFiltro(); // Llama la función de mostrar opciones
      }
    }
  }, 100);
});


function mostrarOpcionesFiltro() {
  const opciones = document.getElementById('opcionesFiltro');
  opciones.classList.toggle('visible');
}

function hacerAlgo(opcion) {
  alert("Elegiste la opción: " + opcion);
  document.getElementById('opcionesFiltro').classList.remove('visible');
}