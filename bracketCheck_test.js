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
	    var linesplit=a[x].split("");
	    //*******************
	    removedStartingSpace=[];
		for (var j=0;j<linesplit.length;j++){
			if(linesplit[j]!=" "){
				index=j;
				break;
			}
		}
		for (var j=index;j<linesplit.length;j++){
			removedStartingSpace=removedStartingSpace+linesplit[j];
		}
	    //*******************  
	    arrayOfLines.push(removedStartingSpace);
	    }
	  } 
  	
  	if(newLineBracket(arrayOfLines)==true && bracketOrder(arrayOfLines)==true){
  		document.getElementById('syntaxCheckDisplay').innerHTML="Syntax Correct";
  		document.getElementById("result").hidden = false;
  		console.log("arrayOfLines,",arrayOfLines);
  		return arrayOfLines;
  	}else{
  		document.getElementById("result").hidden = true;
  		alert("Incorrect Syntax. Check Again")
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


//index of where recursiving calling available
function getIndexOfSecondReturn(arrayOfLines){
	var temp = 0;
	var indexOfSecondReturn;//return f(n-1,k-1)+f(n-1,k);
	for(var i=1;i<arrayOfLines.length;i++){
		//1 idan line eken eka aran balanawa f() tyenawada kyala
		var temp_code_line = arrayOfLines[i].split("")//letters walata split kala
		for(var j=0 ; j<temp_code_line.length;j++){
			if(temp_code_line[j]=="f" && temp_code_line[j+1]=="("){
				indexOfSecondReturn = i; 
				break;
			}
		}
	}
	return indexOfSecondReturn;
}

//**********************************************************************************//

function getRecursiveCallElement(){ //return  [ "k,n%k" ]	
	var arrayOfLines = getAlgo();
	var index = getIndexOfSecondReturn(arrayOfLines)//recursive element tyena row eke index
	var a = arrayOfLines[index];
	var recursiveelement=[];
	console.log("a,",a);
	
		var b =a.split("")//letters walata split kala
		console.log("b, ",b)
		var removedspace = [];
		for(var i=0;i<b.length;i++){
			if(b[i]!="" && b[i]!=" "){
				removedspace.push(b[i])
			}
		}
		console.log("removedspace,",removedspace);;
		 for(var i=0;i<removedspace.length;i++){
		 	if(removedspace[i]=="f"){
		 		if(removedspace[i+1]=="("){
		 			var element="";
		 			var additional_bracket=0;
		 			start=i+2;
		 			for(j=start;j<removedspace.length;j++){
		 				if(removedspace[j]=="("){
			 					additional_bracket=additional_bracket+1;
			 					element=element+removedspace[j];
			 				}else if(removedspace[j]==")"){
			 					if(additional_bracket>0){
			 						additional_bracket=additional_bracket-1;
			 						element=element+removedspace[j];
			 					}else{
			 						break;
			 					}
			 				}else{
			 					element=element+removedspace[j];
			 				}
		 			}recursiveelement.push(element);

		 		}
		 	}
		 }
		return recursiveelement;


}

//***********************************************************************************//
function change(){
	var arrayOfLines = getAlgo();
	//if eke return statement eka aran eka ain karanawa
	var firstReturn;
	for(var i=0;i<arrayOfLines.length;i++){
		b=arrayOfLines[i].split(" ");
		if(b.includes("return")){
			firstReturn = i;
			break;
		}
	}

	var secondReturn = getIndexOfSecondReturn(arrayOfLines);

	var newArrayOfLines = [];
	for(var i=0;i<arrayOfLines.length;i++){
		if(i==firstReturn){//remove first return statement
			newArrayOfLines.push(undefined);
		}else if(i==secondReturn){ //return keyword remove
			var line = arrayOfLines[i].split(" ");
			if(line.includes("return")==true){
				var newline ="";
				for(var j=1;j<line.length;j++){
					newline=newline+line[j];
				}
				 newArrayOfLines.push(newline);
			}else{
				newArrayOfLines.push(arrayOfLines[i])
			}
		}else{
			newArrayOfLines.push(arrayOfLines[i]);
		}
	}
	
	var recursiveCallFor = getRecursiveCallElement(arrayOfLines);
	
	var vari = newArrayOfLines[0].split("");
	for(var m=0;m<vari.length;m++){
		if(vari[m]=="f" && vari[m+1]=="("){
			user = "";   //n, n,k
			for(var mm=m+2;mm<vari.length;mm++){
				if(vari[mm]!=")"){
					user=user+vari[mm]
				}else{
					break;
				}
			}
		}
	}

    var index =getIndexOfSecondReturn(arrayOfLines); //array.push line enter to starting index, in the index where second return is
    

    for (var i=0;i<recursiveCallFor.length;i++){
    	var arrayPush = "array.push([["+user+"],["+recursiveCallFor[i]+"]]);";
    	newArrayOfLines.splice(index,0,arrayPush);
    	index=index+1;
    }
    //*******************************************************************//
	var functionString = ""; 	//lines to a string,"function f(n){if (n<=1){}else{array.push([[n],[n-1]]);array.push([[n],[n-2]]);f(n-1)+f(n-2);}}"
	for (var i=0;i<newArrayOfLines.length;i++){
		if(newArrayOfLines[i]!=undefined){
			functionString = functionString+newArrayOfLines[i];
		}    	
    }
   
    //
   for(var i=0;i<newArrayOfLines.length;i++){
   	console.log(i,newArrayOfLines[i])
   }

   if(newArrayOfLines[newArrayOfLines.length-2].split("").includes("}")==true){
   	console.log("trueeee");
   	newArrayOfLines.splice(newArrayOfLines.length-1,0,"return array;")
   }else{
   	delete newArrayOfLines[newArrayOfLines.length-2];
   	newArrayOfLines.splice(newArrayOfLines.length-1,0,"return array;");
   }

    //
   for(var i=0;i<newArrayOfLines.length;i++){
   	console.log(i,newArrayOfLines[i])
   }
   var finalFunction="";
   for(var i=0;i<newArrayOfLines.length;i++){
	   		if(newArrayOfLines[i]!=undefined){
	   			finalFunction=finalFunction+newArrayOfLines[i];
	   		}
	   		
	   	}
	   	console.log("/////,",finalFunction);
	   	return finalFunction;
}


//**********************************************************************************************//
//f(2),f(4,3) taking
function getUser(){
	var variable = document.getElementById('n_value').value;
	return variable;
}
//**********************************************************************************************//
//**********************************************************************************************//
//f(2),f(4,3) taking
function getArray(){
	var variable = document.getElementById('array_value').value;
	return variable;
}
//**********************************************************************************************//


