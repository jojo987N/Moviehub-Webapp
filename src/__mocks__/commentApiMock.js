import Comment from '../modules/comment/comment.js';
import commentsData from './global.js';

export default class CommentApi {
  static postComment(itemId, username, comment) {
    const commentObj = new Comment(itemId, username, comment);
    const requestBody = {
      item_id: commentObj.item_id,
      username: commentObj.username,
      comment: commentObj.comment,
    };

    commentsData.push(requestBody);
  }

  static getComments(itemId) {
    return commentsData.filter((comment) => comment.item_id === itemId);
  }
}
