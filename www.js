	function get_todos() {
		var todos = new Array;
		var todos_str = localStorage.getItem('todo');
		if (todos_str !== null) {
			todos = JSON.parse(todos_str); 
		}
		return todos;
	}

		function add() {
			var task = document.getElementById('task').value;
		 	var todos = get_todos();
			todos.push(task);
			localStorage.setItem('todo', JSON.stringify(todos));
		 	createToDo();
		 	return false;
		}

	function createToDo (){
		let inputText = document.getElementById('task');
		if (inputText.value === ""){
			alert("Write a new task")
		}
		else {
				var todos = get_todos();
				var html = '<ul>';
				
				for(var i=0; i<todos.length; i++) {
					html += '<li><input type="checkbox" class="remove" name="task" value="a4" id="'+ i  +'">' + todos[i] +'</li>';
				};
				html += '</ul>';
			 	document.getElementById('todos').innerHTML = html;
			 	document.getElementById('add').addEventListener('click', add);
			 	// inputText.value='';
			 // 	var buttons = document.getElementsByClassName('remove');
				// for (var i=0; i < buttons.length; i++) {
				// 	buttons[i].addEventListener('click', remove);
				// };


			// let date = new Date();
			// let niceDate = date => date < 10 ? date = "0"+ date : date;
			// let alldate = niceDate(date.getHours())+ ':' + niceDate(date.getMinutes()) + ':'+ niceDate(date.getSeconds()) + '';

			// newTask.innerHTML += '<li><input type="checkbox" name="task" value="a4">' + ' ' + (inputText.value) + ' ' + alldate +'</li>';
			
		}

		// list = document.getElementById('newTask').childElementCount;
		// counterAll.innerHTML = list;
	}


  html += '<li><input type="checkbox" name="task" value="task" class="remove" id="' + i  + '">' + ' ' + todos[i] + ' ' + alldate +'</li>';