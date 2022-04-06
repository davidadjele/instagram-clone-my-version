const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const router = require('express').Router();
const CryptoJS = require('crypto-js')

const User = require('../models/User');

//UPDATE USER INFO
router.put('/:id',verifyTokenAndAuthorization, async (req, res) => {
    
    /* tokenisé le mot de pass avant de changer */
    if(req.body.password){
        req.body.password = CryptoJS
            .AES
            .encrypt(
                req.body.password,
                process.env.PASS_SECRET
            )
            .toString()
    }

    try {
        const updateUser = await User.updateMany(
            {_id:req.params.id},
            {
                $set:{
                    name: req.body.name,
                    email: req.body.email,
                    bio: req.body.bio,
                    location: req.body.location,
                    profileImage: req.body.profileImage,
                    gender: req.body.gender,
                    password: req.body.password,
                }
            },
            {new:true}
        )

        return res.status(200).json(updateUser);
    } catch (error) {
        console.log('ERROR 500');
        return res.status(500).json(error)
    }
})

//ADD NEW ONE USER FOLLOWERS 
router.put('/addfollowers/:id',verifyToken, async (req, res) => {
    try {
        const updateUserFollowers = await User.updateOne({_id:req.params.id}, {
            $addToSet:{ numberOfFollowers:req.body.numberOfFollowers}
        });
        return res.status(200).json(updateUserFollowers);
    } catch (error) {
        return res.status(500).json(error)
    }
})

//REMOVE ONE USER FOLLOWERS
router.delete('/removefollowers/:id',verifyToken, async (req, res) => {
    
    try {
        const updateUserFollowers = await User.updateOne({_id:req.params.id}, {
            $pull:{ 'numberOfFollowers':req.body.userToRemove}
        });
        return res.status(200).json(updateUserFollowers);
    } catch (error) {
        return res.status(500).json(error)
    }
})

//ADD NEW ONE USER FOLLOWING
router.put('/addfollowing/:id',verifyToken, async (req, res) => {
    try {
        const updateUserFollowing = await User.updateOne({_id:req.params.id}, {
            $addToSet:{ numberOfFollowing:req.body.numberOfFollowing}
        });
        return res.status(200).json(updateUserFollowing);
    } catch (error) {
        return res.status(500).json(error)
    }
})

//REMOVE ONE USER FOLLOWING
router.delete('/removefollowing/:id',verifyToken, async (req, res) => {
    try {
        const updateUserFollowing = await User.updateOne({_id:req.params.id}, {
            $pull:{ 'numberOfFollowing':req.body.userToRemove}
        });
        return res.status(200).json(updateUserFollowing);
    } catch (error) {
        return res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted...");
    } catch (err) {
        return res.status(500).json(err);
    }
});

//GET USER BY USER
router.get("/finduser/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//GET USER BY USER
router.get("/finduserbyusername/:username", verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username});
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//GET USER BY ADMIN
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//GET USER Followers
router.get("/followers/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const data = await User.aggregate(
            [
                {$project: 
                    { 
                        numberOfFollowers: { 
                            $size:"$numberOfFollowers" 
                        },
                        numberOfFollowing: { 
                            $size:"$numberOfFollowing" 
                        }
                    }
                }
            ]
        );
        return res.status(200).json(data.find(((item) => item._id.toString()===req.params.id)));
    } catch (err) {
        return res.status(500).json(err);
    }
});

//FETCH ALL USER
router.get("/search/:username", verifyToken, async (req, res) => {

    try {

        if(req.params.username == null){
            res.status(200).json([])
        }
        const users = await User
                .find({
                    username: { $gte: req.params.username}
                });
                
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
});
  
//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5) // ?new= true Return on new 5 users
            : await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router