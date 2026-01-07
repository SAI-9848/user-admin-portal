const container = document.getElementById("container");
const saveBtn = document.getElementById("saveBtn");

// FETCH DATA
async function fetchData() {
  try {
    const res = await fetch("https://user-admin-portal-1.onrender.com/Products");
    const data = await res.json();
    renderData(data);
  } catch (err) {
    console.error(err);
  }
}

// RENDER DATA
function renderData(data) {
  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "admin-card";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editData(item.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteData(item.id));

    card.innerHTML = `
      <div class="admin-text">
        <h3>ID: ${item.id}</h3>
        <h3>Name: ${item.name}</h3>
      </div>
      <img src="${item.image}" />
    `;

    const actions = document.createElement("div");
    actions.className = "admin-actions";
    actions.append(editBtn, deleteBtn);

    card.appendChild(actions);
    container.appendChild(card);
  });
}


// SAVE / UPDATE
async function saveData() {
  const id = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;

  if (!name || !image) {
    alert("Please fill all fields");
    return;
  }

  const obj = { name, image };

  const url = id
    ? `https://user-admin-portal-1.onrender.com/Products/${id}`
    : "https://user-admin-portal-1.onrender.com/Products";

  const method = id ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  clearForm();
  fetchData();
}

// DELETE
async function deleteData(id) {
  await fetch(`https://user-admin-portal-1.onrender.com/Products/${id}`, {
    method: "DELETE",
  });
  fetchData();
}

// EDIT
async function editData(id) {
  const res = await fetch(`https://user-admin-portal-1.onrender.com/Products/${id}`);
  const data = await res.json();

  document.getElementById("studentId").value = data.id;
  document.getElementById("name").value = data.name;
  document.getElementById("image").value = data.image;
}

// CLEAR FORM
function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("image").value = "";
}

// EVENTS
saveBtn.addEventListener("click", saveData);
document.addEventListener("DOMContentLoaded", fetchData);
