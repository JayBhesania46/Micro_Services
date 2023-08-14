/* Todo: Implment the functions below and then export them using the ES6 exports syntax.DO NOT CHANGE THE FUNCTION NAMES */


function flattenArray(array, result = []) {
  for(let i = 0; i < array.length; i++){
    if(Array.isArray(array[i])){
      flattenArray(array[i], result);
    }
    else {
      result.push(array[i]);
    }
  }
  return result;
}

export function sortAndFilter(array, sortBy1, sortBy2, filterBy, filterByTerm) 
{
  if(!arguments[0] || !Array.isArray(array) || !(arguments[0].length >= 2)) {
    throw "Array error 1";
  } else {
    for(let i = 0; i < arguments[0].length; i++) {
      if(typeof(arguments[0][i]) != "object" || arguments[0][i].length == 0) {
        throw "Array error 2";
      }
    }
    for(let i = 0; i < arguments[0].length - 1; i++) {
      if(JSON.stringify(Object.keys(arguments[0][i])).trim() !== JSON.stringify(Object.keys(arguments[0][i+1])).trim()) {
        throw "Array error 3";
      }
    }
    for(let i = 0; i < array.length; i++) {
      for(let key in array[i]) {
        if(typeof(array[i][key]) != "string" || array[i][key].trim() == '') {
          throw "Array error 4";
        }
      }
    }
  }
  let keys = {};
  for(let i = 0; i < arguments[0].length; i++) {
    for(let key in arguments[0][i]) {
      keys[key] = 0;
    }
    break;
  }

  if(!arguments[1] || !Array.isArray(sortBy1) || arguments[1].length != 2) {
    throw "Second parameter error!! 1";
  } else {
    for(let i = 0; i < arguments[1].length; i++) {
      if(typeof(arguments[1][i]) != "string" || arguments[1][i].trim() == '') {
        throw "Second parameter error!! 2";
      }
    }
    for(let i = 0; i < arguments[0].length; i++) {
      if(!(sortBy1[0] in array[i])) {
        throw "Second parameter error!! 3";
      }
    }
    let values = {"asc": 0, "desc": 0};
    if(!(arguments[1][1].trim() in values)) {
      throw "Second parameter error!! 4";
    }
  }
  if(!arguments[2] || !Array.isArray(sortBy2) || arguments[2].length != 2) {
    throw "Third parameter error!! 1";
  } else {
    for(let i = 0; i < arguments[2].length; i++) {
      if(typeof(arguments[2][i]) != "string" || arguments[2][i].trim() == '') {
        throw "Third parameter error!! 2";
      }
    }
    for(let i = 0; i < arguments[0].length; i++) {
      if(!(arguments[2][0] in array[i])) {
        throw "Third parameter error!! 3";
      }
    }
    let values = {"asc": 0, "desc": 0};
    if(!(arguments[2][1].trim() in values)) {
      throw "Third parameter error!! 4";
    }
  }
  if(!arguments[3]){
    throw "Fourth parameter error!! 1";
  }
  else{
    if(!(arguments[3].trim() in keys)){
      throw "Fourth parameter error!! 2";
    }
  }
  
  if(!arguments[4]){
    throw "Fifth parameter error!! 1";
  }
  else{
    if(!(typeof(filterByTerm) == "string")){
      throw "Fifth parameter error!! 2"
    }
    else{
      let flag = false;
      for(let i = 0; i < arguments[0].length; i++){
        if(arguments[0][i][arguments[3]] == arguments[4].trim()){
          flag = true;
          break;
        }
      }
      if(flag == false){
        throw "Fifth parameter error!! 3";
      }
    }
  }
  
  let filteredArray = [];
  for(let i = 0; i < arguments[0].length; i++){
    if(arguments[0][i][filterBy].trim() == filterByTerm.trim()){
      filteredArray.push(arguments[0][i]);
    }
  }
  
  let temp = {};
  
  if(sortBy1[1] == 'asc'){
    for(let i = 0; i < filteredArray.length - 1; i++){
      for (let j = i+1; j < filteredArray.length; j++){
        if(filteredArray[i][sortBy1[0]].trim() > filteredArray[j][sortBy1[0]].trim()){
          temp = filteredArray[i]
          filteredArray[i] = filteredArray[j]
          filteredArray[j] = temp
        }
        else if(filteredArray[i][sortBy1[0]].trim() == filteredArray[j][sortBy1[0]].trim()){
          if(sortBy2[1] == 'asc'){
            if(filteredArray[i][sortBy2[0]].trim() > filteredArray[j][sortBy2[0]].trim()){
              temp = filteredArray[i]
              filteredArray[i] = filteredArray[j]
              filteredArray[j] = temp
            }
          }
          else{
            if(filteredArray[i][sortBy2[0]].trim() < filteredArray[j][sortBy2[0]].trim()){
              temp = filteredArray[i]
              filteredArray[i] = filteredArray[j]
              filteredArray[j] = temp
            }
          }
        }
      }
    }
  }
  
  else{
    for(let i = 0; i < filteredArray.length - 1; i++){
      for (let j = i+1; j < filteredArray.length; j++){
        if(filteredArray[i][sortBy1[0]].trim() < filteredArray[j][sortBy1[0]].trim()){
          temp = filteredArray[i]
          filteredArray[i] = filteredArray[j]
          filteredArray[j] = temp
        }
        else if(filteredArray[i][sortBy1[0]].trim() == filteredArray[j][sortBy1[0]].trim()){
          if(sortBy2[1] == 'asc'){
            if(filteredArray[i][sortBy2[0]].trim() > filteredArray[j][sortBy2[0]].trim()){
              temp = filteredArray[i]
              filteredArray[i] = filteredArray[j]
              filteredArray[j] = temp
            }
          }
          else{
            if(filteredArray[i][sortBy2[0]].trim() < filteredArray[j][sortBy2[0]].trim()){
              temp = filteredArray[i]
              filteredArray[i] = filteredArray[j]
              filteredArray[j] = temp
            }
          }
        }
      }
    }
  }
  return filteredArray;
} 


