
// For history Values
// Values that have just been used and will be in the equation still but on 
// the history output section

function getHistory(){
    return document.getElementById("historyValue").innerText;
}

function printHistory(num){
	document.getElementById("historyValue").innerText = num;
}

// I want to show my out put so I need to get the output value

function getOutput(){
    return document.getElementById("outputValue").innerText;
}

//This prints the outputted value on the calculator

function printOutput(num){
    if(num == ""){
        document.getElementById("outputValue").innerText=num;
    } else {
        document.getElementById("outputValue").innerText=formatNumber(num);
    }
}

//If output == "" will give num but if not it will give formatted nunm

function printOutput(num){
    if(num == ""){
        document.getElementById("outputValue").innerText=num;
    } else {
        document.getElementById("outputValue").innerText=formatNumber(num);
    }
}

//This will make sure the number is formated with commas

function formatNumber(num){
	if(num == "-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

// To delete the last number for the backspace operator

function reverseNumber(num){
    return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");

//loops thorugh all operators 
// If C is activated then the out puts will be cleared
//If CE is activated then reverseNumber will be used to put numbers into a 
//string and then remove last digit
//Used DRY to help with this last function so compacts all number functions with eval().
// 

for(var i = 0; i < operator.length; i++){
    operator[i].addEventListener('click',function(){
        if(this.id === "clear"){
            printHistory("")
            printOutput("");
        } else if(this.id === "backspace"){
            var output = reverseNumber(getOutput()).toString();
            // Only if output has value
            if(output){ 
                output = output.substr(0,output.length - 1)
                printOutput(output);
            }
        } else {
            var output = getOutput();
            var history = getHistory();
            // For backspacing negative numbers
            if(output == "" && history != ""){
                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length-1);
                }
            }
            if(output != "" || history != ""){
                //To remove last number function if clicked
                // condition ? true : false
                output = output == ""? 
                output: reverseNumber(output);
                history = history + output;
                // The equals function to produce an answer with the eval() numbers and maths 
                //functions
                //Prints both history and output which are calculated together
                if(this.id == "="){
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    })
}

//Grabs numbers from calculator buttons

var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++){
    number[i].addEventListener('click',function(){
        var output=reverseNumber(getOutput())
        //If output is a number
        if(output != NaN){
            output = output+this.id;
            printOutput(output);
        } 
    })
}