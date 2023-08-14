/* Todo: Implment the functions below and then export them using the ES6 exports syntax.DO NOT CHANGE THE FUNCTION NAMES */


export let areObjectsEqual = (...args) => 
{
  if (args.length < 2) {
    throw Error("At least two objects are required");
  }

  args.forEach(obj => {
    if (typeof obj !== "object" || obj === null) {
      throw Error("Input must be an object");
    }
  });

  const compare = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (typeof value1 === "object" && typeof value2 === "object") {
        if (!compare(value1, value2)) {
          return false;
        }
      } else if (value1 !== value2) {
        return false;
      }
    }

    return true;
  };

  for (let i = 0; i < args.length - 1; i++) {
    for (let j = i + 1; j < args.length; j++) {
      if (!compare(args[i], args[j])) {
        return false;
      }
    }
  }

  return true;
};


export let calculateObject = (object, funcs) => 
{
    if (!(object instanceof Object)) {
      throw Error("The first argument must be an object");
    }
    if (!Array.isArray(funcs)) {
      throw Error("The second argument must be an array");
    }
    if (!funcs.length) {
      throw Error("The array must have at least one element");
    }
    for (const key in object) {
      if (typeof object[key] !== "number") {
        throw Error("All values in the object must be numbers");
      }
    }        
    for (const func of funcs) {
      if (typeof func !== "function") {
        throw Error("All elements in the array must be functions");
      }
    }
    const result = {};
    for (const key in object) {
      let value = object[key];
  
      for (const func of funcs) {
        value = func(value);
      }
      result[key] = value.toFixed(2);
    }
    return result
};


export let combineObjects = (...args) => 
{
  if (args.length < 2) {
    throw Error("Error: At least two objects are required.");
  }
  
  const result = {};
  const keys = new Set();
  
  for (const obj of args) {
    if (typeof obj !== "object" || obj === null) {
      throw Error("Error: All arguments must be objects.");
    }
    
    if (Object.keys(obj).length === 0) {
      throw Error("Error: All objects must have at least one key.");
    }
    
    for (const key in obj) {
      keys.add(key);
    }
  }
  
  for (const key of keys) {
    for (const obj of args) {
      if (key in obj) {
        result[key] = obj[key];
        break;
      }
    }
  }
  
  return result;
}


export const functions = 
{
   areObjectsEqual,
   calculateObject,
   combineObjects,
};
