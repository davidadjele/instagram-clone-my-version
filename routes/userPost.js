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