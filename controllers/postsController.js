let Posts = require("../models/Posts");

allPosts = async () => {
    let posts = await Posts.find({}).sort({'_id': -1});
    return posts;
};

createPost = async (title, description, createDate, score, type, owner, comments) => {
    let new_post = Posts({ title, description, createDate, score, type, owner, comments });
    await new_post.save();
    return { title, description, createDate, score, type, owner, comments };
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

module.exports =  {allPosts, createPost, postsByUser, postsByType, postsByDate,searchPost};
