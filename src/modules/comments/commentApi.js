import Comment from '../comment/comment.js';

const baseApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

export default class CommentApi {
  static async postComment(itemId, username, comment) {
    const commentObj = new Comment(itemId, username, comment);
    const requestBody = {
      item_id: commentObj.item_id,
      username: commentObj.username,
      comment: commentObj.comment,
    };

    try {
      const response = await fetch(`${baseApi}apps/${localStorage.getItem('app')}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          charset: 'UTF-8',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // console.log('Comment posted successfully');
      } else {
        // console.log('Failed to post comment');
      }
    } catch (error) {
      // console.log('Error occurred while posting comment:', error);
    }
  }

  static async getComments(itemId) {
    const response = await fetch(`${baseApi}apps/${localStorage.getItem('app')}/comments/?item_id=${itemId}`);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  }
}
