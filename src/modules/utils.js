import Like from './like/like.js';
import Likes from './likes/likes.js';
import CommentApi from './comments/commentApi.js';

const init = async () => {
  Likes.add(new Like(0));
  //   console.log(await CommentApi.postComment(1, '', ''));
  for (let i = 0; i < 500; i += 1) {
    CommentApi.postComment(i, '', '');
  }
};
export default init;