window.onload = function() {
	// localStorage.clear();
	let btnAdd = document.getElementById('add'),
		addTask = document.getElementById('addTask'),
		fieldCounter = document.getElementById('counter'),
		counterAll = document.getElementById('counter-all');


	archive.addEventListener("click", archiveTask);
	addTask.addEventListener('click', checkBoxes);
	btnAdd.addEventListener('click', newTask);
	showToDoList();

	function getLocalTask() {
		let todos = new Array;
		let todos_str = localStorage.getItem('todo');
		if (todos_str !== null) {
			todos = JSON.parse(todos_str);
		}
		return todos;
	}

	function newTask() {

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
			document.getElementById("addTask").innerHTML = "";

		for (let i = 0; i < todos.length; i++) {
			let li = document.createElement("li");
		
			var inputValue = todos[i];	
			var textarea = document.createTextNode(inputValue);
			let inputAppend = document.createElement('input');
			inputAppend.id = 'check' + i;
			inputAppend.type = 'checkbox';

			let btnDelete = document.createElement('button');
			let deletet = document.createTextNode('Delete');
				btnDelete.id = i;
				btnDelete.className = 'dell btn';
				btnDelete.appendChild(deletet);

			li.id = 'r';
			li.appendChild(btnDelete);
			li.appendChild(inputAppend);
			li.appendChild(textarea);
			document.getElementById("addTask").appendChild(li);
		};
		document.getElementById("input").value = "";
		
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
		let checkbox = document.querySelectorAll('[type="checkbox"]');
		let count = 0;
		fieldCounter.innerHTML = count;
		for (let i = 0, checkid; checkid = checkbox[i]; i++){
			if (checkid.checked === true ) {
				let liAddClass = document.querySelectorAll("li");
				liAddClass[i].className = "checked";
				if(count<=0 && checkid.checked !== true){
					count = 0;
				}
				else {count +=1;}
				fieldCounter.innerHTML = count;
			}
			else {
				let liAddClass = document.querySelectorAll("li");
				liAddClass[i].className = "";
				if(count<0 && checkid.checked == false){
					count -= 1;
				}
			}
		}
	}


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
		list = document.getElementById('addTask').childElementCount;
		counterAll.innerHTML = list;
	}
	showToDoList();
}

