import {Todo} from '../classes'
import {todoList} from '../index'

// Referencias en el Html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo'); 
const btnBorrar = document.querySelector('.clear-completed'); 


export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div')
    div.innerHTML = htmlTodo;    
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

// Eventos
txtInput.addEventListener('keyup', (e) => {
    if(e.keyCode === 13 && txtInput.value.length > 0){
        console.log(txtInput.value.length)
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        for(let i= 0; i < txtInput.value.length; i++){
            setTimeout(() => {
                txtInput.value = txtInput.value.substring(0, txtInput.value.length - 1);
            }, i * 50)
        }   
    } 
});

divTodoList.addEventListener('click', (e) => {

    const nombreElemento = e.target.localName;
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }
    if(nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
})

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});