//import express, express router as shown in lecture code

import {Router} from 'express';
const router = Router();
import {createUser,checkUser} from '../data/users.js';


// GET /
router.route("/")   
.get (async (req, res) => {
      //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
      return res.json({ error: "YOU SHOULD NOT BE HERE!" });
    }
  );

// GET /register And POST /register
router
  .route('/register')
  .get(async (req, res) => {
  
  //code here for GET
    res.render('register'),{title: 'Register'}
  })


.post(async (req, res) => {
  
  //code here for POST

  const { firstNameInput, lastNameInput, emailAddressInput, passwordInput, roleInput } = req.body;
  if (!firstNameInput) {
    res.status(400).render('error', {
      message: 'First name is required.'
    });
    return;
  }
  
  if (!lastNameInput) {
    res.status(400).render('error', {
      message: 'Last name is required.'
    });
    return;
  }
  
  if (!emailAddressInput) {
    res.status(400).render('error', {
      message: 'Email address is required.'
    });
    return;
  }
  
  if (!passwordInput) {
    res.status(400).render('error', {
      message: 'Password is required.'
    });
    return;
  }
  
  if (!roleInput) {
    res.status(400).render('error', {
      message: 'Role is required.'
    });
    return;
  }
    if (!/^[a-zA-Z]{2,25}$/.test(firstNameInput.trim())) {
    res.status(400).render('error', {
      message: 'Invalid first name.'
    });
    return;
  }
    if (!/^[a-zA-Z]{2,25}$/.test(lastNameInput.trim())) {
    res.status(400).render('error', {
      error: 'Invalid last name.'
    });
    return;
  }
    if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailAddressInput.trim())) {
    res.status(400).render('error', {
      message: 'Invalid email address.'
    });
    return;
  }
  const regex=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!regex.test(passwordInput.trim())) {
    res.status(400).render('error', {
      message: 'Password must be at least 8 characters long and must contain at least one uppercase character, one number, and one special character.'
    });
    return;
  }
    if (passwordInput !== req.body.confirmPasswordInput) {
    res.status(400).render('error', {
      message: 'Passwords do not match.'
    });
    return;
  }
    if (roleInput !== 'admin' && roleInput !== 'user') {
    res.status(400).render('error', {
      message: 'Invalid role.'
    });
    return;
  }
    const user = await createUser(firstNameInput, lastNameInput, emailAddressInput, passwordInput, roleInput);
    if (user.insertedUser==true) {
    res.redirect('/login');
  } else {
    res.status(500).render('error', {
      message: 'Internal server error.'
    });
  }
  });


// GET /login And POST /login
router
  .route('/login')
  .get(async (req, res) => {
    
    //code here for GET

    res.render('login', { title: 'Login'});
    })


  .post(async (req, res) => {
    
    //code here for POST

    let { emailAddress, password } = req.body;
    if(!emailAddress){  res.status(400).render('error', {
      message: 'Email address is not valid.'
    });
    return;}

    if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailAddress.trim())){
      res.status(400).render('error', {
        message: 'Email address is not valid.'
      });
      return;
    }

    const regex=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!regex.test(password.trim())) { 
      res.status(400).render('error', {
        message: 'Password must be at least 8 characters long and must contain at least one uppercase character, one number, and one special character.'
      });
      return;
    }

    const user = await checkUser(emailAddress, password);
    if (!user) {
     return  res.status(400).render('error', {
        message: 'Invalid username and/or password.'
      });
  
    }

    req.session.user = user;
    if (user.role === 'admin') {
      res.redirect('/admin');
    } else {
      res.redirect('/protected');
    }
  
  });


router.route('/protected').get(async (req, res) => 
{
  
  //code here for GET
  const {role}=req.session.user.role;
  let isAdmin;
  if (role === 'admin') {
    isAdmin = true;
  } else {
    isAdmin = false;
  }
    const user = req.session.user;
    const currentTime = new Date();
    res.render('protected', {
      firstName: user.firstName,
      currentTime: currentTime,
      role: user.role
    });
  
});


router.route('/admin').get(async (req, res) => 
{
  
  //code here for GET
   const firstName = req.session.user.firstName;
   const currentTime = new Date();
   res.render('admin', {
     firstName,
     currentTime,role: req.session.user.role
   });
});


router.route('/error').get(async (req, res) => 
{
    
  //code here for GET
  res.render("error")

});


router.route('/logout').get(async (req, res) => 
{
  
  req.session.destroy();
  res.render("logout")

 });


export default router;