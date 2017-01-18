window.onload = function(){

	let btn = document.getElementById('btn');
	let newTask = document.getElementById('newTask');
	let archive = document.getElementById('archive');
	let a = "eeeeee"

	btn.onclick = function createToDo (){
		newTask.innerHTML += '<input type="checkbox" name="task" value="a4" checked>' + a;
		console.log(1)
	}

	archive.onclick = function deleteToDo (){
		newTask.innerHTML += '<input type="checkbox" name="task" value="a4" checked>111111';
		console.log(1)
	}

}