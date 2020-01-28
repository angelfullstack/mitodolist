/* 
1 Declarar variables elementos html
    

funciones:
    pintarTareas

    filtrarTareas

    creaTarea
        

*/

var newTaskForm = document.querySelector('#newTaskForm')
newTaskForm.addEventListener('submit',getForm)

function paintTasks(){

}

function getForm(evt){
    console.log(evt.target);
    var nombre = evt.target[0].value;
    console.log(nombre);

}

function createTask(){

}

function filterTasks(){

}