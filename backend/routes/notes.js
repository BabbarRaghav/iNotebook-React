const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const fetchuser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');

//Route 1: Get all notes using: GET "/api/note/fetchallnotes". Login Require
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error();
        return res.status(500).send("Internal Server Error")
    }
})

//Route 2: adding notes using: POST "/api/note/addnote". Login Require
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be 5 character').isLength({min: 3})
], async (req, res)=>{
    try {
        const {title, description, tag} = req.body
        //Validation in auth
        const errors = validationResult(req);
        //at time of error
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)    
    } catch (error) {
        console.error();
        return res.status(500).send("Internal Server Error")
    }
})

module.exports = router