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

const handleCompleteTask = (e) => {
	const currentTask = e.currentTarget;
	currentTask.classList.add('completed');
	setTimeout(() => {
		currentTask.remove();
		checkIfAllDone();
	}, 750);
}

const createNewTaskElement = (text) => {
	if (!text.length) { return; }

	// creating list element and setting its attributes
	const task = document.createElement('LI');
	task.title = text;
	task.classList.add('task');

	if (text.indexOf('!') > -1) { task.classList.add('urgent') }

	task.addEventListener('click', handleCompleteTask);

	// create span that shows up when task is hovered over
	const span = document.createElement('SPAN');
	span.innerHTML = [
	'<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
	'<path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>',
	'<path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z"/>',
	'</svg>'].join('\n');

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

	if (newTask) {
		todoItemsBox.appendChild(newTask);
	}
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

