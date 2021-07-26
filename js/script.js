const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let nome = document.getElementById('nome').value;
	let email = document.getElementById('email').value;
	let newData = {
		nome,
		email,
	}

	emailList = [];

	let oldData;

	oldData = JSON.parse(localStorage.getItem("lead"));

	console.log(oldData);
	let findings = oldData.find(match => {return match.email == newData.email;});

	console.log(findings);

	if (findings != undefined){
		console.log("JÁ CADASTRADO!!");
		return;
	}
	
	
	let completeData = [...oldData, newData];

	

	localStorage.setItem('lead', JSON.stringify(completeData));

	let content = document.getElementById('content');

	let carregando = `<p>carregando...</p>`;

	let pronto = `<p>pronto</p>`;

	content.innerHTML = carregando;




	let final = JSON.parse(localStorage.getItem("lead"));

	console.log(final);


	setTimeout(() => {
		content.innerHTML = pronto
	}, 1000);

})

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

