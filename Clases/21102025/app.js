// app.js - Versión sencilla del juego del gato (tic-tac-toe)
// Incluye alerts, prompts y se crea todo por JS para funcionar en un HTML vacío.

document.addEventListener('DOMContentLoaded', function () {
    var nombreX = prompt('Nombre del jugador X:', 'Jugador X') || 'Jugador X';
    var nombreO = prompt('Nombre del jugador O:', 'Jugador O') || 'Jugador O';
    alert('Comienza el juego: ' + nombreX + ' (X) vs ' + nombreO + ' (O)');

    // estilos básicos
    var style = document.createElement('style');
    style.textContent = ''
        + 'body{font-family:Arial, sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#121212;color:#fff;margin:0;}'
        + '.wrap{text-align:center;}'
        + '.board{display:grid;grid-template-columns:repeat(3,90px);gap:8px;margin:12px auto;}'
        + '.cell{width:90px;height:90px;background:#1f1f1f;display:flex;align-items:center;justify-content:center;font-size:40px;border-radius:8px;cursor:pointer;user-select:none;}'
        + '.cell.disabled{cursor:default;opacity:0.8;}'
        + '.cell.win{background:#2e7d32;color:#fff;}'
        + 'button{padding:8px 12px;border-radius:6px;border:0;cursor:pointer;background:#1976d2;color:#fff;margin-top:12px;}';
    document.head.appendChild(style);

    // estructura
    var wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.innerHTML = '<h1>Gato - ' + nombreX + ' vs ' + nombreO + '</h1>';
    var scoreEl = document.createElement('div');
    scoreEl.className = 'score';
    wrap.appendChild(scoreEl);
    var boardEl = document.createElement('div');
    boardEl.className = 'board';
    wrap.appendChild(boardEl);
    var resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reiniciar (todo)';
    wrap.appendChild(resetBtn);
    document.body.appendChild(wrap);

    // estado (todo declarado)
    var tablero = ['', '', '', '', '', '', '', '', ''];
    var jugadorActual = 'X';
    var movs = 0;
    var puntajeX = 0;
    var puntajeO = 0;
    var terminado = false;

    var combinaciones = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    // crear celdas
    for (var i = 0; i < 9; i++) {
        var cel = document.createElement('div');
        cel.className = 'cell';
        cel.dataset.index = i;
        cel.addEventListener('click', function (e) {
            var idx = Number(this.dataset.index);
            if (terminado) { alert('Ronda terminada. Reinicia para jugar otra.'); return; }
            if (tablero[idx]) { alert('Casilla ocupada.'); return; }
            jugar(idx);
        });
        boardEl.appendChild(cel);
    }

    function actualizarScore() {
        scoreEl.textContent = nombreX + ' (X): ' + puntajeX + ' — ' + nombreO + ' (O): ' + puntajeO + ' — Turno: ' + jugadorActual;
    }

    function jugar(idx) {
        tablero[idx] = jugadorActual;
        movs++;
        var cel = boardEl.querySelector('.cell[data-index="' + idx + '"]');
        cel.textContent = jugadorActual;
        cel.classList.add('disabled');

        var win = comprobarGanador();
        if (win) {
            terminado = true;
            for (var k = 0; k < win.length; k++) {
                var ci = win[k];
                boardEl.querySelector('.cell[data-index="' + ci + '"]').classList.add('win');
            }
            if (jugadorActual === 'X') { puntajeX++; } else { puntajeO++; }
            actualizarScore();
            alert((jugadorActual === 'X' ? nombreX : nombreO) + ' (' + jugadorActual + ') gana!');
            return;
        }

        if (movs === 9) {
            terminado = true;
            actualizarScore();
            alert('Empate: nadie gana.');
            return;
        }

        jugadorActual = (jugadorActual === 'X') ? 'O' : 'X';
        actualizarScore();
    }

    function comprobarGanador() {
        for (var i = 0; i < combinaciones.length; i++) {
            var a = combinaciones[i][0];
            var b = combinaciones[i][1];
            var c = combinaciones[i][2];
            if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                return [a, b, c];
            }
        }
        return null;
    }

    function reiniciar(total) {
        tablero
        current = current === 'X' ? 'O' : 'X';
        renderScore();
    }

    function checkWin() {
        for (const combo of wins) {
            const [a,b,c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) return combo;
        }
        return null;
    }

    function disableBoard() {
        document.querySelectorAll('.cell').forEach(c => c.classList.add('disabled'));
    }

    function isBoardDisabled() {
        // Si alguna celda está marcada como disabled y ronda terminó (moves===9 o hay ganadores)
        return document.querySelectorAll('.cell.disabled').length === 9 || checkWin();
    }

    function resetRound(clearScores = false) {
        board = Array(9).fill('');
        moves = 0;
        current = 'X';
        if (clearScores) scores = { X: 0, O: 0 };
        document.querySelectorAll('.cell').forEach(c => {
            c.textContent = '';
            c.className = 'cell';
        });
        renderScore();
    }

    // Botones
    resetBtn.addEventListener('click', () => {
        if (confirm('Reiniciar la ronda actual?')) resetRound(false);
    });
    fullResetBtn.addEventListener('click', () => {
        if (confirm('Reiniciar marcador y ronda?')) resetRound(true);
    });

    // Inicial
    renderScore();
});