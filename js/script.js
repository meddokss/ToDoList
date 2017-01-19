window.onload = function(){

	let btnAdd = document.getElementById('btn-add');
	let btnDel = document.getElementById('btn-del');
	let newTask = document.getElementById('newTask');
	let archive = document.getElementById('archive');

	btnAdd.onclick = function createToDo (){
		let inputText = document.getElementById('input');
		if (inputText.value === ""){
			alert("Write a new task")
		}
		else {
			let date = new Date();
			let niceDate = date => date < 10 ? date += "0" : date;
			let alldate = niceDate(date.getHours())+ ':' + niceDate(date.getMinutes()) + ':'+ niceDate(date.getSeconds()) + '';

			newTask.innerHTML += '<li><input type="checkbox" name="task" value="a4">' + ' ' + (inputText.value) + ' ' + alldate +'</li>';
			inputText.value='';
		}
	}

	archive.onclick = function archiveTask() {
		let nodeList = document.getElementsByTagName('input');
		let array = Array.prototype.slice.call(nodeList);
		for (let i = 0; i < array.length; i++) {
			if (array[i].checked) {
				let tr = array[i].parentNode;
				let parent = tr.parentNode
				// console.log(parent)
				parent.removeChild(tr);
			}
		}
	}

	btnDel.onclick = function deleteTask() {
		let List = document.getElementById('newTask');
		List.removeChild(List.lastElementChild);
	}


	// if(this.checked){
	// 	count++;
	// }
	// else count--;


}


