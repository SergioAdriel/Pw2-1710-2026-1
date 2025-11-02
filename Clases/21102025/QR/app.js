// Espera a que cargue la pagina
document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnGenerar");
    const boxQR = document.getElementById("qr-code");

    // Cuando el usuario da clic en el boton
    btn.addEventListener("click", () => {

        // Guardamos los datos escritos por el usuario
        const nombre = document.getElementById("input1").value.trim();
        const correo = document.getElementById("input2").value.trim();
        const inst = document.getElementById("input3").value.trim();
        const dep = document.getElementById("input4").value.trim();

        // Si algun campo esta vacio, no deja continuar
        if (!nombre || !correo || !inst || !dep) {
            alert("Completa todos los campos antes de generar el QR.");
            return;
        }

        // Validar que no genere otro QR si ya existe uno
        if (boxQR.querySelector("img")) {
            alert("Ya generaste un QR, solo se puede uno.");
            return;
        }

        // Texto que lleva el codigo QR
        const infoQR = "Nombre: " + nombre + "\nCorreo: " + correo + "\nInstitucion: " + inst + "\nDependencia: " + dep;

        // API para generar QR
        const urlQR = "https://api.qrserver.com/v1/create-qr-code/?size=350x200&data=" + encodeURIComponent(infoQR);

        // Crear la imagen del QR
        const img = document.createElement("img");
        img.src = urlQR;
        img.alt = "QR";
        img.className = "qr-code";

        // Mostrar el QR en pantalla
        boxQR.appendChild(img);

        // Desactivar el boton
        btn.disabled = true;
        btn.textContent = "QR Generado";
    });

});
