/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
Do not forget that you need to create the package.json and add the start command to run app.js as thestarting script*/

import * as arrayUtils from './arrayUtils.js';
import * as objectUtils from './objectUtils.js';
import * as stringUtils from './stringUtils.js';


// SortAndFilter
// Should Pass
try {
const data = [
    {name: 'John', age: '25', gender: 'Male'},
    {name: 'Jane', age: '30', gender: 'Female'},
    {name: 'Bob', age: '20', gender: 'Male'}
];
const sortedData = (arrayUtils.sortAndFilter(data, ['age', 'asc'], ['name', 'desc'], 'gender', 'Male'));
console.log(sortedData);
} catch (e) {
console.error('Pass');
}

// Should Fail
try {
const data = [
    {name: 'John', age: '25', gender: 'Male'},
    {name: 'Jane', age: '30', gender: 'Female'},
    {name: 'Bob', age: '20', gender: 'Male'}
];
const sortedData = (arrayUtils.sortAndFilter(data, ['age', 'desc'], ['name', 'desc'], 'city', 'Toronto'));
console.log(sortedData);
} catch (e) {
console.error('Fail');
}


// Merge
// Should Pass
try {
    const result = (arrayUtils.merge([1, 4, 2], ["c", "a", "b"], [7, 6, 5]));
    console.log(result); // expected output: [1, 2, 4, 5, 6, 7, "a", "b", "c"]
  } catch (error) {
    console.error(error); // this should not be executed in case of passing test case
  }

// Should Fail
try {
    const result = (arrayUtils.merge([1, 4, 2], [], [7, 6, 5]));
    console.log(result); // this should not be executed in case of failing test case
  } catch (error) {
    console.error(error); // expected output: "Data type is not Array or array is empty!!"
  }


// MatrixMultiply
// Should Pass
try {
    const result = (arrayUtils.matrixMultiply([[1, 2], [3, 4]], [[5, 6], [7, 8]]));
    console.log(result); // Output: [ [ 19, 22 ], [ 43, 50 ] ]
  } catch (error) {
    console.log(error);
  }

// Should Fail
try {
    const result = (arrayUtils.matrixMultiply([[1, 2, 3], [4, 5, 6]], [[7, 8], [9, 10]]));
    console.log(result);
  } catch (error) {
    console.log(error); // Output: Arrays are not of equal length!
  }


// Palindromes
// Should Pass
try {
    const input = ['racecar', 'level', 'A man, a plan, a canal, Panama!', 'Was it a car or a cat I saw?', 'No lemon, no melon'];
    const output = (stringUtils.palindromes(input));
    console.log(output);
  } catch (error) {
    console.log(error);
  }
// output: 
//  {
//   racecar: true,
//   level: true,
//   amanaplanacanalpanama: true,
//   wasitacaroracatisaw: true,
//   nolemonnomelon: true
//  }


// Should Fail
try {
    const input = ['hello', 123, '', '[]', '!!', null];
    const output = (stringUtils.palindromes(input));
    console.log(output);
  } catch (error) {
    console.log(error);
  }
// Error: Each element in the array must be a non-empty string consisting of at least one alphanumeric character


// CensorWords
// Should Pass
try {
    const inputString = "I hate Mondays";
    const badWordsList = ["hate", "Mondays"];
    const output = (stringUtils.censorWords(inputString, badWordsList));
    console.log(output); // "I !@@# !@@@@@@"
    } catch (error) {
    console.error(error);
    }

// Should Fail
try {
    const inputString = "I love programming";
    const badWordsList = ["hate", "Mondays"];
    const output = (stringUtils.censorWords(inputString, badWordsList));
    console.log(output);
    } catch (error) {
    console.error(error); // Error: "hate" is not found in the input string
    }


// Distance
// Should Pass
try {
    const inputString = "the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog";
    const word1 = "quick";
    const word2 = "dog";
    const result = (stringUtils.distance(inputString, word1, word2));
    console.log(result);
  } catch (error) {
    console.error(error);
  }
// Output:7

// Should Fail
try {
    console.log((stringUtils.distance("The quick brown fox jumps over the lazy dog", "cat", "dog")));
  } catch(error) {
    console.log(error);
  }
// Error: word1 and word2 must exist in the string


// AreObjectsEqual
// Should Pass
try {
    const obj1 = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
      }
    };
    const obj2 = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
      }
    };
    const obj3 = {
      name: "Jane",
      age: 25,
      address: {
        street: "456 Elm St",
        city: "Othertown",
        state: "NY"
      }
    };
    const result = (objectUtils.areObjectsEqual(obj1, obj2, obj3));
    console.log(result); // expected output: false
  } catch (error) {
    console.error(error);
  }

// Should Fail
try {
    const obj1 = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
      }
    };
    const obj2 = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
      }
    };
    const obj3 = null;
    const result = (objectUtils.areObjectsEqual(obj1, obj2, obj3));
    console.log(result); // expected output: Error: Input must be an object
  } catch (error) {
    console.error(error);
  }


// CalculateObject
// Should Pass
try {
    const object = {
      a: 1,
      b: 2,
      c: 3
    };
    const funcs = [
      x => x * 2,
      x => x + 5
    ];
    const result = (objectUtils.calculateObject(object, funcs));
    console.log(result); // { a: '7.00', b: '9.00', c: '11.00' }
  } catch (error) {
    console.error(error);
  }

// Should Fail
try {
    const object = {
      a: 1,
      b: 2,
      c: '3'
    };
    const funcs = [
      x => x * 2,
      x => x + 5
    ];
    const result = (objectUtils.calculateObject(object, funcs));
    console.log(result);
  } catch (error) {
    console.error(error); // Error: All values in the object must be numbers
  }


// CombineObjects
// Should Pass
try {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const obj3 = { c: 5, d: 6 };
    const result = (objectUtils.combineObjects(obj1, obj2, obj3));
    console.log(result); // { a: 1, b: 2, c: 4, d: 6 }
  } catch (error) {
    console.error(error);
  }
// Should Fail
try {
    const obj1 = { a: 1, b: 2 };
    const obj2 = null;
    const result = (objectUtils.combineObjects(obj1, obj2));
    console.log(result);
  } catch (error) {
    console.error(error); // Error: All arguments must be objects.
  }