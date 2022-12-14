/**
 * @jest-environment jsdom
 */
import { TodoCollection } from './util.js';
import 'jest-localstorage-mock';

const myList = new TodoCollection([]);

describe('Testing add to collection', () => {
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
    document.body.innerHTML = `
    <div>
    <ul id="todos"></ul>
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
    <ul id="todos"></ul>
    </div>
    `;
    displayTodos(myList);
    const list = document.querySelectorAll('.todo');
    expect(list.length).toBe(myList.todos.length);
  });
});
