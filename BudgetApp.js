//Module pattern example
 // var firstController = (function(){
 // 	var x = 23;

 // 	var sum = function(a){
 // 		return x + a;
 // 	}

 // 	return {
 // 		publicTest: function(b){
 // 			return sum(b);
 // 		}
 // 	}
 // })();

 // var secondController = (function(budgetCtrl){
 // 	var z = budgetCtrl.publicTest(5);
 // 		return {
 // 		publicTest2: function(){
 // 			console.log(z)
 // 		}
 // 	}
 // })(firstController);

//Budget Controller
var budgetController = (function(){

	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {

		//these arrays store all the expense and income items
		allItems: {
			exp: [],
			inc: []
		},

		//these variables store the totals of the income and expense 
		totals:{
			exp: 0,
			inc: 0
		}
	}
 
	return {
		addItem: function(type, des, val){
			var newItem, ID;

			//Create new ID
			if (data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}
			else{
				ID = 0;
			}
			//Create new item that is either 'inc' or 'exp' type
			if (type === 'exp'){
				newItem = new Expense(ID, des, val);
			}
			else if (type === 'inc'){
				newItem = new Income(ID, des, val);
			}

			data.allItems[type].push(newItem);
			return newItem;
		},

		testing: function(){
			console.log(data);
		}
	}

})();

var UIController = (function(){

	//this is an object for all inputs
	var DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn'
	}

	return{
		getInput: function(){//this is a public method that we have access to from outside
			return {//this is an object that contains these 3 properties and thi object can be used as a parameter for the next function
				type: document.querySelector(DOMStrings.inputType).value, //will either be inc (income) or exp (expense)
				description: document.querySelector(DOMStrings.inputDescription).value,
				value: document.querySelector(DOMStrings.inputValue).value
			}
			
		},

		//this is an object to make the inputs object public
		getDOMStrings: function(){
			return DOMStrings;
		}
	}

})();

var secondController = (function(budgetCtrl, UICtrl){
	
	var createEventListeners = function(){

			document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
			ctrlAddItem();

			document.addEventListener('keypress', function(event){

			if (event.keyCode === 13 || event.which === 13){//keyCode works on recent browsers while 'which' works on older browsers
				ctrlAddItem();
			}
			// console.log(event);
		});
	}

	var DOM = UICtrl.getDOMStrings();//this adds the DOMstrings object to this private function
	
	var ctrlAddItem = function(){
		var input, addItem;

		//1. Get the field input data
		input = UICtrl.getInput();
		console.log(input);

		//2. Add item to budget controller
		addItem = budgetCtrl.addItem(input.type, input.description, input.value);
		//3. Add item to the UI
		// if(input.type === "inc"){
		// 	document.querySelector('.item__description').innerHTML = input.description;
		// 	document.querySelector('.item__description').innerHTML = input.description;
		// }
		// console.log(input.description);
		//4. Calculate budget
		//5. Display budget on UI
	}

	return {
		init: function(){
			console.log("Application has started");
			createEventListeners();
		}
	};

})(budgetController, UIController);

secondController.init();