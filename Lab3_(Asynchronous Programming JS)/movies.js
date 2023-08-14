//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json

import axios from 'axios';

async function getMovies() 
{
  const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json');
  return data;
}


export const findMoviesByDirector = async (directorName) => {
  if (!directorName || typeof directorName !== 'string') {
    throw Error('Invalid directorName parameter');
  }

  const trimmedDirectorName = directorName.trim();

  if (!trimmedDirectorName) {
    throw Error('directorName parameter cannot be empty');
  }

  const movies = await getMovies();
  const moviesByDirector = movies.filter(movie => movie.director === trimmedDirectorName);

  if (moviesByDirector.length === 0) {
    throw Error(`No movies found for director "${trimmedDirectorName}"`);
  }

  return moviesByDirector;
};


export const findMoviesByCastMember = async (castMemberName) => {
  if (!castMemberName || typeof castMemberName !== 'string') {
    throw Error('Invalid castMemberName parameter');
  }

  const trimmedCastMemberName = castMemberName.trim();

  if (!trimmedCastMemberName) {
    throw Error('castMemberName parameter cannot be empty');
  }

  const movies = await getMovies();
  const moviesByCastMember = movies.filter(movie => movie.cast.includes(trimmedCastMemberName));

  if (moviesByCastMember.length === 0) {
    throw Error(`No movies found for cast member "${trimmedCastMemberName}"`);
  }

  return moviesByCastMember;
};


export const getOverallRating = async (title) => {
  if (!title || typeof title !== 'string') {
    throw Error('Invalid title parameter');
  }

  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    throw Error('title parameter cannot be empty');
  }

  const movies = await getMovies();
  const movie = movies.find(movie => movie.title === trimmedTitle);

  if (!movie) {
    throw Error(`Movie "${trimmedTitle}" not found`);
  }

  const reviews = movie.reviews;
  const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRatings / reviews.length;

  return Math.floor(averageRating * 10) / 10;
};


export const getMovieById = async (id) => {
  if (!id || typeof id !== 'string') {
    throw Error('Invalid id parameter');
  }

  const trimmedId = id.trim();

  if (!trimmedId) {
    throw Error('id parameter cannot be empty');
  }

  const movies = await getMovies();
  const movie = movies.find(movie => movie.id === trimmedId);

  if (!movie) {
    throw Error('Movie not found');
  }

  return movie;
};


export const functions = 
{
    findMoviesByDirector,
    findMoviesByCastMember,
    getOverallRating,
    getMovieById
};