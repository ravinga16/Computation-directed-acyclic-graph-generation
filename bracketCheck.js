//get the user input algorithm
function getAlgo(){
    //get all input in text area
  	var textInput = document.getElementById('user_input');
    //split into lines for analysing
  	var a = textInput.value.split("\n");
  	var arrayOfLines =[];
    //getting line by line to array
	  for(var x=0 ; x<a.length ; x++){
	    if(a[x] != "" && a[x]!=" " ){ //remove empty lines
	    var line=a[x].split("");  
	    arrayOfLines.push(a[x]);
	    }
	  } 
  	
  	var newlinebracket = newLineBracket(arrayOfLines); //this should be true
  	var bracketorder = bracketOrder(arrayOfLines);//this should be true
  	var functionOrder =order(arrayOfLines);//this should be true
  	if(newlinebracket==true && bracketorder==true && functionOrder==true){
  		arrayOfLines=compactSecondReturn(arrayOfLines); //syntax hari lines tika second return statement eka compact karanna denawa
  		for(var i=0;i<arrayOfLines.length;i++){	//in compact funciton second index eka gannawa	
  			console.log(i,arrayOfLines[i])
  		}
  		//aluth lines tika tamai denne

  	 	return arrayOfLines; //when all three correct , arrayofines are returned
  	}else{
  		alert("SYNTAX ERROR")
  	}

}
//************************************************************//
//a bracket should be in a new line;
function newLineBracket(arrayOfLines){
	var check=[]; // to see whether errors are there
	for(var i=0;i<arrayOfLines.length;i++){
		line_ = arrayOfLines[i].split(""); //[ "i", "f", "(", "k", "=", "=", "0", ")" ," ","\t"]
		var newLine=[];//removed spaces in a line , [ "i", "f", "(", "k", "=", "=", "0", ")" ]
		for(var j=0;j<line_.length;j++){
			if(line_[j]!=" " && line_[j]!="" && line_[j]!="\t"){
				newLine.push(line_[j])
			}
		}
		if(newLine.includes("{")==true || newLine.includes("}")==true){
			if(newLine.length>1){
				check.push("error");
				break;			
			}
		}
	}
	if(check.length>0){
		return false;
	}else{
		return true;//all curly brackets in new lines
	}
}

//************************************************************//
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

//**********************************************************************************************//
//f(2),f(4,3) taking
function getUser(){
	var variable = document.getElementById('n_value').value;
	return variable;
}
//**********************************************************************************************//

//index of second return statement
function getIndexOfSecondReturn(arrayOfLines){

	var temp = 0;
	var indexOfSecondReturn;//return f(n-1,k-1)+f(n-1,k);
	for(var i=0;i<arrayOfLines.length;i++){
		var a = arrayOfLines[i].split(" ");//split into words a one line
		if(a.includes("return")){
			temp=temp+1;
			if(temp==2){
				indexOfSecondReturn = i;
				break;
			}
		}
	}
	return indexOfSecondReturn;
}
//***********************************************************************************//

function compactSecondReturn(arrayOfLines){	
	indexOfSecondReturn = getIndexOfSecondReturn(arrayOfLines);//get the second return statement line
	console.log("indexOfSecondReturn ",indexOfSecondReturn);	
	var secondReturn = arrayOfLines[indexOfSecondReturn].split(" ");//second return statement line
	var remove_return =""; //second return eke,return word eka ain karala ithuru tika daganna,f(n-1,k-1)+f(n-1,k);
	for(var i=1;i<secondReturn.length;i++){//remove return keyword i=1
		remove_return = remove_return+secondReturn[i];
	}	
	var temp_split = remove_return.split('');	//f,(n,-,1,,,k,-,1,),+,f,(,n,-,1,k,)-- split into letters
	var removed_space ="";						//f(n-1,k-1)+f(n-1,k)
	for(var i=0;i<temp_split.length;i++){
		if(temp_split[i]!=""){ 					//remove spaces unnessary
			removed_space=removed_space+temp_split[i]
		}
	}
	var modified_second_return = ["return "];
	modified_second_return.push(removed_space);	
	var modified_second_return_string = "";
	for(var i=0;i<modified_second_return.length;i++){
		modified_second_return_string=modified_second_return_string+modified_second_return[i]
	}
	arrayOfLines[indexOfSecondReturn] = modified_second_return_string;
	return arrayOfLines;
}

