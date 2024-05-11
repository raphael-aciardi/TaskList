const inputTask = document.querySelector('#task-input');
const addTask = document.querySelector('#add-task');
const taskContainer =  document.querySelector('#task-container');
const removeElement = document.querySelector('.removeButton')

function returnvalue () {
    return inputTask.value;
}

function newElement(AddItem) {
    const listElement = document.createElement("li");
    listElement.setAttribute('class', 'task')
    taskContainer.appendChild(listElement);
    listElement.innerText = AddItem;
    newButton(listElement);
    inputTask.value = ''
    saveTask()
    }

function newButton(element){
    const liButton = document.createElement('button')
    liButton.setAttribute('class', 'removeButton')
    liButton.setAttribute('title', 'apagar tarefa')
    liButton.innerText = 'remove'
    element.appendChild(liButton);
}

function saveTask(){
    const liTasks = taskContainer.querySelectorAll('li');
    const tasks = [];
    for (let task of liTasks) {
        let textTask = task.innerText;
        textTask = textTask.replace('remove', ''.trim())
        tasks.push(textTask)
    }

    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJSON);

}


function savedTasks() {
    const tasks = localStorage.getItem('tasks');
    const tasklist = JSON.parse(tasks);

    for (let task of tasklist) {
        newElement(task);                                           
    }
}

savedTasks()



addTask.addEventListener('click', (event) => {
    event.preventDefault();
    if (returnvalue() !== ''){
        newElement(returnvalue());
    }
})



document.addEventListener('click', (event) => {
    const el = event.target
    if (el.classList.contains('removeButton')){
        el.parentElement.remove()
        saveTask()
    }
})


