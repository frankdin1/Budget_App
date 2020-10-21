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
var firstController = (function(){
 
})();

var UIController = (function(){

	return{
		getInput: function(){//this is a public method that we have access to from outside
			return {//this is an object that contains these 3 properties and thi object can be used as a parameter for the next function
				type: document.querySelector('.add__type').value, //will either be inc (income) or exp (expense)
				description: document.querySelector('.add__description').value,
				value: document.querySelector('.add__value').value
			}
			
		}
	}

})();

var secondController = (function(budgetCtrl, UICtrl){
	
	var ctrlAddItem = function(){
		//1. Get the field input data
		var input = UICtrl.getInput();
		console.log(input);

		//2. Add item to budget controller
		//3. Add item to the UI
		//4. Calculate budget
		//5. Display budget on UI
	}

	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
		ctrlAddItem();

	document.addEventListener('keypress', function(event){

		if (event.keyCode === 13 || event.which === 13){//keyCode works on recent browsers while 'which' works on older browsers
			ctrlAddItem();
		}
		// console.log(event);
	});

})(firstController, UIController);