// Imports
import PostMessage from "../models/postMessages.js";
import mongoose from "mongoose";

// GET REQ
// /posts
export const getPosts = async (req, res, next) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};

// POST REQ
// /posts
export const createPost = async (req, res, next) => {
    
    const post = req.body;

    const new_post = new PostMessage(post);

    try {
        await new_post.save();
        res.status(201).json(new_post);
    } catch (err) {
        res.status(409).send({ message: err.message })
    }
};

// PATCH REQ
// /posts/:id

export const updatePost = async ( req, res, next) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID!');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id }, {new: true});

    res.json(updatedPost);
}

// DELETE REQ
// /posts/:id

export const deletePost = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID!');

    await PostMessage.findByIdAndRemove(id);

    console.log('DELETE!')

    res.json({ message: 'Post deleted successfully'});

}

// PATCH req
// /:id/likePost

export const likePost = async (req, res, next) => { 
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID!');
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true } );

    res.json(updatedPost);
}