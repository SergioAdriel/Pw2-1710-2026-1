document.addEventListener("DOMContentLoaded", () => {
  const nX = prompt("Nombre jugador X:", "X") || "X";
  const nO = prompt("Nombre jugador O:", "O") || "O";
  alert(`Comienza: ${nX} (X) vs ${nO} (O)`);

  // Estilos básicos, la neta con ChatGPT
  const style = document.createElement("style");
  style.textContent = `
    body{margin:0;display:flex;align-items:center;justify-content:center;
         min-height:100vh;font-family:Arial;background:#fff;color:#000}
    .tablero{display:grid;grid-template-columns:repeat(3,80px);gap:6px}
    .cell{width:80px;height:80px;border:1px solid #aaa;font-size:34px;
         display:flex;align-items:center;justify-content:center;cursor:pointer}
  `;
  document.head.appendChild(style);

  // Crear tablero
  const tablero = document.createElement("div");
  tablero.className = "tablero";
  document.body.appendChild(tablero);
  for (let i = 0; i < 9; i++) {
    const c = document.createElement("div");
    c.className = "cell";
    c.dataset.i = i;
    tablero.appendChild(c);
  }

  // Estado del juego
  let casillas = Array(9).fill("");
  let turno = "X";
  let jugadas = 0;
  let terminado = false;
  const ganar = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  // Lógica del juego
  tablero.addEventListener("click", e => {
    const cel = e.target;
    if (!cel.classList.contains("cell") || terminado) return;
    const i = +cel.dataset.i;
    if (casillas[i]) return alert("Casilla ocupada.");

    casillas[i] = turno;
    cel.textContent = turno;
    jugadas++;

    if (hayGanador()) {
      terminado = true;
      alert(`${turno === "X" ? nX : nO} (${turno}) ganó!`);
    } else if (jugadas === 9) {
      terminado = true;
      alert("Empate.");
    } else {
      turno = turno === "X" ? "O" : "X";
    }
  });

  function hayGanador() {
    return ganar.some(([a,b,c]) => 
      casillas[a] && casillas[a] === casillas[b] && casillas[a] === casillas[c]
    );
  }

  // Reinicio con doble clic
  document.body.addEventListener("dblclick", () => {
    casillas.fill("");
    jugadas = 0;
    terminado = false;
    turno = "X";
    document.querySelectorAll(".cell").forEach(c => c.textContent = "");
    alert(`Reiniciado. ${nX} (X) inicia.`);
  });
});
