/**
 * @jest-environment jsdom
 */
import displayTodos from './displayTodoUtil.js';
import { TodoCollection } from './util.js';
import 'jest-localstorage-mock';

const myList = new TodoCollection([]);

describe('Testing add and delete item', () => {
  test('add to collection', () => {
    myList.addTodo('Todo Testing');
    expect(myList.todos[myList.todos.length - 1].description).toBe('Todo Testing');
  });

  test('saved to local storage', () => {
    localStorage.clear();
    myList.todos = [];
    myList.addTodo('Todo Testing');
    expect(localStorage.getItem('todos')).toBe(JSON.stringify(myList.todos));
  });

  test('delete item from collection', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing');
    myList.removeTodo(0);
    expect(myList.todos.length).toBe(0);
  });

  test('delete specific item from collection', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 0');
    myList.addTodo('Todo Testing 1');
    myList.addTodo('Todo Testing 2');
    const temp = myList.todos[1];
    myList.removeTodo(1);
    expect(myList.todos.includes(temp)).toBe(false);
  });

  test('delete item from localStorage', () => {
    localStorage.clear();
    myList.todos = [];
    myList.addTodo('Todo Testing');
    myList.removeTodo(0);
    expect(localStorage.getItem('todos')).toBe(JSON.stringify(myList.todos));
  });

  test('dom element added for each item', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing');
    myList.addTodo('Todo Testing 2');
    document.body.innerHTML = `
    <div>
    <ul id='todos'></ul>
    </div>
    `;
    displayTodos(myList);
    const list = document.querySelectorAll('.todo');
    expect(list.length).toBe(myList.todos.length);
  });

  test('dom element removed for each item', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1');
    myList.addTodo('Todo Testing 2');
    myList.addTodo('Todo Testing 3');
    myList.removeTodo(1);
    document.body.innerHTML = `
    <div>
    <ul id='todos'></ul>
    </div>
    `;
    displayTodos(myList);
    const list = document.querySelectorAll('.todo');
    expect(list.length).toBe(myList.todos.length);
  });
});

describe('Updating description', () => {
  test('test to edit task description', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1');
    const { index } = myList.todos[0];
    const description = 'Editing todo test 1';
    myList.updateDescription(index, description);
    expect(myList.todos[0].description).toBe(description);
  });

  test('If updated was edited in localstorage', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1');
    const { index } = myList.todos[0];
    const description = 'Editing todo test 1';
    myList.updateDescription(index, description);
    const temp = JSON.parse(localStorage.getItem('todos'));
    expect(temp[0].description).toEqual(myList.todos[0].description);
  });
});

describe('update completed status', () => {
  test('test of updating item complete status', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1');
    const { index } = myList.todos[0];
    myList.markAsCompleted(index);
    expect(myList.todos[0].completed).toBeTruthy();
  });

  test('test of updating item from complete to not completed', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1');
    const { index } = myList.todos[0];
    myList.markAsCompleted(index);
    myList.markAsCompleted(index);
    expect(myList.todos[0].completed).not.toBeTruthy();
  });

  test('update completed status in localStorage', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1');
    const { index } = myList.todos[0];
    myList.markAsCompleted(index);
    const temp = JSON.parse(localStorage.getItem('todos'));
    expect(temp[0].completed).toBeTruthy();
  });
});

describe('Clear all completed tasks', () => {
  test('Clear all completed tasks', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1'); // index 1
    myList.addTodo('Todo Testing 2'); // index 2
    myList.addTodo('Todo Testing 3'); // index 3
    myList.addTodo('Todo Testing 4'); // index 4
    myList.markAsCompleted(1);
    myList.markAsCompleted(3);
    myList.clearCompleted();
    expect(myList.todos).toHaveLength(2);
  });

  test('Keep only not completed tasks', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1'); // index 1
    myList.addTodo('Todo Testing 2'); // index 2
    myList.addTodo('Todo Testing 3'); // index 3
    myList.addTodo('Todo Testing 4'); // index 4
    myList.markAsCompleted(1);
    myList.markAsCompleted(3);
    myList.clearCompleted();
    const output = [{ completed: false, description: 'Todo Testing 2', index: 1 }, { completed: false, description: 'Todo Testing 4', index: 2 }];
    expect(myList.todos).toEqual(output);
  });

  test('Remove all completed from localStorage', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1');
    myList.addTodo('Todo Testing 2');
    myList.addTodo('Todo Testing 3');
    myList.addTodo('Todo Testing 4');
    myList.markAsCompleted(1);
    myList.markAsCompleted(3);
    myList.clearCompleted();
    const temp = JSON.parse(localStorage.getItem('todos'));
    expect(temp).toEqual([{ completed: false, description: 'Todo Testing 2', index: 1 }, { completed: false, description: 'Todo Testing 4', index: 2 }]);
  });

  test('dom element removed after clearing', () => {
    myList.todos = [];
    myList.addTodo('Todo Testing 1');
    myList.addTodo('Todo Testing 2');
    myList.addTodo('Todo Testing 3');
    myList.addTodo('Todo Testing 4');
    myList.markAsCompleted(1);
    myList.markAsCompleted(3);
    myList.clearCompleted();
    document.body.innerHTML = `
    <div>
    <ul id='todos'></ul>
    </div>
    `;
    displayTodos(myList);
    const list = document.querySelectorAll('.todo');
    expect(list.length).toBe(myList.todos.length);
  });
});
