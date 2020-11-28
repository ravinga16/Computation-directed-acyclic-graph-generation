// check whether the brackets are in order,
function bracketOrder(arrayOfLines){
	var arrayOfLines = arrayOfLines;
	//make it a single string
	var syntaxCheckAlgorithm = "";
	for(var i=0;i<arrayOfLines.length;i++){
		syntaxCheckAlgorithm = syntaxCheckAlgorithm+arrayOfLines[i];
	}
	//split ('')
	var splitSyntaxCheckAlgorithm = syntaxCheckAlgorithm.split("");
	//loop through elements and get '{' , if there is a '}',pop the last element, check array not empty
	var bracketArray =[];
	for(var i=0;i<splitSyntaxCheckAlgorithm.length;i++){
		if(splitSyntaxCheckAlgorithm[i]=="{"){
			bracketArray.push(splitSyntaxCheckAlgorithm[i])
		}else if(splitSyntaxCheckAlgorithm[i]=="}"){
			if(bracketArray.length!=0){
				bracketArray.pop();
			}else{
				bracketArray.push("error");
				break;
			}
		}
	}
	if(bracketArray.length!=0){		
		return false;
	}else{
		return true;//return true if all are correct
	}

}
//**********************************************************************************************//
//if,return,else,return order check
function order(arrayOfLines){
	var arrayOfLines = arrayOfLines;
	var order = ["if","return","else","return"];
	var start_index = 0; //checking start from "if"

	for(var i=0;i<arrayOfLines.length;i++){
		var line = arrayOfLines[i].split(" ");
		if(line.includes(order[start_index])==true){
			start_index=start_index+1;
		}
	}
	if(start_index==4){
		return true;
	}else{
		return false;
	}
}

