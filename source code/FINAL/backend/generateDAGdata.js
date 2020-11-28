//index of where recursiving calling available
function getIndexOfSecondReturn(arrayOfLines){
	var temp = 0;
	var indexOfSecondReturn;//return f(n-1,k-1)+f(n-1,k);
	for(var i=1;i<arrayOfLines.length;i++){
		//check for function call
		var temp_code_line = arrayOfLines[i].split("")//split to letters
		var temp_code_line_nospace = [];
		for(var m=0;m<temp_code_line.length;m++){
			if(temp_code_line[m]!=" "){
				temp_code_line_nospace.push(temp_code_line[m])
			}
		}

		for(var j=0 ; j<temp_code_line_nospace.length;j++){
			if(temp_code_line_nospace[j]=="f" && temp_code_line_nospace[j+1]=="("){ //spaces are removed, okay -> f ( )
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
	var index = getIndexOfSecondReturn(arrayOfLines)//recursive element available row  index
	var a = arrayOfLines[index]; //return f(n-1)+f(n-2); 
	var recursiveelement=[];
	var b =a.split(""); //r,e,t,u,r,n, ,f,(,n,-,1,),+,f,(,n,-,2,),;, 
	var removedspace = [];
	for(var i=0;i<b.length;i++){
		if(b[i]!="" && b[i]!=" "){
			removedspace.push(b[i])
		}
	}
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
//change code and insert new rows for execution
function getExecutableString(){
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
   
   
   if(newArrayOfLines[newArrayOfLines.length-2].split("").includes("}")==true){
   	newArrayOfLines.splice(newArrayOfLines.length-1,0,"return array;")
   }else{
   	delete newArrayOfLines[newArrayOfLines.length-2];
   	newArrayOfLines.splice(newArrayOfLines.length-1,0,"return array;");
   }

   var finalFunction="";
   for(var i=0;i<newArrayOfLines.length;i++){
	   		if(newArrayOfLines[i]!=undefined){
	   			finalFunction=finalFunction+newArrayOfLines[i];
	   		}
	   		
	   	}

	   	return finalFunction;
}