//***********************************************************************************//
function changeInput_multithreaded(arrayOfLines){
	var firstReturn;
	var secondReturn;
	for(var i=0;i<arrayOfLines.length;i++){
		console.log(i," ",arrayOfLines[i]);
	}
	console.log("*****************************")

	//index of first return statement	
	for(var i=0;i<arrayOfLines.length;i++){
		b=arrayOfLines[i].split(" ");
		if(b.includes("return")){
			firstReturn = i;
			break;
		}
	}
	console.log(firstReturn," firstReturn");
	console.log("*****************************")
	//index of second return statement	
	var temp=0;
	for(var i=0;i<arrayOfLines.length;i++){
		c=arrayOfLines[i].split(" ");
		if(c.includes("return")){
			temp=temp+1;
			if(temp==2){
				secondReturn=i;
				break;
			}
		}
	}
	console.log(secondReturn," secondReturn");
	console.log("*****************************")

	var newArrayOfLines = [];
	for(var i=0;i<arrayOfLines.length;i++){
		if(i==firstReturn){//remove first return statement
			newArrayOfLines.push(undefined);
		}else if(i==secondReturn){ //return keyword remove
			var line = arrayOfLines[i].split(" ");
			var newline ="";
			for(var j=1;j<line.length;j++){
				newline=newline+line[j];
			}console.log(newline," newline");
			 newArrayOfLines.push(newline);
		}else{
			newArrayOfLines.push(arrayOfLines[i]);
		}
	}

	for(var i=0;i<newArrayOfLines.length;i++){
		console.log( i , newArrayOfLines[i]);
	}
	console.log("*****************************")

	var recursive_element = newArrayOfLines[secondReturn];//f(n-1)+f(n-2);	 
  	var b =recursive_element.split("+");//[ "f(n-1)", "f(n-2);" ]
  	console.log("b ",b);
	console.log("*****************************")

  	var recursiveCallFor = []; //get 'n-1','n-2' 
  	for(var i=0;i<b.length;i++){
  		var temp = b[i];
  		var temp1 = temp.split("f")[1];
  		var temp2 = temp1.split(";")[0];
  		var temp3 = temp2.split("(")[1].split(")")[0]
  		recursiveCallFor.push(temp3);
  	}
  	console.log("recursiveCallFor, ",recursiveCallFor);
	console.log("*****************************")

  	var user = newArrayOfLines[0].split(" ")[1].split("f")[1].split("{")[0].split("(")[1].split(")")[0];//n,k 
    console.log("user variable",user);
    
    var index =secondReturn; //array.push line enter to starting index, in the index where second return is
    console.log("index,",index);console.log("*****************************")
    for (var i=0;i<recursiveCallFor.length;i++){
    	var arrayPush = "array.push([["+user+"],["+recursiveCallFor[i]+"]]);";
    	newArrayOfLines.splice(index,0,arrayPush);
    	index=index+1;
    }
    
    for(var i=0;i<newArrayOfLines.length;i++){
		console.log( i," ",newArrayOfLines[i]);
	}
	console.log("*****************************")

   	var functionString = ""; 	//lines to a string,"function f(n){if (n<=1){}else{array.push([[n],[n-1]]);array.push([[n],[n-2]]);f(n-1)+f(n-2);}}"
	for (var i=0;i<newArrayOfLines.length;i++){
		if(newArrayOfLines[i]!=undefined){
			functionString = functionString+newArrayOfLines[i];
		}    	
    }
    console.log("functionString ",functionString);
    var ff=functionString.split("");
    ff.splice(ff.length-1,0,"return array;")			//insert return array string to the correct place
   	var finalFunction ="";
   	for(var i=0;i<ff.length;i++){
   		finalFunction=finalFunction+ff[i]
   	}
   	console.log("finalFunction ",finalFunction)
   	console.log("*****************************")

    // console.log("finalFunction ",finalFunction)
    // var userInputVariable = document.getElementById('n_value').value;
    // var user = userInputVariable.split(",");
    
}

// function changeInput_recursive(arrayOfLines){
// 	var firstReturn;
// 	var secondReturn;
// 	for(var i=0;i<arrayOfLines.length;i++){
// 		console.log(i," ",arrayOfLines[i]);
// 	}
// 	console.log("*****************************")

