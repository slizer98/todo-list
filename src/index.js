import './styles.css';
import {Todo, TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList()

todoList.todos.forEach(crearTodoHtml);

const newTodo = new Todo('Aprender NodeJs');
todoList.nuevoTodo(newTodo);
console.log(todoList);