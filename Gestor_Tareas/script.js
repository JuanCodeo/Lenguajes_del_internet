class TaskManager {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentFilter = 'all';
    this.initElements();
    this.attachEvents();
    this.render();
  }

  initElements() {
    this.taskInput = document.getElementById('taskInput');
    this.categorySelect = document.getElementById('categorySelect');
    this.addBtn = document.getElementById('addBtn');
    this.taskList = document.getElementById('taskList');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.totalTasksEl = document.getElementById('totalTasks');
    this.activeTasksEl = document.getElementById('activeTasks');
    this.completedTasksEl = document.getElementById('completedTasks');
  }

  attachEvents() {
    this.addBtn.addEventListener('click', () => this.addTask());
    this.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask();
    });
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
    });
  }

  loadTasks() {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask() {
    const text = this.taskInput.value.trim();
    const category = this.categorySelect.value;

    if (text === '') {
      alert('Por favor, escribe una tarea');
      return;
    }

    const task = {
      id: Date.now(),
      text: text,
      category: category,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(task);
    this.saveTasks();
    this.taskInput.value = '';
    this.render();
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.render();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
    this.render();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    this.render();
  }

  getFilteredTasks() {
    if (this.currentFilter === 'all') return this.tasks;
    if (this.currentFilter === 'active') return this.tasks.filter(t => !t.completed);
    if (this.currentFilter === 'completed') return this.tasks.filter(t => t.completed);
    return this.tasks.filter(t => t.category === this.currentFilter);
  }

  updateStats() {
    this.totalTasksEl.textContent = this.tasks.length;
    this.activeTasksEl.textContent = this.tasks.filter(t => !t.completed).length;
    this.completedTasksEl.textContent = this.tasks.filter(t => t.completed).length;
  }

  render() {
    const filteredTasks = this.getFilteredTasks();
    this.taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
      this.taskList.innerHTML = '<div class="empty-state">No hay tareas para mostrar</div>';
    } else {
      filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.testid = `task-${task.id}`;
        
        li.innerHTML = `
          <input type="checkbox" 
                 class="task-checkbox" 
                 ${task.completed ? 'checked' : ''}
                 data-testid="checkbox-${task.id}">
          <div class="task-content">
            <span class="task-text" data-testid="task-text-${task.id}">${task.text}</span>
            <span class="task-category">${this.getCategoryIcon(task.category)} ${task.category}</span>
          </div>
          <button class="delete-btn" data-testid="delete-${task.id}">Eliminar</button>
        `;

        li.querySelector('.task-checkbox').addEventListener('change', () => this.toggleTask(task.id));
        li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTask(task.id));

        this.taskList.appendChild(li);
      });
    }

    this.updateStats();
  }

  getCategoryIcon(category) {
    const icons = {
      trabajo: '💼',
      personal: '👤',
      urgente: '🔥',
      compras: '🛒'
    };
    return icons[category] || '📌';
  }

  getTasks() {
    return this.tasks;
  }

  getTaskById(id) {
    return this.tasks.find(t => t.id === id);
  }

  clearAllTasks() {
    this.tasks = [];
    this.saveTasks();
    this.render();
  }

  getStats() {
    return {
      total: this.tasks.length,
      active: this.tasks.filter(t => !t.completed).length,
      completed: this.tasks.filter(t => t.completed).length
    };
  }
}

// Inicializar la aplicación
const app = new TaskManager();
window.taskManager = app;