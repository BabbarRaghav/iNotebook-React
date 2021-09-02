const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');

//create a user using: POST "/api/auth/createUser". Doesnot require auth
router.post('/createUser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter minimum 5 character password').isLength({min: 5})
], async (req, res)=>{
    //Validation in auth
    const errors = validationResult(req);
    //at time of error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user = await User.findOne({email: req.body.email})
    if (user){
        return res.status(400).json({error: "sorry this email already exist"})
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
    res.json(user)
    } catch(error){
        console.error();
        return res.status(500).send("Some error occured")
    }
})


module.exports = router