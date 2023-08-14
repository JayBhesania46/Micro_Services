//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json

import axios from 'axios';

async function getUsers() 
{
  const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json');
  return data;
}
async function getMovies() 
{
  const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json');
  return data;
}


export const getUserById = async (id) => 
{
  if (!id || typeof id !== 'string') {
    throw Error('Invalid or missing id parameter');
  }

  const trimmedId = id.trim();

  if (!trimmedId) {
    throw Error('Invalid id parameter');
  }

  const users = await getUsers();
  const user = users.find(user => user.id === trimmedId);

  if (!user) {
    throw Error('User not found');
  }

  return user;
};


export const sameGenre = async (genre) => 
{
  if (typeof genre !== 'string' || genre.trim().length === 0) {
    throw Error('genre must be a non-empty string');
  }

  const normalizedGenre = genre.trim().toLowerCase();
  const users = await getUsers();
  
  if (users.length === 0) {
    throw Error('no users found');
  }

  const matchingUsers = users.filter(user => user.favorite_genre.trim().toLowerCase() === normalizedGenre);

  if (matchingUsers.length < 2) {
    throw Error(`there must be at least 2 users with the favorite genre of "${genre}"`);
  }

  const sortedUsers = matchingUsers.sort((user1, user2) => {
    if (user1.last_name < user2.last_name) {
      return -1;
    } else if (user1.last_name > user2.last_name) {
      return 1;
    }
    return 0;
  });

  const userNames = sortedUsers.slice(0, 50).map(user => `${user.first_name} ${user.last_name}`);
  return userNames;
};


export const moviesReviewed = async (id) => 
{
  if (typeof id !== 'string') {
    throw Error('id parameter must be a string');
  }

  id = id.trim();
  const users = await getUsers();
  const movies = await getMovies();
  const user = users.find(user => user.id === id);

  if (!user) {
    throw Error('user not found');
  }

  const username = `${user.username}`;
  const reviewedMovies = movies.filter(movie => movie.reviews.some(review => review.username === username));

  const result = reviewedMovies.reduce((acc, movie) => {
    const review = movie.reviews.find(r => r.username === username);
    if (review) {
      acc[movie.title] = { ...review };
    }
    return acc;
  }, {});

  return result;
};


export const referMovies = async (id) => 
{
  if (!id || typeof id !== "string") {
    throw Error("id must be a non-empty string");
  }
  const users = await getUsers();
  const movies = await getMovies();
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw Error("User not found");
  }

  const favoriteGenre = user.favorite_genre ? user.favorite_genre.toLowerCase() : "";
  const reviewedMovies = user.reviews?.map((review) => review.title) || [];

  const recommendedMovies = movies.filter((movie) => {
    const genres = movie.genre.toLowerCase().split("|");
    return (
      genres.includes(favoriteGenre) &&
      !reviewedMovies.includes(movie.title)
    );
  });

  return recommendedMovies.map((movie) => movie.title);
};


export const functions = 
{   
    getUserById,
    getUsers,
    sameGenre,
    moviesReviewed,
    referMovies,
}
