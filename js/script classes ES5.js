window.onload = function() {

	function ToDoList (){
		let btnAdd = document.getElementById('add');
		let addTask = document.getElementById('addTask');
		let fieldCounter = document.getElementById('counter');
		let counterAll = document.getElementById('counter-all');
		let ifOnlyspace = /^[\s]+$/;
		let date = new Date();
		let dateView = date.toLocaleTimeString();
		let self = this;
		btnAdd.addEventListener('click', this.newTask);

		this.getLocalTask = function () {
			let todos = new Array;
			let todosStr = localStorage.getItem('todo');
			if (todosStr !== null) {
				todos = JSON.parse(todosStr);
			}
			return todos;
		};

		this.newTask = function (){
			let task = document.getElementById('input').value;
			if (task === "" || ifOnlyspace.test(task)) {
				alert("Write a task");
			} else if (task.length >= 30) {
				alert("Too length. max 30 symbols");
			} else {
				let todos = self.getLocalTask();
				todos.push(task +' '+ dateView);
				localStorage.setItem('todo', JSON.stringify(todos));
				self.showToDoList();
				return false;
			}
		};

		this.removeTask = function() {
			let id = this.getAttribute('id');
			let inputId = this.nextElementSibling.id;
			let todos = self.getLocalTask();
			todos.splice(id, 1);
			localStorage.setItem('todo', JSON.stringify(todos));
			localStorage.removeItem(inputId);
			self.showToDoList();
			return false;
		};

		this.checkedTask = function() {
			let check = document.querySelectorAll('[type="checkbox"]');
			for (let z = 0, checkId; checkId = check[z]; z++) {
				if (localStorage[checkId.id] !== undefined) {
					checkId.checked = +localStorage[checkId.id];
				}
				checkId.onchange = function() {
					localStorage[this.id] = +this.checked;
				}
			}

		};

		this.checkBoxes = function () {
			let checkbox = document.querySelectorAll('[type="checkbox"]');
			let count = 0;
			fieldCounter.innerHTML = count;
			for (let i = 0, checkId; checkId = checkbox[i]; i++){
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
			}
		};

		addTask.addEventListener('click', this.checkBoxes);

		this.showToDoList = function () {
			let todos = self.getLocalTask();
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
				buttons[i].addEventListener('click', self.removeTask);
			}

			list = document.getElementById('addTask').childElementCount;
			counterAll.innerHTML = list;

			self.checkedTask();
			self.checkBoxes();
		};



		this.archiveTask = function() {
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
		};

		archive.addEventListener("click", this.archiveTask);


		document.onkeyup = function (e) {
			e = e || window.event;
			if (e.keyCode === 13) {
				self.newTask();
			}
			return false;
		};
		this.showToDoList();
	};


	new ToDoList();
};

