window.onload = function(){
	class ToDo {
		constructor(title, date){
				this.addTask = document.getElementById('addTask');
				this.fieldCounter = document.getElementById('counter');
				this.counterAll = document.getElementById('counter-all');
				this.archive = document.getElementById('archive');
				this.btnAdd = document.getElementById('add');

				this.title = title;
				this.date = date;

				this.btnAdd.addEventListener('click', () => this.newTask());
				this.archive.addEventListener("click", () => this.archiveTask());
				this.addTask.addEventListener('click', () => this.checkBoxes());

				// document.addEventListener('keyup', () => this.enter());

		}

		getLocalTask() {
			let todos = [];
			let todosStr = localStorage.getItem('todo');
			if (todosStr !== null) {
				todos = JSON.parse(todosStr);
			}
			return todos;
		}

		newTask() {
			let task = this.title || document.getElementById('input').value;
			// let task = this.title;
			let ifOnlyspace = /^[\s]+$/;
			let date = this.date;
			let dateView = date.toLocaleTimeString();

			if (task === "" || ifOnlyspace.test(task)) {
				alert("Write a task");
			} else if (task.length >= 30) {
				alert("Too length. max 30 symbols");
			} else {
				let newTodos = this.getLocalTask();
				// let newTodos = [];
				newTodos.push(task +' '+ dateView);
				// console.log(newTodos);
				localStorage.setItem('todo', JSON.stringify(newTodos));
				// this.showToDoList();
				return false;
			}
		}

		checkedTask() {
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
		}

		checkBoxes() {
			let checkbox = document.querySelectorAll('[type="checkbox"]');
			let count = 0;
			let i = 0;
			let checkId;

			this.fieldCounter.innerHTML = count;
			for (let value of checkbox){
				checkId = value;
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
				i++;
			}
		}

			archiveTask() {
			let archiveNeed = document.getElementsByTagName('input');
			let array = Array.prototype.slice.call(archiveNeed);
			console.log(array);
			let liItem, parentItem;
			for (let i of array) {
				if (i.checked == true) {
					liItem = i.parentNode;
					parentItem = liItem.parentNode
					parentItem.removeChild(liItem);
				}
			}
			let list = document.getElementById('addTask').childElementCount;
			this.counterAll.innerHTML = list;
		}

			// enter(e) {
			// 	e = e || window.event;
			// 	if (e.keyCode === 13) {
			// 		this.newTask();
			// 	}
			// 	return false;
			// }
	};
///////////////////////////////////////////////////////////////////////
	class ToDoList {
		constructor(title, date){

			this.title = title;
			this.date = date;
			let todo = new ToDo(this.title, this.date);
			this.todos = [];
			this.arrTodos = this.todos.push(todo);

			console.log(this.todos[0].__proto__.getLocalTask());
			// this.showToDoList();
			this.btnAdd = document.getElementById('add');
			this.btnAdd.addEventListener('click', () => this.showToDoList());
			this.delButtons = document.getElementsByClassName('dell');
			this.counterAll = document.getElementById('counter-all');
			// newTask()
			//remove task()
			this.showToDoList();
		}



		showToDoList() {

			let takeTodos = this.todos;
			console.log(takeTodos);
			let newToDo, inputValue, textarea, newInputElem, addBtnDelete, btnDeleteText = '';
			let count = 0;

			document.getElementById("addTask").innerHTML = "";

			for (let value of takeTodos) {
				newToDo = document.createElement("li");
				inputValue = value.title;
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
			};

			document.getElementById("input").value = "";

			let buttons = document.getElementsByClassName('dell');
				for (let delBtn of this.delButtons) {
					// console.log(delBtn)
					delBtn.addEventListener('click', () => this.removeTask(delBtn));
				}

			let list = document.getElementById('addTask').childElementCount;
			this.counterAll.innerHTML = list;
			// this.checkedTask();
			// this.todos[0].__proto__.checkedTask();
			// this.todos[0].__proto__.checkBoxes();
			// this.checkBoxes();
		}


		removeTask(delBtn) {
			let buttonDeleteId, inputId, todos;
			buttonDeleteId = delBtn.id;

			console.log(buttonDeleteId);

			inputId = delBtn.nextElementSibling.id;
			todos = this.todos[0].__proto__.getLocalTask();



			todos.splice(buttonDeleteId, 1);
			console.log(todos);

			localStorage.setItem('todo', JSON.stringify(todos));
			localStorage.removeItem(inputId);
			this.showToDoList();
			return false;
		}
	};
/////////////
	 new ToDoList('новое todo', new Date());

}

