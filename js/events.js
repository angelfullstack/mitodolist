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

//listener de los botones ordernar
orderPriorityBtn.addEventListener('click', captureOrder);
orderFrequencyBtn.addEventListener('click', captureOrder);

//listener del botón newTaskBtn, que desplegará el formulario newTask

newTaskBtn.addEventListener('click', showNewTask);

//Función que se ejecuta ante el evento submit del botón de formulario
function getForm(evt) {
    evt.preventDefault();
    var taskTitle = document.getElementById('newTaskTitle').value;
    var priority = document.getElementById('newPriority').value;
    var frequency = document.getElementById('newFrequency').value;
    if (taskTitle == '' || taskTitle[0] == ' ') {
        document.getElementById('newTaskForm').reset();
        document.getElementById('advice').innerText = 'La tarea debe tener al menos un nombre';
    }
    else {
        createTask(taskTitle, priority, frequency);
        document.getElementById('newTaskForm').reset();
        document.getElementById('advice').innerText = '';
        listenDeletes();
        //Esto hace que cuando se añada una nueva tarea se haga scroll automáticamente de manera que se vea la última tarea grabada aunque la lista sea muy larga;
        activeTasks.scrollTop = activeTasks.scrollHeight;
    }

}

//Función borrar una tarea; recoge el evento del botón y apunta a al artículo del que desciende para borrar este nodo, y a través de la id del mismo artículo borrarlo de la lista de tasks;
function deleteTask(evt) {
    evt.preventDefault();
    var taskToDelete = evt.target.parentNode.parentNode
    var taskToDeleteId = evt.target.parentNode.parentNode.id;
    activeTasks.removeChild(taskToDelete)
    deleteTaskOfArray(taskList, taskToDeleteId);
}

//Función que recoge evento y datos de filtro
function filterTasks(evt) { 
    var priorityValue = filterPriority.value;
    var frequencyValue = filterFrequency.value;
    console.log(filterPriority.value + ':' + filterFrequency.value);
 
    paintTasks(priorityFilter(frequencyFilter(taskList, frequencyValue), priorityValue));
    
}



//Función que recoge evento de tecleo en search y botón search
function captureSearch(evt) {
    var searchString = searchInput.value;
    if (searchString != '' || searchString[0] != ' ') {
        paintTasks(search(taskList, searchString));
        listenDeletes();
    }
}


//función que recoge el evento de los botones ordenar
function captureOrder(evt) {
    evt.preventDefault();
    var criteriaList = new Array();
    var criteria;
    var order;
    if (evt.target.parentNode.id == 'orderPriorityBtn') {
        criteriaList = priorityCriteria;
        criteria = 'priority';
        order = priorityUp;
        priorityUp = !priorityUp;
    } else {
        criteriaList = frequencyCriteria;
        criteria = 'frequency';
        order = frequencyUp;
        frequencyUp = !frequencyUp;


    }
    /* //Si se cambia la lista principal con este método:
            orderList(taskList, criteriaList, criteria,order);
            paintTasks(taskList);

    se crean 4 órdenes distintos por botón cada vez que se toca, ya que se reordena internamente cada conjunto de prioridades o frecuencias*/
    paintTasks(orderList(taskList, criteriaList, criteria, order));
    listenDeletes();
}


//Esta función despliega y repliega el formulario de eventos recalculando los espacios de los contenedores implicados.

function showNewTask(evt) {
    evt.preventDefault();
    if (newTaskState == false) {
        newTask.style.height = '12rem';
        activeTasks.style.height = '20.5rem';
        evt.target.parentNode.style.transform='rotate(45deg)';
        newTaskState = !newTaskState;
    } else {
        newTask.style.height = '';
        activeTasks.style.height = '';
        evt.target.parentNode.style.transform = 'rotate(360deg)';
        newTaskState = !newTaskState;
    }

}