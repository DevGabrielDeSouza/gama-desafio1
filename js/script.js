const form = document.getElementById('form');
const emailField = document.getElementById("email");
const errorIcon = document.getElementById("error-icon");
const validationIcon = document.getElementById("validation-icon");
const errorText = document.getElementById("error-text");
const submitButton = document.getElementById("submit-button");

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let nome = document.getElementById('nome').value;
	let email = document.getElementById('email').value;
	let newData = {
		nome,
		email,
	}

	if(validation()){
		addEmail(newData);
	}

});

function addEmail(newData){

	emailList = [];

	let oldData;

	oldData = JSON.parse(localStorage.getItem("lead"));

	let findings = oldData.find(match => { return match.email == newData.email; });

	if (findings != undefined) {
		console.log("JÁ CADASTRADO!!");
		feedbackMessage("Email já cadastrado!", "#ff0000");
		return;
	}

	let completeData = [...oldData, newData];



	localStorage.setItem('lead', JSON.stringify(completeData));

	let content = document.getElementById('content');

	let carregando = `<p>carregando...</p>`;

	let pronto = `<p>Email cadastrado com sucesso!</p>`;

	content.innerHTML = carregando;




	let final = JSON.parse(localStorage.getItem("lead"));

	console.log(final);


	setTimeout(() => {
		content.innerHTML = pronto;
		content.style.color = "#00ff00";
	}, 1000);
}

function allStorage() {

	var values = [],
		keys = Object.keys(localStorage),
		i = keys.length;

	while (i--) {
		values.push(localStorage.getItem(keys[i]));
	}

	return values;
}

function clearData(){
	localStorage.setItem('lead', "[]");
}

function validation(){
	let email = emailField.value;

	let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

	if (email.match(pattern)) {
		emailField.style.borderColor = "#00ff00";
		validationIcon.style.display = "block";
		errorText.style.display = "none";
		errorIcon.style.display = "none";
		submitButton.style.display = "block";
		return true;
	} else {
		emailField.style.borderColor = "#ff0000";
		errorText.style.display = "block";
		validationIcon.style.display = "none";
		errorIcon.style.display = "block";
		submitButton.style.display = "none";
	}

	return false;
}

function feedbackMessage(message, color){
	form.classList.remove("valid");
	form.classList.add("invalid");
	text.innerHTML = "";
	text.innerHTML = message;
	text.style.color = color;
}