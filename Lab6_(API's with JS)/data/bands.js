import {bands} from '../config/mongoCollections.js'
import {ObjectId} from "mongodb";

export const create = async (name,genre,website,recordCompany,groupMembers,yearBandWasFormed) => 
{ 

if (!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) {
  throw 'All fields are required';
}

if (typeof name !== 'string' || !name.trim()) {
  throw 'Name should be a non-empty string';
}

if (typeof website !== 'string' || !website.trim()) {
  throw 'Website should be a non-empty string';
}

if (typeof recordCompany !== 'string' || !recordCompany.trim()) {
  throw 'Record company should be a non-empty string';
}

if (!website.match(/^(http:\/\/www\.).{5,}\.com$/) || website.length < 16) {
  throw 'Website must be a valid URL starting with http://www. and ending with .com with at least 5 characters in between.';
}

if (!Array.isArray(genre) || genre.length === 0 || !genre.every(s => typeof s === 'string' && s.trim())) {
  throw 'Genre should be a non-empty array of valid strings';
}

if (!Array.isArray(groupMembers) || groupMembers.length === 0 || !groupMembers.every(s => typeof s === 'string' && s.trim())) {
  throw 'Group members should be a non-empty array of valid strings';
}

if (typeof yearBandWasFormed !== 'number' || yearBandWasFormed < 1900 || yearBandWasFormed > 2023) {
  throw 'Year band was formed should be a number between 1900 and 2023';
}

const newBand = {
  name: name.trim(),
  genre: genre.map(s => s.trim()),
  website: website.trim(),
  recordCompany: recordCompany.trim(),
  groupMembers: groupMembers.map(s => s.trim()),
  yearBandWasFormed: yearBandWasFormed
};
const bandCollection = await bands();
const insertInfo = await bandCollection.insertOne(newBand);

if (!insertInfo.acknowledged || !insertInfo.insertedId) {
  throw 'Could not create band';
}

const final = await get(insertInfo.insertedId.toString());
return final;
}


export const getAll = async () => 
{
  const bandCollection = await bands();
  const bandList = await bandCollection.find({}).toArray();
  
  if (!bandList) 
    throw 'Could not get all bands';
  
    bandList.forEach((band) => {
    band._id = band._id.toString();
  });
  return bandList;
}


export const get = async (id) => 
{
    if (!id) 
    throw 'You must provide an id to search for';
  
    if (typeof id !== 'string') 
    throw 'Id must be a string';
  
    if (id.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  
    if (!ObjectId.isValid(id)) 
    throw 'invalid object ID';
  
    id=id.trim();
  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: new ObjectId(id) });
  
    if (!band) 
    throw 'No band with that id';
  
    band._id = band._id.toString();
  return band;
}


export const remove = async (id) => 
{
  
    if (!id) 
    throw 'You must provide an id to search for';
  
    if (typeof id !== 'string')
    throw 'Id must be a string';
  
    if (id.trim().length === 0) 
    throw 'id cannot be an empty string or just spaces';
  
    if (!ObjectId.isValid(id)) 
    throw 'invalid object ID';
  
    id=id.trim();
  const data = await bands();
  const deletionInfo = await data.findOneAndDelete({ _id: new ObjectId(id) });

    if (deletionInfo.lastErrorObject.n === 0) {
    throw `Could not delete band with id of ${id}`;
  }

  return `${deletionInfo.value.name} has been successfully deleted!`;
}


export const update = async (id,name,genre,website,recordCompany,groupMembers,yearBandWasFormed) => 
{
  
  if (!id || !name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) {
    throw 'All fields must be provided for band update.';
  }
  
  if (typeof id !== 'string' || typeof name !== 'string' || typeof website !== 'string' || typeof recordCompany !== 'string' ||
      id.trim().length === 0 || name.trim().length === 0 || website.trim().length === 0 || recordCompany.trim().length === 0) {
    throw 'ID, name, website, and record company must be non-empty strings for band update.';
  }
  
  if (!ObjectId.isValid(id)) {
    throw 'ID must be a valid ObjectId for band update.';
  }
  
  if (!website.match(/^(http:\/\/www\.).{5,}\.com$/) || website.length < 16) {
    throw 'Website must be a valid URL starting with http://www. and ending with .com with at least 5 characters in between.';
  }
  
  if (!Array.isArray(genre) || !Array.isArray(groupMembers) || genre.length < 1 || groupMembers.length < 1 ||
      genre.some(g => typeof g !== 'string' || g.trim().length === 0) || groupMembers.some(m => typeof m !== 'string' || m.trim().length === 0)) {
    throw 'Genre and group members must be arrays with at least one valid string for band update.';
  }
  
  if (typeof yearBandWasFormed !== 'number' || yearBandWasFormed < 1900 || yearBandWasFormed > 2023) {
    throw 'Year band was formed must be a number between 1900 and 2023 for band update.';
  }

  const bandCollection = await bands();
  const band = await bandCollection.get(id);

  const updatedBand = {
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed,
    albums: band.albums,
    overallRating: band.overallRating
  };

  const updateInfo = await bandCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedBand });
  
  if (updateInfo.modifiedCount === 0) {
    throw `Could not update band with the ID of ${id}.`;
  }

  const updatedBandObject = await bandCollection.get(id);
  updatedBandObject._id = updatedBandObject._id.toString();

  return updatedBandObject;
};

export default
{
  create,
  get,
  getAll,
  remove,
  update
}