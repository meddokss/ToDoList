window.onload = function(){
	class ToDo {
		constructor(){
			this.btnAdd = document.getElementById('add');
			this.addtask = document.getElementById('addtask');
			this.fieldCounter = document.getElementById('counter');
			this.counterAll = document.getElementById('counter-all');
			this.task = document.getElementById('input').value;
			this.date = new Date();
			this.dateView = this.date.toLocaleTimeString();
			this.ifOnlyspace = /^[\s]+$/;


			// this.archive.addEventListener("click", archive.task);
			this.btnAdd.addEventListener('click', this.newTask);
			this.addTask.addEventListener('click', checkBoxes);
		}


		newTask() {
			if (this.task === "" || this.ifOnlyspace.test(this.task)) {
				alert("Write a task");
			} else if (this.task.length >= 30) {
				alert("Too length. max 30 symbols");
			} else {
				let todos = getLocalTask();
				todos.push(this.task +' '+ dateView);
				localStorage.setItem('todo', JSON.stringify(todos));
				this.showToDoList();
				return false;
			}
		}

		showToDoList() {
			let todos = this.getLocalTask();
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
				buttons[i].addEventListener('click', this.removeTask);
			}

			let list = document.getElementById('addTask').childElementCount;
			this.counterAll.innerHTML = list;
			this.checkedTask();
			this.checkBoxes();
		}

		getLocalTask() {
			let todos = new Array;
			let todosStr = localStorage.getItem('todo');
			if (todosStr !== null) {
				todos = JSON.parse(todosStr);
			}
			return todos;
		}

		removeTask() {
			let id = this.getAttribute('id');
			let inputId = this.nextElementSibling.id;
			let todos = this.getLocalTask();
			todos.splice(id, 1);
			localStorage.setItem('todo', JSON.stringify(todos));
			localStorage.removeItem(inputId);
			this.showToDoList();
			return false;
		}

	checkedTask() {
		let check = document.querySelectorAll('[type="checkbox"]');
		for (let z = 0, checkId; checkId = check[z]; z++) {
			if (localStorage[checkId.id] !== undefined) {
				checkId.checked = +localStorage[checkId.id];
			}
			checkId.onchange = function() {
				localStorage[this.id] = +this.checked;
			}
		}

	}

	checkBoxes() {
		let checkbox = document.querySelectorAll('[type="checkbox"]');
		let count = 0;
		this.fieldCounter.innerHTML = count;
		for (let i = 0, checkId; checkId = checkbox[i]; i++){
			if (checkId.checked === true ) {
				let liAddClass = document.querySelectorAll("li");
				liAddClass[i].className = "checked";
				if(count<=0 && checkId.checked !== true){
					count = 0;
				}
				else {count +=1;}
				this.fieldCounter.innerHTML = count;
			}
			else {
				let liAddClass = document.querySelectorAll("li");
				liAddClass[i].className = "";
				if(count<0 && checkId.checked == false){
					count -= 1;
				}
			}
		}
	}


	archiveTask() {
		let archiveNeed = document.getElementsByTagName('input');
		let array = Array.prototype.slice.call(archiveNeed);
		for (let i = 0; i < array.length; i++) {
			if (array[i].checked == true) {
				let liItem = array[i].parentNode;
				console.log(liItem);
				let parentItem = liItem.parentNode
				parentItem.removeChild(liItem);
			}
		}
		let list = document.getElementById('addTask').childElementCount;
		this.counterAll.innerHTML = list;
	}


	// showToDoList()



/////////////
	}


	let todo = new ToDo();
	// todo.showToDoList();
	// todo.getLocalTask();
}

