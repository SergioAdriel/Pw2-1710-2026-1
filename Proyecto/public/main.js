function unlockRow(id) {
    hide(`unlock-${id}`);
    show(`edit-btn-${id}`);
    show(`delete-btn-${id}`);
    show(`block-btn-${id}`);
}

function blockRow(id) {
    hide(`edit-btn-${id}`);
    hide(`delete-btn-${id}`);
    hide(`block-btn-${id}`);
    show(`unlock-${id}`);
}

function enableEdit(id) {
    const row = document.getElementById(`row-${id}`);
    row.classList.add("editing");

    hide(`edit-btn-${id}`);
    hide(`delete-btn-${id}`);
    hide(`block-btn-${id}`);

    show(`save-${id}`);
    show(`cancel-${id}`);

    setTimeout(() => {
        const picker = document.querySelector(`.input-bday-${id}`);
        M.Datepicker.init(picker, {
            format: "dd/mm/yyyy",
            autoClose: true,
            container: document.body
        });
    }, 300);
}

function cancelEdit(id) {
    const row = document.getElementById(`row-${id}`);
    row.classList.remove("editing");

    hide(`save-${id}`);
    hide(`cancel-${id}`);

    show(`edit-btn-${id}`);
    show(`delete-btn-${id}`);
    show(`block-btn-${id}`);
}

async function saveUser(id) {
    const name = document.querySelector(`.input-name-${id}`).value;
    const email = document.querySelector(`.input-email-${id}`).value;
    const birthday = document.querySelector(`.input-bday-${id}`).value;

    await fetch(`/api/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, birthday })
    });

    location.reload();
}

function startDelete(id) {
    hide(`edit-btn-${id}`);
    hide(`delete-btn-${id}`);
    hide(`block-btn-${id}`);

    show(`confirm-del-${id}`);
    show(`cancel-del-${id}`);
}

function cancelDelete(id) {
    hide(`confirm-del-${id}`);
    hide(`cancel-del-${id}`);

    show(`edit-btn-${id}`);
    show(`delete-btn-${id}`);
    show(`block-btn-${id}`);
}

function confirmDelete(id) {
    window.location.href = `/delete/${id}`;
}

function hide(cls) {
    document.querySelector(`.${cls}`).classList.add("app-hide");
}
function show(cls) {
    document.querySelector(`.${cls}`).classList.remove("app-hide");
}

// INIT (modales y datepickers del modal)
document.addEventListener("DOMContentLoaded", () => {
    M.Modal.init(document.querySelectorAll(".modal"));

    M.Datepicker.init(document.querySelectorAll(".datepicker"), {
        format: "dd/mm/yyyy",
        autoClose: true,
        container: document.body
    });
});