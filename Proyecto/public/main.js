// Helpers para mostrar notificaciones (toasts)
function showError(msg) { M.toast({ html: msg, classes: "toast-error" }); }
function showOk(msg)    { M.toast({ html: msg, classes: "toast-success" }); }

// Gestión del estado visual por fila (mostrar/ocultar botones)
function unlockRow(id) {
    // Mostrar botones de acción principales
    q(`.unlock-${id}`).classList.add("app-hide");
    q(`.edit-btn-${id}`).classList.remove("app-hide");
    q(`.delete-btn-${id}`).classList.remove("app-hide");
    q(`.lock-btn-${id}`).classList.remove("app-hide");

    // Si la fila pertenece al usuario logueado, mostrar botón de cambiar contraseña
    const pwdBtn = q(`.pwd-btn-${id}`);
    if (pwdBtn && parseInt(pwdBtn.dataset.owner) === 1) {
        pwdBtn.classList.remove("app-hide");
    }
}

function lockRow(id) {
    const row = q(`#row-${id}`);
    row.classList.remove("editing");

    // Ocultar todos los botones menos el de desbloquear
    hide(`.edit-btn-${id}`, `.save-${id}`, `.cancel-${id}`,
             `.delete-btn-${id}`, `.pwd-btn-${id}`, `.lock-btn-${id}`);
    q(`.unlock-${id}`).classList.remove("app-hide");
}

function enableEdit(id) {
    const row = q(`#row-${id}`);
    row.classList.add("editing");

    // Mostrar botones de guardar/cancelar y ocultar editar
    hide(`.edit-btn-${id}`);
    show(`.save-${id}`, `.cancel-${id}`);

    // Mantener visibles eliminar/bloquear y (si aplica) cambiar contraseña
    q(`.delete-btn-${id}`).classList.remove("app-hide");
    q(`.lock-btn-${id}`).classList.remove("app-hide");
    const pwdBtn = q(`.pwd-btn-${id}`);
    if (pwdBtn && parseInt(pwdBtn.dataset.owner) === 1) {
        pwdBtn.classList.remove("app-hide");
    }

    // Inicializar datepicker cuando el input ya esté visible (pequeño retraso)
    setTimeout(() => {
        const input = row.querySelector(`.input-bday-${id}`);
        M.Datepicker.init(input, { format: "dd/mm/yyyy", autoClose: true, firstDay: 1 });
    }, 200);
}

function cancelEdit(id) {
    const row = q(`#row-${id}`);
    row.classList.remove("editing");
    hide(`.save-${id}`, `.cancel-${id}`);
    show(`.edit-btn-${id}`);
}

// Guardar cambios. Nota: el email se envía sólo si es la fila del usuario logueado.
async function saveUser(id) {
    const name = q(`.input-name-${id}`).value.trim();
    const bday = q(`.input-bday-${id}`).value.trim();

    let email = null;
    if (window.LOGGED_USER_ID === id || window.LOGGED_USER_ID === parseInt(id)) {
        const emailInput = q(`.input-email-${id}`);
        if (emailInput) email = emailInput.value.trim();
    }

    const res = await fetch(`/api/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthday: bday, email })
    });

    const data = await res.json();
    if (data.error) return showError(data.error);

    showOk("Datos actualizados.");
    location.reload();
}

// Eliminar usuario (requiere contraseña): abrir modal y confirmar
function openDeleteModal(id) {
    const modal = M.Modal.getInstance(q(`#delModal-${id}`)) || M.Modal.init(q(`#delModal-${id}`));
    modal.open();
}

async function confirmDelete(id) {
    const pass = q(`#del-pass-${id}`).value;
    if (!pass) return showError("Ingresa la contraseña.");

    const res = await fetch(`/api/delete/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass })
    });

    const data = await res.json();
    if (data.error) return showError(data.error);

    showOk("Usuario eliminado.");
    location.reload();
}

// Cambiar contraseña (disponible sólo en la propia fila): abrir modal y enviar cambio
function openPwdModal(id) {
    const modal = M.Modal.getInstance(q(`#pwdModal-${id}`)) || M.Modal.init(q(`#pwdModal-${id}`));
    modal.open();
}

async function changePassword(id) {
    const cur = q(`#pwd-current-${id}`).value;
    const neu = q(`#pwd-new-${id}`).value;

    if (!cur || !neu) return showError("Completa ambas contraseñas.");
    const res = await fetch(`/api/change-password/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: cur, newPassword: neu })
    });

    const data = await res.json();
    if (data.error) return showError(data.error);

    showOk("Contraseña actualizada.");
    const modal = M.Modal.getInstance(q(`#pwdModal-${id}`));
    if (modal) modal.close();
    q(`#pwd-current-${id}`).value = "";
    q(`#pwd-new-${id}`).value = "";
}

// Utilidades pequeñas para DOM
function q(sel) { return document.querySelector(sel); }
function show(...sels) { sels.forEach(s => q(s)?.classList.remove("app-hide")); }
function hide(...sels) { sels.forEach(s => q(s)?.classList.add("app-hide")); }
