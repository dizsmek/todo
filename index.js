const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-task');
const todoItemsBox = document.getElementById('todo-items');
const allDoneMessage = document.getElementById('all-done');


const checkIfAllDone = () => {
	const tasks = document.querySelectorAll('.task:not(.removed)');
	if (tasks.length === 0) {
		allDoneMessage.classList.add('show');
	}
}

checkIfAllDone();

const handleCompleteTask = (e) => {
	const currentTask = e.currentTarget;
	currentTask.classList.add('completed');
	setTimeout(() => {
		currentTask.classList.add('removed');
		checkIfAllDone();
	}, 500);
}

const createNewTaskElement = (text) => {
	// creating list element and setting its attributes
	const task = document.createElement('LI');
	task.title = text;
	task.classList.add('task');
	if (text.indexOf('!') > -1) {
		task.classList.add('urgent')
	}

	task.addEventListener('click', handleCompleteTask);

	// create span that shows up when task is hovered over
	const span = document.createElement('SPAN');
	span.innerHTML = 'Complete';

	// put the span and the text in the list item
	task.appendChild(span);
	// 61 characters is the length limit of a task
	task.innerHTML += text.length > 61 ? `${text.substring(0, 60)}...` : text;

	// remove 'All done' message
	allDoneMessage.classList.remove('show');

	return task;
}

const handleAddTask = () => {
	const newTask = createNewTaskElement(input.value);
	todoItemsBox.appendChild(newTask);
	input.value = '';
}

const handleEnter = (e) => {
	// on enter
	if (e.keyCode === 13) {
		e.preventDefault();
		handleAddTask();
	}
}

addBtn.addEventListener('click', handleAddTask);
input.addEventListener('keydown', handleEnter);

