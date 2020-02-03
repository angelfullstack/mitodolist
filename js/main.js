var newTask= document.getElementById('newTask');
var newTaskForm = document.querySelector('#newTaskForm');
var activeTasks = document.querySelector('#activeTasks');
var deleteBtns; 
var filter = document.querySelectorAll('.filter');
var filterPriority = document.getElementById('filterPriority');
var filterFrequency = document.getElementById('filterFrequency');
var searchInput = document.getElementById('search');
var searchBtn = document.getElementById('searchBtn');
var orderPriorityBtn = document.getElementById('orderPriorityBtn');
var orderFrequencyBtn = document.getElementById('orderFrequencyBtn');
var newTaskBtn= document.getElementById('newTaskBtn');
var newTaskState=false;
var priorityUp = true;
var frequencyUp = true;
var idCounter = 5;
var priorityCriteria = new Array('highest', 'high', 'medium', 'low', 'lowest');
var frequencyCriteria = new Array('today', 'daily', 'weekly', 'monthly');


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
    taskList.push(task);
    paintTask(task);
}

//Función que pinta varios tasks usando la función pintar task individuales de forma recursiva. 
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
    var divProgress = document.createElement('div');
    var divProgressBar = document.createElement('div');
    divProgress.className = 'progress';
    divProgressBar.className = 'progressBar';
    article.className = 'task';
    switch (pTask.priority) {
        case 'lowest':
            article.className += ' marine';
            break;
        case 'low':
            article.className += ' blue';
            break;
        case 'medium':
            article.className += ' green';
            break;
        case 'high':
            article.className += ' lime';
            break;
        case 'highest':
            article.className += ' yellow';
            break;

        default:
            break;
    }
    switch (pTask.frequency) {
        case 'today':
            divProgressBar.style.width = ('15%');
            divProgressBar.innerText='HOY';
            break;
        case 'daily':
            divProgressBar.style.width = ('30%');
            divProgressBar.innerText = 'DIARIO';
            break;
        case 'weekly':
            divProgressBar.style.width = ('50%');
            divProgressBar.innerText = 'SEMANAL';
            break;
        case 'monthly':
            divProgressBar.style.width = ('90%');
            divProgressBar.innerText = 'MENSUAL';
            break;
        default:
            break;
    }
    divDelete.className = 'deleteCont';
    aDelete.className = 'delete';
    aDelete.title = 'delete';
    aDelete.href = '#';

    var h3Text = document.createTextNode(pTask.name);
    var aDeleteText = document.createTextNode('\u00D7');

    divProgress.appendChild(divProgressBar);
    h3.appendChild(h3Text);
    aDelete.appendChild(aDeleteText);
    divDelete.appendChild(aDelete);
    article.appendChild(h3);
    article.appendChild(divProgress);
    article.appendChild(divDelete);
    article.id = pTask.idTask;
    activeTasks.appendChild(article);


}

//Función delete
function deleteTaskOfArray(pList, pIdTask) {
    //En este punto se podría crear una lista de tasks borrados (o finalizados)
    taskList.splice(pList.indexOf(pIdTask), 1);
}

//Funciones filtro
function priorityFilter(pTaskList, pValue) {
    var filteredList = new Array();
    if (pValue != 'all') {
        for (task of pTaskList) {
            if (task.priority == pValue) {
                filteredList.push(task)
            }
        }
    } else {
        filteredList = pTaskList;
    }
    console.log(filteredList);
    return filteredList;
}

function frequencyFilter(pTaskList, pValue) {
    var filteredList = new Array();
    /* Esto es código spaguetti? */
    if (pValue != 'all') {
        for (task of pTaskList) {
            if (task.frequency == pValue) {
                filteredList.push(task);
            }
        }
    } else {
        filteredList = pTaskList;
        
    }
    console.log(filteredList);
    return filteredList;
}

//Función de búsqueda en una lista
function search(pTaskList, pString) {
    var filteredTasks = pTaskList.filter(task => {
        var taskName = task.name.toLowerCase()
        return taskName.includes(pString.toLowerCase());
    })
    return filteredTasks;
}


//Función ordenar lista
function orderList(pTaskList, pCriteriaList, pCriteria, pOrder) {
    var orderedList = new Array();
    for (criteria of pCriteriaList) {
        for (task of pTaskList) {
            if (task[pCriteria] == criteria) {
                orderedList.push(task);
            }
        }
    }

    pTaskList = orderedList;
    if (pOrder == false) {
        pTaskList.reverse();
    }
    return pTaskList;

}