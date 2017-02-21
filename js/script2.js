window.onload = function() {
	let todoList;
	class ToDo {
		constructor(title, date, stage){
			this.title = title;
			this.date = date.toLocaleTimeString();
			this.stage = stage;
			this.id = +new Date();
			setTimeout(() => {
				let btnDel = document.getElementById(this.id);
				btnDel.addEventListener('click',  () => this.delete());
			});
		}

		delete (){
			let todo = document.getElementById(this.id);
			todo.remove();
			todoList.removeTodo(this.id);
		}

	}

	class ToDoList {
		constructor(title, date, stage, btnAdd){
			this.todos = [];
			this.btnAdd = btnAdd;
			this.btnAdd.addEventListener('click',  () => this.createTodo());
			this.delButtons = document.getElementsByClassName('dell');
		}

		createTodo() {
			let todo = new ToDo(document.getElementById('input').value, new Date(), false);
			this.todos.push(todo);
			this.appendTodo(todo);
		}

		appendTodo(todo) {
			let takeTodos = this.todos;
			let newToDo, inputValue, textarea, newInputElem, addBtnDelete, btnDeleteText = '';
			let count = 0;
			newToDo = document.createElement("li");
			inputValue = `${todo.title} ${todo.date}`;
			textarea = document.createTextNode(inputValue);
			newInputElem = document.createElement('input');
			newInputElem.id = 'check' + count;
			newInputElem.type = 'checkbox';
			addBtnDelete = document.createElement('button');
			btnDeleteText = document.createTextNode('Delete');
			addBtnDelete.id = count;
			addBtnDelete.className = 'dell btn';
			addBtnDelete.appendChild(btnDeleteText);
			newToDo.id = todo.id;
			newToDo.appendChild(addBtnDelete);
			newToDo.appendChild(newInputElem);
			newToDo.appendChild(textarea);
			document.getElementById("addTask").appendChild(newToDo);
			count ++;
			document.getElementById("input").value = "";
		}

		removeTodo (id){
			let buttonDeleteId, inputId, todos;
			this.todos = this.todos.filter((todo) => todo.id !==id);
			console.log(this.todos)
		}
	}

	todoList = new ToDoList('Привет как дела', new Date(), true, document.getElementById('add'));
}

