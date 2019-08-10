let Posts = require("../models/Posts");

allPosts = async () => {
    let posts = await Posts.find({}).sort({'_id': -1});
    return posts;
};

createPost = async (title, description, date, score, type) => {
    let new_post = Posts({ title, description, date, score, type });
    await new_post.save();
    return { title, description, date, score, type };
};

postsByUser = async (username) => {
    let posts = await Posts.find({username}).sort({ '_id': -1 });
    return posts;
}

postsByType = async (type) => {
    let posts = await Posts.find({type}).sort({ '_id': -1 });
    return posts;
}

postsByDate = async (date) => {
    let posts = await Posts.find({date}).sort({ '_id': -1 });
    return posts;
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

module.exports =  {allPosts, createPost, postsByUser, postsByType, postsByDate};
