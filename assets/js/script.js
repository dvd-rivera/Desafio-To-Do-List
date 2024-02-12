const input = document.getElementById("newTaskInput")
const newTaskButton = document.getElementById("newTaskBtn")
const taskListHTML = document.getElementById("taskList")
const totalHTML = document.getElementById("totalTasks")
const completedTasksHTML = document.getElementById("completedTasks")
const deletedTasksHTML = document.getElementById("elimintedTasks")

let taskList = [
  {id:1, completed: false, name: "Hacer las compras del supermercado", deleted: false},
  {id:2, completed: false, name: "Sacar a pasear a los 15 perros", deleted: false},
  {id:3, completed: false, name: "Hacer los desafíos", deleted: false},
]
let completed = 0
let deleted = 0
let total = 0


taskList.forEach((task) => {
  taskListHTML.innerHTML += `
  <div class="task ${task.completed ? 'completed' : ''}${task.deleted ? ' deleted' : ''}" id="task${task.id}">
    <p class="id">${task.id}</p>
    <p class="input">
      <label for="check${task.id}">
      ${task.completed ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-regular fa-circle"></i>'}
      </label>
      <input type="checkbox" name="check" id="check${task.id}" style="display: none;" ${task.completed ? 'checked' : ''}>
    </p>
    <p class="task-name">${task.name}</p>
    <label for="del${task.id}" class="delete">
          X
        </label>
        <input type="checkbox" name="check" id="del${task.id}" style="display: none;">
  </div>`;

});



newTaskButton.addEventListener("click", () => {

  if (input.value != "") {

  let newTask = {
    id: taskList.length + 1,
    completed: false,
    name: input.value,
    deleted: false
  }

  taskList.push(newTask);
  taskListHTML.innerHTML = "";
  taskList.forEach((task) => {
    taskListHTML.innerHTML += `
    <div class="task ${task.completed ? 'completed' : ''}${task.deleted ? ' deleted' : ''}" id="task${task.id}">
      <p class="id">${task.id}</p>
      <p class="input">
        <label for="check${task.id}">
        ${task.completed ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-regular fa-circle"></i>'}
        </label>
        <input type="checkbox" name="check" id="check${task.id}" style="display: none;" ${task.completed ? 'checked' : ''}>
      </p>
      <p class="task-name">${task.name}</p>
      <label for="del${task.id}" class="delete">
						X
					</label>
					<input type="checkbox" name="check" id="del${task.id}" style="display: none;">
    </div>`;

  });
  
  total += 1
  totalHTML.innerHTML = total

  taskList.forEach((task) => {
    let input = document.getElementById(`check${task.id}`);
    input.addEventListener('change', () => {
      task.completed = input.checked;
      let taskElement = document.getElementById(`task${task.id}`);
      let label = taskElement.querySelector('label');
      if (task.completed) {
        taskElement.classList.add('completed');
        label.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        completed += 1
        completedTasksHTML.innerHTML = completed
      } else {
        taskElement.classList.remove('completed');
        label.innerHTML = '<i class="fa-regular fa-circle"></i>';
        completed -= 1
        completedTasksHTML.innerHTML = completed
      }
    });
  });

  taskList.forEach((task) => {
    let deleteBtn = document.getElementById(`del${task.id}`);
    deleteBtn.addEventListener('click', () => {
      task.deleted = deleteBtn.checked;
      let taskElement = document.getElementById(`task${task.id}`);
      if (task.deleted) {
        taskElement.classList.add('deleted');
        deleted += 1
        total -= 1
        totalHTML.innerHTML = total
        deletedTasksHTML.innerHTML = deleted
        console.log("borrado")
      }
    });
  });

  input.value = "";
}});