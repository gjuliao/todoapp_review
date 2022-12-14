const displayTodos = (todoCollection) => {
  const todosElement = document.querySelector('#todos');
  const todos = todoCollection.getTodos();
  todosElement.innerHTML = '';
  todos.forEach((todo) => {
    const todoElement = document.createElement('li');
    todoElement.innerHTML = `
      <li class="todo">
        <input type="checkbox" id="checked" class='checkbox' ${todo.completed ? 'checked' : ''}
          >
        <input type="text" id="listItem" class='description' value= "${todo.description}">
        <i class="fa-solid fa-ellipsis-vertical move"></i>
        <i class="fa-solid fa-trash-can delete"></i>
      </li>`;
    todosElement.appendChild(todoElement);
  });
  const checkboxs = todosElement.querySelectorAll('.checkbox');
  checkboxs.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      todoCollection.markAsCompleted(index + 1);
    });
  });
  const descriptions = todosElement.querySelectorAll('.description');
  descriptions.forEach((description, index) => {
    description.addEventListener('change', () => {
      todoCollection.updateDescription(index + 1, description.value);
    });
  });
  const trashes = todosElement.querySelectorAll('.delete');
  trashes.forEach((trash, index) => {
    trash.addEventListener('click', () => {
      todoCollection.removeTodo(index);
      displayTodos();
    });
  });
};

export default displayTodos;