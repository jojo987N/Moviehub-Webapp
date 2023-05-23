/* eslint-disable arrow-parens */
import './style.scss';
import './style.css';
import Show from './modules/show/show.js';
import Store from './modules/store.js';
import CommentPopup from './modules/show/commentPopup.js';

(async () => {
  const store = new Store();
  document.querySelector('.content').innerHTML = (await store.shows).map(v => (new Show(v)).render()).join('');
})();

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('commentsButton')) {
    const selectedItem = event.target.dataset.id;
    const commentsPopup = new CommentPopup(selectedItem);
    commentsPopup.loadPopup();
  }
});
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('close-button')) {
    const popupContainer = event.target.closest('.popup-container');
    popupContainer.remove();
  }
});
