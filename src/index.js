import './style.scss';
import './style.css';
import './asset/style.scss';
import Store from './modules/store.js';
import App from './modules/app.js';
import display from './modules/utils.js';
import CommentPopup from './modules/show/commentPopup.js';
import { DEFAULT_NB_ITEMS } from './modules/global.js';
import Animation from './modules/animation/animation.js';

const animation = new Animation('animation');
animation.render();

(async () => {
  const app = localStorage.getItem('app') || await (new App()).id;
  localStorage.setItem('app', app);

  const store = new Store();
  const shows = await store.shows;
  const count = DEFAULT_NB_ITEMS;
  await display(shows, count);
  animation.remove();
})();

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('commentsButton')) {
    const selectedItem = event.target.dataset.id;
    const commentsPopup = new CommentPopup(selectedItem);
    commentsPopup.loadPopup();
  }
  if (event.target.classList.contains('close-button')) {
    const popupContainer = event.target.closest('.popup-container');
    popupContainer.remove();
    document.querySelector('.background-popup').remove();
    document.body.classList.remove('no-scroll');
  }
  if (!event.target.classList.contains('commentsButton')) {
    // const popupContainer = event.target.closest('.popup-container');
    if (document.querySelector('.popup-container')) {
      if (!event.target.closest('.popup-container')) {
        document.querySelector('.popup-container').remove();
        document.querySelector('.background-popup').remove();
        document.body.classList.remove('no-scroll');
      }
    }
  }
});
