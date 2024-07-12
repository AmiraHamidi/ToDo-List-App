// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    const taskList = document.getElementById('task-list');
    const editPopup = document.getElementById('editPopup');
    const editTaskInput = document.getElementById('edit-task-input');
    const closePopup = document.getElementById('closePopup');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const deletePopup = document.getElementById('deletePopup');
    const closeDeletePopup = document.getElementById('closeDeletePopup');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    let currentEditIndex = null;
    let currentDeleteIndex = null;

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `list-group-item d-flex justify-content-between align-items-center task-item${task.completed ? ' completed' : ''}`;
            taskItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
                    <span class="ml-2">${task.text}</span>
                </div>
                <div>
                    <button class="btn btn-link p-0" onclick="openEditPopup(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-link p-0" onclick="openDeletePopup(${index})"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ text: taskText, completed: false });
            saveTasks(tasks);
            loadTasks();
            taskInput.value = '';
        }
    };

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    window.toggleTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        loadTasks();
    };

    window.openEditPopup = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        editTaskInput.value = tasks[index].text;
        currentEditIndex = index;
        editPopup.style.display = 'flex';
    };

    closePopup.addEventListener('click', () => {
        editPopup.style.display = 'none';
    });

    saveEditBtn.addEventListener('click', () => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks[currentEditIndex].text = editTaskInput.value.trim();
        saveTasks(tasks);
        loadTasks();
        editPopup.style.display = 'none';
    });

    window.openDeletePopup = (index) => {
        currentDeleteIndex = index;
        deletePopup.style.display = 'flex';
    };

    closeDeletePopup.addEventListener('click', () => {
        deletePopup.style.display = 'none';
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deletePopup.style.display = 'none';
    });

    confirmDeleteBtn.addEventListener('click', () => {
        deleteTask(currentDeleteIndex);
        deletePopup.style.display = 'none';
    });

    window.deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    };

    clearAllBtn.addEventListener('click', () => {
        localStorage.removeItem('tasks');
        loadTasks();
    });

    clearCompletedBtn.addEventListener('click', () => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => !task.completed);
        saveTasks(tasks);
        loadTasks();
    });

    loadTasks();
});
