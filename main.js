const form = document.querySelector('form');

//get all values at once of form
form.addEventListener('submit',event => {
	event.preventDefault();
	const form = event.target;
	const formValueArray = [];
	for( let i = 0; i < form.children.length; i++ ){
		formValueArray.push(form.children[i].value);
	}
	//console.log("form: ", event.target);
	//console.log(formValueArray);
});
let inputIndex = 0;
const inputs = [
		'size-input',
		'input-matrix-one',
		'size-input',
		'input-matrix-two',
		'operator-input',
		'output-matrix',
];
function inputsAdvance() {
	inputIndex =+ 1;
	document.getElementById(inputs[inputIndex]).focus();
}

const sizeInput = document.getElementById('size-input')
sizeInput.focus();

//get values on each change of each input
for( let i = 0; i < form.children.length; i++ ){
	form.children[i].addEventListener('input',event => {
		const matrixOrder = 0;
		if( event.target.id === 'size-input' 
			&& event.target.value.length > 1 ){
				inputsAdvance();
				return;
		};
		console.log(
			'input from: ',event.target.id,
			'\nvalue is: ',event.target.value,
			'\nnext element: ', event.target.nextElementSibling,
			'\ncurrent input target: ',inputs[inputIndex],
		);
	});
}




console.log(document.querySelector('form'));
