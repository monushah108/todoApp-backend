const todoBox = document.querySelector(".todos");
const form = document.querySelector(".form");

const todoItem = ({ title, completed, _id }) => {
  const div = document.createElement("div");
  const todoHtml = `<div class="todoBox"><p>${title}</p> <div><button >📝</button> <button>🗑️</button></div></div>`;
  div.innerHTML = todoHtml;
  const editButton = div.querySelector("button:first-child");
  const deleteButton = div.querySelector("button:last-child");
  deleteButton.addEventListener("click", () => deleteTodo(_id));
  editButton.addEventListener("click", () => updateTodo(_id));
  todoBox.append(div);
};

async function getTodos() {
  const res = await fetch("http://localhost:4000/todos");
  const data = await res.json();
  data.map((item) => {
    todoItem(item);
  });
}
getTodos();

async function saveTodo() {
  const { value } = form.title;
  const method = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: value }),
  };
  const res = await fetch("http://localhost:4000/todos", method);
  const data = await res.json();
  getTodos();
}

async function deleteTodo(id) {
  const method = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  };
  const res = await fetch(`http://localhost:4000/todos/${id}`, method);
  const data = await res.json();
  getTodos();
}

async function updateTodo(id) {
  const { value } = form.title;
  if (!value) return;
  const method = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: value }),
  };
  const res = await fetch(`http://localhost:4000/todos/${id}`, method);
  getTodos();
}
