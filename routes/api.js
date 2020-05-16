const express = require('express');
const objectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const notes = require('../model/notes');
const recipes = require('../model/recipes');
const users = require('../model/user');

process.env.SECRET_KEY = 'secret'


//[Back-end routes]
//Returns data from mongodb to fill checklist notes
router.get("/notes", (req, res)=>{

  // res.send(JSON.stringify(req.openid.user));

  notes.find({ })
      .then((data) => {
          console.log('Data received');
          res.status(200).json(data);
      })
      .catch((error) => {
          console.log('error: ', error)
      });    
});


//Adds a new user to website after collecting registration information
router.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    create: today
  }

  users.findOne({
    email: req.body.email
  })
  .then(user => {
    if(!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash
        users.create(userData)
        .then(user => {
          res.json({ status: user.email + 'registered!' })
        })
        .catch(err => {
          res.send('Error: ' + err)
        })
      })
    } else {
      res.json({ error: 'User already exists' })
    }
  })
  .catch(err => {
    res.send('Error: ' + err)
  })
});

//Allows users to login and checks database if they exist
router.post('/login', (req, res) => {
  users.findOne({
    email: req.body.email
  })
  .then(user => {
    if(user) {
      if(bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email          
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 3600
        })
        res.send(token)
      } else {
        res.json({ error: "User does not exist" })
      }
    } else {
      res.json({ error: "User does not exist" })
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})


router.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  users.findOne({
    _id: decoded._id
  })
  .then(user => {
    if(user) {
      res.json(user)
    } else {
      res.send("User does not exist")
    }
  })
  .catch(err => {
    res.send('Error: ' + err)
  })

})


//Returns data from mongodb to fill myrecipes component
router.get("/myrecipes", (req, res)=>{

  recipes.find({ })
      .then((data) => {
          console.log('Recipes data received');
          res.status(200).json(data);
      })
      .catch((error) => {
          console.log('error: ', error)
      });    
});

//Used to delete a single note from the mongodb notes
router.delete('/deleteNote/:id', (req, res) => {
    const  id  = req.params.id;
    
    // console.log("Received Id: ",id, objectId(id));
    
    notes.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete note with id=${id}. Maybe note was not found!`
        });
      } else {
        res.send({
          message: "Note was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete note with id=" + id
      });
    });
});

//Used to delete a single recipe from the mongodb saved recipes
router.delete('/deleteRecipe/:id', (req, res) => {
  const  id  = req.params.id;
  
  recipes.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete recipe with id=${id}. Maybe recipe was not found!`
      });
    } else {
      res.send({
        message: "Recipe was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete recipe with id=" + id
    });
  });
});


//Route to update a note
router.put('/update/:id', (req, res) => {
  const id = req.params.id;

  console.log("ID: ", id);
  notes.findByIdAndUpdate(id, req.body)
    .then(data => {
      if(!data){
        res.status(404).send({
          message: `Cannot update note with id=${id}. Maybe note was not found!`
        });
      }else res.send({ message: "Note was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating note with id=" + id
      });
    });
});

//Route used to save a note to mongodb
router.post('/save', (req, res)=>{
    const data = req.body;

    const newNote = new notes(data);
    newNote.save((error) => {
        if(error) {
            res.status(500).json({ msg: 'Internal server error, could not add data' });
            return;
        }        
        res.json({
            msg: 'Your data was added to the database...'
        });
    });    
});

//Function used to add a recipe to saved recipes
router.post('/addRecipe', (req, res)=>{
  const data = req.body;

  const newRecipe = new recipes(data);
  newRecipe.save((error) => {
      if(error) {
          res.status(500).json({ msg: 'Internal server error, could not add data' });
          return;
      }        
      res.json({
          msg: 'Your data was added to the database...'
      });
  });    
});

module.exports = router;