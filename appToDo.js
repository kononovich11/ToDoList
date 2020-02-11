//list of tasks

const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  } 
];

(function(arrOfTasks) {
 
  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };

  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';
  //Elements UI
  const listContainer = document.querySelector('.list-group',);
  
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const unfinBtn = document.querySelector('.btn-unfinish');
  const allTasksBtn = document.querySelector('.btn-info');
  const themeSelect = document.getElementById('themeSelect');
 
  //Check on elements in array
  if(arrOfTasks.length == 0){
    msgEmptyArr();
  }

  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  renderAllTasks(objOfTasks); 
  //Events
  setTheme(lastSelectedTheme);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeletehandler);
  listContainer.addEventListener('click', onFinishhandler);
  unfinBtn.addEventListener('click', generateUnfinList);
  allTasksBtn.addEventListener('click', generateAllList);
  themeSelect.addEventListener('change', onThemeSelectHandler);

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('Pass a list of tasks!');
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body, completed } = {}) {
    const li = document.createElement('li');
    li.classList.add(
        'list-group-item',
        'd-flex',
        'align-items-center',
        'flex-wrap', 
        'mt-2',); 

    li.setAttribute('data-task-id', _id);

    if(completed){
      li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    const finishBtn = document.createElement('button');
    finishBtn.textContent = 'Finish task';
    finishBtn.style.background = 'green';
    finishBtn.classList.add('btn', 'btn-primary', 'ml-auto', 'finish-btn');

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span);
    li.appendChild(finishBtn);
    li.appendChild(article);
    li.appendChild(deleteBtn);
   
    return li;
  }

  function onFormSubmitHandler(e){
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    
    if(!titleValue && !bodyValue || !titleValue || !bodyValue) {
      alert('Please enter title and body'); return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }

  function createNewTask(title, body){
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return {...newTask};
  }

  function deleteTask(id){
    const isConfirm = confirm(`Delete this task?`);
    if(!isConfirm){
      return isConfirm;
    } 
    else {
      delete objOfTasks[id];
      return isConfirm;
    }
  }

  function deleteTaskFromHtml(confirmed, el){
    if(confirmed){
      el.remove();
      if(listContainer.children.length == 0){ //if all tasks were deleted
        msgEmptyArr();
      } 
    }
    else{
      return confirmed;
    }
  }

  function onDeletehandler({target}) {
  if (target.classList.contains('delete-btn')){
    const parent = target.closest('[data-task-id]');
    const id = parent.dataset.taskId;
    const confirmed = deleteTask(id); 
    deleteTaskFromHtml(confirmed, parent);
   }
  }

  function chanceFlag(objOfTasks,id){
    const objValue = objOfTasks[id];
    objValue.completed = true;
  }

  function onFinishhandler({target}){
    if(target.classList.contains('finish-btn')){
      const parentFinBtn = target.closest('[data-task-id]');
      const confirmFin = finishTask(parentFinBtn);
    }
  }

  function finishTask (parentFinBtn ){
    const confirmFinish = confirm('Finish this task?');
    if(confirmFinish){
      parentFinBtn.style.background = '#9370DB';
      const id = parentFinBtn.dataset.taskId;
      chanceFlag(objOfTasks, id);
    }
  }

  function generateUnfinList () { 
    [...listContainer.children].forEach((el,index) => {
     if(!el.classList.contains('completed')){
        el.remove();
      }
    });
    const completedUl = listContainer.children;
    [...completedUl].forEach((el,index) => {
      el.classList.add('needDel');
    });
  }

  function generateAllList() {
    renderAllTasks(objOfTasks);
    [...listContainer.children].forEach((el, index) => {
      if(el.classList.contains('needDel')){
        el.remove();
      }
    });
  } 

  function msgEmptyArr(){
    const msg = document.createElement('p');
    msg.textContent = 'Array with tasks is empty!';
    msg.style.color = 'red';
    form.appendChild(msg);
  }

  function onThemeSelectHandler(e){
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(`Do you really want to change the theme on ${selectedTheme}?`);
    if(!isConfirmed){
      themeSelect.value = lastSelectedTheme;
      return;
    } 
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('app_theme', selectedTheme);
  }

  function setTheme(name){
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }

})(tasks);


