
function getAlgo(){
    //get all input in text area
  var textInput = document.getElementById('user_input');
  var textInput_split = textInput.value.split("\n");
  var algo_string = ""; 

  for(var i=0;i<textInput_split.length;i++){
    algo_string=algo_string+textInput_split[i];
  }

  
  var letters = algo_string.split("");// okkoma akuru wage
  var temp =0;
  while(temp<letters.length){
    if(letters[temp]!="{" && letters[temp]!="}"){
      temp=temp+1;
    }
    else if(letters[temp]=="{" || letters[temp]=="}"){
      letters.splice(temp,0,"$");
      letters.splice(temp+2,0,"$");
      temp=temp+3;
    }
  }

  var star_string ="";
  for(var i=0;i<letters.length;i++){
    star_string=star_string+letters[i];
  }
  var star_string_split=star_string.split("");
  var a=[];
  t=0
  var row="";
  while(t<star_string_split.length){    
    if(star_string_split[t]!="$"){
      row=row+star_string_split[t];
      t=t+1;
    }
    else{
      if(row!=""){
            a.push(row)
      }
      row="";
      t=t+1;
    }
  }

   	var arrayOfLines =[];
    //getting line by line to array, removing starting spaces and null rows
	  for(var x=0 ; x<a.length ; x++){
	    if(a[x] != "" && a[x]!=" " ){ //remove empty lines
	    var linesplit=a[x].split("");
	    //removing starting spaces
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
	    arrayOfLines.push(removedStartingSpace);
	    }
	  } 
  	
  	if(bracketOrder(arrayOfLines)==true){
  		document.getElementById('syntaxCheckDisplay').innerHTML="Syntax Correct";
  		document.getElementById("result").hidden = false;
  		return arrayOfLines;
  	}else{
  		document.getElementById("result").hidden = true;
  		alert("Incorrect Syntax. Missing bracket. Check Again")
  	}
  	
}