// array.push('*');
function checkRecursive(){
	var arrayOfLines = getAlgo(); // get the user algorithm
	var x = getUser();
	var a1 = getArray();//get a array if there is an array variable
	//**********************************************************//
	//take first return statement index, insert "array.push('*')" line
	var firstReturn;
	for(var i=0;i<arrayOfLines.length;i++){
		line =arrayOfLines[i].split(" ");
		if(line.includes("return")==true || line.includes("Return")==true){
			firstReturn=i;
			break;
		}
	}

	arrayOfLines.splice(firstReturn,0,"array.push('*');") //push the new line
	//making a executable string
	var finalFunction = "";
	for(var i=0;i<arrayOfLines.length;i++){
		finalFunction=finalFunction+arrayOfLines[i];
	}

	if(getArray()!= null){     //if there is a user input array
		finalFunction=finalFunction+a1;
		console.log(finalFunction,"*************")
	}


	if(x!=""){
		var array = [];
		eval(finalFunction); //execute it
		var xx =eval(x);
		
		if(array.length==1){
			alert("recursive")
			return true ;//if recursive
		}else{
			alert("multi")
			return false;//if multithreaded
		}
	}else{
		console.log("enter a user variable value")
	}
	
}

