import { JSDOM } from 'jsdom';
import CommentPopup from './commentPopup.js';
import CommentApi from '../comments/commentApi.js';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

describe('Comment count test', () => {
  let commentPopup;
  let commentsContainer;

  beforeEach(() => {
    CommentApi.getComments = jest.fn().mockResolvedValue([]);
    commentPopup = new CommentPopup();

    // Create comments container element
    commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');
    document.body.appendChild(commentsContainer);
  });

  afterEach(() => {
    document.body.removeChild(commentsContainer);
  });

  it('should display the correct number of comments', async () => {
    await commentPopup.displayComments(); // Ensure comments are fetched and displayed
    const commentCount = await commentPopup.commentCounter(); // Await commentCounter() result
    expect(commentCount).toBe(0);
  });
});
