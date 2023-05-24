/* eslint-disable arrow-parens */
import './style.scss';
import './style.css';
import Store from './modules/store.js';
import App from './modules/app.js';
import init, { display } from './modules/utils.js';
import CommentPopup from './modules/show/commentPopup.js';
import { DEFAULT_NB_ITEMS } from './modules/global.js';

(async () => {
  const app = localStorage.getItem('app') || await (new App()).id;
  localStorage.setItem('app', app);
  await init();
  const store = new Store();
  const shows = await store.shows;
  const count = DEFAULT_NB_ITEMS;
  await display(shows, count);
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
