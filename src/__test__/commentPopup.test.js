import data from '../__mocks__/dataMock.js';
import '../__mocks__/indexMock.js';
import display from '../__mocks__/utilsMock.js';
import { DEFAULT_NB_ITEMS } from '../modules/global.js';

import CommentPopup from '../__mocks__/commentPopupMock.js';

describe('Tests for comments counter ', () => {
  it('Check when we add one comment, the number of comments equal to one ', () => {
    display(data, DEFAULT_NB_ITEMS);
    const selectedItem = document.querySelectorAll('.commentsButton')[4];
    selectedItem.click();
    const input = document.querySelector('input');
    const textarea = document.querySelector('textarea');
    input.value = 'I am testing';
    textarea.value = 'This movie is very interesting';
    document.querySelector('.submit-button').click();

    const commentsPopup = new CommentPopup(selectedItem.parentElement.parentElement.id);
    const numberOfComments = commentsPopup.commentCounter();
    expect(numberOfComments).toBe(1);
  });

  it('Check when we add n comments, the number of comments equal to n ', () => {
    display(data, DEFAULT_NB_ITEMS);
    const selectedItem = document.querySelectorAll('.commentsButton')[4];
    selectedItem.click();
    const input = document.querySelector('input');
    const textarea = document.querySelector('textarea');

    [...Array(52).keys()].map((i) => i + 1).forEach(() => {
      input.value = 'I am testing';
      textarea.value = 'This movie is very interesting';
      document.querySelector('.submit-button').click();
    });

    const commentsPopup = new CommentPopup(selectedItem.parentElement.parentElement.id);
    const numberOfComments = commentsPopup.commentCounter();
    expect(numberOfComments).toBe(53); // because the first test we have already added one comment !
  });
});
