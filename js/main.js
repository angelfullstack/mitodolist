/*  
Filtrar por prioridad y frecuencia. Son filtros conjuntos y crean una lista intermedia a la que acceden.
búsqueda

ordenar por prioridad o frecuencia

Búsqueda por palabras.
*/


var newTaskForm = document.querySelector('#newTaskForm');
var activeTasks = document.querySelector('#activeTasks');
var deleteBtns; //No se asigna, ya que hasta que no se pintan los botones no existe ninguno
var filter = document.querySelectorAll('.filter');
var filterPriority = document.getElementById('filterPriority');
var filterFrequency = document.getElementById('filterFrequency');
var searchInput = document.getElementById('search');
var searchBtn = document.getElementById('searchBtn');
var idCounter = 5;


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
    taskList.push(task);
    console.log(taskList);
    paintTask(task);
}

// la función que pinta varios tasks usando la función pintar task individuales de forma recursiva. 
function paintTasks(pTasksList) {
    activeTasks.innerHTML = '';
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
    article.id = pTask.idTask;
    activeTasks.appendChild(article);


}

//Función delete
function deleteTaskOfArray(pList,pIdTask){
    //En este punto se podría crear una lista de tasks borrados (o finalizados)
    taskList.splice(pList.indexOf(pIdTask), 1);
}

/*Funciones filtro*/
function priorityFilter(pTaskList, pValue) {
    var filteredList = new Array();
    if (pValue != 'all') {
        for (task of pTaskList) {
            if (task.priority == pValue) {
                filteredList.push(task)
            }
        }
    } else {
        filteredList = taskList;
    }
    return filteredList;
}


function frequencyFilter(pTaskList, pValue) {
    var filteredList = new Array();
    /* let listaFiltradaDiagnostico = (diagnostico != "") ? filtrarXdiagnostico(listaPacientes, diagnostico): listaPacientes; */

    /* Esto es código spaguetti? */
    if (pValue != 'all') {
        for (task of pTaskList) {
            if (task.frequency == pValue) {
                filteredList.push(task)
            }
        }
    } else {
        filteredList = taskList;
    }
    return filteredList;
}

//Función de búsqueda en una lista
function search(pTaskList, pString) {
    console.log(pString)
    var filteredTasks = pTaskList.filter(task => {
        var taskName = task.name.toLowerCase()
        return taskName.includes(pString.toLowerCase());
    })
    console.log(filteredTasks)
    return filteredTasks;

}