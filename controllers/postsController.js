let Posts = require("../models/Posts");
let multer = require("multer");
let mongoose = require('mongoose');

allPosts = async () => {
    let posts = await Posts.find({}).sort({'_id': -1});
    return posts;
};

createPost = async (title, description, createDate, score, type, owner, comments) => {
    let new_post = Posts({ title, description, createDate, score, type, owner, comments });
    await new_post.save();
    return { new_post };
};

postsByUser = async (username) => {
    let posts = await Posts.find({username}).sort({ '_id': -1 });
    return posts;
}

postsByType = async (type) => {
    let posts = await Posts.find({type}).sort({ '_id': -1 });
    return posts;
}

postsByDate = async (createDate) => {
    let posts = await Posts.find({createDate}).sort({ '_id': -1 });
    return posts;
}

searchPost = async (_id ) => {
    let post = await Posts.find({_id}).sort({ '_id': -1 });
    console.log(post);
    return post;
}

updatePhoto = async(_id,image)=>{
  console.log(_id);
  let post = await Posts.findOne({_id});
  console.log("Esta es la imagen"+image);
  console.log("Este es el post" +post);
  post.image = image;
  console.log("Este es el post actualiza3" +post);
  await post.save();
  return {post};
};

rankPosts = (posts) => {
    let total_score = 0;
    let votes = 0;

    posts.forEach(post => {
        total_score += post.score;
        votes++;
    });

    let rating = (votes) ? Math.round(total_score/votes) : null;

    return { rating , votes };
};

module.exports =  {allPosts, createPost, postsByUser, postsByType, postsByDate,searchPost,updatePhoto};
