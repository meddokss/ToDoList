window.onload = function() {

	class ToDo {
		constructor(title, date, stage){
			this.btnAdd = document.getElementById('add');
			this.btnAdd.addEventListener('click',  () => this.newTask());
			this.title = title;
			this.date = date.toLocaleTimeString();
			this.stage = stage;

		}

		show(){
			console.log(`stage:${this.stage} date: ${this.date} title: ${this.title}`);
		};

		delete() {
			//
			//toDoList.updateTodoList(todo.id);
		}

		newTask(){
			this.show();
		}

	}

	class ToDoList {
		constructor(title, date, stage){
			let todo = new ToDo(title, date, stage);
			this.todos = [];
			let TD = this.todos.push(todo);
			this.btnAdd = document.getElementById('add');
			this.btnAdd.addEventListener('click',  () => this.createTodo());
		}

		createTodo() {
			let todo = new ToDo(document.getElementById('input').value, new Date(), false);
			this.todos.push(todo);
			this.appendTodo(todo);
		}

		appendTodo(todo) {

			let takeTodos = this.todos;
			// console.log(takeTodos);
			let newToDo, inputValue, textarea, newInputElem, addBtnDelete, btnDeleteText = '';
			let count = 0;

			newToDo = document.createElement("li");
			inputValue = `todo.title ${todo.date}`;
			// console.log(inputValue)
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
		}
		regen (){
			console.log(this.todos)
		}
	}

	new ToDoList('Привет как дела', new Date(), true).regen();
}



// 	let btnAdd = document.getElementById('add'),
// 		addTask = document.getElementById('addTask'),
// 		fieldCounter = document.getElementById('counter'),
// 		counterAll = document.getElementById('counter-all');

// 		archive.addEventListener("click", archiveTask);
// 		addTask.addEventListener('click', checkBoxes);
// 		btnAdd.addEventListener('click', newTask);
// 		showToDoList();


// 	function getLocalTask() {
// 		let todos = new Array;
// 		let todosStr = localStorage.getItem('todo');
// 		if (todosStr !== null) {
// 			todos = JSON.parse(todosStr);
// 		}
// 		return todos;
// 	};

// 	function newTask() {

// 		let task = document.getElementById('input').value,
// 			ifOnlyspace,
// 			date,
// 			dateView;

// 		date = new Date();
// 		dateView = date.toLocaleTimeString();
// 		ifOnlyspace = /^[\s]+$/;
// 		if (task === "" || ifOnlyspace.test(task)) {
// 			alert("Write a task");
// 		} else if (task.length >= 30) {
// 			alert("Too length. max 30 symbols");
// 		} else {
// 			let todos = getLocalTask();
// 			todos.push(task +' '+ dateView);
// 			localStorage.setItem('todo', JSON.stringify(todos));
// 			showToDoList();
// 			return false;
// 		}
// 	};

// 	function removeTask() {
// 		let id = this.getAttribute('id');
// 		let inputId = this.nextElementSibling.id;
// 		let todos = getLocalTask();
// 		todos.splice(id, 1);
// 		localStorage.setItem('todo', JSON.stringify(todos));
// 		localStorage.removeItem(inputId);
// 		showToDoList();
// 		return false;
// 	};

// 	function showToDoList() {
// 		let todos = getLocalTask();
// 		document.getElementById("addTask").innerHTML = "";

// 		for (let i = 0; i < todos.length; i++) {
// 			let li = document.createElement("li");
// 			var inputValue = todos[i];
// 			var textarea = document.createTextNode(inputValue);
// 			let inputAppend = document.createElement('input');
// 			inputAppend.id = 'check' + i;
// 			inputAppend.type = 'checkbox';

// 			let btnDelete = document.createElement('button');
// 			let deletet = document.createTextNode('Delete');
// 				btnDelete.id = i;
// 				btnDelete.className = 'dell btn';
// 				btnDelete.appendChild(deletet);

// 			li.id = 'r';
// 			li.appendChild(btnDelete);
// 			li.appendChild(inputAppend);
// 			li.appendChild(textarea);
// 			document.getElementById("addTask").appendChild(li);
// 		};
// 		document.getElementById("input").value = "";

// 		let buttons = document.getElementsByClassName('dell');
// 			for (let i = 0; i < buttons.length; i++) {
// 			buttons[i].addEventListener('click', removeTask);
// 		}

// 		list = document.getElementById('addTask').childElementCount;
// 		counterAll.innerHTML = list;
// 		checkedTask();
// 		checkBoxes();
// 	};

// 	function checkedTask() {
// 		let check = document.querySelectorAll('[type="checkbox"]');
// 		for (let z = 0, checkId; checkId = check[z]; z++) {
// 			if (localStorage[checkId.id] !== undefined) {
// 				checkId.checked = +localStorage[checkId.id];
// 			}
// 			checkId.onchange = function() {
// 				localStorage[this.id] = +this.checked;
// 			}
// 		}

// 	};

// 	function checkBoxes() {
// 		let checkbox = document.querySelectorAll('[type="checkbox"]');
// 		let count = 0;
// 		fieldCounter.innerHTML = count;
// 		for (let i = 0, checkId; checkId = checkbox[i]; i++){
// 			if (checkId.checked === true ) {
// 				let liAddClass = document.querySelectorAll("li");
// 				liAddClass[i].className = "checked";
// 				if(count<=0 && checkId.checked !== true){
// 					count = 0;
// 				}
// 				else {count +=1;}
// 				fieldCounter.innerHTML = count;
// 			}
// 			else {
// 				let liAddClass = document.querySelectorAll("li");
// 				liAddClass[i].className = "";
// 				if(count<0 && checkId.checked == false){
// 					count -= 1;
// 				}
// 			}
// 		}
// 	};

// 	function archiveTask() {
// 		let archiveNeed = document.getElementsByTagName('input');
// 		let array = Array.prototype.slice.call(archiveNeed);
// 		for (let i = 0; i < array.length; i++) {
// 			if (array[i].checked == true) {
// 				let liItem = array[i].parentNode;
// 				console.log(liItem);
// 				let parentItem = liItem.parentNode
// 				parentItem.removeChild(liItem);
// 			}
// 		}
// 		list = document.getElementById('addTask').childElementCount;
// 		counterAll.innerHTML = list;
// 	};
// 	showToDoList();
// 	document.onkeyup = function (e) {
// 		e = e || window.event;
// 		if (e.keyCode === 13) {
// 			newTask();
// 		}
// 		return false;
// 	};
// };

