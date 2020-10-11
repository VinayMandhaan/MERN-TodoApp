const express = require('express')
const router  = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')

const User = require('../../models/User')

// Create User

// Email, Username and Password must be provided
router.post("/",[
    check('email', 'Email is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'enter Password with 6 or more characters').isLength({min:6})
], async(req,res) => { 
    const errors = validationResult(req)

    //Check for errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,username,password} = req.body
    try{
        // Check if User Already Exists
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({errors : [{msg: 'Email already exist'}]})
        }

        //Create new User
         user = new User({
             email,
             username,
             password,
         })
         
         //Hash Password Before Saving into the Database
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password,salt)
         await user.save();
         res.json({user})

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server error")
    }


})


module.exports = router