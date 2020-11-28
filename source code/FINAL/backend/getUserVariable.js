//**********************************************************************************************//
//f(2),f(4,3) taking
function getUser(){
	var variable = document.getElementById('n_value').value;
	if(variable == " " || variable ==""){
		document.getElementById('variabledisplay').innerHTML="    Enter variable value";
	}else{
		return_variable = "f("+variable+")";		
	}
	return return_variable;
}
//**********************************************************************************************//
//f(2),f(4,3) taking
function getArray(){
	var variable = document.getElementById('array_value').value;
	return variable;
}
//**********************************************************************************************//

