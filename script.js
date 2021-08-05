// This is the Vanilla JS Script File running the entire app

// Heroku app url
const api_url = "https://esdmarriage.herokuapp.com/user"

// Function to Load the 'bookings.html' table data
function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr class="data">`;
		table_data += `<td>${records[i].customer_name}</td>`;
		table_data += `<td>${records[i].date}</td>`;
		table_data += `<td>${records[i].total_guest}</td>`;
		table_data += `<td>${records[i].hall_name}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

// Function to get data from heroku app via MongoDB Atlas database
function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}

// Function to get data of a particular id from heroku app via MongoDB Atlas database
function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("customer_name").value = data.customer_name;
		document.getElementById("date").value = data.date;
		document.getElementById("total_guest").value = data.total_guest;
		document.getElementById("hall_name").value = data.hall_name;
	})
}

// Function to post data to 'bookings.html' received from heroku app via MongoDB Atlas database
function postData() {
	var customer_name = document.getElementById("customer_name").value;
	var date = document.getElementById("date").value;
	var total_guest = document.getElementById("total_guest").value;
	var hall_name = document.getElementById("hall_name").value;
	
	data = {customer_name: customer_name, date: date, total_guest: total_guest, hall_name: hall_name};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "bookings.html";
	})
}	

// Function to put a selected data with updated contents from heroku app via MongoDB Atlas database
function putData() {
	var _id = document.getElementById("id").value;
	var customer_name = document.getElementById("customer_name").value;
	var date = document.getElementById("date").value;
	var total_guest = document.getElementById("total_guest").value;
	var hall_name = document.getElementById("hall_name").value;
	
	data = {_id: _id, customer_name: customer_name, date: date, total_guest: total_guest, hall_name: hall_name};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "bookings.html";
	})
}

// Function to delete data from MongoDB Atlas database
function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}
