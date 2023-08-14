// This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

// 1. Your functions in your 2 files are exporting correctly.

// 2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

// Note: 
// 1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
// 2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
// 3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
// 4. DO NOT submit a zip containing your node_modules folder

import * as movies from "./movies.js";
import * as users from "./users.js";

async function main()

{

// getUserById 

try {
  const user = await users.getUserById('48fded55-37cd-4e6b-8f19-e78b481a14a4');
  console.log(user);
} catch (error) {
  console.error(error);
}

try {
  const user = await users.getUserById('-1');
  console.log(user); // Throws Error
} catch (error) {
  console.error(error);
}


// sameGenre test cases

try {
const userNames = await users.sameGenre("(no genres listed)");
console.log(userNames); 
} catch (error) {
console.error(error);
}

try {
const userNames = await users.sameGenre();
console.log(userNames); // Throws Error
} catch (error) {
console.error(error);
} 


// moviesReviewed

try {
const reviewedMoviesObjects = await users.moviesReviewed('64035fad-a5b7-48c9-9317-3e31e22fe26c');
console.log(reviewedMoviesObjects); 
} catch (error) {
console.error(error);
}

try {
const reviewedMoviesObjects = await users.moviesReviewed(-1);
console.log(reviewedMoviesObjects); // throw an error
} catch (error) {
console.error(error);
}


// referMovies

try {
const recommendedMovies = await users.referMovies('5060fc9e-10c7-4f38-9f3d-47b7f477568b');
console.log(recommendedMovies); 
} catch (error) {
console.error(error);
}

try {
const recommendedMovies = await users.referMovies('       ');
console.log(recommendedMovies); // Throws Error
} catch (error) {
console.error(error);
}


// findMoviesByDirector

try {
const moviesByDirector = await movies.findMoviesByDirector('Fernando Dollimore');
console.log(moviesByDirector);
} catch(e){
console.log(e);
}

try {
const moviesByDirector = await movies.findMoviesByDirector(' ');
console.log(moviesByDirector); // Throws error
} catch(e){
console.log(e);
}  

//findMoviesByCastMember

try {
const moviesByCastMember = await movies.findMoviesByCastMember('Huberto Snoddon');
console.log(moviesByCastMember);
} catch(e){
console.log(e);
}

try {
const moviesByCastMember = await movies.findMoviesByCastMember(' ');
console.log(moviesByCastMember); // Throws error
} catch(e){
console.log(e);
}  

    
// getOverallRating

try {
const overallRating = await movies.getOverallRating('Asterix and the Vikings (Astérix et les Vikings)');
console.log(overallRating);
}catch(e){
console.log(e);
}

try {
const overallRating = await movies.getOverallRating(' ');
console.log(overallRating); // Throws error
}catch(e){
console.log(e);
}
    

//getMovieById

try{
const movie = await movies.getMovieById('38fd6885-0271-4650-8afd-6d09f3a890a2');
console.log(movie);
}catch(e){
console.log(e);
}

try{
const movie = await movies.getMovieById();
console.log(movie); // Throws Error
}catch(e){
console.log(e);
}

}
//call main
main();