export function merge(...args){
  //this function takes in a variable number of arrays that's what the ...args signifies
  let intArray = Array();
  let stringArray = Array();

  if(args.length == 0){
    throw "Length is 0!!"
  }

  for(let arr of args){
    if(!Array.isArray(arr) || arr.length == 0){
      throw "Data type is not Array or array is empty!!";
    }
    arr = flattenArray(arr);
    for(let i = 0; i < arr.length; i++){
      if(typeof(arr[i]) == "number"){
        intArray.push(parseInt(arr[i]));
      }
      else if(typeof(arr[i]) == "string"){
        stringArray.push(arr[i]);
      }
      else{
        throw "Different data type found!!"
      }
    }
  }

  for(let i = 0; i < intArray.length - 1; i++){
    for(let j = i+1; j < intArray.length; j++){
      if(intArray[i] - intArray[j] > 0){
        let temp = intArray[i];
        intArray[i] = intArray[j];
        intArray[j] = temp
  
      }
    }
    
  }

  stringArray.sort();

  return(intArray.concat(stringArray));

};


export let matrixMultiply = (...args) => 
{

    if(!(args.length >=2)){
      throw "number of arguments are less!!";
    }
    else{
      for(let arr of args){
        if(!Array.isArray(arr) || arr.length == 0){
          throw "Arguments are not array or length is zero";
        }
      }
      for(let arr of args){
        for(let item of arr){
          if(!Array.isArray(item)){
            throw "Elements of outer array are not array!";
          }
        }
      }

      for(let arr of args){
        for(let i = 0; i < arr.length - 1; i++){
          if(arr[i].length != arr[i+1].length){
            throw "Arrays are not of equal length!";
          }
          
        }
      }

      for(let arr of args){
        for(let item of arr){
          let array = flattenArray(item);
          for(let i = 0; i < array.length; i++){
            if(typeof(array[i]) != "number"){
              throw "Elements are not number!!";
            }
          }
        }
      }

      let tempMatrix = args[0];

      for(let i = 1; i < args.length; i++){
        if(tempMatrix[0].length == args[i].length){
          let resultMatrix = new Array(tempMatrix.length);
          for(let p = 0; p < tempMatrix.length; p++){
            resultMatrix[p] = new Array(args[i][0].length);
          }
          for(let j = 0; j < tempMatrix.length; j++){
            for(let k = 0; k < args[i][0].length; k++){
              resultMatrix[j][k] = 0;
              for(let m = 0; m < tempMatrix[0].length; m++){
                resultMatrix[j][k] += tempMatrix[j][m] * args[i][m][k];
              }
              
          }
          
        }
        tempMatrix = resultMatrix;
      }
      else{
        throw "Matrix multiplication not possible!!";
      }

    }
    return tempMatrix;
  }
};

//this function takes in a variable number of arrays that's what the ...args signifies

export const functions = 
{
   sortAndFilter,
   merge,
   matrixMultiply
};
