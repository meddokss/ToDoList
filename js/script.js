window.onload = function(){

	let btnAdd = document.getElementById('add'),
		// btnDel = document.getElementById('btn-del'),
		archive = document.getElementById('archive'),
		newTask = document.getElementById('newTask'),
		fieldCounter = document.getElementById('counter'),
		counterAll = document.getElementById('counter-all');
		list = document.getElementById('newTask').childElementCount;
		counterAll.innerHTML = list;
		
		archive.addEventListener("click", archiveTask, false); 
		// btnDel.addEventListener("click", remove, false); 
		newTask.addEventListener("click", checkBoxes, false);
		document.getElementById('add').addEventListener('click', add);
		// show();

		
function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
function add() {
    var task = document.getElementById('input').value;
    var todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
     show();
     return false;
}
 
function show() {

	// let inputText = document.getElementById('input');
	// 	if (inputText.value === ""){
	// 		// alert("Write a new task");
	// 	}
		// else{
				let date = new Date();
				let niceDate = date => date < 10 ? date = "0"+ date : date;
				let alldate = niceDate(date.getHours())+ ':' + niceDate(date.getMinutes()) + ':'+ niceDate(date.getSeconds()) + '';
			    var todos = get_todos();
			
			var html;
			// работает
		    for(var i=0; i<todos.length; i++) {
		        html += '<li><input type="checkbox" name="task" value="task">' + ' ' + todos[i] + ' ' + alldate +'<button class="dell btn" id="' + i  + '">Delete</button></li>';
		    };
     	// 	html += '<li><input type="checkbox" name="task" value="task" class="remove" id="' + i  + '>' + ' ' + todos[i] + ' ' + alldate +'</li>';
		    // };

		    html += '</ul>';
			    // for(var i=0; i<todos.length; i++) {

			    //    var html ='<li><input type="checkbox" name="task" value="task">' + ' ' + todos[i] + ' ' + alldate +'<button class="remove" id="' + i  + '">x</button></li>';
			    // };

			    document.getElementById('newTask').innerHTML = html;
			 
			    var buttons = document.getElementsByClassName('dell');
			    for (var i=0; i < buttons.length; i++) {
			        buttons[i].addEventListener('click', remove);
			    // };
		}
		list = document.getElementById('newTask').childElementCount;
		counterAll.innerHTML = list;
	}
 
 // }

////////////////////////////////////
	// function createToDo (){
	// 	let inputText = document.getElementById('input');
	// 	if (inputText.value === ""){
	// 		alert("Write a new task")
	// 	}
	// 	else {
	// 		let date = new Date();
	// 		let niceDate = date => date < 10 ? date = "0"+ date : date;
	// 		let alldate = niceDate(date.getHours())+ ':' + niceDate(date.getMinutes()) + ':'+ niceDate(date.getSeconds()) + '';

	// 		newTask.innerHTML += '<li><input type="checkbox" name="task" value="a4">' + ' ' + (inputText.value) + ' ' + alldate +'</li>';
	// 		inputText.value='';
	// 	}

	// 	list = document.getElementById('newTask').childElementCount;
	// 	counterAll.innerHTML = list;
	// }



////////////////////////////////////
	function checkBoxes() {
		var inputElems = document.getElementsByTagName("input"),
		allTask = newTask.getElementsByTagName('li'),
		count = 0;
		for (var i=0; i<inputElems.length; i++) {
			if (inputElems[i].checked == true){
				count++;
				allTask[i].style.textDecoration = 'line-through';
				allTask[i].style.color = 'grey';
				allTask[i].style.background = '#66cc66';
			}
			else {
				allTask[i].style.textDecoration = 'none';
				allTask[i].style.color = '';
				allTask[i].style.background = '';
			}
			fieldCounter.innerHTML = count;
		}
	}

////////////////////////////////////
	function archiveTask() {
		let archiveNeed = document.getElementsByTagName('input');
		let array = Array.prototype.slice.call(archiveNeed);
		for (var i=0; i<array.length; i++) {
			if (array[i].checked == true){
				let liItem = array[i].parentNode;
				let parentItem = liItem.parentNode
				parentItem.removeChild(liItem);
			}
		}
		list = document.getElementById('newTask').childElementCount;
			counterAll.innerHTML = list;
	}
show();
///////////////////////////////

}


































































// Работает по отдельности

// newTask.onclick = function checkboxes() {
// 		var inputElems = document.getElementsByTagName("input"),
// 		count = 0;

// 		for (var i=0; i<inputElems.length; i++) {
// 			if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
// 				count++;
// 			}
// 			fieldCounter.innerHTML = count;
// 		}
// 	}


// Работает
	// newTask.onclick = function crosse() {
	// 	let test = document.getElementsByTagName('input'),
	// 		vse = newTask.getElementsByTagName('li'),
	// 		li = Array.prototype.slice.call(test);
			
	// 	for (let i = 0; i < li.length; i++) {
	// 		if (li[i].checked) {
	// 			vse[i].style.textDecoration = 'line-through';
	// 			vse[i].style.color = 'grey';
	// 			vse[i].style.background = '#66cc66';
	// 		}
	// 		else {
	// 			vse[i].style.textDecoration = 'none';
	// 			vse[i].style.color = '';
	// 			vse[i].style.background = '';
	// 		}
	// 	}
	// }



// btnDel.onclick = function deleteTask() {
// 		let List = document.getElementById('newTask');
// 		List.removeChild(List.lastElementChild);
// 	}



// archive.onclick = function archiveTask() {
// 		let archiveNeed = document.getElementsByTagName('input');
// 		let array = Array.prototype.slice.call(nodeList);
// 		for (var i=0; i<array.length; i++) {
// 			if (array[i].checked == true){
// 				let liItem = array[i].parentNode;
// 				let parentItem = liItem.parentNode
// 				parentItem.removeChild(liItem);
// 			}
// 		}
// 		list = document.getElementById('newTask').childElementCount;
// 			counterAll.innerHTML = list;
// 	}

// 	btnDel.onclick = function deleteTask() {
// 		var inputElems = document.getElementsByTagName("input");
// 		for (var i=0; i<inputElems.length; i++) {
// 			if (inputElems[i].checked == true){
// 				let tr = inputElems[i].parentNode;
// 				let parent = tr.parentNode
// 				parent.removeChild(tr);
// 			}
// 		}
// 		list = document.getElementById('newTask').childElementCount;
// 			counterAll.innerHTML = list;
// 	}



// 		archive.onclick = function archiveTask() {
// 		let nodeList = document.getElementsByTagName('input');
// 		let array = Array.prototype.slice.call(nodeList);
// 		for (let i = 0; i < array.length; i++) {
// 			if (array[i].checked) {
// 				let tr = array[i].parentNode;
// 				let parent = tr.parentNode
// 				parent.removeChild(tr);
// 			}
// 		}
// 	}