// 	//index of first return statement	
// 	for(var i=0;i<arrayOfLines.length;i++){
// 		b=arrayOfLines[i].split(" ");
// 		if(b.includes("return")){
// 			firstReturn = i;
// 			break;
// 		}
// 	}
// 	console.log(firstReturn," firstReturn");
// 	console.log("*****************************")
// 	//index of second return statement	
// 	var temp=0;
// 	for(var i=0;i<arrayOfLines.length;i++){
// 		c=arrayOfLines[i].split(" ");
// 		if(c.includes("return")){
// 			temp=temp+1;
// 			if(temp==2){
// 				secondReturn=i;
// 				break;
// 			}
// 		}
// 	}
// 	console.log(secondReturn," secondReturn");
// 	console.log("*****************************")


// 	var newArrayOfLines = [];
// 	for(var i=0;i<arrayOfLines.length;i++){
// 		if(i==firstReturn){//remove first return statement
// 			newArrayOfLines.push(undefined);
// 		}else if(i==secondReturn){ //return keyword remove
// 			var line = arrayOfLines[i].split(" ");
// 			var newline ="";
// 			for(var j=1;j<line.length;j++){
// 				newline=newline+line[j];
// 			}console.log(newline," newline");
// 			 newArrayOfLines.push(newline);
// 		}else{
// 			newArrayOfLines.push(arrayOfLines[i]);
// 		}
// 	}

// 	for(var i=0;i<newArrayOfLines.length;i++){
// 		console.log( i , newArrayOfLines[i]);
// 	}
// 	console.log("*****************************")

// 	var recursive_line = newArrayOfLines[secondReturn]; 	//n*f(n-1);
// 	console.log("recursive_line ",recursive_line);	
// 	var recursive_line_split = recursive_line.split("");	// [ "n", "*", "f", "(", "n", "-", "1", ")", ";" ]
// 	console.log("recursive_line_split ",recursive_line_split);

// 	var t=0;
// 	while(true){
// 		if(recursive_line_split[t]=="f"){
// 			if(recursive_line_split[t+1]=="("){
// 				break;
// 			}
// 		}else{
// 			t=t+1;
// 		}

// 	}
// 	console.log("t ",t);
// 	var recursive = []; 	//[ "n", "-", "1" ]
// 	var tt=t+2;
// 	while(true){
// 		if(recursive_line_split[tt]!=")"){
// 			recursive.push(recursive_line_split[tt]);
// 			tt=tt+1;
// 		}else{
	
// 			break;
// 		}
// 	}
// 	console.log("recursive ",recursive);
// 	var recursive_element=""; //"n-1"
// 	for(var i=0;i<recursive.length;i++){
// 		recursive_element=recursive_element+recursive[i];
// 	}
// 	console.log("recursive_element ",recursive_element);

// 	var user = newArrayOfLines[0].split(" ")[1].split("f")[1].split("{")[0].split("(")[1].split(")")[0];//n,k 
//     console.log("user variable",user);

// 	var index =secondReturn; //array.push line enter to starting index, in the index where second return is
//     console.log("index to enter the array.push , ",index);console.log("*****************************")

//     var arrayPush = "array.push([["+user+"],["+recursive_element+"]]);";
//     newArrayOfLines.splice(index,0,arrayPush);
    	
   
    
//     for(var i=0;i<newArrayOfLines.length;i++){
// 		console.log( i," ",newArrayOfLines[i]);
// 	}
// 	console.log("*****************************")

// 	var functionString = ""; 	//lines to a string,"function f(n){if (n<=1){}else{array.push([[n],[n-1]]);array.push([[n],[n-2]]);f(n-1)+f(n-2);}}"
// 	for (var i=0;i<newArrayOfLines.length;i++){
// 		if(newArrayOfLines[i]!=undefined){
// 			functionString = functionString+newArrayOfLines[i];
// 		}    	
//     }
//     console.log("functionString ",functionString);
//     var ff=functionString.split("");
//     ff.splice(ff.length-1,0,"return array;")			//insert return array string to the correct place
//    	var finalFunction ="";
//    	for(var i=0;i<ff.length;i++){
//    		finalFunction=finalFunction+ff[i]
//    	}
//    	console.log("finalFunction ",finalFunction)
//    	console.log("*****************************")


// }