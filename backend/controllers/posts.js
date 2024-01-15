import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, caption, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      caption,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      unlikes: {},
      comments: [],
    });

    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get({ userId });
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isUnliked = post.unlikes.get({ userId });
    if (isUnliked) {
      post.unlikes.delete(userId);
    } else {
      post.unlikes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { unlikes: post.unlikes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};
