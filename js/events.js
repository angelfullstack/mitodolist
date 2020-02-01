//Se pintan las tareas por defecto al iniciar la aplicación
paintTasks(taskList);

//Se ejecuta la función listenDeletes por primera vez;
listenDeletes();

//Función que recorre la lista y añade los eventListener a los botones delete, para usar cuando se pinta uno nuevo
function listenDeletes() {

    var deleteBtns = document.querySelectorAll('.delete')
    for (deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', deleteTask);
    }
}

//listenerer del formulario crear tarea
newTaskForm.addEventListener('submit', getForm);

//listeners de los filtros combinados

for (var i = 0; i < filter.length; i++) {
    filter[i].addEventListener('change', filterTasks)
}

//listener del botón searchBtn
//Pongo los dos métodos, ya que se incluyen en la propuesta del ejercicio, pero es más práctico el keypress del input:text ya que en principio la lista de tareas no sería muy larga.
searchBtn.addEventListener('click', captureSearch);
searchInput.addEventListener('keyup', captureSearch);

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
        listenDeletes();
    }

}

//Función borrar una tarea; recoge el evento del botón y apunta a al artículo del que desciende para borrar este nodo, y a través de la id del mismo artículo borrarlo de la lista de tasks;
function deleteTask(evt) {
    /* console.log(evt.target.parentNode.parentNode.id); */
    evt.preventDefault();
    var taskToDelete = evt.target.parentNode.parentNode
    var taskToDeleteId = evt.target.parentNode.parentNode.id;
    // es curioso pero se puede eliminar la tarea tanto con taskToDelete, como taskToDeleteId y ahora mismo no entiendo porqué con el primero sí, ya que en principio taskToDelete se refiere a un objeto en el DOM y no a un objeto de un array

    activeTasks.removeChild(taskToDelete)
    deleteTaskOfArray(taskList,taskToDeleteId);
}

//Función que recoge evento y datos de filtro
function filterTasks(evt) {
    console.log(evt.target.value);
    var priorityValue = filterPriority.value
    var frequencyValue = filterFrequency.value

    paintTasks(priorityFilter(frequencyFilter(taskList, frequencyValue), priorityValue))
}



//
function captureSearch(evt) {
    console.log(evt.target)
    var searchString = searchInput.value;
    if (searchString != '' || searchString[0] != ' ') {
        paintTasks(search(taskList, searchString));
    }
}