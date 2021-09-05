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

//Route 3: updating an existing notes using: PUT "/api/note/updatenote". Login Require
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body
    const newNote = {}
    if (title){
        newNote.title = title
    }
    if (description){
        newNote.description = description
    }
    if (tag){
        newNote.tag = tag
    }
    //find note to update and update it
    let note = await Note.findById(req.params.id)
    if (!note){
        return res.status(404).send("Not Found")
    }
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note})
})

module.exports = router