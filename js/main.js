var newTaskForm = document.querySelector('#newTaskForm');
var activeTasks = document.querySelector('#activeTasks');
var deleteBtns; //No se asigna, ya que hasta que no se pintan los botones no existe ninguno
var idCounter = 5;

//Evento del formulario crear tarea
newTaskForm.addEventListener('submit', getForm);


paintTasks(listaTareas);




//Función que se ejecuta ante el evento submit del botón de formulario
function getForm(evt) {
    evt.preventDefault();
    console.log(evt.target);
    var taskTitle = document.getElementById('newTaskTitle').value;
    console.log(taskTitle);
    var priority = document.getElementById('newPriority').value;
    console.log(priority);
    var frequency = document.getElementById('newFrequency').value;
    console.log(frequency);
    if (taskTitle == '' || taskTitle[0] == ' ') {
        document.getElementById('newTaskForm').reset();
        document.getElementById('advice').innerText = 'La tarea debe tener al menos un nombre';
    }
    else {
        createTask(taskTitle, priority, frequency);
        document.getElementById('newTaskForm').reset();
        document.getElementById('advice').innerText = '';
    }

}

//Función que crea la tarea en base a los datos de formulario pasados por el event
function createTask(pTaskTitle, pPriority, pFrequency) {
    var task = new Object();
    task = {
        idTask: idCounter,
        name: pTaskTitle,
        priority: pPriority,
        frequency: pFrequency

    }
    idCounter++;
    console.log(task);
    listaTareas.push(task);
    console.log(listaTareas);
    paintTask(task);
}

// la función que pinta varios tasks usando la función pintar task individuales de forma recursiva. 
function paintTasks(pTasksList) {
    for (task of pTasksList) {
        paintTask(task);
    }
}


//Función que pinta una sóla tarea
function paintTask(pTask) {
    var article = document.createElement('article');
    var h3 = document.createElement('h3');
    var divDelete = document.createElement('div');
    var aDelete = document.createElement('a');
    divDelete.className = 'deleteCont';
    aDelete.className = 'delete';
    aDelete.title = 'delete';
    aDelete.href = '#';

    var h3Text = document.createTextNode(pTask.name);
    var aDeleteText = document.createTextNode('\u00D7');

    h3.appendChild(h3Text);
    aDelete.appendChild(aDeleteText);
    divDelete.appendChild(aDelete);
    article.appendChild(h3);
    article.appendChild(divDelete);
    article.id=pTask.idTask;
    activeTasks.appendChild(article);
    aDelete.addEventListener('click', deleteTask);


}



function deleteTask(evt) {
    /* console.log(evt.target.parentNode.parentNode.id); */
    evt.preventDefault();
    var taskToDelete= evt.target.parentNode.parentNode
    var taskToDeleteId=evt.target.parentNode.parentNode.id;
    // es curioso pero se puede eliminar la tarea tanto con taskToDelete, como taskToDeleteId y ahora mismo no entiendo porqué con el primero sí, ya que en principio taskToDelete se refiere a un objeto en el DOM y no a un objeto de un array.
    listaTareas.splice(listaTareas.indexOf(taskToDeleteId),1);
    activeTasks.removeChild(taskToDelete)

}

//Función para comprobar por consola si los eventlistener han sido removidos. Sólo para usar por consola y comprobar que el sistema de la función deleteTask delete-removechild-removeEventlistener está funcionanado
function listenDeletes() {
   
    var deleteBtns = document.querySelectorAll('.delete')
    for (deleteBtn of deleteBtns) {
         console.log(deleteBtn);
        
        
    }
}

function filterTasks() {

}