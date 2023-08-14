export const questionOne = (arr) =>  
{
  function isNumberPrime(num) {
      if (num <= 1) return false;
      for (let i = 2; i < num; i++) {
          if (num % i === 0) return false;
      }
      return true;
  }

  const SumTheCubes = arr.reduce((sum, num) => sum + num ** 3, 0);
  return { [SumTheCubes]: isNumberPrime(SumTheCubes) };
}

export const questionTwo = (numArray) => 
{
  let result = [];
  for(let i = 0; i < numArray.length - 1; i++){
    if(numArray[i] < numArray[i+1]){
      continue;
    }
    else{
      result[0] = false;
      result[1] = i;
      result[2] = i + 1;
      break;
    }
  }
  if(result[0] != false){
    result[0] = true;
  }
  return result;
};

export const questionThree = (obj1, obj2) => 
{
  let result = {};
  for (let key in obj1) {
    result[key] = key in obj2;
  }
  for (let key in obj2) {
    result[key] = key in obj1;
  }
  return result;
};

export const questionFour = (string) => 
{
  let rows = string.split("\n");
  let result = [];
  for (let i = 0; i < rows.length; i++) {
    result.push(rows[i].split(","));
  }
  return result;
};

export const studentInfo = 
{
  firstName: 'JAY',
  lastName: 'BHESANIA',
  studentId: '20011391',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};