window.onload = function() {
	let btnAdd = document.getElementById('add'),
		addTask = document.getElementById('addTask'),
		fieldCounter = document.getElementById('counter'),
		counterAll = document.getElementById('counter-all');
		archive.addEventListener("click", archiveTask);
		addTask.addEventListener('click', checkBoxes);
		btnAdd.addEventListener('click', newTask);
		showToDoList();

	function getLocalTask() {
		let todos = [];
		let todosStr = localStorage.getItem('todo');
		if (todosStr !== null) {
			todos = JSON.parse(todosStr);
		}
		return todos;
	};

	function newTask() {

		let task = document.getElementById('input').value;
		let ifOnlyspace = /^[\s]+$/;
		let date = new Date();
		let dateView = date.toLocaleTimeString();

		if (task === "" || ifOnlyspace.test(task)) {
			alert("Write a task");
		} else if (task.length >= 30) {
			alert("Too length. max 30 symbols");
		} else {
			let todos = getLocalTask();
			todos.push(task +' '+ dateView);
			localStorage.setItem('todo', JSON.stringify(todos));
			showToDoList();
			return false;
		}
	};

	function removeTask() {
		let buttonDeleteId = this.getAttribute('id');
		let inputId = this.nextElementSibling.id;
		console.log(inputId);
		let todos = getLocalTask();
		todos.splice(buttonDeleteId, 1);
		localStorage.setItem('todo', JSON.stringify(todos));
		localStorage.removeItem(inputId);
		showToDoList();
		return false;
	};

	function showToDoList() {
		let todos = getLocalTask();
		let newToDo, inputValue, textarea, newInputElem, addBtnDelete, btnDeleteText = '';
		let count = 0;

		document.getElementById("addTask").innerHTML = "";

		for (let value of todos) {
			newToDo = document.createElement("li");
			inputValue = value;
			textarea = document.createTextNode(inputValue);
			newInputElem = document.createElement('input');
			newInputElem.id = 'check' + count;
			newInputElem.type = 'checkbox';
			addBtnDelete = document.createElement('button');
			btnDeleteText = document.createTextNode('Delete');
				addBtnDelete.id = count;
				addBtnDelete.className = 'dell btn';
				addBtnDelete.appendChild(btnDeleteText);
			newToDo.id = 'r';
			newToDo.appendChild(addBtnDelete);
			newToDo.appendChild(newInputElem);
			newToDo.appendChild(textarea);
			document.getElementById("addTask").appendChild(newToDo);
			count ++;
		};

		document.getElementById("input").value = "";

		let buttons = document.getElementsByClassName('dell');
			for (let deleteButton of buttons) {
			deleteButton.addEventListener('click', removeTask);
		}

		let list = document.getElementById('addTask').childElementCount;
		counterAll.innerHTML = list;
		checkedTask();
		checkBoxes();
	};

	function checkedTask() {
		let check = document.querySelectorAll('[type="checkbox"]');
		let checkId;
		for (let value of check) {
			checkId = value;
			if (localStorage[checkId.id] !== undefined) {
				checkId.checked = +localStorage[checkId.id];
			}
			checkId.onchange = function() {
				localStorage[this.id] = +this.checked;
			}
		}
	};

	function checkBoxes() {
		let checkbox = document.querySelectorAll('[type="checkbox"]');
		let count = 0;
		let i = 0;
		let checkId;
		fieldCounter.innerHTML = count;

		for (let value of checkbox){
			checkId = value;
			if (checkId.checked === true ) {
				let liAddClass = document.querySelectorAll("li");
				liAddClass[i].className = "checked";
				if(count<=0 && checkId.checked !== true){
					count = 0;
				}
				else {count +=1;}
				fieldCounter.innerHTML = count;
			}
			else {
				let liAddClass = document.querySelectorAll("li");
				liAddClass[i].className = "";
				if(count<0 && checkId.checked == false){
					count -= 1;
				}
			}
			i++;
		}
	};

	function archiveTask() {
		let archiveNeed = document.getElementsByTagName('input');
		let array = Array.prototype.slice.call(archiveNeed);
		let liItem, parentItem;

		for (let i of array) {
			if (i.checked == true) {
				liItem = i.parentNode;
				parentItem = liItem.parentNode
				parentItem.removeChild(liItem);
			}
		}

		let list = document.getElementById('addTask').childElementCount;
		counterAll.innerHTML = list;
	};
	showToDoList();
	document.onkeyup = function (e) {
		e = e || window.event;
		if (e.keyCode === 13) {
			newTask();
		}
		return false;
	};
};

