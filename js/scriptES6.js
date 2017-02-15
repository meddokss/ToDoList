window.onload = function(){
	class ToDo {
		constructor(){

			this.btnAdd = document.getElementById('add');
			this.addTask = document.getElementById('addTask');
			this.fieldCounter = document.getElementById('counter');
			this.counterAll = document.getElementById('counter-all');
			this.archive = document.getElementById('archive');
			this.delButtons = document.getElementsByClassName('dell');

			this.archive.addEventListener("click", () => this.archiveTask());
			this.btnAdd.addEventListener('click', () => this.newTask());
			this.addTask.addEventListener('click', () => this.checkBoxes());
			document.addEventListener('keyup', () => this.enter());
			this.showToDoList();
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
			let task = document.getElementById('input').value;
			let ifOnlyspace = /^[\s]+$/;
			let date = new Date();
			let dateView = date.toLocaleTimeString();

			if (task === "" || ifOnlyspace.test(task)) {
				alert("Write a task");
			} else if (task.length >= 30) {
				alert("Too length. max 30 symbols");
			} else {
				let newTodos = this.getLocalTask();
				newTodos.push(task +' '+ dateView);
				localStorage.setItem('todo', JSON.stringify(newTodos));
				this.showToDoList();
				return false;
			}
		}

		showToDoList() {
			let takeTodos = this.getLocalTask();
			console.log(takeTodos);
			let newToDo, inputValue, textarea, newInputElem, addBtnDelete, btnDeleteText = '';
			let count = 0;

			document.getElementById("addTask").innerHTML = "";

			for (let value of takeTodos) {
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

			for (let delBtn of this.delButtons) {
				delBtn.addEventListener('click', () => this.removeTask(delBtn));
			}
			let list = document.getElementById('addTask').childElementCount;
			this.counterAll.innerHTML = list;
			this.checkedTask();
			this.checkBoxes();
		}

		removeTask(delBtn) {
			let buttonDeleteId, inputId, todos;
			buttonDeleteId = delBtn.id;
			inputId = delBtn.nextElementSibling.id;
			console.log(inputId);
			todos = this.getLocalTask();
			todos.splice(buttonDeleteId, 1);
			localStorage.setItem('todo', JSON.stringify(todos));
			localStorage.removeItem(inputId);
			this.showToDoList();
			return false;
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
			console.log(list);
			this.counterAll.innerHTML = list;
		}


		enter(e) {
			e = e || window.event;
			if (e.keyCode === 13) {
				this.newTask();
			}
			return false;
		}

}

	let todo = new ToDo();
}

