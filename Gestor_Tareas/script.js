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
 
//SCRIPT DE PRUEBAS AUTOMATIZADAS
//C1 - Añadir una tarea (valida)
//Aserciones:
//C1.1 - Verifique que la tarea esta completada
//C1.2 - Verifique que la tarea tiene el elemento "completed"
//----------------------------------------------------------
//C2 - Verificar que el input de tareas se limpie despues de cada asignacion
//C3 - Validación de campo vacio
//C4 - Validacion funcional del check de tarea completada
//C5 - Comprobación de la función eliminar tarea
 
 
//------ PRUEBAS AUTOMATIADAS --------------//
//Variable globales para contar pruebas exitosas y fallidas
let passed=0, failed=0;
 
//Funcion de validacion de condiciones y conteo de resultados
function assert(condicion,testName){
  //Si la condición es verdadera
  if(condicion){
    passed++;
    console.log(`PASS: ${testName}`);
  }else{
    //Si la condicion es falsa
    failed++;
    console.log(`FAIL: ${testName}`);
  }
}
 
//Funcion para resetear el estado de la app entre pruebas
function reset(){
  //Limpie el localstorage (eliminar todas las tareas guardadas)
  localStorage.clear();
  //vacie la memoria
  taskManager.task=[];
  //Redibuje el visual/frontend de la app
  taskManager.render();  
}
 
//Funcion que muestre un resumen de pruebas
function showSummary(){
  //Mostrar el total de pruebas y resultados
  console.log(`Resultados: ${passed + failed} pruebas | ${passed} exitosas | ${failed} fallidas`);
}
 
//FUNCION PRINCIPAL QUE EJECUTA LOS CASOS DE PRUEBAS
async function runBasicTest(){
  // Reiniciar los contadores
  passed=0;
  failed=0;
  //Limpiar la consola
  console.clear();
  //Muestrar un titulo indicativo
  console.log('EJECUCION DE PRUEBAS AUTOMATIZADAS');
  //Creacion de una pausa (await promise)
  const pause = (ms) => new Promise(resolve => setTimeout(resolve,ms));
  //C1-Añadir una tarea valida.
  console.log('C1 - Añadir una tarea valida')
  reset();
  //Simular que el usuario escribe dentro del input
  document.getElementById('taskInput').value= "Comparar Leche";
  //Simular la seleccion de la categoria
  document.getElementById('categorySelect').value = 'compras';
  //Simular el añadir
  document.getElementById('addBtn').click()
  //Time (ms)
  await pause(1500)
  //Obtener el array de tareas existente
  const tasks= taskManager.getTasks();
  //Asercion 1: Verficar que hay un tarea/completed
assert(tasks.length === 1, 'C1.1 - Se añadió una tarea');
  assert(tasks[0].text === 'Comprar Leche','C1.2 - Texto Correcto')
  assert(tasks[0].category === 'compras','C1.3 -Categoria correcta')
  //Los demas casos de prueba
}
 
 
//Asociar un btn de ejecucion de pruebas
 
//Esperar a que el frontend base este cargado al 100%
window.addEventListener('load',function(){
  //Buscar el boton de pruebas en el HTML
  const testBtn = document.getElementById('runTestsBtn');
  if(testBtn){
    //Asociar el click del btn que active la funcion de test runBasicTest
    testBtn.addEventListener('click',runBasicTest);
  }
});