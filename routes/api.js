const express = require('express');
const objectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');

const router = express.Router();

const notes = require('../model/notes');
const recipes = require('../model/recipes');


//[Back-end routes]
//Returns data from mongodb to fill checklist notes
router.get("/", (req, res)=>{

    notes.find({ })
        .then((data) => {
            console.log('Data received');
            res.status(200).json(data);
        })
        .catch((error) => {
            console.log('error: ', error)
        });    
});

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
router.delete('/delete/:id', (req, res) => {
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

//Function used to clear all notes made by the user
// router.delete('/deleteAll', (req, res) => {
//     // const { id } = req.body;
//     const data = req.body;

//     notes.deleteAll = (error, data) => {
//         console.log("Data found: ", data);
//         if (error) {
//             console.log('Error in deleting!');
//             throw error;
//         } else {
//             console.log('Item has been deleted');
//             res.status(204).json(data);
//         }
//     };
// });

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

// router.get("/notes", (req, res)=>{
//     const data = {
//         username: 'items test page',
//         testNum: 777
//     };
//     res.json(data);
// });


module.exports = router;