const router = require('express').Router()
const User = require('../models/User')

const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//Register
router.post('/register',async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS
            .AES
            .encrypt(
                req.body.password,
                process.env.PASS_SECRET
            )
            .toString()
    })

    try {
        const savedUser =await newUser.save()
        // 201 successfully header
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

router.post('/login', async(req, res) => {
    
    try {
        const user = await User.findOne({username: req.body.username});
        
        if(!user ){
           return res.status(401).json("Wrong credetials!");
        }
        const hashPassword = CryptoJS
            .AES
            .decrypt(
                user.password,
                process.env.PASS_SECRET
            );
        const pass = hashPassword.toString(CryptoJS.enc.Utf8);
        if( pass !== req.body.password ){
            return res.status(401).json("Wrong credetials!");
        }

        const accessToken = jwt.sign(
            {
                id:user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: '3d'}
        )
        /* to return user without password */
        const {password, ...others} = user._doc;
        
        return res.status(200).json({...others,accessToken});
    } catch (error) {
        
        return res.status(500).json(error);
    }

});


module.exports = router