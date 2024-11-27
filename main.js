const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded',event =>{
	console.log('form children: ', form.children);
	for(child in form.children){
		form.children[child].value = '';
	}
});

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


////////////////////DATA STORAGE///////////////////////////////////

const sizeInput = {
	0 :'',
	1 :'',
}

function inputMatrix(whichOne){
	return {
		rows:0,
		columns:0,
		order:function(){
			return +this.rows * +this.columns;
		},
		data:[],
		whichOne:whichOne,
  }
}

const inputMatrices = [
	inputMatrix('one'),
	inputMatrix('two'),
]
	

const inputs = {
	0:{idName:'size-input',},
	1:{idName:'input-matrix',suffix:'one',},
	2:{idName:'size-input',action:'clear',},
	3:{idName:'input-matrix',suffix:'two'},
	index : 0,
	whichMatrix : 0, 
	advance : function() {
		this.index += 1;
		this.currentElement().focus();
		this.clear();
	},
	matrixFull : function() {
		if(this.current().idName === 'input-matrix'){
			this.whichMatrix += 1;
		}
	},
	current : function() {
		return this[this.index];
	},
	currentElement : function() {
		if(this.current().suffix){
			const withSuffix = `${this.current().idName}-${this.current().suffix}`;
			return document.getElementById(withSuffix);
		}
		return document.getElementById(this.current().idName);
	},
	clear : function() {
		if(inputs.current().action === 'clear'){
			this.currentElement().value = ''; 
		}
	},
	initialize : function() {
			this.currentElement().focus();
	}
}
inputs.initialize();
////////////////////DATA STORAGE///////////////////////////////////



//get values on each change of each input
for( let i = 0; i < form.children.length; i++ ){
	form.children[i].addEventListener('input',event => {
		switch(event.target.id){
			case 'size-input':
				observeSizeInput(event);
			break;
			case 'input-matrix-one':
			case 'input-matrix-two':
				observeMatrix(event);
			break;
		}
		console.log(
			'\ncurrent event value is: ',event.target.value,
			'\ncurrent observer target: ',event.target.id,
		);
	});
}

const currentSizeValue = sizeInput[inputs.whichMatrix];
const currentMatrix = inputMatrices[inputs.whichMatrix];

function observeSizeInput(event){
	currentSizeValue = event.target.value;
	if(currentSizeValue.length > 1){
		inputMatrices[inputs.whichMatrix].rows = currentSizeValue[0];
		inputMatrices[inputs.whichMatrix].columns = currentSizeValue[1];

		inputs.advance();
	}
	console.log('sizeInput',sizeInput);
	console.log('current matrix updated?',inputMatrices[inputs.whichMatrix]);
}

function observeMatrix(event) {
	const inputMatrix = inputMatrices[inputs.whichMatrix];
	console.log('inputs:',inputs); 
	console.log('input matrix order: ',inputMatrix);
	if(event.target.value.length === inputMatrix.order()){
		inputs.advance();
		inputs.matrixFull();
	}
}


























