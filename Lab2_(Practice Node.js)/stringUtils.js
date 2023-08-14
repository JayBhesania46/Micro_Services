/* Todo: Implment the functions below and then export them using the ES6 exports syntax.DO NOT CHANGE THE FUNCTION NAMES */


export let palindromes = (string) => 
{
    if (!string || typeof string !== 'object' || !Array.isArray(string) || string.length === 0) {
      throw Error('Input must be a non-empty array of strings');
  }
    const strippedStrings = string.map((string) => {
    if (typeof string !== 'string' || string.trim().length === 0 || !/[a-zA-Z0-9]/.test(string)) {
      throw Error('Each element in the array must be a non-empty string consisting of at least one alphanumeric character');
    }
    return string.toLowerCase().replace(/[^a-z0-9]/gi, '');
  });      
  const result = {};
  strippedStrings.forEach((string) => {
    result[string] = string === string.split('').reverse().join('');
  });
  return result;
};


export let censorWords = (string, badWordsList) => 
{
  if (typeof string !== 'string' || string.trim().length === 0) {
    throw Error('input string cannot be an empty string');
  }
  if (!Array.isArray(badWordsList)) {
    throw Error('bad words list must be an array');
  }
  if (badWordsList.length === 0) {
    throw Error('bad words list cannot be empty');
  }
  for (let word of badWordsList) {
    if (typeof word !== 'string') {
      throw Error('each element in the bad words list must be a string');
    }
    if (!string.includes(word)) {
      throw Error(`"${word}" is not found in the input string`);
    }
  }
  let specialChars = ['!', '@', '$', '#'];
  let currentCharIndex = 0;

  for (let word of badWordsList) {
    let startIndex = string.indexOf(word);
    let endIndex = startIndex + word.length;

    for (let i = startIndex; i < endIndex; i++) {
      string = string.substring(0, i) + specialChars[currentCharIndex % specialChars.length] + string.substring(i + 1);
      currentCharIndex++;
    }
  }
  return string;
};


export let distance = (string, word1, word2) => 
{
  if (!string || !word1 || !word2) 
  throw Error("All inputs are required");

  if (typeof string !== "string" || typeof word1 !== "string" || typeof word2 !== "string")
  throw Error("All inputs must be strings");

  if (!string.trim() || !word1.trim() || !word2.trim()) 
  throw new Error("Inputs must not be empty");

  if (
    /^[^a-zA-Z0-9]+$/.test(string.trim()) ||
    /^[^a-zA-Z0-9]+$/.test(word1.trim()) ||
    /^[^a-zA-Z0-9]+$/.test(word2.trim())
  )
  throw Error("Inputs must not be made of punctuation symbols only");
  let index1 = -1;
  let index2 = -1;
  string = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  // Retrieved from stackoverflow
  // https:stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
  var stringList = string.toLowerCase().split(" ");
  word1 = word1.toLowerCase();
  word2 = word2.toLowerCase();
  if(!(string.includes(word1.toLowerCase())) || !(string.includes(word2.toLowerCase()))){
  throw Error("word1 and word2 must exist in the string");
  }
  else{
  var word1List = word1.split(" ");
  var word2List = word2.split(" ");
      for(let i = 0; i< stringList.length; i++){
        if(stringList[i] === word1List[[word1List.length - 1]]){
        index1 = i;
        }
      }
      for(let i = 0; i< stringList.length; i++){
        if(stringList[i] === word2List[0]){
          index2 = i;
        }
      }
      if(index2 < index1){
        throw Error("word1 must appear before word2 in the string");
      }
      else{
        return index2 - index1;
      }
    }
}


export const functions = 
{
  palindromes,
  censorWords,
  distance,
};