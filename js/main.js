var newTaskForm = document.querySelector('#newTaskForm');
var activeTasks = document.querySelector('#activeTasks');
var deleteBtns; //No se asigna, ya que hasta que no se pintan los botones no existe ninguno
var idCounter = 4;

//Evento del formulario crear tarea
newTaskForm.addEventListener('submit', getForm);

//Eventos de los botones borrar tarea
function listenDeletes() {
    for (deleteBtn of deleteBtns) {
        console.log(deleteBtn)
        deleteBtn.addEventListener('click', deleteTask);
    }
}
paintTasks(listaTareas);

listenDeletes();

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

function paintTasks(pTasksList) {
    for (task of pTasksList) {
        paintTask(task);
        
    }
    deleteBtns = document.querySelectorAll('.delete');
    listenDeletes();
}

/* 
<section id="activeTasks" class="activeTasks">
    <article id="1" class="high today">
        <h3>Titulo de la tarea 1 - Esta tarea es DUMMY</h3>
        <div class="deleteCont"><a href="#" title="delete">Eliminar</a></div>
    </article>
</section>
 */

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
    activeTasks.appendChild(article);


}

function deleteTask(evt) {
    console.log(evt.target.parentNode.parentNode);

}

function filterTasks() {

}