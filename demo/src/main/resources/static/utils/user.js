export { addClickListener, fetchPersons };

const server = "http://localhost:8080";

function addClickListener() {
  const buttonAddUser = document.getElementById("button-add-user");
  buttonAddUser.addEventListener("click", () => {
    addPerson();
  });
}

async function fetchPersons() {
  const response = await fetch(server + "/api/persons");
  const persons = await response.json();
  const personsTable = document.getElementById("persons-table-body");

  personsTable.innerHTML = "";
  persons.forEach((person) => {
    personsTable.innerHTML += `
                  <tr>
                      <td>${person.id}</td>
                      <td>${person.name}</td>
                      <td>${person.age}</td>
                      <td>
                          <button data-id="${person.id}" id="button-edit-user-${person.id}">Bearbeiten</button>
                          <button data-id="${person.id}" id="button-delete-user-${person.id}">Löschen</button>
                      </td>
                  </tr>
              `;
  });

  persons.forEach((person) => {
    const buttonEditUser = document.querySelector(`#button-edit-user-${person.id}`);
    buttonEditUser.addEventListener("click", (e) => {
      const { id } = e.target.dataset;
      editPerson(id);
    });

    const buttonDeleteUser = document.querySelector(`#button-delete-user-${person.id}`);
    buttonDeleteUser.addEventListener("click", (e) => {
      const { id } = e.target.dataset;
      deletePerson(id);
    });
  });
}

async function addPerson() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  await fetch(server + "/api/persons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age }),
  });

  fetchPersons();
}

async function editPerson(id) {
  // Hier könntest du ein Popup oder ein anderes Formular öffnen, um die Daten zu bearbeiten
  // und dann ein PUT-Request schicken
}

async function deletePerson(id) {
  await fetch(server + `/api/persons/${id}`, {
    method: "DELETE",
  });

  fetchPersons();
}
