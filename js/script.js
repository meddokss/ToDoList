window.onload = function() {
	// localStorage.clear();
	let btnAdd = document.getElementById('add'),
		newTask = document.getElementById('newTask'),
		fieldCounter = document.getElementById('counter'),
		counterAll = document.getElementById('counter-all');


	archive.addEventListener("click", archiveTask);
	newTask.addEventListener('click', checkBoxes);
	btnAdd.addEventListener('click', addTask);
	showToDoList();

	function getLocalTask() {
		let todos = new Array;
		let todos_str = localStorage.getItem('todo');
		if (todos_str !== null) {
			todos = JSON.parse(todos_str);
		}
		return todos;
	}

	function addTask() {
		let task = document.getElementById('input').value,
			spaceCheck,
			date,
			dateZero,
			dateView;

		date = new Date();
		dateZero = date => date < 10 ? date = "0" + date : date;
		dateView = ' ' +dateZero(date.getHours()) + ':' + dateZero(date.getMinutes()) + ':' + dateZero(date.getSeconds()) + '';
		spaceCheck = /^[\s]+$/;
		if (task === "" || spaceCheck.test(task)) {
			alert("Write a task");
		} else if (task.length >= 30) {
			alert("Too length. max 30 symbols");
		} else {
			let todos = getLocalTask();
			todos.push(task+dateView);
			localStorage.setItem('todo', JSON.stringify(todos));
			showToDoList();
			return false;
		}
	}
	

	function removeTask() {
		let id = this.getAttribute('id');
		let todos = getLocalTask();
		todos.splice(id, 1);
		localStorage.setItem('todo', JSON.stringify(todos));
		showToDoList();
		return false;
	}

	function showToDoList() {
		let todos = getLocalTask();
		let taskView = '<ul id="addTask">';
		for (let i = 0; i < todos.length; i++) {
			taskView += '<li id="r"><input type="checkbox" name="task" value="task" id="check' + i + '">' + ' ' + todos[i] + ' ' +'<button class="dell btn" id="' + i + '">Delete</button></li>';
		};

		taskView += '</ul>';
		document.getElementById('newTask').innerHTML = taskView;

		let buttons = document.getElementsByClassName('dell');
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', removeTask);
		}

		list = document.getElementById('addTask').childElementCount;
		counterAll.innerHTML = list;
		checkId();
		checkBoxes();
	}


	function checkId() {
		let check = document.querySelectorAll('[type="checkbox"]');

		for (let z = 0, checkid; checkid = check[z]; z++) {
			if (localStorage[checkid.id] !== undefined) {
				checkid.checked = +localStorage[checkid.id];

			}
			checkid.onchange = function() {
				localStorage[this.id] = +this.checked;
			}
		}
	}

	function checkBoxes() {
		let inputElems = document.getElementsByTagName("input"),
			allTask = newTask.getElementsByTagName('li');
			var count = 0;
		for (let i = 0; i < inputElems.length; i++) {
			if (inputElems[i].checked == true) {
				count = 1 + i;
				allTask[i].classList.add("checked");
			} else {
				allTask[i].classList.remove("checked");
			}
			fieldCounter.innerHTML = count;
		}

	}
// fieldCounter.innerHTML = count;
	function archiveTask() {
		let archiveNeed = document.getElementsByTagName('input');
		let array = Array.prototype.slice.call(archiveNeed);
		for (let i = 0; i < array.length; i++) {
			if (array[i].checked == true) {
				let liItem = array[i].parentNode;
				let parentItem = liItem.parentNode
				parentItem.removeChild(liItem);
			}
		}
		list = document.getElementById('newTask').childElementCount;
		counterAll.innerHTML = list;
	}
	showToDoList();
}

