// TODO: Export and implement the following functions in ES6 format
import {bands} from '../config/mongoCollections.js'
import {ObjectId} from "mongodb";

export const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => 
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


const urlRegex = /^(http:\/\/www\.).{5,}\.com$/;
if (!urlRegex.test(website)) {
  throw 'Website should start with http://www. and end with .com with at least 5 characters in-between';
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


export async function getAll() 
{
  const bandCollection = await bands();
  const bandList = await bandCollection.find({}).toArray();
  if (!bandList) throw 'Could not get all bands';
  bandList.forEach((band) => {
    band._id = band._id.toString();
  });
  return bandList;
}


export const get = async (id) => 
{
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  id=id.trim();
  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: new ObjectId(id) });
  if (!band) throw 'No band with that id';
  band._id = band._id.toString();
  return band;
}


export const remove = async (id) => 
{
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0) throw 'id cannot be an empty string or just spaces';
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  id=id.trim();
  const data = await bands();
  const deletionInfo = await data.findOneAndDelete({ _id: new ObjectId(id) });

  if (deletionInfo.lastErrorObject.n === 0) {
    throw `Could not delete band with id of ${id}`;
  }

  return `${deletionInfo.value.name} has been successfully deleted!`;
}


export const rename = async (id, newName) => 
{
  
  if (!id) {
    throw 'You must provide an id';
  }
  if (typeof id !== 'string') {
    throw 'Id must be a string';
  }
  
  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    throw 'Invalid object ID';
  }
  
  if (!newName) {
    throw 'You must provide a new name';
  }
  if (typeof newName !== 'string') {
    throw 'New name must be a string';
  }
  id=id.trim();
  newName=newName.trim();
  const data = await bands();
  const band = await data.findOne({_id: objectId});
  if (!band) {
    throw 'Could not find band with the provided ID';
  }

  
  if (band.name === newName) {
    throw 'New name is the same as the current name';
  }


  const updatedBand = await data.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: {name: newName}},
    {returnDocument: 'after'}
  );

  return {
    id: updatedBand.value._id.toString(),
    name: updatedBand.value.name,
    genre: updatedBand.value.genre,
    website: updatedBand.value.website,
    groupMembers: updatedBand.value.groupMembers,
    yearBandWasFormed: updatedBand.value.yearBandWasFormed
  };
}  
