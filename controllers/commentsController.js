let Comments = require("../models/Comments");

allComments = async () => {
    let comments = await Comments.find({}).sort({'_id': -1});
    return comments;
};

createComment = async (title, username, comment, score, date, eventId, postId, userId) => {
    let new_comment = Comments({ title, username, comment, score, date, eventId, postId, userId });
    await new_comment.save();
    return { title, username, comment, score, date, eventId, postId, userId };
}

commentsByTitle = async (title) => {
    let comments = await Comments.find({ title }).sort({ '_id': -1 });
    let { rating , votes } = rankComments(comments);
    return { rating, votes, comments };
};

commentsByEventId = async (eventId) => {
    let comments = await Comments.find({ eventId }).sort({ '_id': -1 });
    let { rating , votes } = rankComments(comments);
    return { rating, votes, comments };
};

commentsByUser = async (username) => {
    let comments = await Comments.find({username}).sort({ '_id': -1 });
    return comments;
}

commentsByPostId = async (postId) => {
    let comments = await Comments.find({ postId }).sort({ '_id': -1 });
    let { rating , votes } = rankComments(comments);
    return { rating, votes, comments };
};

rankComments = (comments) => {
    let total_score = 0;
    let votes = 0;

    comments.forEach(comment => {
        total_score += comment.score;
        votes++;
    });

    let rating = (votes) ? Math.round(total_score/votes) : null;

    return { rating , votes };
};

module.exports =  {allComments, createComment, commentsByTitle, commentsByUser, commentsByEventId , commentsByPostId};
