const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded',event =>{
	console.log('form children: ', form.children);
	for(child in form.children){
		form.children[child].value = '';
	}
});

////////////////////DATA STORAGE///////////////////////////////////

const sizeInput = {
	0 :'',
	1 :'',
}

function inputMatrix(whichOne){
	return {
		data:[[]],
		whichOne:whichOne,
		rows:0,
		columns:0,
		order:function(){
			return +this.rows * +this.columns;
		},
		rowIndex:0,
		columnIndex:0,
		valuesIndex:0,
		advance : function(){
			this.valuesIndex += 1;
			this.columnIndex = this.valuesIndex % +this.columns;
			if(this.columnIndex === 0){
				this.data.push([]);
				this.rowIndex += 1;
			}
		},
  }
}

const inputMatrices = {
  0:inputMatrix('one'),
  1:inputMatrix('two'),

	combine:function(whichOperation){
		const result = [];
		for(let i = 0; i < this[0].rows; i++){
			result.push([]);
			for(let j = 0; j < this[0].columns; j++){
				result[i][j] = 
					this.operation(
						whichOperation,
						this[0].data,
						this[1].data,
						i,
						j,
					);
			}
		}
		return result;
	},
	operation:function(whichOperation,valueOne,valueTwo,i,j){
		switch (whichOperation) {
			case '+':
				return valueOne[i][j] + valueTwo[i][j];	
				break;
			case '-':
				return valueOne[i][j] - valueTwo[i][j];
				break;
			case '*':
				multiply();
				break;
		}
		function multiply(){
			if(valueOne.columns !== valueTwo.rows)return;
			let outputMatrixOrder = 
				valueOne.columns * valueTwo.rows;	
		}
	},
}
	

const inputs = {
	0:{idName:'size-input',},
	1:{idName:'input-matrix',suffix:'one',},
	2:{idName:'size-input',action:'clear',},
	3:{idName:'input-matrix',suffix:'two'},
	4:{idName:'operator-input',},
	5:{idName:'output-matrix',action:'simulate'},

	index : 0,
	advance : function() {
		this.index += 1;
		this.currentElement().focus();
		this.clear();
		this.simulate();
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
	whichMatrix : 0, 
	matrixAdvance : function() {
			this.whichMatrix += 1;
	},
	clear : function() {
		if(inputs.current().action === 'clear'){
			this.currentElement().value = ''; 
		}
	},
	submit : function(submission) {
		//filter submission
		//put data from matrices into output matrix, call methods
		//that do operations
		console.log('submission:',submission);
	},
	simulate : function() {
		if(this.current().action === 'simulate'){
			const simulateInput = new Event('input');
			this.currentElement().value = ' '; 
			this.currentElement().dispatchEvent(simulateInput);
		}
	},
	initialize : function() {
			this.currentElement().focus();
	},
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
				observeInputMatrix(event);
			break;
			case 'operator-input':
				observeOperator(event);
			break;
			case 'output-matrix':
				observeOutputMatrix(event);
			break;
		}
		console.log(
			'\ncurrent event value is: ',event.target.value,
			'\ncurrent observer target: ',event.target.id,
		);
	});
}


function observeSizeInput(event){
	let currentSizeValue = sizeInput[inputs.whichMatrix];
	const currentMatrix = inputMatrices[inputs.whichMatrix];
	currentSizeValue = event.target.value;
	if(currentSizeValue.length > 1){
		currentMatrix.rows = currentSizeValue[0];
		currentMatrix.columns = currentSizeValue[1];
		inputs.advance();
	}
	console.log('sizeInput',sizeInput);
	console.log('current matrix updated?',inputMatrices[inputs.whichMatrix]);
}

function observeInputMatrix(event) {
	const inputMatrix = inputMatrices[inputs.whichMatrix];
	const { rows, columns, data, rowIndex, columnIndex } = inputMatrix;
	inputMatrix.data[rowIndex][columnIndex] = 
		+event.target.value[(2 * rowIndex) + columnIndex];

	inputMatrix.advance();
	console.table(inputMatrix);
	if(event.target.value.length === inputMatrix.order()){
		inputs.advance();
		inputs.matrixAdvance();
	}
}

function observeOperator(event) {
	const currentCharacter = event.target.value;
	const operators = ['+','-','*','/'];

	if(!operators.includes(event.target.value)){
		event.target.value = ''; 
	}
	if(currentCharacter.length > 0){
		inputs.submit(currentCharacter);
		inputs.advance();
	}
}

function observeOutputMatrix(event) {
	//console.log('output: ',inputMatrices[0].data);
	//event.target.value = inputMatrices[0].data.join('');
};
