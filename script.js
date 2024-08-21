let groups = {
  'Inbox': [],
};
let currentGroup = 'Inbox';

function addGroup() {
  const groupName = document.getElementById('group-name').value.trim();
  if (groupName === '') {
    alert('Enter a valid Group Name');
    return;
  }
  if (groups[groupName]) {
    alert('Group already exists!');
    return;
  }
  currentGroup = groupName;
  groups[groupName] = [];
  render();
  document.getElementById('group-name').value = '';
}

function render() {
  document.querySelector('.taskGroups').innerHTML = '';
  for (let group in groups) {
    const newDiv = createGroupComponents(group);
    document.querySelector('.taskGroups').appendChild(newDiv);
  }
}

function createGroupComponents(groupName) {
  const groupDiv = document.createElement('div');
  const groupButton = document.createElement('button');
  groupButton.classList.add('group-btn');
  groupButton.setAttribute('onclick', `showTasks('${groupName}')`);
  groupButton.textContent = groupName;
  groupDiv.appendChild(groupButton);
  return groupDiv;
}

function addTodo() {
  const newTask = document.querySelector('#text-box').value.trim();
  if (newTask === '') {
    alert('Enter valid task');
    return;
  }
  groups[currentGroup].push(newTask);
  document.querySelector('#text-box').value = '';
  showTasks(currentGroup);
}

function showTasks(group) {
  document.querySelector('.todo-list').innerHTML = '';
  currentGroup = group;

  // Creating a h2 element to speocify which group you are in
  const subTopic = document.createElement('h3')
  subTopic.innerText = currentGroup;

  // Joining it w the DOM
  document.querySelector('.todo-list').appendChild(subTopic)
  for (let i = 0; i < groups[group].length; i++) {
    createTodoComponent(groups[group][i], i);
  }
}

function createTodoComponent(newTask, index) {
  const taskHeading = document.createElement('h4');
  taskHeading.textContent = newTask;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteTodo(index));

  const taskContainer = document.createElement('div');
  taskContainer.setAttribute('class','newTodo')
  taskContainer.appendChild(taskHeading);
  taskContainer.appendChild(deleteButton);
  document.querySelector('.todo-list').appendChild(taskContainer);
}

function deleteTodo(index) {
  groups[currentGroup].splice(index, 1);
  showTasks(currentGroup);
}