//import mongo collections, bcrypt and implement the following data functions



import {users} from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const createUser = async (firstName, lastName,emailAddress,password,role) => 
{
  if (!firstName) {
    throw Error('First name is required.');
  }
  
  if (!lastName) {
    throw Error('Last name is required.');
  }
  
  if (!emailAddress) {
    throw Error('Email address is required.');
  }
  
  if (!password) {
    throw Error('Password is required.');
  }
  
  if (!role) {
    throw Error('Role is required.');
  }

  if (!/^[a-zA-Z]{2,25}$/.test(firstName.trim())) {
    throw Error('Invalid first name.');
  }

  if (!/^[a-zA-Z]{2,25}$/.test(lastName.trim())) {
    throw Error('Invalid last name.');
  }

  if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailAddress.trim())) {
    throw Error('Invalid email address.');
  }

  const userCollection =await users();
  const existingUser = await userCollection.findOne({ emailAddress:emailAddress});
  if (existingUser) {
    throw Error('There is already a user with that email address.');
  }

  const regex=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!regex.test(password.trim())) {
    throw Error('Password must be at least 8 characters long and must contain at least one uppercase character, one number, and one special character.');
  }

  if (!['admin', 'user'].includes(role.toLowerCase())) {
    throw Error('Invalid role.');
  }

  let hashedPassword = await bcrypt.hash(password,saltRounds);
  const newUser ={
    firstName: firstName.trim(),
    lastName:lastName.trim(),
    emailAddress:emailAddress.trim(),
    password:hashedPassword.trim(),
    role:role.trim(),
  }

  const adduser=await userCollection.insertOne(newUser)
  if(!adduser.acknowledged || !adduser.insertedId){throw "Data not added!"}

  return{insertedUser:true}
};


export const checkUser = async (emailAddress, password) => 
{
  if (!emailAddress) {
    throw Error('Email address is required.');
  }
  
  if (!password) {
    throw Error('Password is required.');
  }  

  if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailAddress.trim())) {
    throw Error('Invalid email address.');
  }

  const regex=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!regex.test(password.trim()))  {
    throw Error('Password must be at least 8 characters long and must contain at least one uppercase character, one number, and one special character.');
  }

  const userCollection =await users();
  const existingUser = await userCollection.findOne({ emailAddress:emailAddress });
  if (!existingUser) {
    throw Error('Either the email address or password is invalid.');
  }
  const isMatch = await bcrypt.compare(password,existingUser.password);
  if (!isMatch) {
    throw Error('Either the email address or password is invalid.');
  }

  const { firstName, lastName, email, role } = existingUser;
  return {
    firstName,
    lastName,
    email,
    role,
  };
};

export default {
  createUser,
  checkUser
}
