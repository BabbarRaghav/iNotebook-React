const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = 'RaghavOpBolte'

//Route 1: create a user using: POST "/api/auth/createUser". Doesnot require auth
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
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    const data = {
        user:{
            id: user.id
        }
    }
    const jwtData = jwt.sign(data, JWT_SECRET)
    res.json({jwtData})
    } catch(error){
        console.error();
        return res.status(500).send("Internal Server Error")
    }
})

//Route 2: Login a User using: POST "/api/auth/login". Doesnot require auth
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res)=>{
    let success = true
    //Validation in auth
    const errors = validationResult(req);
    //at time of error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if (!user){
            success = false
            return res.status(400).json({ success, errors: 'Invalid email' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare){
            success = false
            return res.status(400).json({ success, errors: 'Invalid password' });
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const jwtData = jwt.sign(data, JWT_SECRET)
        res.json({success, jwtData})
    } catch (error) {
        console.error();
        return res.status(500).send("Internal Server Error")
    }
})

//Route 3: Get login User detail using: POST "/api/auth/getUser". Login Require
router.post('/getUser', fetchuser, async (req, res)=>{
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error();
        return res.status(500).send("Internal Server Error")
    }
})

module.exports = router