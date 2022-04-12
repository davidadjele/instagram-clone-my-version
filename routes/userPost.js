const multer = require("multer");
const router = require("express").Router();
const crypto = require('crypto');

const {
    verifyToken,
    verifyTokenAndAuthorization,

} = require("./verifyToken");
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const {GridFsStorage} = require('multer-gridfs-storage');
const mongoose = require('mongoose');

const UserPost = require("../models/UserPost");
const User = require('../models/User');
dotenv.config()
// create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

const connect = mongoose.createConnection(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

connect.once('open', () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads"
    });
});

//CREATE
router.post("/:id", upload.single('image'), async (req, res) => {

    const newPost = new UserPost({
        author:req.params.id,
        img:req.file.filename,
        desc:req.body.desc,
    });
    try {
        const savedPost = await newPost.save();
        
        return res.status(200).json(savedPost);
        
    } catch (err) {
        return res.status(500).json(err);
    }
});

//ADD COMMENT
router.put('/addcomment/:postid',verifyToken, async (req, res) => {
    /* {
        comments: [
            {
                    commentOwnerId: userId
                },
                    comment: comment
                }
            }
        ]
    } */
    try {
        const updateUserPost= await UserPost.updateOne({_id:req.params.postid}, {
            $push:{ comments:req.body.comments}
        });
        return res.status(200).json(updateUserPost);
    } catch (error) {
        return res.status(500).json(error)
    }
})

//GET ALL USER POST BY AUTHOR ID
router.get('/findallimages/:id',verifyToken,(req, res) => {
    UserPost
        .find({author: req.params.id})
        .sort({createdAt: -1})
        .then(images => {
            return res.status(200).json({
                images
            });
        })
        .catch(err => res.status(500).json(err));
});

//GET ALL USER POST BY AUTHOR ID AND THEIR FOLLOWING USERS POSTS
router.get('/findallimagesv2/:id',verifyToken, async (req, res) => {
    

    try {
        const currentUser = await User.findById(req.params.id);
        const userPosts = await UserPost.find({ author: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.numberOfFollowing.map((friendId) => {
                return UserPost.find({ author: friendId });
            })
            
        );
        
        const allPost =  userPosts.concat(...friendPosts)
        allPost.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        res.status(200).json({images:allPost});
    } catch (error) {
        return res.status(500).json(error)
    }

    
});

//GET POST BY ID
router.get('/getpost/:id',verifyToken, async (req, res) => {
    try {
        const post = await UserPost.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//GET USER SPECIFIC POST 
router.get('/find/:filename',(req, res, next) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
        if (!files[0] || files.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No files available',
            });
        }

        if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
            // render image to browser
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image',
            });
        }
    });
});

/*
        GET: Delete an image from the collection
        624bb81108ac0c2aecfb6554
*/
router.get('/delete/:id',verifyToken,(req, res) => {
    UserPost.findOne({ _id: req.params.id })
        .then((image) => {
            if (image) {
                UserPost.deleteOne({ _id: req.params.id })
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            message: `File with ID: ${req.params.id} deleted`,
                        });
                    })
                    .catch(err => { return res.status(500).json(err) });
            } else {
                res.status(200).json({
                    success: false,
                    message: `File with ID: ${req.params.id} not found`,
                });
            }
        })
        .catch(err => res.status(500).json(err));
});

//ADD LIKE WITH POST ID
router.put('/like/:id',verifyToken, async (req, res) => {
    try {
        const updatedPost = await UserPost.updateOne({_id:req.params.id}, {
            $addToSet:{ numberOfLikes:req.body.numberOfLikes}
        });
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json(error)
    }
})

//REMOVE LIKE WITH POST ID
router.put('/removelike/:id',verifyToken, async (req, res) => {
    
    try {
        const updatedPost = await UserPost.updateOne({_id:req.params.id}, {
            $pull:{ 'numberOfLikes':req.body.userToRemove}
        });
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json(error)
    }
})


//UPDATE Post
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedPost = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
        );
        return res.status(200).json(updatedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;